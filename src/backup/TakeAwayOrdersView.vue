<template>
  <div id="data-list-thumb-view" class="data-list-container">
    <vs-table
      ref="table"
      v-model="selected"
      pagination
      :max-items="itemsPerPage"
      search
      :data="takeAwayOrders"
    >
      <div
        slot="header"
        class="flex flex-wrap-reverse items-center flex-grow justify-between"
      >
        <!-- <div class="flex flex-wrap-reverse items-center">
          <div
            class="p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary"
            @click="$router.push('/food/create')"
          >
            <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
            <span class="ml-2 text-base text-primary">Add New</span>
          </div>
        </div> -->

        <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4">
          <div
            class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
          >
            <span class="mr-2"
            >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} -
              {{
                takeAwayOrders.length - currentPage * itemsPerPage > 0
                  ? currentPage * itemsPerPage
                  : takeAwayOrders.length
              }}
             </span
             >
            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
          </div>

          <vs-dropdown-menu>
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
        <vs-th>Sl</vs-th>
        <vs-th class="text-center">Order No</vs-th>
        <vs-th>Ordered Items</vs-th>
        <vs-th>Price</vs-th>
        <vs-th>Status Details</vs-th>
        <vs-th>Takeaway Type</vs-th>

        <vs-th>Action</vs-th>
      </template>

      <template slot-scope="{ data }">
        <tbody>
        <vs-tr class="text-center" :data="tr" :key="indextr" v-for="(tr, indextr) in data">
          <vs-td>
            <p class="product-name font-medium truncate ">
              {{ itemsPerPage * (currentPage - 1) + indextr + 1 }}
            </p>
          </vs-td>
          <vs-td >
            <!-- <img :src="tr.order_no" class="product-img" /> -->
            <p class="">{{ tr.order_no }}</p>
          </vs-td>

          <vs-td>
            <!-- <p class="product-name font-medium truncate">{{ tr.ordered_items }}</p> -->
            <span v-for="(ordered_item, i) in tr.ordered_items" :key="i">
                <vs-chip> {{ ordered_item.food_name }}</vs-chip>
                <br />
              </span>
          </vs-td>

          <vs-td>
            <p class="product-name font-medium truncate ">
              {{ tr.price.payable_amount }}
            </p>
          </vs-td>

          <vs-td v-if="tr.status_details != 'Create Invoice'">
            <p class="text-success " >
              Processing
            </p>
          </vs-td>
          <vs-td v-else>
            <p class="product-name font-medium truncate ">{{tr.status_details}}</p>
          </vs-td>
          <vs-td v-if="tr.take_away_type_method.name !=null">
            <p class="product-name font-medium truncate ">{{tr.take_away_type_method.name}}</p>
          </vs-td>
          <vs-td v-else>
            <p class="product-name font-medium truncate ">-</p>

          </vs-td>

          <vs-td class="whitespace-no-wrap ">
            <feather-icon
              icon="EyeIcon"
              svgClasses="w-5 h-5 m-3 hover:text-primary stroke-current"
              title="View Order"
              @click="
                  orderDetailPopupActive = true;
                  selectedOrder = tr;
                "
            />
            <feather-icon
              icon="XCircleIcon"
              svgClasses="w-5 h-5 hover:text-danger stroke-current"
              class="ml-2"
              title="Cancel Order"
              @click="confirmAction(cancelOrder, [tr.id])"
            />
          </vs-td>
        </vs-tr>
        </tbody>
      </template>
    </vs-table>

    <!-- order detail info popup -->
    <vs-popup
      class="holamundo w-full"
      :title="`Order Details`"
      :active.sync="orderDetailPopupActive"
    >
      <template>
        <div class="con-expand-users w-full">
          <!-- <div class="con-btns-user flex items-center justify-between">
            <img
              class="rounded mx-auto"
              style="height: 180px"
              :src="selectedOrder.image"
            />
          </div> -->

          <table class="mx-auto mt-4 center">
            <tr>
              <td class="font-semibold">Order No :</td>
              <td>{{ selectedOrder.order_no }}</td>
            </tr>
            <!--            <tr>-->
            <!--              <td class="font-semibold">Take away type :</td>-->
            <!--              <td>{{ selectedOrder.take_away_type_method.name }}</td>-->
            <!--            </tr>-->

            <tr>
              <td class="font-semibold">Status Details :</td>
              <td v-if="selectedOrder.status_details != 'Create Invoice'">
                <p>Processing</p>
              </td>
              <td v-else>
                <p>{{ selectedOrder.status_details }}</p>
              </td>
            </tr>

            <!-- price details -->
            <tr>
              <td>
                <div
                  class="price-details table-card mt-5 w-full"
                  v-if="selectedOrder.price"
                >
              <td class="text-ihostm m-2">Price Details</td>
              <hr />
              <table class="m-2">

                <tr>
                  <td class="font-semibold">Total Price :</td>
                  <td>{{ selectedOrder.price.total_price }}</td>
                </tr>
                <tr>
                  <td class="font-semibold">Service Charge :</td>
                  <td>
                    <p>{{ selectedOrder.price.service_charge }}</p>
                  </td>
                </tr>
                <tr>
                  <td class="font-semibold">Vat Amount :</td>
                  <td>
                    <p>{{ selectedOrder.price.tax_amount }}</p>
                  </td>
                </tr>
                <tr>
                  <td class="font-semibold">Grand Total :</td>
                  <td>
                    <p>{{ selectedOrder.price.grand_total_price }}</p>
                  </td>
                </tr>

                <tr>
                  <td class="font-semibold">Discount Amount :</td>
                  <td>
                    <p>{{ selectedOrder.price.discount_amount }}</p>
                  </td>
                </tr>

                <tr>
                  <td class="font-semibold">Net Total :</td>
                  <td>
                    <p>{{ selectedOrder.price.payable_amount }}</p>
                  </td>
                </tr>


              </table>
        </div>
        </td>
        </tr>

        <!-- <tr>
          <td class="font-semibold">Options :</td>
          <td class="flex">
            <span v-for="(opt, i) in selectedOrder.food_options" :key="i">
              <vs-chip>
                <b>{{ opt.option_type.name }}: </b>
                {{ opt.name }}</vs-chip
              >
            </span>
          </td>
        </tr> -->

        <!-- <tr>
          <td class="font-semibold">Extra Type :</td>
          <td class="flex">
            <span v-for="(opt, i) in selectedOrder.food_extras" :key="i">
              <vs-chip> {{ opt.type_name }}</vs-chip>
            </span>
          </td>
        </tr> -->

        <!-- <tr>
          <td class="font-semibold">Top :</td>
          <td>{{ selectedOrder.is_top ? "Yes" : "No" }}</td>
        </tr> -->

        <!-- <tr>
          <td class="font-semibold">Recommended :</td>
          <td>
            <p>
              {{ selectedOrder.is_recommended ? "Yes" : "No" }}
            </p>
          </td>
        </tr> -->
        </table>
        <br />

        <div class="flex flex-wrap-reverse items-center">
          <!-- <vs-button
            v-if="confirmOrder"
            color="dark"
            class="text-1xl text-white w-64 bg-black mx-auto"
            type="flat"
            @click="inTable(selectedOrder)"
            :disabled="isBtnLoading ? true : false"
          >
            Confirm Order</vs-button
          > -->

          <!--            <vs-button-->
          <!--              v-if="isInvoiceCreated"-->
          <!--              color="dark"-->
          <!--              class="text-1xl text-white w-64 bg-black mx-auto"-->
          <!--              type="flat"-->
          <!--              @click="createInvoice(selectedOrder)"-->
          <!--              :disabled="isBtnLoading ? true : false"-->
          <!--            >-->
          <!--              Create Invoice</vs-button-->
          <!--            >-->
          <vs-button
            v-if="selectedOrder.status_details != 'Create Invoice'"
            color="dark"
            class="text-1xl text-white w-64 bg-black mx-auto"
            type="flat"
            @click="show_discount_form()"
            :disabled="isBtnLoading ? true : false"
          >
            Create Invoice</vs-button
          >


          <vs-button
            v-if="selectedOrder.status_details =='Create Invoice'"
            color="dark"
            class="text-1xl text-white w-64 bg-black mx-auto"
            type="flat"
            @click="confirmPaymentOrder(selectedOrder)"
            :disabled="isBtnLoading ? true : false"
          >
            Collect Cash</vs-button
          >
        </div>
  </div>
