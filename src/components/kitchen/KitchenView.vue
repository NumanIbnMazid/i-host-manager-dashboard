<template>
  <div>
    <div class="vx-row mb-6">
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <statistics-card-line
          hideChart
          class="mb-base"
          icon="CheckCircleIcon"
          :statistic="ordersCount('Received')"
          statisticTitle="Recived orders"
        />
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <statistics-card-line
          hideChart
          class="mb-base"
          icon="CoffeeIcon"
          :statistic="ordersCount('Verified')"
          statisticTitle="Verified orders"
          color="danger"
        />
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <statistics-card-line
          hideChart
          class="mb-base"
          icon="CheckSquareIcon"
          :statistic="ordersCount('Delivered')"
          statisticTitle="Served orders"
          color="success"
        />
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <statistics-card-line
          hideChart
          class="mb-base"
          icon="CreditCardIcon"
          :statistic="ordersCount('Paid')"
          statisticTitle="Recive payment"
          color="warning"
        />
      </div>
    </div>
    <vs-divider>Order Managment</vs-divider>
    <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
      <div class="flex flex-wrap-reverse items-center data-list-btn-container">
        <div
          class="btn-add-new p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary"
        >
          <!-- <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" /> -->
          <span class="ml-2 text-base text-primary"
            >Total Tables: {{ ordersData.length }}</span
          >
        </div>
      </div>

      <div class="flex flex-wrap-reverse items-center data-list-btn-container">
        <div
          class="btn-add-new p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary"
        >
          <!-- <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" /> -->
          <span class="ml-2 text-base text-primary"
            >Active Orders In Tables: {{ totalActiveOrders() }}</span
          >
        </div>
      </div>
    </div>

    <div class="vx-row">
      <vs-collapse
        v-for="(order, j) in ordersData"
        :key="j"
        class="vx-col w-full md:w-1/4 mb-base"
        accordion
      >
        <vs-collapse-item
          icon-pack="feather"
          icon-arrow="icon-chevrons-down"
          class="bg-white border-0 mb-2 rounded op-block p-1 vs-con-loading__container"
          style="background-color: #ddd"
          :id="`div-with-loading-${order.id}`"
        >
          <div slot="header">
            <div
              class="flex justify-between items-center d-theme-border-grey-light"
            >
              <div v-if="order.order_status">
                <p>
                  <span class="font-semibold"
                    >Order ID #{{ order.table[0].id }}
                    <small>({{ order.order_status.status }})</small></span
                  >
                </p>
                <vs-progress
                  :percent="orderPercent(order.order_status.status, 'per')"
                  :color="orderPercent(order.order_status.status, 'color')"
                ></vs-progress>
              </div>
              <div v-else>
                <p>
                  <span class="font-semibold">No order</span>
                </p>
              </div>
              <div class="text-center mr-4">
                <p>
                  Table: {{ order.table_no }} <br />
                  <span v-if="order.order_status"
                    >Amount: ৳{{ order.table[0].total_price }}</span
                  >
                  <span v-else>-</span>
                </p>
              </div>
            </div>
          </div>
          <vs-button
            v-if="order.order_status"
            @click="
              changeStatus(order.order_status.status, order.table[0].id, j)
            "
            :disabled="order.order_status.status == 'Pending'"
            >{{ statusToAction(order.order_status.status) }}</vs-button
          >

          <vs-button
            class="ml-2"
            color="secondary"
            v-if="order.order_status && order.order_status.status == 'Verified'"
            @click="printKitechRecit(order)"
            >Print for kitchen</vs-button
          >
          <vs-button
            class="ml-2"
            color="secondary"
            v-if="
              order.order_status && order.order_status.status == 'Delivered'
            "
            @click="printRecipt(order)"
            >Print Invoice</vs-button
          >
          <vs-divider />
          <vx-timeline
            v-if="order.order_status"
            class="pt-2"
            :data="orderStatusData(order.order_status.status)"
          />
          <div v-else>
            <h3>No order made from this table</h3>
          </div>
        </vs-collapse-item>
      </vs-collapse>
      <!-- </vx-card> -->
    </div>
    <vs-divider>Todays Order Details</vs-divider>
    <div id="data-list-list-view" class="data-list-container">
      <vs-table
        ref="table"
        v-model="selected"
        pagination
        :max-items="itemsPerPage"
        search
        :data="orders"
      >
        <div
          slot="header"
          class="flex flex-wrap-reverse items-center flex-grow justify-between"
        >
          <div
            class="flex flex-wrap-reverse items-center data-list-btn-container"
          >
            <div
              class="btn-add-new p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary"
            >
              <!-- <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" /> -->
              <span class="ml-2 text-base text-primary"
                >Total Sell Today: ৳ {{ orders.sum("total_price") }}/-</span
              >
            </div>
          </div>

          <vs-dropdown
            vs-trigger-click
            class="cursor-pointer mb-4 mr-4 items-per-page-handler"
          >
            <div
              class="p-3 mt-3 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
            >
              <span class="mr-2"
                >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} -
                {{
                  orders.length - currentPage * itemsPerPage > 0
                    ? currentPage * itemsPerPage
                    : orders.length
                }}
                of {{ queriedItems }}</span
              >
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>

            <vs-dropdown-menu>
              <vs-dropdown-item @click="itemsPerPage = 4">
                <span>4</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="itemsPerPage = 10">
                <span>10</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="itemsPerPage = 15">
                <span>15</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="itemsPerPage = 20">
                <span>20</span>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>

        <template slot="thead">
          <vs-th sort-key="id">Order Id</vs-th>
          <vs-th>Status</vs-th>
          <vs-th>Table no</vs-th>
          <vs-th sort-key="total_price">Total Price</vs-th>
          <vs-th>Items</vs-th>
        </template>

        <template slot-scope="{ data }">
          <tbody>
            <vs-tr
              :data="tr"
              :key="indextr"
              v-for="(tr, indextr) in data"
              style="border-collapse: separate; border-spacing: 0 1.3rem"
            >
              <vs-td>
                <p class="product-name font-medium truncate">{{ tr.id }}</p>
              </vs-td>

              <vs-td>
                <vs-chip
                  transparent
                  :color="statusColor(tr.order_status.status)"
                  :style="`${
                    statusColor(tr.order_status.status) == 'red'
                      ? 'color: #fff !important'
                      : ''
                  }`"
                  >{{ tr.order_status.status }}
                </vs-chip>
              </vs-td>

              <vs-td>
                <p class="product-category">{{ tr.table.table_no }}</p>
              </vs-td>

              <vs-td>
                <p class="product-category">{{ tr.total_price }}/-</p>
              </vs-td>

              <vs-td>
                <vs-chip
                  class="p-3"
                  transparent
                  color="primary"
                  v-for="(item, i) in tr.food"
                  :key="i"
                >
                  Name: {{ item.food.name }} <br />
                  Price: {{ item.food.price }} | Qty: {{ item.quantity }} <br />
                  Total: {{ item.price }}/-</vs-chip
                >
              </vs-td>
            </vs-tr>
          </tbody>
        </template>
      </vs-table>

      <img id="res_logo" :src="resturent.logo" alt="" style="display: none" />
    </div>
  </div>
</template>

<script>
import StatisticsCardLine from "@/components/statistics-cards/StatisticsCardLine.vue";
import VxTimeline from "@/components/timeline/VxTimeline";
import axios from "@/axios.js";
import moment from "moment";
export default {
  components: {
    StatisticsCardLine,
    VxTimeline,
  },

  data: () => ({
    ordersData: [],
    resturent_id: localStorage.getItem("resturent_id"),
    resturent: JSON.parse(localStorage.getItem("resturent")),
    orders: [],
    itemsPerPage: 10,
    selected: "",
    currentPage: 1,
    queriedItems: 0,

    varified_orders: 0,
    recived_orders: 0,
    recived_payments: 0,
    served_orders: 0,
    testTime: moment().format("DD/MM/Y, h:mma"),
  }),

  methods: {
    ordersCount(status) {
      let count = 0;
      let array = this.orders;
      for (let i = 0; i < array.length; i++) {
        if (array[i].order_status) {
          if (array[i].order_status.status == status) {
            count++;
          }
        }
      }
      return count;
    },
    totalActiveOrders() {
      let count = 0;
      let array = this.ordersData;
      for (let i = 0; i < array.length; i++) {
        if (array[i].order_status) {
          count++;
        }
      }
      return count;
    },

    statusToAction(status) {
      console.log(status);
      if (status == "Pending") {
        return "Pending";
      }
      if (status == "Received") {
        return "Verify";
      }
      if (status == "Verified") {
        return "Served";
      }
      if (status == "Delivered" || status == "Paid") {
        return "Completed";
      }
    },
    changeStatus(status, order_id, index) {
      let url = "";
      if (status == "Received") {
        url = `verify-food-order-dashboard/${order_id}`;
      }
      if (status == "Verified") {
        url = `serve-food-order-dashboard/${order_id}`;
      }
      if (status == "Delivered" || status == "Paid") {
        url = `complete-food-order-dashboard/${order_id}`;
      }
      this.$vs.loading();
      axios
        .get(url)
        .then((res) => {
          this.$vs.loading.close();
          this.$vs.notify({
            title: "Status update successfully",
            color: "success",
            position: "top-right",
          });
        })
        .catch((err) => {
          this.$vs.loading.close();
          this.$vs.notify({
            title: "Status update failed",
            color: "danger",
            position: "top-right",
          });
          console.log(err);
        });
    },
    checkOrder(order) {
      return order.table.length == 1 ? true : false;
    },
    webSocket() {
      let updateSocket;
      let vm = this;
      function connectSocket() {
        updateSocket = new WebSocket(
          `ws://backend.i-host.com.bd/ws/dashboard/${vm.resturent_id}/`
          // `ws://1fd7a9107cd3.ngrok.io/ws/dashboard/${vm.resturent_id}/`
        );
        // console.log(updateSocket);
        updateSocket.onmessage = function (e) {
          let res = JSON.parse(e.data);

          vm.ordersData = res.data;

          vm.orders = res.list;
          vm.queriedItems = res.list.length;

          // vm.ordersData =
          console.log("Received a message from the socket:", e.data);
        };
        updateSocket.onclose = function (e) {
          console.error("Chat socket closed unexpectedly; reconnecting");
          setTimeout(connectSocket, 1000);
        };
        updateSocket.onopen = function (e) {
          console.log("Socket connected; sending a ping");
          updateSocket.send(vm.resturent_id);
        };
      }
      connectSocket();
    },

    orderPercent(status, type) {
      let perData = { per: 0, color: "" };
      switch (status) {
        case "Pending":
          perData = { per: 20, color: "danger" };
          break;
        case "Received":
          perData = { per: 40, color: "primary" };
          break;
        case "Verified":
          perData = { per: 60, color: "secondary" };
          break;
        case "Delivered":
          perData = { per: 85, color: "success" };
          break;
        case "Paid":
          perData = { per: 100, color: "blue" };
          break;
        default:
          return [];
          break;
      }
      if (type == "per") return perData.per;
      if (type == "color") return perData.color;
    },

    orderStatusData(status) {
      let pending = [
        {
          color: "primary",
          icon: "TvIcon",
          title: "Pending",
          desc: "Order pending",
        },
      ];

      let recived = [
        {
          color: "success",
          icon: "CheckCircleIcon",
          title: "Pending",
          desc: "Order pending",
        },
        {
          color: "primary",
          icon: "TvIcon",
          title: "Recived",
          desc: "Order recive & wating for approve",
        },
      ];

      let approve = [
        {
          color: "success",
          icon: "CheckCircleIcon",
          title: "Pending",
          desc: "Order pending",
        },
        {
          color: "success",
          icon: "CheckCircleIcon",
          title: "Recived",
          desc: "Order recive & wating for approve",
        },
        {
          color: "primary",
          icon: "TvIcon",
          title: "Approved",
          desc: "Order approve & wating for serve",
        },
      ];

      let serve = [
        {
          color: "success",
          icon: "CheckCircleIcon",
          title: "Pending",
          desc: "Order pending",
        },
        {
          color: "success",
          icon: "CheckCircleIcon",
          title: "Recived",
          desc: "Order recived",
        },
        {
          color: "success",
          icon: "CheckCircleIcon",
          title: "Approved",
          desc: "Order approveed",
        },
        {
          color: "primary",
          icon: "TvIcon",
          title: "Served",
          desc: "Order served & waiting for payment",
        },
      ];

      let paid = [
        {
          color: "success",
          icon: "CheckCircleIcon",
          title: "Pending",
          desc: "Order pending",
        },
        {
          color: "success",
          icon: "CheckCircleIcon",
          title: "Recived",
          desc: "Order recived",
        },
        {
          color: "success",
          icon: "CheckCircleIcon",
          title: "Approved",
          desc: "Order approveed",
        },
        {
          color: "success",
          icon: "CheckCircleIcon",
          title: "Served",
          desc: "Order served & waiting for payment",
        },
        {
          color: "success",
          icon: "CheckCircleIcon",
          title: "Paid",
          desc: "Order served & waiting for payment",
        },
      ];

      switch (status) {
        case "Pending":
          return pending;
          break;
        case "Received":
          return recived;
          break;
        case "Verified":
          return approve;
          break;
        case "Delivered":
          return serve;
          break;
        case "Paid":
          return paid;
          break;
        default:
          return [];
          break;
      }
    },

    // getData() {
    //   axios
    //     .get(`/reporting/sales-report/?res_id=${this.resturent_id}`, {
    //       from_date: moment().format("YYYY-MM-DD"), //"2020-09-27",
    //       // to_date: "2020-09-27",
    //       // order_status: "Paid",
    //     })
    //     .then((res) => {
    //       // console.log(res.data.data);
    //       this.orders = res.data.data;
    //       this.queriedItems = res.data.data.length;
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },

    statusColor(status) {
      switch (status) {
        case "Paid":
          return "success";
          break;

        case "Pending":
          return "danger";
          break;

        case "Received":
          return "warning";
          break;

        case "Verified":
          return "#009a45";
          break;

        case "Rejected":
          return "red";
          break;

        case "Delivered":
          return "green";
          break;

        default:
          break;
      }
    },

    // openLoadingInDiv(id) {
    //   this.$vs.loading({
    //     container: `#div-with-loading-${id}`,
    //     scale: 0.6,
    //   });
    //   setTimeout(() => {
    //     this.$vs.loading.close(`#div-with-loading-${id} > .con-vs-loading`);
    //   }, 3000);
    // },

    printRecipt(order) {
      console.log(order);
      const WinPrint = window.open(
        "",
        "",
        "left=0,top=0,width=600,height=600,toolbar=0,scrollbars=0,status=0"
      );

      let itemDetail = "";
      let resLogo = document.querySelector("#res_logo").src;

      order.table[0].food.forEach((el) => {
        itemDetail += `<tr class="service">
                        <td class="tableitem itemname">
                            <p class="itemtext">${el.food.name}(<b>${el.quantity}</b>)</p>
                        </td>
                        <td class="tableitem">
                            <p class="itemtext" style="text-align:center">${el.food.price}/-</p>
                        </td>
                        <td class="tableitem price">
                            <p class="itemtext">${el.price}/-</p>
                        </td>
                    </tr>`;
      });

      WinPrint.document.write(`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Invoice</title>

    <style>
        * {
            margin: 0;
            padding: 0;
        }
        
        body {
            margin: 0;
            padding: 0;
        }
        
        #invoice-POS {
            box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5);
            padding: 2mm;
            margin: 0 auto;
            width: 44mm;
            background: #FFF;
        }
        
        #invoice-POS ::selection {
            background: #f31544;
            color: #000;
        }
        
        #invoice-POS ::moz-selection {
            background: #f31544;
            color: #000;
        }
        
        #invoice-POS h1 {
            font-size: 1.5em;
            color: #222;
        }
        
        #invoice-POS h2 {
            font-size: .9em;
        }
        
        #invoice-POS h3 {
            font-size: 1.2em;
            font-weight: 300;
            line-height: 2em;
        }
        
        #invoice-POS p {
            font-size: .7em;
            color: #000;
            line-height: 1.2em;
        }
        /* #invoice-POS #top,
        #invoice-POS #mid,
        #invoice-POS #bot {
            border-bottom: 1px solid #000;
        } */
        
        #invoice-POS #top {
            min-height: 77px;
        }
        
        #invoice-POS #bot {
            min-height: 50px;
        }
        
        #invoice-POS #top .logo {
            height: 60px;
            width: 60px;
        }
        
        
        #invoice-POS .info {
            display: block;
            margin-left: 0;
        }
        
        #invoice-POS .title {
            float: right;
        }
        
        #invoice-POS .title p {
            text-align: right;
        }
        
        #invoice-POS table {
            width: 100%;
            border-collapse: collapse;
        }
        
        #invoice-POS .tabletitle {
            font-size: .7em;
            background: #EEE;
        }
        
        #invoice-POS .service {
            border-bottom: 1px solid #EEE;
        }
        
        #invoice-POS .item {
            width: 24mm;
        }
        
        #invoice-POS .itemtext {
            font-size: .7em;
        }
        
        #invoice-POS #legalcopy {
            margin-top: 5mm;
        }
        
        .price>p,
        .price>h2,
        .payment>h2 {
            float: right;
            margin-right: 5px;
        }
        
        .info {
            padding: 5px 0px;
        }
        
        .info>p {
            text-align: center !important;
        }
        
        .final {
            border: 1px solid #000;
            border-left: 0;
            border-right: 0;
        }
        
        .itemname>p {
            margin-right: 5px;
        }
    </style>
</head>

<body>
    <div id="invoice-POS">
        <center id="top">
            <div class="logo">
                <img src="${resLogo}" style="width: 100%;" alt="">
            </div>
     
            <div class="info">
                <h2>${this.resturent.name}</h2>
                <h2>Invoice</h2>
            </div>
        </center>
        <div id="mid">
            <div class="info">
                <p>
                    VAT Reg: ${this.resturent.vat_registration_number}</br>
                    Email : sultan@gmail.com</br>
                    Phone : ${this.resturent.mobile_no}</br>
                </p>
            </div>
        </div>
        <div id="bot">
            <center>
                <h2>Order # ${order.order_status.id}</h2>
                <h2>Table No: ${order.table_no}</h2>
                <h2>Waiter: Rakib Hasan</h2>
                <h2>Time: ${moment().format("DD/MM/Y, h:mma")}</h2>
            </center>
            <div id="table">
                <table>
                    <tr class="tabletitle">
                        <td class="item">
                            <h2>Item</h2>
                        </td>
                        <td class="Hours">
                            <h2>U.Price</h2>
                        </td>
                        <td class="Rate price">
                            <h2>T.Price</h2>
                        </td>
                    </tr>

                   ${itemDetail}

                   <tr class="tabletitle">
                        <td class="Rate">
                            <h2>Total</h2>
                        </td>
                        <td></td>
                        <td class="payment">
                            <h2>${order.table[0].total_price}/-</h2>
                        </td>
                    </tr>
                    <tr class="tabletitle">
                        <td class="Rate">
                            <h2>Service Charge</h2>
                        </td>
                        <td></td>
                        <td class="payment">
                            <h2>0/-</h2>
                        </td>
                    </tr>
                    <tr class="tabletitle">
                        <td class="Rate">
                            <h2>VAT (15%)</h2>
                        </td>
                        <td></td>
                        <td class="payment">
                            <h2>${order.table[0].tax}/-</h2>
                        </td>
                    </tr>
                    <tr class="tabletitle final">
                        <td class="Rate">
                            <h2>Net Total:</h2>
                        </td>
                        <td></td>
                        <td class="payment">
                            <h2>${
                              order.table[0].total_price + order.table[0].tax
                            }/-</h2>
                        </td>
                    </tr>
                </table>
            </div>
            <div id="legalcopy">
                <center>
                    <p class="legal"><strong> Powerd by @i-host <br> <small>www.i-host.com.bd</small></strong>
                    </p>
                </center>
            </div>
        </div>
    </div>
</body>

</html>`);

      WinPrint.document.close();
      WinPrint.focus();

      WinPrint.print();
      WinPrint.close();
    },

    printKitechRecit(order) {
      const WinPrint = window.open(
        "",
        "",
        "left=0,top=0,width=600,height=600,toolbar=0,scrollbars=0,status=0"
      );

      let itemDetail = "";

      order.table[0].food.forEach((el) => {
        itemDetail += `<tr class="service">
                        <td class="tableitem">
                            <p class="itemtext">${el.food.name}</p>
                            ${el.food_options}
                        </td>
                        <td>-</td>
                        <td class="tableitem qty">
                            <p class="itemtext">${el.quantity}</p>
                        </td>
                    </tr>`;
      });

      WinPrint.document.write(`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>POS</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        
        body {
            margin: 0;
            padding: 0;
        }
        
        #invoice-POS {
            box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5);
            padding: 2mm;
            margin: 0 auto;
            width: 44mm;
            background: #FFF;
        }
        
        #invoice-POS ::selection {
            background: #f31544;
            color: #000;
        }
        
        #invoice-POS ::moz-selection {
            background: #f31544;
            color: #000;
        }
        
        #invoice-POS h1 {
            font-size: 1.5em;
            color: #222;
        }
        
        #invoice-POS h2 {
            font-size: .9em;
        }
        
        #invoice-POS h3 {
            font-size: 1.2em;
            font-weight: 300;
            line-height: 2em;
        }
        
        #invoice-POS p {
            font-size: .7em;
            color: #000;
            line-height: 1.2em;
        }
        
        #invoice-POS #top,
        #invoice-POS #mid,
        #invoice-POS #bot {
            /* Targets all id with 'col-' */
            border-bottom: 1px solid #000;
        }
        
        #invoice-POS #top {
            min-height: 100px;
        }
        /* #invoice-POS #mid {
            min-height: 80px;
        } */
        
        #invoice-POS #bot {
            min-height: 50px;
        }
        
        #invoice-POS #top .logo {
            height: 60px;
            width: 60px;
            
        }
        
        #invoice-POS .info {
            display: block;
            margin-left: 0;
        }
        
        #invoice-POS .title {
            float: right;
        }
        
        #invoice-POS .title p {
            text-align: right;
        }
        
        #invoice-POS table {
            width: 100%;
            border-collapse: collapse;
        }
        
        #invoice-POS .tabletitle {
            font-size: .7em;
            background: #EEE;
        }
        
        #invoice-POS .service {
            border-bottom: 1px solid #EEE;
        }
        
        #invoice-POS .item {
            width: 24mm;
        }
        
        #invoice-POS .itemtext {
            font-size: .7em;
        }
        
        #invoice-POS #legalcopy {
            margin-top: 5mm;
        }
        
        .qty>p,
        .qty>h2 {
            float: right;
            margin-right: 10px;
        }
    </style>
</head>

<body>
    <!-- partial:index.partial.html -->
    <div id="invoice-POS">
        <div id="mid">
            <div class="info">
                <center>
                    <h2>${this.resturent.name}</h2>
                    <h2>Order # ${order.order_status.id}</h2>
                    <h2>Table No: ${order.table_no}</h2>
                    <h2>Waiter: Rakib Hasan</h2>
                    <h2>Time: ${moment().format("DD/MM/Y, h:mma")}</h2>
                    <br>
                </center>

            </div>
        </div>
        <!--End Invoice Mid-->

        <div id="bot">

            <div id="table">
                <table>
                    <tr class="tabletitle">
                        <td class="item">
                            <h2>Item</h2>
                        </td>
                        <td>-</td>
                        <td class="Hours qty">
                            <h2>Qty</h2>
                        </td>
                    </tr>
                      ${itemDetail}
                </table>
            </div>
        </div>
        <br>
    </div>
</body>

</html>`);

      WinPrint.document.close();
      WinPrint.focus();
      WinPrint.print();
      WinPrint.close();
    },
  },

  computed: {},

  created() {
    this.webSocket();
  },
};
</script>

<style scoped >
.vs-collapse-item.bg-white.border-0.mb-2.rounded.op-block.p-1.open-item {
  position: absolute;
  z-index: 999;
  width: 23%;
}

.mb-base {
  margin-bottom: 0.5rem !important;
}
td {
  border-top: 10px solid #f8f8f8;
}
</style>