<template>
  <div id="data-list-thumb-view-alt" class="data-list-container">
    <vs-row>
      <div class="vx-col w-3/4">
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

        <!-- list and grid btn -->
        <vs-row>
          <div class="grid-btns grid grid-cols-12 gap-4 w-full">
            <!-- list btn -->
            <vs-button
              class="col-end-12 m-2 mr-0"
              :color="!isGrid ? 'secondary' : 'primary'"
              type="filled"
              icon-pack="feather"
              icon="icon-list"
              @click="isGrid = false"
              >List</vs-button
            >

            <!-- grid btn -->
            <vs-button
              class="col-end-13 m-2 ml-0"
              :color="isGrid ? 'secondary' : 'primary'"
              type="filled"
              icon-pack="feather"
              icon="icon-grid"
              @click="isGrid = true"
              >Grid</vs-button
            >
          </div>
        </vs-row>

        <vs-row>
          <div class="w-2/12">
            <p class="text-center">Menu Categories</p>
            <vs-divider class="my-2" />
            <vs-button
              class="w-full my-1"
              :color="!slectedCategory ? 'secondary' : 'primary'"
              type="filled"
              @click="allItem()"
              >All</vs-button
            >
            <hooper
              :vertical="true"
              style="height: 80vh"
              :itemsToShow="17"
              :itemsToSlide="4"
              :initialSlide="7"
            >
              <slide v-for="(category, i) in categories" :key="i">
                <vs-button
                  class="w-full my-1 "
                  :color="
                    slectedCategory == category.id ? 'secondary' : 'primary'
                  "
                  type="filled"
                  @click="findFooitemByCat(category.id)"
                  >{{ category.name }}</vs-button
                >
              </slide>
              <hooper-navigation
                v-if="categories.length > 16"
                slot="hooper-addons"
              ></hooper-navigation>
            </hooper>
          </div>


          <div class="w-10/12">
            <div class="">

              <vs-input
                class="w-9/12 mb-2 mr-5 "
                placeholder="Search by food name......"
                v-model="search"
                @keyup="findFooitem()"
              >
              </vs-input>

              <vs-input
                class="w-9/12 mb-2 mr-5 "
                placeholder="Search by food code......"
                v-model="searchByCode"
                @keyup="findFoodByCode()"
              >
              </vs-input>
              <!-- food grid view -->
              <div id="demo-basic-card" class="mt-4" v-if="isGrid">
                <div class="vx-row">
                  <div
                    class="vx-col w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-base"
                    v-for="(food, indextr) in foods"
                    :key="indextr"
                  >
                    <vx-card>
                      <div slot="no-body">
                        <img
                          style="height: 176px; width: 100%"
                          :src="food.image"
                          alt="content-img"
                          class="responsive card-img-top"
                        />
                      </div>
                      <vx-tooltip :text="food.name">
                        <h5 class="mb-2 text-center">
                          {{
                            food.name.length > 11
                              ? food.name.substr(0, 10) + "..."
                              : food.name
                          }}
                        </h5>
                      </vx-tooltip>
                      <div class="d-block">
                        <p class="text-dark text-center mb-2" v-if="food.discounted_price == null">
                          ৳  {{ food.price }}
                        </p>

                        <p class="text-grey text-center mb-2" v-else>
                          <span class="text-grey-dark  mb-2 mr-5 line-through">
                          ৳  {{ food.price }}
                        </span>
                          <span class="text-dark mb-2 ml-5" >
                          ৳ {{ food.discounted_price }}
                        </span>
                        </p>

                      </div>

                      <!-- <p class="text-grey">{{ "card_1.subtitle_2" }}</p> -->

                      <!-- <vs-button
                          class="mt-4 mr-2 shadow-lg"
                          type="gradient"
                          color="#7367F0"
                          gradient-color-secondary="#CE9FFC"
                          >Download</vs-button
                        > -->

                      <!-- <vs-button
                          color="primary"
                          type="border"
                          icon-pack="feather"
                          icon="icon-plus"
                          class="w-full"
                          @click="itemAddToCart(food)"
                          >Add</vs-button
                        > -->
                      <div class="flex" v-if="!checkIfCart(food)">
                        <vs-button
                          color="primary"
                          type="border"
                          icon-pack="feather"
                          icon="icon-plus"
                          class="w-full"
                          @click="addToItemCardGo(food)"
                          >Add</vs-button
                        >
                      </div>

                      <div v-else class="flex">
                        <vs-button
                          color="primary"
                          type="border"
                          icon-pack="feather"
                          icon="icon-minus"
                          @click="decraseItem(food)"
                        ></vs-button>

                        <vs-input
                          class="px-1 text-center item-qty"
                          :value="checkIfCart(food).quantity"
                          :ref="`quantityItem-${food}`"
                          @keyup="itemQtyAdd(food)"
                        ></vs-input>
                        <vs-button
                          color="primary"
                          type="border"
                          icon-pack="feather"
                          icon="icon-plus"
                          @click="increaseItem(food)"
                        ></vs-button>
                      </div>
                    </vx-card>
                  </div>
                </div>
              </div>

              <!-- foods table view -->
              <vs-table class="p-0" ref="table" :data="foods" v-if="!isGrid">
                <template slot="thead">
                  <vs-th class="text-center">Image</vs-th>
                  <vs-th>Name</vs-th>
                  <vs-th>Price</vs-th>
                  <vs-th>Action</vs-th>
                </template>

                <template slot-scope="{ data }">
                  <tbody>
                    <vs-tr
                      :data="tr"
                      :key="indextr"
                      v-for="(tr, indextr) in data"
                    >
                      <vs-td style="width: 10%">
                        <img :src="tr.image" class="product-img" />
                      </vs-td>
                      <vs-td>
                        <p>{{ tr.name }}</p>
                      </vs-td>

                      <vs-td>
                        <p class="product-name font-medium truncate">
                          {{ tr.price }}
                        </p>
                      </vs-td>

                      <vs-td>
                        <div class="flex" v-if="!checkIfCart(tr)">
                          <vs-button
                            color="primary"
                            type="border"
                            icon-pack="feather"
                            icon="icon-plus"
                            class="w-full"
                            @click="itemAddToCart(tr)"
                            >Add</vs-button
                          >
                        </div>

                        <div v-else class="flex">
                          <vs-button
                            color="primary"
                            type="border"
                            icon-pack="feather"
                            icon="icon-minus"
                            @click="decraseItem(tr)"
                          ></vs-button>

                          <vs-input
                            class="px-1 text-center item-qty"
                            :value="checkIfCart(tr).quantity"
                            :ref="`quantityItem-${tr}`"
                            @keyup="itemQtyAdd(tr)"
                          ></vs-input>
                          <vs-button
                            color="primary"
                            type="border"
                            icon-pack="feather"
                            icon="icon-plus"
                            @click="increaseItem(tr)"
                          ></vs-button>
                        </div>
                      </vs-td>
                    </vs-tr>
                  </tbody>
                </template>
              </vs-table>
            </div>
          </div>
        </vs-row>
      </div>

      <!-- side bar -->
      <div
        class="vx-col w-1/4 pl-3"
        style="
          position: fixed;
          right: 0px;
          top: 0;
          height: 100%;
          width: 22% !important;
        "
      >
        <div class="w-100 shadow-lg rounded" style="height: 100%">
          <!-- profile information & notification -->
          <div class="profile mb-4">
            <UserProfile />
          </div>

          <div class="flex text-center">
            <!-- take out -->
            <div class="w-1/2">
              <vs-button
                color="white"
                class="text-dark shadow"
                type="filled"
                @click="
                  popupActive = !popupActive;
                  isTakeOut = !isTakeOut;
                  isDinein = false;
                  slectedTable = null;
                  cancelOrder();
                "
                v-bind:class="[
                  isTakeOut ? 'text-white bg-warning' : 'text-dark',
                ]"
                >Take Out</vs-button
              >
            </div>



            <!-- dine in 🍴🍽 -->
            <div class="w-1/2">
              <vs-button
                v-bind:class="[
                  isDinein ? 'text-white bg-warning' : 'text-dark',
                ]"
                color="white"
                class="w-100 shadow"
                @click="
                  isDinein = !isDinein;
                  isTakeOut = false;
                  isTakeAwayOrderList = false;
                  getTables();
                  cancelOrder();
                  isInvoice = false;
                "
                >Dine In</vs-button
              >
            </div>
          </div>
          <div class="w-full mt-2 p-0" v-if="slectedTable">
            <h4 class="text-center p-0 m-0">
              Table No: {{ selectedTableNum }}
            </h4>
          </div>
          <!-- take out information table -->
          <div
            class="table-info mt-1 pt-1 order-item-list-table"
            v-if="isTakeOut || (isDinein && slectedTable) || takeaway_order_type_id !=null"
          >
            <div class="table-card">
              <vs-table class="take-out-table-header">
                <template slot="thead">
                  <vs-th class="text-xs">Item</vs-th>
                  <vs-th class="text-xs">Qty</vs-th>
                  <vs-th class="text-xs">Amount</vs-th>
                  <vs-th class="text-xs">Action</vs-th>
                </template>

                <template>
                  <vs-tr
                    class="text-xs"
                    v-for="item in orderData.ordered_items"
                    :key="item.id"
                  >
                    <!-- <vs-tr class="text-xs"> -->
                    <vs-td> {{ item.food_name }} </vs-td>

                    <vs-td> {{ item.quantity }} </vs-td>

                    <vs-td> {{ item.food_option.discounted_price }} </vs-td>

                    <vs-td>
                      <vx-tooltip class="mx-auto" color="danger" text="Cancel">
                        <vs-button
                          class="ml-4 w-8 h-8"
                          color="danger"
                          icon-pack="feather"
                          icon="icon-x-circle"
                          @click="cancelOrderItem(item.id)"
                        ></vs-button> </vx-tooltip
                    ></vs-td>
                  </vs-tr>
                </template>
              </vs-table>
            </div>
            <div
              class="w-full m-0 p-0"
              v-if="slectedTable"
              @click="slectedTable = null"
            >
              <h4 class="text-center p-0 m-0">Change Table</h4>
            </div>
          </div>

          <!-- table card -->
          <div class="table-info mt-4 pt-4" v-if="isDinein && !slectedTable">
            <div class="table-card">
              <div class="table-list m-2 grid grid-cols-3 gap-4">
                <div
                  class="restaurant-tables mr-2 text-white center"
                  v-for="(table, index) in tables"
                  :key="index"
                >
                  <div
                    :style="`${
                      table.is_occupied
                        ? 'cursor: not-allowed'
                        : 'cursor: pointer'
                    }`"
                    class="table-no mx-auto"
                    :class="
                      !table.is_occupied
                        ? table.id == slectedTable
                          ? 'bg-primary'
                          : 'bg-success'
                        : 'bg-grey'
                    "
                    @click="
                      table.is_occupied
                        ? null
                        : ((slectedTable = table.id),
                          (selectedTableNum = table.table_no),
                          (dinein_selected_table_id = table.id))
                    "
                  >
                    <div class="table-svg">
                      <p class="table-number text-center text-2xl mt-0 pt-0">
                        {{ table.table_no }}
                      </p>

                      <svg
                        class="ml-4"
                        width="26"
                        height="19"
                        viewBox="0 0 24 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M23.1431 16.2857V5.14285H0.857422V16.2857H2.57171V6.42857C2.57171 6.19189 2.7636 6 3.00028 6H21.0003C21.237 6 21.4288 6.19189 21.4288 6.42857V16.2857H23.1431Z"
                          fill="#fff"
                        />
                        <path
                          d="M1.51507 0L0.37207 1.71429H23.6279L22.4849 0H1.51507Z"
                          fill="#fff"
                        />
                        <path
                          d="M0 2.57143H24V4.28571H0V2.57143Z"
                          fill="#fff"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <!-- select button -->
              <div class="mx-auto text-center mt-4 mb-4">
                <vs-button class="w-3/4 text-2xl" color="dark" type="filled"
                  >Select</vs-button
                >
              </div>
            </div>
          </div>

          <!-- price details -->
          <div
            class="price-details table-card mt-5 w-full"
            v-if="orderData.price"
          >
            <h6 class="text-ihostm m-2">Price Details</h6>
            <hr />
            <table class="m-2">
              <tr>
                <td class="font-semibold">Total Price :</td>
                <td>
                  <p>{{ orderData.price.total_price }}</p>
                </td>
              </tr>

              <tr>
                <td class="font-semibold">Service Charge :</td>
                <td>
                  <p>{{ orderData.price.service_charge }}</p>
                </td>
              </tr>

              <tr>
                <td class="font-semibold">Vat Charge :</td>
                <td>
                  <p>{{ orderData.price.tax_amount }}</p>
                </td>
              </tr>

              <tr>
                <td class="font-semibold">Grand Total :</td>
                <td>
                  <p>{{ orderData.price.grand_total_price }}</p>
                </td>
              </tr>

              <tr>
                <td class="font-semibold">Discount Amount :</td>
                <td>
                  <p>
                    {{ orderData.price.discount_amount }}
<!--                    {{-->
<!--                      orderData.price.service_charge_is_percentage ? "%" : "৳"-->
<!--                    }}-->
                  </p>
                </td>
              </tr>

              <tr>
                <td class="font-semibold">Payable Amount :</td>
                <td>
                  <p>{{ orderData.price.payable_amount }}</p>
                </td>
              </tr>
<!--              <tr>-->
<!--                <td class="font-semibold">Take away type :</td>-->
<!--                <td>-->
<!--                  <p>{{ orderData.price.payable_amount }}</p>-->
<!--                </td>-->
<!--              </tr>-->

            </table>
          </div>

          <!-- place order btn -->
          <div class="place-order w-2/3 mx-auto m-2 text-center bg-white">
            <vs-button
              v-if="isConfirmPayment"
              color="primary"
              class="bg-warning m-2 text-white w-full text-2xl"
              type="flat"
              @click="confirmPaymentOrder()"
              :disabled="isBtnLoading ? true : false"
              ><dollar-sign-icon
                size="0.8x"
                class="custom-class"
              ></dollar-sign-icon>
              Collect Cash</vs-button
            >
            <div
              v-if="!isConfirmPayment"
              class="bg-warning m-2"
              style="border-radius: 15px"
            >
              <vs-button
                v-if="!isInvoice"
                color="primary"
                class="text-2xl text-white w-full"
                type="flat"
                :disabled="isBtnLoading ? true : false"
                @click="placeOrder()"
              >
                <check-square-icon
                  size="0.8x"
                  class="custom-class"
                ></check-square-icon>
                Place Order</vs-button
              >

<!--              <vs-button-->
<!--                v-else-->
<!--                color="primary"-->
<!--                class="text-2xl text-white w-full"-->
<!--                type="flat"-->
<!--                @click="createInvoice(orderData.id)"-->
<!--                :disabled="isBtnLoading ? true : false"-->
<!--                ><file-text-icon-->
<!--                  size="0.8x"-->
<!--                  class="custom-class"-->
<!--                ></file-text-icon>-->
<!--                Create Invoice</vs-button-->
<!--              >-->
              <vs-button
                v-else
                color="primary"
                class="text-2xl text-white w-full"
                type="flat"
                @click="show_force_discount_form()"

              ><file-text-icon
                size="0.8x"
                class="custom-class"
              ></file-text-icon>
                Create Invoice</vs-button
              >
            </div>
          </div>
        </div>
      </div>
    </vs-row>

    <!-- item add to card details -->
    <!-- popup -->
    <vs-popup
      class="holamundo"
      :title="`Order #${selectedItem.id}`"
      :active.sync="isActiveitemDetailPopup"
    >
      <h4>Food Options</h4>

      <vs-table :data="selectedItem.food_options">
        <template slot="thead">
          <!-- <vs-th class="text-center text-dark bg-aqua">Item Id</vs-th> -->
          <vs-th class="text-center text-dark bg-aqua">Name</vs-th>
          <vs-th class="text-center text-dark bg-aqua">Option Type</vs-th>
          <vs-th class="text-center text-dark bg-aqua">Price</vs-th>
          <vs-th class="text-center text-dark bg-aqua">Action</vs-th>
        </template>

        <template slot-scope="{ data }">
          <vs-tr class="text-center" :key="i" v-for="(tr, i) in data">
            <!-- <vs-td :data="tr.id">
              {{ tr.id }}
            </vs-td> -->

            <vs-td class="text-center" :data="tr.name">
              {{ tr.name }}
            </vs-td>

            <vs-td class="text-center" :data="tr.option_type">
              {{ tr.option_type.name }}
            </vs-td>

            <vs-td :data="tr.price"> ৳ {{ tr.price }} </vs-td>

            <vs-td>
              <vs-button
                class="mx-auto"
                color="success"
                type="flat"
                icon-pack="feather"
                icon="icon-check"
                @click="addToCardItem.food_option = tr.id"
              ></vs-button>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
      <br />

      <div class="food_extras mt-2 mb-2" v-if="selectedItem.extras.length">
        <h4 class="m-2">Food Extras</h4>

        <ul class="centerx">
          <li :key="i" v-for="(tr, i) in selectedItem.extras">
            <vs-checkbox v-model="addToCardItem.food_extras" :vs-value="tr.id"
              >{{ tr.name }} (৳ {{ tr.price }})</vs-checkbox
            >
          </li>
        </ul>
      </div>

      <div class="">
        <vs-button
          color="primary"
          class="bg-warning m-2 text-white w-full text-2xl"
          type="flat"
          @click="addItemToCardConfirm()"
        >
          Submit</vs-button
        >
      </div>
    </vs-popup>

    <vs-popup
      class="holamundo w-full"
      title="Take Away Type"
      :active.sync="popupActive"
    >
      <!-- food select form -->
      <div class="food-select-form">
        <div class="vx-row text-sm">
          <div class="vx-col w-full pl-4 pr-0 mb-4">
            <small>Take away type</small>
            <v-select
              label="name"
              v-model="takeaway_order_type_id"
              :options="takeaway_type"
              :reduce="(takeaway_type) => takeaway_type.id"
            />
          </div>
        </div>
      </div>

      <!-- action buttons -->
      <br><br><br><br>
      <div class="action-buttons flex mt-4">
        <!-- confirm all -->

        <vx-tooltip color="success" text="Confirm All" class="mr-2 float-right">
          <vs-button
            color="success"
            type="border"
            @click="submit_error"
          >Submit</vs-button
          >
        </vx-tooltip>

        <!-- confirm selected -->
      </div>
    </vs-popup>

    <vs-popup
      class="holamundo"
      title="Discount"
      :active.sync="popup_active_for_force_discount"
    >
      <vs-table>
        <vs-tr class="bg-white font-bold">
          <vs-td colspan="3" class="text-right">Discount Amount:</vs-td>
          <vs-td class="text-right pr-0">
            <vs-input
              icon-pack="feather"
              icon=""
              class="mt-5 w-full"
              v-model="force_discount_amount"
              type="number"
              min="0"
              v-validate="'required'"
            />
          </vs-td>
        </vs-tr>
        <vs-tr class="bg-white font-bold">
          <vs-td colspan="3" class="text-right">Discount Percentage:</vs-td>
          <vs-radio style="padding:10px;" v-model="discount_amount_is_percentage"  vs-value="true">Yes</vs-radio>
          <vs-radio style="padding:10px;" v-model="discount_amount_is_percentage"  vs-value="false">No</vs-radio>
        </vs-tr>

      </vs-table>
      <vs-button
        class="float-right"
        color="success"
        @click="createInvoice(orderData.id)"
        :disabled="isBtnLoading ? true : false"
      >Print</vs-button
      >
    </vs-popup>

    <!-- Please don't remove below  code -->
    <img id="res_logo" :src="resturent.logo" alt="" style="display: none" />
  </div>