</template>
</vs-popup>

<vs-popup
  class="holamundo"
  title="Discount"
  :active.sync="popup_discount_form"
>
<vs-table>
  <vs-tr class="bg-white font-bold">
    <vs-td colspan="3" class="text-right">Discount Amount:</vs-td>
    <vs-td class="text-right pr-0">
      <vs-input
        icon-pack="feather"
        icon=""
        class="mt-5 w-full"
        v-model="discount_amount"
        type="number"
        min="0"
        v-validate="'required'"
      />
    </vs-td>
  </vs-tr>
  <vs-tr class="bg-white font-bold">
    <vs-td colspan="3" class="text-right">Discount Percentage:</vs-td>
    <vs-radio style="padding:10px;" v-model="discount_amount_is_percentage"  vs-value="true">Yes</vs-radio>
    <vs-radio style="padding:10px;"  v-model="discount_amount_is_percentage" vs-value="false">No</vs-radio>
  </vs-tr>

</vs-table>
<vs-button
  class="float-right"
  color="success"
  @click="createInvoice(selectedOrder)"
  :disabled="isBtnLoading ? true : false"
>Print
</vs-button
>
</vs-popup>

<!-- Please don't remove below  code -->
<img id="res_logo" :src="resturent.logo" alt="" style="display: none" />

