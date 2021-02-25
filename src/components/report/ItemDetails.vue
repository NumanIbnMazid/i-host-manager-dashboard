<template>
  <div>
    <!-- button -->
    <vs-button title="Show Details" @click="showDetailsPopup = true"
      >Show Details</vs-button
    >

    <!-- popup -->
    <vs-popup
      class="holamundo"
      :title="`Order #${showOrder.id}`"
      :active.sync="showDetailsPopup"
    >
      <!-- food select form -->
      <div class="food-select-form">
        <vs-button
          v-if="showUpdateBtn"
          class="m-2 float-right"
          color="success"
          type="border"
          title="Update Order"
          icon-pack="feather"
          :disabled="isBtnLoading ? true : false"
          @click="orderRevertInTable(showOrder.id)"
          icon="icon-edit"
          >Make Update</vs-button
        >

        <div class="vx-row text-sm" v-if="enableFoodForm">
          <div class="vx-col w-3/12 pl-4 pr-0 mb-4" @click="getFoodNames()">
            <small>Food Name</small>
            <v-select
              label="name"
              v-model="selectedFood"
              :options="foods"
              :reduce="(foods) => foods.id"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
            />
          </div>

          <div
            class="vx-col w-3/12 mb-4 ml-0 pl-1 mr-0 pr-1"
            @click="getFoodOptions()"
          >
            <small>Food Option</small>
            <v-select
              label="name"
              v-model="selectedOption"
              :options="foodOptions"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              ><template v-if="!selectedFood" #no-options="{}">
                <span class="text-danger"> Please select food first. </span>
              </template></v-select
            >
          </div>

          <div class="vx-col w-2/12 pl-0 ml-0 mb-4 mr-0 pr-1">
            <small>Food Extra</small>
            <v-select
              label="type_name"
              multiple
              v-model="selectedFoodExtraTypes"
              :options="foodExtraTypes"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
            />
          </div>

          <div class="vx-col w-2/12 pl-0 ml-0 mb-4 mr-0 pr-1">
            <vs-input
              class="w-10/12"
              color="rgb(213, 14, 151)"
              type="number"
              min="1"
              label-placeholder="Quantity"
              v-model="quantity"
            />
          </div>

          <div class="vx-col w-2/12 pl-0 mt-5 flex">
            <vs-button
              color="success"
              class="mr-1"
              type="border"
              title="Add"
              icon-pack="feather"
              @click="addOrderedItems(showOrder, '3_IN_TABLE')"
              icon="icon-plus"
            ></vs-button>

            <vs-button
              color="danger"
              type="border"
              title="Cancel"
              icon-pack="feather"
              @click="
                showUpdateBtn = !showUpdateBtn;
                enableFoodForm = !enableFoodForm;
              "
              icon="icon-x"
            ></vs-button>
          </div>
        </div>
      </div>

      <vs-table :data="showOrder.ordered_items">
        <template slot="thead">
          <vs-th class="text-center">Item Id</vs-th>
          <vs-th class="text-center">Name</vs-th>
          <vs-th class="text-center">Qty</vs-th>
          <vs-th class="text-center">Options</vs-th>
          <vs-th class="text-center">Price</vs-th>
          <vs-th class="text-center" v-if="!showUpdateBtn">Action</vs-th>
        </template>

        <template slot-scope="{ data }">
          <vs-tr class="text-center" :key="i" v-for="(tr, i) in data">
            <vs-td :data="tr.id">
              {{ tr.id }}
            </vs-td>

            <vs-td class="text-center" :data="tr.food_name">
              {{ tr.food_name }}
            </vs-td>

            <!-- quantity update -->
            <vs-td class="text-center" :data="tr.quantity">
              <input
                :disabled="showUpdateBtn ? true : false"
                type="number"
                min="1"
                :value="tr.quantity"
                @change="updateFoodQuantity(tr, showOrder.ordered_items)"
                class="mt-5 w-12 text-center"
                name="item-name"
              />
            </vs-td>

            <vs-td class="text-center" :data="tr.food_option">
              <span class="bg-gn p-1 rounded text-white">
                <i v-if="tr.food_option.option_type.name != 'single_type'">
                  {{ tr.food_option.option_type.name }}:</i
                >
                {{ tr.food_option.name }}
              </span>
            </vs-td>
            <vs-td :data="tr.food_option.price">
              ৳{{ tr.food_option.price }}
            </vs-td>

            <vs-td v-if="!showUpdateBtn">
              <span
                v-if="tr.status != '4_CANCELLED'"
                class="badge rounded bg-rd text-white"
                style="cursor: pointer"
                @click="cancelOrderItem(showOrder.id, tr.id)"
                >Cancel {{ tr.status }}</span
              >
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
      <vs-button class="m-2" color="secondary" @click="printRecipt(showOrder)"
        >Print Invoice</vs-button
      >
    </vs-popup>

    <!-- please don't remove below code. This for print recipt -->
    <img id="res_logo" :src="resturent.logo" alt="" style="display: none" />
  </div>
</template>

<script>
import axios from "@/axios.js";
import vSelect from "vue-select";
import moment from "moment";