</template>


<script>
import axios from "@/axios.js";
import moment from "moment";
import vSelect from "vue-select";

// icons
import { CheckSquareIcon } from "vue-feather-icons";
import { FileTextIcon } from "vue-feather-icons";
import { DollarSignIcon } from "vue-feather-icons";

import { Hooper, Slide, Navigation as HooperNavigation } from "hooper";
import "hooper/dist/hooper.css";

import UserProfile from "./UserProfile";
export default {
  components: {
    Hooper,
    Slide,
    HooperNavigation,
    UserProfile,
    vSelect,

    // icons
    CheckSquareIcon,
    FileTextIcon,
    DollarSignIcon,
  },
  data: () => ({
    resturent_id: localStorage.getItem("resturent_id"),
    resturent: JSON.parse(localStorage.getItem("resturent")),
    time: "",
    foods: [],
    search: "",
    searchByCode: "",
    force_discount_amount: 0,
    discount_amount_is_percentage: 'true',

    popup_active_for_force_discount: false,

    tables: [],
    dinein_selected_table_id: null,
    takeaway_order_type_id: null,
    orderData: { id: null, ordered_items: [], price: null },
    categories: [],
    itemsCarts: [],
    slectedCategory: "",
    isGrid: true,
    isDinein: false,
    isTakeOut: true,
    slectedTable: null,
    selectedTableNum: null,
    isInvoice: false,
    isBtnLoading: false,
    isConfirmPayment: false,
    showOrder: null,
    takeaway_type: [],

    isActiveitemDetailPopup: false,
    popupActive: false,
    selectedItem: { extras: [] },
    addToCardItem: {
      quantity: 1,
      status: null,
      food_order: null,
      food_option: null,
      food_extras: [],
    },
  }),

  methods: {

    submit_error()
    {
      if(this.takeaway_order_type_id !=null)
      {
        this.popupActive = false;

      }
      else
      {
        this.showActionMessage("error", "Please select the takeaway type first");

      }

    },

    boolean_conversion(discount_amount_is_percentage)
    {
      return discount_amount_is_percentage == 'true';

    },

    getAllTakeoutType() {
      axios
        .get(
          `/restaurant_management/dashboard/restaurant/${this.resturent_id}/`
        )
        .then((res) => {
          this.takeaway_type = res.data.data.takeway_order_type;
        })
        .catch((err) => {
          console.log("error offer ", err.response);
          this.showActionMessage("error", err.response.statusText);
          this.checkError(err);
        });
    },
    getTime() {
      setInterval(() => {
        this.time = moment().format("h:mm:ss A");
      }, 1000);
    },

    findFooitem() {
      if (this.search.length) {
        axios
          .get(
            `/restaurant_management/dashboard/dashboard_food_search/${this.search}?restaurant=${this.resturent_id}`
          )
          .then((res) => {
            console.log("food search ", res);
            this.foods = res.data.data;
          })
          .catch((err) => {
            console.log("get food error ", err.response);
            this.showActionMessage("error", err.response.statusText);
            this.checkError(err);
          });
      }
    },
    findFoodByCode() {
      if (this.searchByCode.length) {
        // FOOD16
        axios
          .get(
            `/restaurant_management/dashboard/dashboard_food_search_code/${this.searchByCode}?restaurant=${this.resturent_id}`
          )
          .then((res) => {
            console.log("food search ", res.data.data);
            this.foods = res.data.data;
          })
          .catch((err) => {
            console.log("get food error ", err.response);
            this.showActionMessage("error", err.response.statusText);
            this.checkError(err);
          });
      }
    },


    findFooitemByCat(category_id) {
      this.slectedCategory = category_id;
      axios
        .get(
          `/restaurant_management/dashboard/food_list/${category_id}?restaurant=${this.resturent_id}`
        )
        .then((res) => {
          console.log("food ", res);
          this.foods = res.data.data;
        })
        .catch((err) => {
          console.log("get food error ", err.response);
          this.showActionMessage("error", err.response.statusText);
          this.checkError(err);
        });
    },

    allItem() {
      this.slectedCategory = "";
      this.getFood();
    },

    addItemToCardConfirm() {
      this.isActiveitemDetailPopup = !this.isActiveitemDetailPopup;
      this.itemAddToCart({
        food_option:
          this.addToCardItem.food_option ||
          this.selectedItem.food_options[0].id,
        food_extras: this.addToCardItem.food_extras,
      });
    },

    async createTakeAwayOrder() {
      let body = null;
      if (this.isDinein && this.dinein_selected_table_id) {
        body = {
          restaurant: this.resturent_id,
          table: this.dinein_selected_table_id,
        };
      }
      else body = {
        restaurant: this.resturent_id ,
        takeway_order_type: this.takeaway_order_type_id
      };

      await axios
        .post(
          "/restaurant_management/dashboard/order/create_take_away_order/",
          body
        )
        .then((res) => {

          console.log("response of create takeaway ", res.data);
          if(res.data.status != true)
          {
            this.showActionMessage("error", "Please select the takeaway type first");

            // console.log("error details",res.data.msg);
            // var takeaway_type_error = res.data.msg;
            // return this.showActionMessage("error", takeaway_type_error);
            //  this.showErrorLog(res.data.error.error_details);

          }
          else
          {
            this.orderData = res.data.data;
            console.log("order data",this.orderData);
            localStorage.setItem("orderData", JSON.stringify(res.data.data));
          }
          // if (res.data.status) {
          //   this.orderData = res.data.data;
          //   console.log("order data",this.orderData);
          //   localStorage.setItem("orderData", JSON.stringify(res.data.data));
          // } else this.showErrorLog(res.data.error.error_details);
        })
        .catch((err) => {
          console.log("err ", err.response);
        });
    },

    addToItemCardGo(item) {
      let allextras = [];

      item.food_extras.map((extra) =>
        extra.extras.map((extra) => allextras.push(extra))
      );
      // this.selectedItem.extras = allextras;

      if (item.food_options.length > 1 || item.food_extras.length > 0) {
        this.selectedItem = item;
        this.selectedItem.extras = allextras;
        this.isActiveitemDetailPopup = !this.isActiveitemDetailPopup;
        return;
      }

      this.itemAddToCart({
        food_option: item.food_options[0].id,
        food_extras: allextras.map((extra) => extra.id),
      });
    },

    async itemAddToCart(item) {
      console.log("item ", item);
      if (this.isDinein && this.dinein_selected_table_id === null) {
        return this.showActionMessage("error", "Please Select Table First!!");
      }

      if (this.orderData.id == null) {
        console.log(1111);
        await this.createTakeAwayOrder();
      }

      console.log("itemm ", item);

      console.log("odata 2 ", this.orderData);
      await axios
        .post("/restaurant_management/dashboard/order/cart/items/", [
          {
            quantity: 1,
            status: this.orderData.status,
            food_order: this.orderData.id, // order id
            food_option: item.food_option,
            food_extras: item.food_extras,
          },
        ])
        .then((res) => {
          if (res.data.status) {
            console.log("oci ", res.data);
            this.orderData.ordered_items.push(res.data.data[0]);
            // checkIfCart(res.data.data[0])
            console.log("order data cart ", this.orderData);
          } else this.showErrorLog(res.data.error.error_details);
        })
        .catch((err) => {
          console.log("err oci ", err.response);
        });
    },

    updateCartItem(item) {
      axios
        .patch(
          `/restaurant_management/dashboard/order/cart/items/${item.id}/`,
          { quantity: item.quantity }
        )
        .then((res) => {
          console.log("qty update ", res.data);
          if (res.data.status) {
            const updatedOrders = res.data.data.ordered_items.map((orderItem) =>
              orderItem.id === item.id
                ? { ...orderItem, quantity: item.quantity }
                : orderItem
            );

            // update order data state
            this.orderData.ordered_items = updatedOrders.filter(
              (order) => order.status !== "4_CANCELLED"
            );
          } else this.showErrorLog(res.data.error.error_details);
        })
        .catch((err) => {
          this.showActionMessage("error", err.response.statusText);
          this.checkError(err);
        });
    },

    increaseItem(item) {
      let theItem = this.orderData.ordered_items.find(
        (arr) => arr.food_option.food === item.id
      );
      theItem.quantity += 1;
      this.updateCartItem(theItem);
    },

    decraseItem(item) {
      let theItem = this.orderData.ordered_items.find(
        (arr) => arr.food_option.food === item.id
      );
      if (theItem.quantity == 1) {
        let index = this.itemsCarts.indexOf(theItem);
        if (index > -1) {
          this.itemsCarts.splice(index, 1);
        }
      } else {
        theItem.quantity--;
      }

      this.updateCartItem(theItem);
    },

    checkIfCart(item) {
      // console.log("item ", item);
      // console.log("oi ", this.orderData.ordered_items);
      let theItem = this.orderData.ordered_items.find(
        (arr) => arr.food_option.food === item.id
      );
      // console.log('theItem ', this.orderData.ordered_items, theItem)
      return theItem ? theItem : false;
    },

    getOrderedItems(orderId) {
      axios
        .get(`/restaurant_management/dashboard/order/create_order/${orderId}/`)
        .then((res) => {
          console.log("get or ", res.data);
          if (res.data.status) {
            const data = res.data.data;

            const leftItems = data.ordered_items.filter(
              (item) => item.status !== "4_CANCELLED"
            );

            data.ordered_items = leftItems;

            this.orderData = data;

            if (data.status === "3_IN_TABLE") this.isInvoice = true;
            if (data.status === "4_CREATE_INVOICE")
              this.isConfirmPayment = true;
          }
        })
        .catch((err) => {
          this.showActionMessage("error", err.response.statusText);
          this.checkError(err);
        });
    },

    cancelOrder() {
      axios
        .post("/restaurant_management/dashboard/order/cancel_order/", {
          order_id: this.orderData.id,
        })
        .then((res) => {
          console.log("order can ", res);
          if (res.data.status) {
            this.orderData = { id: null, ordered_items: [], price: null };
            localStorage.setItem("orderData", null);
            this.dinein_selected_table_id = null;
          }
        })
        .catch((err) => {
          console.log("order can error ", err.response);
        });
    },

    cancelOrderItem(itemId) {
      console.log("order to cancel ", itemId);
      axios
        .post("/restaurant_management/dashboard/order/cart/cancel_items/", {
          order_id: this.orderData.id,
          food_items: [itemId],
        })
        .then((res) => {
          if (res.data.status) {
            console.log("can data ", res.data.data);

            const resData = res.data.data;

            const leftItems = resData.ordered_items.filter(
              (item) => item.status !== "4_CANCELLED"
            );

            resData.ordered_items = leftItems;

            this.orderData = resData;
            this.showActionMessage("success", "Item Cancel!");

            if (resData.ordered_items.length < 1)
              this.orderData = { id: null, ordered_items: [], price: null };
            localStorage.setItem("orderData", null);
          } else this.showErrorLog(res.data.error.error_details);
        })
        .catch((err) => {
          this.showActionMessage("error", err.response.statusText);
          this.checkError(err);
        });
    },

    inTable(order_id, food_items) {
      axios
        .post("/restaurant_management/dashboard/order/status/in_table/", {
          order_id,
          food_items,
        })
        .then((res) => {
          if (res.data.status) {
            this.isBtnLoading = false;
            this.isInvoice = !this.isInvoice;
            console.log("in table ", res.data);
            this.orderData = res.data.data;
            console.log("In voice created!!!!! ");
            this.showActionMessage("success", "Order Confirmed!");
          } else this.showErrorLog(res.data.error.error_details);
        })
        .catch((err) => {
          console.log("error in table ", err.response);
        });
    },

    confirmOrder(order_id, food_items) {
      this.isBtnLoading = true;
      axios
        .post("/restaurant_management/dashboard/order/status/confirm/", {
          order_id,
          food_items,
        })
        .then((res) => {
          console.log("co ", res.data);
          if (res.data.status) {
            // is dine in selected
            if (this.isDinein && this.dinein_selected_table_id !== null) {
              this.isBtnLoading = false;
              this.orderData = { id: null, ordered_items: [], price: null };
              localStorage.setItem("orderData", this.orderData);
              this.showActionMessage(
                "success",
                `Order Confirmed At Table  No ${this.dinein_selected_table_id}`
              );
              this.isTakeOut = !this.isTakeOut;
              this.isDinein = false;
              this.slectedTable = null;
              return;
            }

            // for take out option
            this.inTable(order_id, food_items);
          } else this.showErrorLog(res.data.error.error_details);
        })
        .catch((err) => {
          console.log("err co ", err.response);
        });
    },

    confirmPaymentOrder() {
      this.isBtnLoading = true;
      axios
        .post("/restaurant_management/dashboard/order/confirm_payment/", {
          order_id: this.orderData.id,
        })
        .then((res) => {
          console.log("cPorder  ", res.data);
          if (res.data.status && res.data.data.status === "5_PAID") {
            this.orderData = { id: null, ordered_items: [], price: null };
            localStorage.setItem("orderData", null);
            this.showActionMessage("success", res.data.data.status_details);
            this.isConfirmPayment = false;
            this.isBtnLoading = false;
          } else this.showErrorLog(res.data.error.error_details);
        })
        .catch((err) => {
          console.log("err co ", err.response);
        });
    },

    show_force_discount_form()
    {
      this.popup_active_for_force_discount = true;


    },
    createInvoice(order_id) {


      let OrderId = order_id;
      const body = {

        take_away_discount_amount: parseInt(this.force_discount_amount),
        take_away_discount_amount_is_percentage: this.boolean_conversion(this.discount_amount_is_percentage)
      };
      axios
        .post(
          `/restaurant_management/dashboard/take_away_discount/${OrderId}`,
          body
        )  .then((res) => {
          console.log("response of takeaway discount",res);
        var error_message = '';
        error_message = res.data.msg;
        if(error_message !='success')
        {

          return this.showActionMessage("error", error_message);
        }
       else
        {

          this.isBtnLoading = true;
          axios
            .post("/restaurant_management/dashboard/order/create_invoice/", {
              order_id,
            })
            .then((res) => {
              console.log("invoice ", res.data);
              if (res.data.status) {
                console.log("invoice 1 ", res.data);
                this.isInvoice = !this.isInvoice;
                this.isConfirmPayment = true;
                this.orderData = res.data.data;
                this.printRecipt(res.data.data);
                this.popup_active_for_force_discount = false;
                this.isBtnLoading = false;
              } else this.showErrorLog(res.data.error.error_details);
            })
            .catch((err) => {
              console.log("error invoice ", err.response);
            });
        }
      })
        .catch((err) => {
          this.showActionMessage("error", err);
          this.checkError(err);
        });

    },


    // createInvoice(order_id) {
    //
    //
    //
    //   this.isBtnLoading = true;
    //   axios
    //     .post("/restaurant_management/dashboard/order/create_invoice/", {
    //       order_id,
    //     })
    //     .then((res) => {
    //       console.log("invoice ", res.data);
    //       if (res.data.status) {
    //         console.log("invoice 1 ", res.data);
    //         this.isInvoice = !this.isInvoice;
    //         this.isConfirmPayment = true;
    //         this.orderData = res.data.data;
    //         this.printRecipt(res.data.data);
    //         this.isBtnLoading = false;
    //       } else this.showErrorLog(res.data.error.error_details);
    //     })
    //     .catch((err) => {
    //       console.log("error invoice ", err.response);
    //     });
    // },

    placeOrder() {
      this.isBtnLoading = true;
      console.log("object ", this.orderData);
      if (this.orderData.ordered_items.length > 0) {
        axios
          .post("/restaurant_management/dashboard/order/placed_status/", {
            order_id: this.orderData.id,
          })
          .then((res) => {
            console.log("place order ", res);
            if (res.data.status) {
              const foodItems = res.data.data.ordered_items
                .filter((item) => item.status === "1_ORDER_PLACED")
                .map((item) => item.id);

              this.confirmOrder(this.orderData.id, foodItems);
              this.showActionMessage("success", "Order Place Successfully!");
            } else this.showErrorLog(res.data.error.error_details);
          })
          .catch((err) => console.log("po error ", err.response));
      } else this.showActionMessage("error", "Please Select Order First!!");
    },

    getFood() {
      axios
        .get(
          `restaurant_management/dashboard/restaurant/${this.resturent_id}/foods/`
        )
        .then((res) => {
          console.log("get food ", res);
          this.foods = res.data.data;
        })
        .catch((err) => {
          console.log("get food error ", err.response);
          this.showActionMessage("error", err.response.statusText);
          this.checkError(err);
        });
    },

    getCategorys() {
      axios
        .get(
          `/restaurant_management/dashboard/category_list/${this.resturent_id}`
        )
        .then((res) => {
          if (res.data.status) this.categories = res.data.data;
        })
        .catch((err) => {
          this.showActionMessage("error", err.response.statusText);
          this.checkError(err);
        });
    },

    getTables() {
      axios
        .get(
          `/restaurant_management/dashboard/restaurant/${this.resturent_id}/tables/`
        )
        .then((res) => {
          console.log("tables ", res.data.data);
          this.tables = res.data.data;
        })
        .catch((err) => {
          console.log("table error ", err.response);
          this.showActionMessage("error", err.response.statusText);
          // console.log("sremove error ", err);
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
      console.log("order", order);
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
    // console.log("od ", JSON.parse(localStorage.getItem("orderData")).id);
    // this.createTakeAwayOrder();
    this.getAllTakeoutType();
    this.getFood();
    this.getCategorys();
    this.getOrderedItems(JSON.parse(localStorage.getItem("orderData")).id);
    // this.getTime();
  },
};
</script>


<style lang="scss" >
.order-item-list-table {
  max-height: 50%;
  overflow: scroll;
}
.item-qty > .vs-con-input > .vs-input--input {
  text-align: center;
}
// .vs-input--input {
//   text-align: center;
// }
#data-list-thumb-view-alt {
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
      // border-spacing: 0 1.3rem;
      // padding: 0 1rem;

      tr {
        box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);
        td {
          padding: 10px;
          &:first-child {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }
          &:last-child {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
          &.img-container {
            // width: 1rem;
            // background: #fff;

            span {
              display: flex;
              justify-content: flex-start;
            }

            .product-img {
              height: 50px;
              width: 50px !important;
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

// th:first-child .vs-table-text {
//   justify-content: center !important;
//   cursor: pointer;
// }
.vs-table--thead {
  background-color: #32304e;
  color: #fff;
}

.vs-con-table .vs-con-tbody .vs-table--tbody-table .vs-table--thead th {
  padding: 10px 15px !important;
}

.product-img {
  width: 150px !important;
  // width: 100px !important;
}

.th .sort-th,
th .vs-table-text {
  justify-content: center !important;
}

.place-order {
  position: fixed;
  // top: 900px;
  bottom: 10px;
  width: 21.5% !important;

  background: #f1f1f1;
  // box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25),
  //   inset 0px -3px 5px rgba(0, 0, 0, 0.38);
  // border-radius: 15px;
}

// table card styles
.table-card {
  margin: 4px 0 4px 6px;
  width: 99%;
  max-height: 700px;
  left: 1517px;
  top: 258px;
  // overflow: hidden;

  background: #ffffff;
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 9px;
}

.take-out-table-header {
  overflow-x: hidden;
}

// restaurant table styles
.restaurant-tables {
  width: 89px;
  height: 63px;
  left: 1544px;
  top: 283px;

  background: #ffffff;
  border: 2px solid #c4c4c4;
  box-sizing: border-box;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;

  // table number styles
  .table-no {
    width: 56.97px;
    height: 59px;
  }
}
</style>