<h2 class="m-2 text-center">Completed Orders</h2>
<vs-table class="p-0"
          ref="tableForAllTakeaway"
          v-model="selected"
          pagination
          :max-items="itemsPerPageForAllTakeaway"
          search
          :data="completeTakeawayOrders"
>
<div
  slot="header"
  class="flex flex-wrap-reverse items-center flex-grow justify-between"
>


  <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4">
    <div
      class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
    >
                      <span class="mr-2"
                      >{{ currentPageForAllTakeaway * itemsPerPageForAllTakeaway - (itemsPerPageForAllTakeaway - 1) }} -
                        {{
                          completeTakeawayOrders.length - currentPageForAllTakeaway * itemsPerPageForAllTakeaway > 0
                            ? 1 * itemsPerPageForAllTakeaway
                            : completeTakeawayOrders.length
                        }}
                    </span
                    >
      <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
    </div>

    <vs-dropdown-menu>
      <vs-dropdown-item @click="itemsPerPageForAllTakeaway = 5">
        <span>5</span>
      </vs-dropdown-item>
      <vs-dropdown-item @click="itemsPerPageForAllTakeaway = 10">
        <span>10</span>
      </vs-dropdown-item>

    </vs-dropdown-menu>
  </vs-dropdown>
</div>

<template slot="thead">
  <vs-th>Sl</vs-th>
  <vs-th>Order No</vs-th>
  <vs-th>Payable Amount</vs-th>
  <vs-th>Order Item</vs-th>
  <vs-th>Status Details</vs-th>
  <vs-th>Takeaway Type</vs-th>
</template>

<template slot-scope="{ data }">
  <tbody>
  <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
    <vs-td>
      <p class="product-name font-medium truncate text-center">
        {{ itemsPerPageForAllTakeaway * (currentPageForAllTakeaway - 1) + indextr + 1 }}
      </p>
    </vs-td>
    <vs-td>
      <!-- <img :src="tr.order_no" class="product-img" /> -->
      <p class="product-name font-medium truncate text-center">{{ tr.order_info.order_no }}</p>
    </vs-td>
    <vs-td>
      <p class="product-name font-medium truncate text-center">{{ tr.order_info.price.payable_amount }}</p>
    </vs-td>

    <vs-td>
                <span v-for="(ordered_item, i) in tr.order_info.ordered_items" :key="i">
                          <vs-chip> {{ ordered_item.food_name }}</vs-chip>
                          <br />
                        </span>
    </vs-td>

    <vs-td>
      <p class="product-name font-medium truncate text-center">{{tr.order_info.status_details}}</p>
    </vs-td>

    <vs-td v-if="tr.order_info.take_away_type_method.name !=null">
      <p class="product-name font-medium truncate text-center">{{tr.order_info.take_away_type_method.name}}</p>
    </vs-td>
    <vs-td v-else>
      <p class="product-name font-medium truncate text-center">-</p>
    </vs-td>
  </vs-tr>
  </tbody>