export default {
  props: ["showOrder", "cancelOrderItem"],

  components: {
    "v-select": vSelect,
  },

  data() {
    return {
      resturent_id: localStorage.getItem("resturent_id"),
      resturent: JSON.parse(localStorage.getItem("resturent")),
      selectedFood: "",
      foods: [],
      foodOptions: [],
      selectedOption: null,
      selectedFoodExtraTypes: [],
      foodExtraTypes: [],
      quantity: 1,
      itemQuantity: 1,
      isBtnLoading: false,
      showUpdateBtn: true,
      enableFoodForm: false,
      showDetailsPopup: false,
    };
  },

  methods: {
    // order revert
    orderRevertInTable(order_id) {
      this.isBtnLoading = true;
      axios
        .post(
          "/restaurant_management/dashboard/order/revert_back_to_in_table/",
          { order_id }
        )
        .then((res) => {
          console.log("rr ", res);
          if (res.data.status) {
            this.isBtnLoading = false;
            this.enableFoodForm = !this.enableFoodForm;
            this.showUpdateBtn = !this.showUpdateBtn;
          } else this.showErrorLog(res.data.error.error_details);
        })
        .catch((err) => console.log("rr err ", err.response));
    },

    // cancel an item from an order
    // TODO: Cancel ordered item showing
    cancelOrderItem(order_id, item_id) {
      axios
        .post("/restaurant_management/dashboard/order/cart/cancel_items/", {
          order_id,
          food_items: [item_id],
        })
        .then((res) => {
          if (res.data.status) {
            this.showOrder = res.data.data;
            const updatedOrders = this.orders.map((order) =>
              order.id === order_id ? { ...res.data.data } : order
            );
            console.log("object ", res.data.data);

            this.orders = updatedOrders;
          } else this.showErrorLog(res.data.error.error_details);
        })
        .catch((err) => {
          this.showActionMessage("error", err);
          this.checkError(err);
        });
    },

    // food quantity update functionality
    updateFoodQuantity(food, objectToUpdate) {
      console.log("food ", food);
      axios
        .patch(
          `/restaurant_management/dashboard/order/cart/items/${food.id}/`,
          {
            quantity: ++food.quantity,
            food_option: food.food_option.id,
            food_order: food.food_order,
            food_extra: food.food_extra.map((fe) => fe.id),
          }
        )
        .then((res) => {
          if (res.data.status) {
            this.showOrder = res.data.data;
            console.log("q update ", res, this.showOrder);
          } else this.showErrorLog(res.data.error.error_details);
        })
        .catch((err) => {
          this.showActionMessage("error", err.response.statusText);

          // checking error code
          this.checkError(err);
        });
    },

    // adding food order to order cart
    addOrderedItems(orderToProcess, status) {
      console.log("showOrder ", this.showOrder);
      axios
        .post("/restaurant_management/dashboard/order/cart/items/", [
          {
            quantity: this.quantity,
            status,
            food_option: this.selectedOption.id,
            food_order: orderToProcess.id,
            food_extra: this.selectedFoodExtraTypes,
          },
        ])
        .then((res) => {
          // real time ui update (data object update)
          console.log("new item added", res.data);

          if (res.data.status) {
            //   this.ordersData.map(
            //     (order) =>
            //       order.id === orderToProcess.id &&
            //       order.ordered_items.push(res.data.data[0])
            //   );
            orderToProcess.ordered_items.push(res.data.data[0]);
            //   // clear food state after add item to cart
            //   this.selectedFood = "";
          } else this.showErrorLog(res.data.error.error_details);
        })
        .catch((err) => {
          this.showActionMessage("error", err.response.statusText);

          // checking error code
          this.checkError(err);
        });
    },

    // getting food names
    getFoodNames() {
      axios
        .get(
          `/restaurant_management/dashboard/restaurant/${this.resturent_id}/foods/`
        )
        .then((res) => {
          console.log("foods ", res);
          if (res.data.status) this.foods = res.data.data;
          else this.showActionMessage("error", "Failed to get foods name!");
        })
        .catch((err) => {
          this.showActionMessage("error", err.response.statusText);

          // checking error code
          this.checkError(err);
        });
    },

    getFoodOptions() {
      if (this.selectedFood !== "") {
        const food = this.foods.filter(
          (food) => food.id === this.selectedFood
        )[0];

        this.foodOptions = food.food_options;
        this.foodExtraTypes = food.food_extras;
      }
    },

    createInvoice(order_id) {
      axios
        .post("/restaurant_management/apps/customer/order/create_invoice/", {
          order_id,
        })
        .then((res) => {
          console.log("invoice ", res);
          if (res.data.status) {
            console.log("invoice 1 ", res);
          }
        })
        .catch((err) => {
          this.showActionMessage("error", err.response.statusText);
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
      // console.log(order);
      const WinPrint = window.open(
        "",
        "",
        "left=0,top=0,width=600,height=600,toolbar=0,scrollbars=0,status=0"
      );

      let itemDetail = "";
      let resLogo = document.querySelector("#res_logo").src;

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
                <h2>Invoice</h2>
            </div>
        </center>
        <div id="mid">
            <div class="info">
                <p>
                    VAT Reg: ${this.resturent.vat_registration_no}</br>
                    Phone : ${this.resturent.phone}</br>
                </p>
            </div>
        </div>
        <div id="bot">
            <center>
                <h2>Order # ${order.order_no}</h2>
                <h2>Table No: ${order.table_no}</h2>
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
                            <h2>Net Total:</h2>
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
    console.log("showOrder ", this.showOrder);
    this.getFoodNames();
    this.showDetailsPopup = false;
  },
};
</script>

<style scoped>
  td {
    border-top: 10px solid #f8f8f8;
    text-align: center;
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