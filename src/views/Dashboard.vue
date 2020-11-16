<template>
  <div>
    <div class="vx-row mb-10">
      <div class="vx-col md:w-1/2">
        <h1 class="text-grey-dark">Order Dashboard</h1>
      </div>
      <div class="vx-col md:w-1/2 text-right">
        <h1 class="text-grey-dark">
          {{ time }}
        </h1>
      </div>
    </div>

    <div class="vx-row">
      <div class="vx-col md:w-1/4">
        <vs-card class="bg-primary text-center my-auto py-10">
          <h1 class="text-white py-3" style="font-size: 4rem">
            <b>{{ this.orderActiveNow }}</b>
          </h1>
          <h4 class="text-ihosts">Active Order Now</h4>
        </vs-card>
      </div>

      <div class="vx-col" style="width: 75%">
        <div class="vx-row">
          <div class="vx-col w-full sm:w-1/2 md:w-1/3">
            <vs-card>
              <vs-row>
                <vs-col vs-w="3">
                  <img class="status-icon" src="../assets/icon/1.png" alt="" />
                </vs-col>

                <vs-col vs-w="9" class="text-center">
                  <h1 class="mx-auto text-bl" style="font-size: 2.5rem">
                    <b> {{ this.tableScanned }}</b>
                  </h1>
                  <p class="mx-auto text-bl text-lg">Table Scanned</p>
                </vs-col>
              </vs-row>
            </vs-card>
          </div>

          <div class="vx-col w-full sm:w-1/2 md:w-1/3">
            <vs-card>
              <vs-row>
                <vs-col vs-w="3">
                  <img class="status-icon" src="../assets/icon/2.png" alt="" />
                </vs-col>

                <vs-col vs-w="9" class="text-center">
                  <h1 class="mx-auto text-ihosts" style="font-size: 2.5rem">
                    <b> {{ this.userConfirmed }}</b>
                  </h1>
                  <p class="mx-auto text-ihosts text-lg">User Confirmed</p>
                </vs-col>
              </vs-row>
            </vs-card>
          </div>

          <div class="vx-col w-full sm:w-1/2 md:w-1/3">
            <vs-card>
              <vs-row>
                <vs-col vs-w="3">
                  <img class="status-icon" src="../assets/icon/3.png" alt="" />
                </vs-col>

                <vs-col vs-w="9" class="text-center">
                  <h1 class="mx-auto text-ihostm" style="font-size: 2.5rem">
                    <b> {{ this.kitchen }}</b>
                  </h1>
                  <p class="mx-auto text-ihostm text-lg">In Kitchen</p>
                </vs-col>
              </vs-row>
            </vs-card>
          </div>

          <!-- Food Served -->
          <div class="vx-col w-full sm:w-1/2 md:w-1/3">
            <vs-card>
              <vs-row>
                <vs-col vs-w="3">
                  <img class="status-icon" src="../assets/icon/4.png" alt="" />
                </vs-col>

                <vs-col vs-w="9" class="text-center">
                  <h1 class="mx-auto text-pl" style="font-size: 2.5rem">
                    <b> {{ this.foodServed }}</b>
                  </h1>
                  <p class="mx-auto text-pl text-lg">Food Served</p>
                </vs-col>
              </vs-row>
            </vs-card>
          </div>

          <div class="vx-col w-full sm:w-1/2 md:w-1/3">
            <vs-card>
              <vs-row>
                <vs-col vs-w="3">
                  <img class="status-icon" src="../assets/icon/5.png" alt="" />
                </vs-col>

                <vs-col vs-w="9" class="text-center">
                  <h1 class="mx-auto text-gn" style="font-size: 2.5rem">
                    <b> 01</b>
                  </h1>
                  <p class="mx-auto text-gn text-lg">Payment Done</p>
                </vs-col>
              </vs-row>
            </vs-card>
          </div>

          <!-- Cancel -->
          <div class="vx-col w-full sm:w-1/2 md:w-1/3">
            <vs-card>
              <vs-row>
                <vs-col vs-w="3">
                  <img class="status-icon" src="../assets/icon/6.png" alt="" />
                </vs-col>

                <vs-col vs-w="9" class="text-center">
                  <h1 class="mx-auto text-rd" style="font-size: 2.5rem">
                    <b> {{ this.cancelOrders }}</b>
                  </h1>
                  <p class="mx-auto text-rd text-lg">Cancel</p>
                </vs-col>
              </vs-row>
            </vs-card>
          </div>
        </div>
      </div>
    </div>
    <vs-divider />

    <!-- order details -->
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
          class="bg-white border-0 m-0 rounded op-block p-0 vs-con-loading__container"
          style="background-color: #ddd"
          :id="`div-with-loading-${order.id}`"
        >
          <div slot="header">
            <div
              class="flex justify-between items-center d-theme-border-grey-light"
            >
              <div class="flex w-full">
                <div
                  :class="`w-1/4 bg-${selectColor(
                    order.status
                  )} text-center ml-3`"
                >
                  <h2 class="text-white">
                    <b>{{ order.table_no }}</b>
                  </h2>
                  <svg
                    width="38"
                    height="26"
                    viewBox="0 0 38 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M36.6429 25.7857V8.14285H1.35715V25.7857H4.07143V10.1786C4.07143 9.80383 4.37527 9.5 4.75 9.5H33.25C33.6247 9.5 33.9286 9.80383 33.9286 10.1786V25.7857H36.6429Z"
                      fill="white"
                    />
                    <path
                      d="M2.39886 0L0.589111 2.71429H37.4109L35.6011 0H2.39886Z"
                      fill="white"
                    />
                    <path d="M0 4.07144H38V6.78573H0V4.07144Z" fill="white" />
                  </svg>
                </div>
                <div
                  v-if="!order.status"
                  class="w-3/4 my-auto text-center text-hard"
                >
                  No Order
                </div>
                <div v-else class="w-3/4 p-2 ml-2 pt-0">
                  <!-- <vs-progress
                    :percent="orderPercent(order.status, 'per')"
                    :color="orderPercent(order.status, 'color')"
                  ></vs-progress> -->
                  <div class="flex w-full mt-4">
                    <div class="w-3/5">
                      <p class="text-sm leading-none">Order ID</p>
                      <p class="text-lg leading-none font-medium">
                        #{{ order.id }}
                      </p>
                      <p
                        :class="`text-sm leading-none text-${selectColor(
                          order.status
                        )}`"
                      >
                        ({{ order.status_details }})
                      </p>
                    </div>
                    <div class="w-2/5 text-center mr-3">
                      <p class="text-lg leading-none">Amount</p>
                      <p class="text-base leading-none font-bold">
                        ৳{{ parseInt(order.price.total_price) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div v-if="order.order_status">
                <p>
                  <span class="font-semibold"
                    >Order ID #{{ order.table[0].id }}
                    <small>({{ order.order_status.status }})</small></span
                  >
                </p> -->

              <!-- </div>
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
              </div> -->
            </div>
          </div>
          <!-- <vs-button
            v-if="order.status"
            @click="changeStatus(order.status, order.table, j)"
            :disabled="order.status == 'Pending'"
          >
            {{ statusToAction(order.order_status.status) }}            
          </vs-button> -->
          <div class="flex">
            <vs-button
              class="ml-2 bg-ihostm"
              v-if="order.status && order.status == '1_ORDER_PLACED'"
              @click="varifyConfirm(order)"
              >Varify & Print for kitchen</vs-button
            >

            <vs-button
              class="ml-2 bg-pl"
              v-if="order.status && order.status == '2_ORDER_CONFIRMED'"
              @click="printKitechRecit(order)"
              >Mark as Served</vs-button
            >
            <vs-button
              class="ml-2 bg-gn"
              v-if="order.status && order.status == '3_IN_TABLE'"
              @click="printRecipt(order)"
              >Collect Payment & Print Invoice</vs-button
            >

            <vx-tooltip
              class="ml-2 my-auto"
              color="danger"
              text="Cancel"
              v-if="
                (order.status && order.status == '1_ORDER_PLACED') ||
                order.status == '2_ORDER_CONFIRMED'
              "
            >
              <vs-button
                color="danger"
                icon-pack="feather"
                icon="icon-x-circle"
                @click="cancelOrder(order.id)"
              ></vs-button>
            </vx-tooltip>
          </div>
          <vs-divider />
          <vx-timeline
            v-if="order.status"
            class="pt-2"
            :data="orderStatusData(order.status)"
          />
          <div v-else>
            <h3>No order made from this table</h3>
          </div>
        </vs-collapse-item>
      </vs-collapse>
      <!-- </vx-card> -->
    </div>

    <vs-popup
      class="holamundo"
      :title="`Order #${orderToVarify.id} | Table No: ${orderToVarify.table_no}`"
      :active.sync="varifyPopup"
    >
      <vs-table :data="orderToVarify.ordered_items">
        <template slot="thead">
          <vs-th class="text-center">Check</vs-th>
          <vs-th class="text-center">Item Id.</vs-th>
          <vs-th class="text-center">Name</vs-th>
          <vs-th class="text-center">Options</vs-th>
          <vs-th class="text-center">Extra</vs-th>
          <vs-th class="text-center">Price</vs-th>
        </template>

        <template slot-scope="{ data }">
          <vs-tr :key="i" v-for="(tr, i) in data">
            <vs-td :data="data[i].id">
              <vs-checkbox
                v-model="selectedItemForVarify"
                :vs-value="data[i].id"
              ></vs-checkbox>
            </vs-td>

            <vs-td :data="data[i].id">
              {{ data[i].id }}
            </vs-td>

            <vs-td class="text-center" :data="data[i].food_name">
              {{ data[i].food_name }}
            </vs-td>

            <vs-td class="text-center" :data="data[i].food_option">
              <span class="bg-gn p-1 rounded text-white">
                <i v-if="data[i].food_option.option_type.name != 'single_type'">
                  {{ data[i].food_option.option_type.name }}:</i
                >
                {{ data[i].food_option.name }}
              </span>
            </vs-td>

            <vs-td :data="data[i].food_extra">
              <span v-for="(extra, k) in data[i].food_extra" :key="k">
                {{ extra }}
              </span>
            </vs-td>

            <vs-td :data="data[i].food_option.price">
              ৳{{ data[i].food_option.price }}
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </vs-popup>
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
    time: "",
    resturent_id: localStorage.getItem("resturent_id"),
    resturent: JSON.parse(localStorage.getItem("resturent")),
    orderActiveNow: "",
    tableScanned: "",
    userConfirmed: "",
    kitchen: "",
    paymentDone: "",
    foodServed: "",
    cancelOrders: "",
    ordersData: [],

    varifyPopup: false,
    orderToVarify: [],
    selectedItemForVarify: [],
  }),

  methods: {
    getRestaurantOrderItemList() {
      axios
        .get(
          `/restaurant_management/restaurant/${this.resturent_id}/order_item_list/`
        )
        .then((res) => {
          console.log("roil ", res);

          let orderItemList = res.data.data;
          this.ordersData = res.data.data;

          // total order active status
          this.orderActiveNow = orderItemList.filter((el) => el.status).length;

          // total table scanned
          this.tableScanned = this.calculateLength(
            orderItemList,
            "0_ORDER_INITIALIZED"
          );

          // total user confirmed
          this.userConfirmed = this.calculateLength(
            orderItemList,
            "1_ORDER_PLACED"
          );

          // total kitchen
          this.kitchen = this.calculateLength(
            orderItemList,
            "2_ORDER_CONFIRMED"
          );

          // total food serve
          this.foodServed = this.calculateLength(orderItemList, "3_IN_TABLE");

          // total payment done
          this.paymentDone = this.calculateLength(orderItemList, "4_PAID");

          // total cancel orders
          this.cancelOrders = this.calculateLength(
            orderItemList,
            "5_CANCELLED"
          );
        })
        .catch((err) => {
          console.log("eroil ", err.response);
          this.showActionMessage("error", err);
          this.checkError(err);
        });
    },

    calculateLength(arr, status = "") {
      return arr.filter((el) => el.status === status).length;
    },

    orderPercent(status, type) {
      let perData = { per: 0, color: "" };
      switch (status) {
        case "0_ORDER_INITIALIZED":
          perData = { per: 20, color: "danger" };
          break;
        case "1_ORDER_PLACED":
          perData = { per: 40, color: "primary" };
          break;
        case "2_ORDER_CONFIRMED":
          perData = { per: 60, color: "secondary" };
          break;
        case "3_IN_TABLE":
          perData = { per: 85, color: "success" };
          break;
        case "4_PAID":
          perData = { per: 100, color: "blue" };
          break;
        case "5_CANCELLED":
          perData = { per: 100, color: "red" };
          break;
        default:
          return [];
          break;
      }
      if (type == "per") return perData.per;
      if (type == "color") return perData.color;
    },

    getTime() {
      setInterval(() => {
        this.time = moment().format("h:mm:ss A");
      }, 1000);
    },

    cancelOrder(order_id) {
      axios
        .post("/restaurant_management/order/cancel_order/", { order_id })
        .then((res) => {
          console.log("odres ", res);

          // test
          this.getRestaurantOrderItemList();

          // if (res.data.status) {
          //   this.ordersData = this.ordersData.map((order) =>
          //     order.id === order_id
          //       ? { ...order, status: res.data.data.status }
          //       : order
          //   );
          // }
        })
        .catch((err) => {
          console.log("errorOd ", err.response);
          this.showActionMessage("error", err.response.statusText);
          this.checkError(err);
        });
    },

    varifyConfirm(order) {
      this.varifyPopup = true;
      this.orderToVarify = order;
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
        case "0_ORDER_INITIALIZED":
          return pending;
          break;
        case "1_ORDER_PLACED":
          return recived;
          break;
        case "2_ORDER_CONFIRMED":
          return approve;
          break;
        case "3_IN_TABLE":
          return serve;
          break;
        case "4_PAID":
          return paid;
          break;
        default:
          return [];
          break;
      }
    },

    printKitechRecit(order) {
      const WinPrint = window.open(
        "",
        "",
        "left=0,top=0,width=600,height=600,toolbar=0,scrollbars=0,status=0"
      );

      let itemDetail = "";

      order.ordered_items.forEach((el) => {
        itemDetail += `<tr class="service">
                        <td class="tableitem">
                            <p class="itemtext">${el.food_name}</p> 
                            ${
                              el.food_option.option_type.name != "single_type"
                                ? el.food_option.name
                                : ""
                            }
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
                    <h2>Order # ${order.id}</h2>
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
      // WinPrint.close();
    },

    printRecipt(order) {
      console.log(order);
      const WinPrint = window.open(
        "",
        "",
        "left=0,top=0,width=600,height=600,toolbar=0,scrollbars=0,status=0"
      );

      // let itemDetail = "";
      // let resLogo = document.querySelector("#res_logo").src;

      // order.table[0].food.forEach((el) => {
      //   itemDetail += `<tr class="service">
      //                   <td class="tableitem itemname">
      //                       <p class="itemtext">${el.food.name}(<b>${el.quantity}</b>)</p>
      //                   </td>
      //                   <td class="tableitem">
      //                       <p class="itemtext" style="text-align:center">${el.food.price}/-</p>
      //                   </td>
      //                   <td class="tableitem price">
      //                       <p class="itemtext">${el.price}/-</p>
      //                   </td>
      //               </tr>`;
      // });

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
      // WinPrint.close();
    },
  },

  created() {
    this.getTime();
    this.getRestaurantOrderItemList();
  },
};
</script>

<style >
header.vs-collapse-item--header {
  padding: 0px !important;
}
.open-item {
  position: absolute;
  z-index: 999;
  width: 22.3%;
}
.mb-base {
  margin-bottom: 0.5rem !important;
}

.status-icon {
  width: 100% !important;
  height: 100%;
}
</style>