</template>
</vs-table>
</div>



</template>

<script>
import vSelect from "vue-select";
import axios from "@/axios.js";
import moment from "moment";

export default {
  components: {
    "v-select": vSelect,
  },
  data() {
    return {
      resturent_id: localStorage.getItem("resturent_id"),
      resturent: JSON.parse(localStorage.getItem("resturent")),
      runningTakeAwayOrder: JSON.parse(localStorage.getItem("orderData")) || {},
      selected: [],
      takeAwayOrders: [],
      completeTakeawayOrders: [],
      itemsPerPage: 10,
      itemsPerPageForAllTakeaway: 5,
      isMounted: false,
      active: false,
      popupActive: false,
      selectedOrder: { price: {} },
      orderDetailPopupActive: false,
      isBtnLoading: false,

      confirmOrder: false,
      isInvoiceCreated: true,
      collectCash: false,
      takeaway_type: '',
      popup_discount_form: false,
      discount_amount: 0,
      discount_amount_is_percentage: 'true',

    };
  },
  computed: {
    currentPage() {
      if (this.isMounted) {
        return this.$refs.table.currentx;
      }
      return 0;
    },
    currentPageForAllTakeaway() {
      if (this.isMounted) {
        return this.$refs.tableForAllTakeaway.currentx;
      }
      return 0;
    },

  },

  methods: {
    show_discount_form()
    {
      this.popup_discount_form = true;
      this.orderDetailPopupActive = false;

    },
    getTakeAwayOrderList() {
      console.log("this.resturent_id ", this.resturent_id);
      axios
        .get(
          `/restaurant_management/dashboard/take_away_order/${this.resturent_id}/`
        )
        .then((res) => (
          this.takeAwayOrders = res.data.data,
            console.log("take away orders",res.data.data)
        ))
        .catch((err) => {
          // this.showActionMessage("error", err.response.statusText);
          // this.checkError(err);
          // this.$router.push("/login").catch(() => {});
        });
    },

    getAllTakeawayOrders() {
      console.log("this.resturent_id ", this.resturent_id);
      axios
        .get(
          `/restaurant_management/dashboard/complete_take_away_order/${this.resturent_id}/`
        )
        .then((res) => (
          this.completeTakeawayOrders = res.data.data,
            console.log("complete takeaway orders",this.completeTakeawayOrders)
        ))
        .catch((err) => {
          // this.showActionMessage("error", err.response.statusText);
          // this.checkError(err);
          // this.$router.push("/login").catch(() => {});
        });
    },


    inTable(order) {
      this.isBtnLoading = true;
      const food_items = order.ordered_items.map((item) => item.id);
      console.log("fsdfsd ", {
        order_id: order.id,
        food_items,
      });
      axios
        .post("/restaurant_management/dashboard/order/status/in_table/", {
          order_id: order.id,
          food_items,
        })
        .then((res) => {

          // this.takeaway_type = res.data.data.;
          if (res.data.status) {
            this.isBtnLoading = false;
            this.confirmOrder = false;
            this.isInvoiceCreated = true;
          } else this.showErrorLog(res.data.error.error_details);
        })
        .catch((err) => {
          console.log("error in table ", err.response);
        });
    },

    confirmPaymentOrder(order) {
      this.isBtnLoading = true;
      axios
        .post("/restaurant_management/dashboard/order/confirm_payment/", {
          order_id: order.id,
        })
        .then((res) => {
          if (res.data.status) {

            const leftTakeAwayOrders = this.takeAwayOrders.filter(
              (takeAwayorder) => takeAwayorder.id !== order.id
            );

            // if the order is running then remove order from newOrder board
            if (order.id === this.runningTakeAwayOrder.id) {
              localStorage.removeItem("orderData");
            }

            this.takeAwayOrders = leftTakeAwayOrders;
            this.getAllTakeawayOrders();
            this.isInvoiceCreated = false;
            this.collectCash = true;
            this.isBtnLoading = false;
            this.orderDetailPopupActive = false;
          } else this.showErrorLog(res.data.error.error_details);
        })
        .catch((err) => {
          console.log("err co ", err.response);
        });
    },

    boolean_conversion(discount_amount_is_percentage) {

      return discount_amount_is_percentage == 'true';

    },

    createInvoice(order) {



      let OrderId = order.id;
      const body = {

        take_away_discount_amount: parseInt(this.discount_amount),
        take_away_discount_amount_is_percentage: this.boolean_conversion(this.discount_amount_is_percentage)
      };
      axios
        .post(
          `/restaurant_management/dashboard/take_away_discount/${OrderId}`,
          body
        ).then((res) => {
        console.log("response of takeaway discount",res);
        this.isBtnLoading = true;
        axios
          .post("/restaurant_management/dashboard/order/create_invoice/", {
            order_id: order.id,
          })
          .then((res) => {


            console.log("invoice ", res.data);
            if (res.data.status) {


              console.log(1);
              this.getTakeAwayOrderList();
              this.isInvoiceCreated = false;
              this.collectCash = true;
              this.isBtnLoading = false;
              this.printRecipt(res.data.data);

              console.log(res.data.data);
              console.log(2);
              // this.showActionMessage("success", "Order Canceled!");
            }
            // else this.showErrorLog(res.data.error.error_details);
          })
          .catch((err) => {
            console.log("error invoice ", err.response);
          });

      }).catch((err)=>{
        console.log("error takeaway discount ", err.response);

      });

    },

    cancelOrder(order_id) {
      axios
        .post("/restaurant_management/dashboard/order/cancel_order/", {
          order_id,
        })
        .then((res) => {
          if (res.data.status) {
            console.log("order_id ", res);
            const leftOrders = this.takeAwayOrders.filter(
              (order) => order.id !== order_id
            );

            this.takeAwayOrders = leftOrders;
            this.showActionMessage("success", "Order Canceled!");
          }
        })
        .catch((err) => {
          this.showActionMessage("error", err.response.statusText);
          this.checkError(err);
        });
    },

    showErrorLog(errorList) {
      for (const error in errorList) {
        this.$vs.notify({
          text: `${error} :  ${errorList[error][0]}`,
          color: "danger",
          position: "top-right",
        });
      }
    },

    printRecipt(order) {
      this.popup_discount_form = false;
      console.log("order ", order);
      const WinPrint = window.open(
        "",
        "",
        "left=0,top=0,width=600,height=600,toolbar=0,scrollbars=0,status=0"
      );

      let itemDetail = "";
      let resLogo = document.querySelector("#res_logo").src;

      console.log("resLogo ", resLogo);

      order.ordered_items.forEach((el) => {
        if (el.status != "4_CANCELLED") {
          itemDetail += `<tr class="service">
                        <td class="tableitem itemname">
                            <p class="itemtext">${el.food_name}(<b>${
            el.quantity
          }</b>)</p>
                        </td>
                        <td class="tableitem">
                            <p class="itemtext" style="text-align:center">${
            el.food_option.price
          }/-</p>
                        </td>
                        <td class="tableitem price">
                            <p class="itemtext">${
            el.food_option.price * el.quantity
          }/-</p>
                        </td>
                    </tr>`;
        }
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
                <h3>Invoice</h3>
            </div>
        </center>
        <div id="mid">
            <div class="info">
                <p>
                    VAT Reg: ${this.resturent.vat_registration_no}</br>
                    Phone : 012938210983</br>
                </p>
            </div>
        </div>
        <div id="bot">
            <center>
                <h2>Order # ${order.order_no}</h2>
             <h2>Take Away # ${order.take_away_type_method.name}</h2>


                <p>Time: ${moment().format("DD/MM/Y, h:mma")}</p>
            </center>
            <div id="table">
                <table>
                    <tr class="tabletitle">
                        <td class="item">
                            <h2>Item(QTY)</h2>
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
                            <h2>${order.price.total_price}/-</h2>
                        </td>
                    </tr>
                    <tr class="tabletitle">
                        <td class="Rate">
                            <h2>Service Charge</h2>
                        </td>
                        <td></td>
                        <td class="payment">
                            <h2>${order.price.service_charge}/-</h2>
                        </td>
                    </tr>
                    <tr class="tabletitle">
                        <td class="Rate">
                            <h2>VAT (${order.price.tax_percentage}%)</h2>
                        </td>
                        <td></td>
                        <td class="payment">
                            <h2>${order.price.tax_amount}/-</h2>
                        </td>
                    </tr>
                    <tr class="tabletitle">
                        <td class="Rate">
                            <h2>Grand Total:</h2>
                        </td>
                        <td></td>
                        <td class="payment">
                            <h2>${order.price.grand_total_price}/-
                            </h2>
                        </td>
                    </tr>
                    <tr class="tabletitle">
                        <td class="Rate">
                            <h2>Discount Amount</h2>
                        </td>
                        <td></td>
                        <td class="payment">
                            <h2>(-) ${order.price.discount_amount}/-</h2>
                        </td>
                    </tr>
                    <tr class="tabletitle final">
                        <td class="Rate">
                            <h2>Net Total:</h2>
                        </td>
                        <td></td>
                        <td class="payment">
                            <h2>${order.price.payable_amount}/-
                            </h2>
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
      // WinPrint.close();
    },
  },
  created() {
    this.getTakeAwayOrderList();
    this.getAllTakeawayOrders();
  },
  mounted() {
    this.isMounted = true;
  },
};
</script>
<style scoped>
td {
  border-top: 10px solid #f8f8f8;
  text-align: center !important;
}
th {
  text-align: center !important;
  background-color: #31314e;
  color: #fff !important;
}
th .vs-table-text {
  justify-content: center !important;
}
</style>
<style lang="scss" scoped>


#data-list-thumb-view {
  .vs-con-table {
    .product-name {
      max-width: 23rem;
    }

    .vs-table--header {
      display: flex;
      flex-wrap: wrap-reverse;
      margin-left: 1.5rem;
      margin-right: 1.5rem;
      > span {
        display: flex;
        flex-grow: 1;
      }

      .vs-table--search {
        padding-top: 0;

        .vs-table--search-input {
          padding: 0.9rem 2.5rem;
          font-size: 1rem;

          & + i {
            left: 1rem;
          }

          &:focus + i {
            left: 1rem;
          }
        }
      }
    }

    .vs-table {
      border-collapse: separate;
      border-spacing: 0 1.3rem;
      padding: 0 1rem;

      tr {
        box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);
        td {
          padding: 10px;
          &:first-child {
            border-top-left-radius: 0.5rem;
            border-bottom-left-radius: 0.5rem;
          }
          &:last-child {
            border-top-right-radius: 0.5rem;
            border-bottom-right-radius: 0.5rem;
          }
          &.img-container {
            // width: 1rem;
            // background: #fff;

            span {
              display: flex;
              justify-content: flex-start;
            }

            .product-img {
              height: 110px;
            }
          }
        }
        td.td-check {
          padding: 20px !important;
        }
      }
    }

    .vs-table--thead {
      th {
        padding-top: 0;
        padding-bottom: 0;

        .vs-table-text {
          text-transform: uppercase;
          font-weight: 600;
        }
      }
      th.td-check {
        padding: 0 15px !important;
      }
      tr {
        background: none;
        box-shadow: none;
      }
    }

    .vs-table--pagination {
      justify-content: center;
    }
  }
}

.vs-sidebar {
  z-index: 100000;
}

.sidebar-custom > .header-sidebar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  h4 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    > button {
      margin-left: 10px;
    }
  }
}

.footer-sidebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  > button {
    border: 0px solid rgba(0, 0, 0, 0) !important;
    border-left: 1px solid rgba(0, 0, 0, 0.07) !important;
    border-radius: 0px !important;
  }
}

.sidebar-custom > .vs-sidebar-primary {
  max-width: 400px !important;
}

th:first-child .vs-table-text {
  justify-content: center !important;
  cursor: pointer;
}
.vs-table--thead {
  background-color: #32304e;
  color: #fff;
}

.vs-con-table .vs-con-tbody .vs-table--tbody-table .vs-table--thead th {
  padding: 10px 15px !important;
}
</style>



