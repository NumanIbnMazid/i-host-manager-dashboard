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
                  <h1 class="mx-auto text-rd" style="font-size: 2.5rem">
                    <b> {{ this.kitchen }}</b>
                  </h1>
                  <p class="mx-auto text-rd text-lg">In Kitchen</p>
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
                  <h1 class="mx-auto text-hostm" style="font-size: 2.5rem">
                    <b> {{ this.invoiceCreated }}</b>
                  </h1>
                  <p class="mx-auto text-hostm text-lg">Create Invoice</p>
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
                  <h1 class="mx-auto text-gn" style="font-size: 2.5rem">
                    <b> {{ this.paymentDone }}</b>
                  </h1>
                  <p class="mx-auto text-gn text-lg">Payment Done</p>
                </vs-col>
              </vs-row>
            </vs-card>
          </div>
        </div>
      </div>
    </div>
    <vs-divider />

    <!-- order details -->
    <div class="vx-row order-manger-area">
      <vs-collapse
        v-for="(order, j) in ordersData"
        :key="j"
        class="vx-col w-full md:w-1/4 mb-base"
        accordion
      >
        <vs-collapse-item
          icon-pack="feather"
          icon-arrow="icon-chevrons-down"
          class="bg-white border-0 m-0 rounded op-block p-0 vs-con-loading__container mt-2"
          style="background-color: #ddd"
          :id="`div-with-loading-${order.id}`"
        >
          <div slot="header">
            <div
              class="flex justify-between items-center d-theme-border-grey-light"
            >
              <div class="flex w-full">
                <div
                  :class="`w-1/4 bg-${selectColor(order.status)} text-center`"
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
                  <!-- <br />
                  <b class="text-white text-sm">{{
                    order.table_name.length > 10
                      ? order.table_name.substr(0, 9) + "..."
                      : order.table_name
                  }}</b> -->
                </div>
                <div
                  v-if="!order.status"
                  class="w-3/4 my-auto text-center text-hard"
                >
                  No Order
                </div>
                <div v-else class="w-3/4 p-2 ml-2 pt-0 my-auto">
                  <!-- <vs-progress
                    :percent="orderPercent(order.status, 'per')"
                    :color="orderPercent(order.status, 'color')"
                  ></vs-progress> -->
                  <div class="flex w-full mt-4">
                    <div class="w-3/5">
                      <p class="text-sm leading-none">Order ID</p>
                      <p class="text-sm leading-none font-medium">
                        #{{ order.id }}
                      </p>
                      <p
                        :class="`text-xs leading-none text-${selectColor(
                          order.status
                        )}`"
                      >
                        ({{ order.status_details }})
                      </p>
                    </div>
                    <div class="w-2/5 text-center mr-3">
                      <p class="text-sm leading-none">Amount</p>
                      <p class="text-base leading-none font-bold">
                        ৳{{ parseInt(order.price.total_price) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex">
            <vs-button
              class="ml-2 bg-ihostm"
              v-if="order.status && order.status == '1_ORDER_PLACED'"
              @click="varifyConfirm(order)"
              >Approve & Print for kitchen</vs-button
            >

            <vs-button
              class="ml-2 bg-pl"
              v-if="order.status && order.status == '2_ORDER_CONFIRMED'"
              @click="(markAsServedPopup = true), (orderToServed = order)"
              >Mark as Serve</vs-button
            >
            <vs-button
              class="ml-2 bg-ihostm"
              v-if="
                order.status &&
                order.status == '3_IN_TABLE' &&
                checkAllServed(order.ordered_items)
              "
              @click="createInvoice(order.id)"
              >Create Invoice</vs-button
            >

            <vs-button
              class="ml-2 bg-gn"
              v-if="
                order.status &&
                order.status == '3_IN_TABLE' &&
                !checkAllServed(order.ordered_items)
              "
              @click="(markAsServedPopup = true), (orderToServed = order)"
              >Serve</vs-button
            >

            <vs-button
              class="ml-2 bg-gn"
              v-if="order.status && order.status == '4_CREATE_INVOICE'"
              @click="collectOrdersPayment(order.id)"
              >Collect Payment</vs-button
            >

            <vx-tooltip
              class="ml-2 my-auto"
              color="pl"
              text="Return to food serve"
              v-if="
                (order.status && order.status == '4_CREATE_INVOICE') ||
                order.status == '3_IN_TABLE'
              "
            >
              <vs-button
                class="bg-pl"
                icon-pack="feather"
                icon="icon-arrow-left"
                @click="revertOrder(order.id)"
              ></vs-button>
            </vx-tooltip>

            <vx-tooltip
              class="ml-2 my-auto"
              color="danger"
              text="Cancel"
              v-if="
                (order.status && order.status == '1_ORDER_PLACED') ||
                order.status == '2_ORDER_CONFIRMED' ||
                order.status == '0_ORDER_INITIALIZED' ||
                checkAllCanceled(order.ordered_items)
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

    <!-- item list for order -->
    <vs-popup
      class="holamundo w-full"
      :title="`Order #${orderToVarify.id} | Table No: ${orderToVarify.table_no}`"
      :active.sync="varifyPopup"
    >
      <!-- food select form -->
      <div class="food-select-form">
        <div class="vx-row text-sm">
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

          <div class="vx-col w-3/12 pl-0 ml-0 mb-4 mr-0 pr-1">
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

          <div class="vx-col w-1/12 pl-0 mt-5">
            <vs-button
              color="success"
              type="border"
              title="Add"
              icon-pack="feather"
              icon="icon-plus"
              @click="addOrderedItems(orderToVarify, '1_ORDER_PLACED')"
            ></vs-button>
          </div>
        </div>
      </div>

      <!-- food extra list -->
      <div class="food-extras-list">
        <ul
          class="flex float-left"
          v-for="foodExtra in foodExtras"
          :key="foodExtra.id"
        >
          <li class="mb-4" v-for="fe in foodExtra" :key="fe.id">
            <vs-checkbox
              v-model="selectedFoodExtras"
              :vs-value="fe.id"
              color="success"
              >{{ fe.name }}</vs-checkbox
            >
          </li>
        </ul>
      </div>

      <!-- order item list -->
      <vs-table :data="orderToVarify.ordered_items">
        <template slot="thead">
          <vs-th class="text-center">Check</vs-th>
          <vs-th class="text-center">Item Id.</vs-th>
          <vs-th class="text-center">Name</vs-th>
          <vs-th class="text-center">Qty</vs-th>
          <vs-th class="text-center">Options</vs-th>
          <!-- <vs-th class="text-center">Extra</vs-th> -->
          <vs-th class="text-center">Price</vs-th>
        </template>

        <template slot-scope="{ data }">
          <vs-tr
            :class="`text-center ${
              data[i].status == '0_ORDER_INITIALIZED' ? 'bg-grey' : ''
            }`"
            :key="i"
            v-for="(tr, i) in data"
          >
            <vs-td :data="data[i].id">
              <vs-checkbox
                v-if="data[i].status === '1_ORDER_PLACED'"
                v-model="selectedItemForVarify"
                :vs-value="data[i].id"
              ></vs-checkbox>

              <span
                v-if="data[i].status === '3_IN_TABLE'"
                class="badge bg-gn text-white rounded"
                >Served</span
              >
              <span
                v-if="data[i].status === '1_ORDER_PLACED'"
                class="text-danger"
                >Not Verified</span
              >
              <span
                v-if="data[i].status === '4_CANCELLED'"
                class="badge bg-danger text-white rounded"
                >Canceled</span
              >
              <span
                v-if="data[i].status === '0_ORDER_INITIALIZED'"
                class="text-yl"
                >Item Carts by user</span
              >
            </vs-td>

            <vs-td :data="data[i].id">
              {{ data[i].id }}
            </vs-td>

            <vs-td class="text-center" :data="data[i].food_name">
              {{ data[i].food_name }}
            </vs-td>

            <vs-td class="text-center" :data="data[i].quantity">
              <vs-input
                class="w-16"
                color="rgb(213, 14, 151)"
                type="number"
                min="1"
                label-placeholder="Quantity"
                v-model="data[i].quantity"
                @change="
                  updateFoodQuantity(data[i], orderToVarify.ordered_items)
                "
                >{{ data[i].quantity }}</vs-input
              >
            </vs-td>

            <vs-td class="text-center" :data="data[i].food_option">
              <span class="bg-gn p-1 rounded text-white">
                <i v-if="data[i].food_option.option_type.name != 'single_type'">
                  {{ data[i].food_option.option_type.name }}:</i
                >
                {{ data[i].food_option.name }}
              </span>
            </vs-td>

            <vs-td :data="data[i].food_option.price">
              ৳{{ data[i].food_option.price }}
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>

      <!-- action buttons -->
      <div class="action-buttons flex mt-4">
        <!-- confirm all -->

        <vx-tooltip color="success" text="Confirm All" class="mr-2 float-right">
          <vs-button
            color="success"
            type="border"
            @click="
              selectAll(
                orderToVarify.ordered_items,
                orderToVarify.id,
                'user_confirmed'
              )
            "
            >Confirm All</vs-button
          >
        </vx-tooltip>

        <!-- confirm selected -->
        <vx-tooltip color="primary" text="Confirm Selects" class="float-right">
          <vs-button
            color="primary"
            type="border"
            @click="
              confirmProcess(
                orderToVarify.id,
                '/restaurant_management/dashboard/order/status/confirm/',
                true
              )
            "
            >Confirm Select</vs-button
          >
        </vx-tooltip>
      </div>
    </vs-popup>

    <!-- mark as served -->
    <vs-popup
      class="holamundo"
      :title="`Order #${orderToServed.id} | Table No: ${orderToServed.table_no}`"
      :active.sync="markAsServedPopup"
    >
      <!-- food select form -->
      <!-- food select form -->
      <div class="food-select-form">
        <div class="vx-row text-sm">
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

          <div class="vx-col w-3/12 pl-0 ml-0 mb-4 mr-0 pr-1">
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

          <div class="vx-col w-1/12 pl-0 mt-5">
            <vs-button
              color="success"
              type="border"
              title="Add"
              icon-pack="feather"
              icon="icon-plus"
              @click="addOrderedItems(orderToServed, '2_ORDER_CONFIRMED')"
            ></vs-button>
          </div>
        </div>
      </div>

      <!-- food extra list -->
      <div class="food-extras-list">
        <ul
          class="flex float-left"
          v-for="foodExtra in foodExtras"
          :key="foodExtra.id"
        >
          <li class="mb-4" v-for="fe in foodExtra" :key="fe.id">
            <vs-checkbox
              v-model="selectedFoodExtras"
              :vs-value="fe.id"
              color="success"
              >{{ fe.name }}</vs-checkbox
            >
          </li>
        </ul>
      </div>

      <vs-table :data="orderToServed.ordered_items">
        <template slot="thead">
          <vs-th class="text-center">Check</vs-th>
          <vs-th class="text-center">Item Id</vs-th>
          <vs-th class="text-center">Name</vs-th>
          <vs-th class="text-center">Qty</vs-th>
          <vs-th class="text-center">Options</vs-th>
          <vs-th class="text-center">Price</vs-th>
          <vs-th class="text-center">Action</vs-th>
        </template>

        <template slot-scope="{ data }">
          <vs-tr
            :class="`text-center ${
              data[i].status == '0_ORDER_INITIALIZED' ? 'bg-grey' : ''
            }`"
            :key="i"
            v-for="(tr, i) in data"
          >
            <!-- v-show="data[i].status != '0_ORDER_INITIALIZED'" -->
            <vs-td :data="data[i].id">
              <vs-checkbox
                v-if="data[i].status === '2_ORDER_CONFIRMED'"
                v-model="selectedItemForVarify"
                :vs-value="data[i].id"
              ></vs-checkbox>
              <span
                v-if="data[i].status === '3_IN_TABLE'"
                class="badge bg-gn text-white rounded"
                >Served</span
              >
              <span
                v-if="data[i].status === '1_ORDER_PLACED'"
                class="text-danger"
                >Not Verified</span
              >
              <span
                v-if="data[i].status === '4_CANCELLED'"
                class="badge bg-danger text-white rounded"
                >Canceled</span
              >
              <span
                v-if="data[i].status === '0_ORDER_INITIALIZED'"
                class="text-yl"
                >Item Carts by user</span
              >
            </vs-td>

            <vs-td :data="data[i].id">
              {{ data[i].id }}
            </vs-td>

            <vs-td class="text-center" :data="data[i].food_name">
              {{ data[i].food_name }}
            </vs-td>

            <vs-td class="text-center" :data="data[i].quantity">
              <vs-input
                class="w-16"
                color="green"
                type="number"
                min="1"
                label-placeholder="Quantity"
                v-model="data[i].quantity"
                @change="
                  updateFoodQuantity(data[i], orderToServed.ordered_items)
                "
                >{{ data[i].quantity }}</vs-input
              >
            </vs-td>

            <vs-td class="text-center" :data="data[i].food_option">
              <span class="bg-gn p-1 rounded text-white">
                <i v-if="data[i].food_option.option_type.name != 'single_type'">
                  {{ data[i].food_option.option_type.name }}:</i
                >
                {{ data[i].food_option.name }}
              </span>
            </vs-td>
            <vs-td :data="data[i].food_option.price">
              ৳{{ data[i].food_option.price }}
            </vs-td>
            <vs-td>
              <span
                v-if="data[i].status != '4_CANCELLED'"
                class="badge rounded bg-rd text-white"
                style="cursor: pointer"
                @click="cancelOrderItem(orderToServed.id, data[i].id)"
                >Cancel</span
              >
              <br />
              <span
                v-if="data[i].status == '1_ORDER_PLACED'"
                class="badge rounded bg-bl text-white"
                style="cursor: pointer"
                @click="verifyOrderItem(orderToServed.id, data[i].id)"
                >Verify</span
              >
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>

      <!-- action buttons -->

      <div class="action-buttons flex mt-4 float-right">
        <vx-tooltip color="warning" text="Confirm All" class="mr-2">
          <vs-button
            v-if="selectedItemForVarify.length > 0"
            color="warning"
            icon-pack="feather"
            icon="icon-printer"
            type="border"
            @click="
              printKitechRecit(orderToServed, selectedItemForVarify);
              markAsServedPopup = false;
            "
            >Selected item print for kitchen</vs-button
          >
        </vx-tooltip>

        <!-- confirm all -->
        <vx-tooltip color="success" text="Confirm All" class="mr-2">
          <vs-button
            color="success"
            type="border"
            @click="
              selectAll(
                orderToServed.ordered_items,
                orderToServed.id,
                'in_kitchen'
              )
            "
            >Serve All</vs-button
          >
        </vx-tooltip>

        <!-- Serve selected -->
        <vx-tooltip color="primary" text="Confirm Selects">
          <vs-button
            color="primary"
            type="border"
            @click="
              confirmProcess(
                orderToServed.id,
                '/restaurant_management/dashboard/order/status/in_table/'
              )
            "
            >Serve Select</vs-button
          >
        </vx-tooltip>
      </div>
    </vs-popup>

    <!-- <img id="res_logo" :src="resturent.logo" alt="" style="display: none" /> -->
  </div>
</template>

<script>
import StatisticsCardLine from "@/components/statistics-cards/StatisticsCardLine.vue";
import VxTimeline from "@/components/timeline/VxTimeline";
import vSelect from "vue-select";
import axios from "@/axios.js";
import moment from "moment";
import ChangeTimeDurationDropdownVue from "../components/ChangeTimeDurationDropdown.vue";
// import { mapGetters } from "vuex";

export default {
  components: {
    StatisticsCardLine,
    VxTimeline,
    "v-select": vSelect,
  },
  //sabbir
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
    invoiceCreated: "",
    cancelOrders: "",
    ordersData: [],

    varifyPopup: false,
    markAsServedPopup: false,
    orderToVarify: [],
    orderToServed: [],
    selectedItemForVarify: [],
    selectedItemForKitchen: [],

    foods: [],
    foodExtraTypes: [],
    foodExtras: [],
    foodOptions: [],
    selectedFood: "",
    selectedFoodExtraTypes: [],
    quantity: 1,
    selectedOption: "",
    selectedFoodExtras: [],
  }),

  watch: {
    // adding food extra options in foodExtraType
    selectedFoodExtraTypes: function (val, oldVal) {
      if (val !== oldVal) {
        this.foodExtras = [];
        this.foodExtraTypes.map((foodExtraType) =>
          this.selectedFoodExtraTypes.map(
            (st) =>
              foodExtraType === st && this.foodExtras.push(foodExtraType.extras)
          )
        );
      }
    },

    // clear state if food removed from state
    selectedFood: function (val, oldVal) {
      if (!val) {
        this.clearFoodStates();
      }

      // checking if selected food is changed
      if (val !== oldVal) {
        this.clearFoodStates();
        this.getFoodOptions();
      }
    },

    // watch quantity value if it 0 or less
    quantity: function (val, oldVal) {
      if (this.quantity <= 0) {
        this.quantity = "";
      }
    },
  },

  methods: {
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

    // food options
    getFoodOptions() {
      if (this.selectedFood !== "") {
        const food = this.foods.filter(
          (food) => food.id === this.selectedFood
        )[0];

        this.foodOptions = food.food_options;
        this.foodExtraTypes = food.food_extras;
      }
      // else this.showActionMessage("error", "Select Food First!");
    },

    // clear food states
    clearFoodStates() {
      this.selectedOption = "";
      this.foodExtraTypes = [];
      this.foodExtras = [];
      this.foodOptions = [];
      this.selectedFoodExtraTypes = [];
      this.quantity = 1;
    },

    // adding food order to order cart
    addOrderedItems(orderToProcess, status) {
      console.log('orderToProcess1 ', orderToProcess)
      axios
        .post("/restaurant_management/dashboard/order/cart/items/", [
          {
            quantity: this.quantity,
            status,
            food_option: this.selectedOption.id,
            food_order: orderToProcess.id,
            food_extra: this.selectedFoodExtras,
          },
        ])
        .then((res) => {
          // real time ui update (data object update)
          if (res.data.status) {
            this.ordersData.map(
              (order) =>
                order.id === orderToProcess.id &&
                order.ordered_items.push(res.data.data[0])
            );

            orderToProcess.ordered_items.push(res.data.data[0])

            // clear food state after add item to cart
            this.selectedFood = "";
          } else this.showActionMessage("error", "New Item Add Failed!");
        })
        .catch((err) => {
          this.showActionMessage("error", err.response.statusText);

          // checking error code
          this.checkError(err);
        });
    },

    updateFoodQuantity(food, objectToUpdate) {
      axios
        .patch(
          `/restaurant_management/dashboard/order/cart/items/${food.id}/`,
          {
            quantity: food.quantity,
            food_option: food.food_option.id,
            food_order: food.food_order,
            food_extra: food.food_extra.map((fe) => fe.id),
          }
        )
        .then((res) => {
          objectToUpdate = res.data.data.ordered_items;
        })
        .catch((err) => {
          this.showActionMessage("error", err.response.statusText);

          // checking error code
          this.checkError(err);
        });
    },

    orderDisburse(orders) {
      let orderItemList = orders;
      this.ordersData = orders;

      console.log("order data ", this.ordersData);
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
      this.kitchen = this.calculateLength(orderItemList, "2_ORDER_CONFIRMED");

      // total food serve
      this.foodServed = this.calculateLength(orderItemList, "3_IN_TABLE");
      this.invoiceCreated = this.calculateLength(
        orderItemList,
        "4_CREATE_INVOICE"
      );

      // total payment done
      this.paymentDone = this.calculateLength(orderItemList, "4_PAID");

      // total cancel orders
      this.cancelOrders = this.calculateLength(orderItemList, "5_CANCELLED");
    },

    getRestaurantOrderItemList() {
      axios
        .get(
          `/restaurant_management/dashboard/restaurant/${this.resturent_id}/order_item_list/`
        )
        .then((res) => {
          console.log("roil ", res);
          this.orderDisburse(res.data.data);
        })
        .catch((err) => {
          console.log("eroil ", err.response);
          this.showActionMessage("error", err);
          this.checkError(err);
        });
    },

    checkAllServed(orderItemList) {
      let init = orderItemList.filter(
        (item) => item.status === "0_ORDER_INITIALIZED"
      ).length;

      let placed = orderItemList.filter(
        (item) => item.status === "1_ORDER_PLACED"
      ).length;

      let confirmed = orderItemList.filter(
        (item) => item.status === "2_ORDER_CONFIRMED"
      ).length;

      if (init > 0 || placed > 0 || confirmed > 0) {
        return false;
      }

      return true;
    },
    checkAllCanceled(orderItemList) {
      if (orderItemList) {
        let totalLength = orderItemList.filter(
          (item) => item.status === "4_CANCELLED"
        ).length;

        if (orderItemList.length == totalLength) true;
      }
      return false;
    },

    // select all item
    selectAll(data, order_id, status) {
      let tempArr = [];
      data.map((el) => tempArr.push(el.id));

      if (this.selectedItemForVarify !== tempArr) {
        this.selectedItemForVarify = tempArr;

        if (status === "user_confirmed") {
          this.confirmProcess(
            order_id,
            "/restaurant_management/dashboard/order/status/confirm/",
            true
          );
          let order = { ...this.ordersData };
          let theorder = this.ordersData.find((order) => order.id === order_id);
          console.log("order kitchen ", theorder);
          // this.printKitechRecit(theorder);
        }

        if (status === "in_kitchen")
          this.confirmProcess(
            order_id,
            "/restaurant_management/dashboard/order/status/in_table/"
          );
      } else this.showActionMessage("success", "All item selected!");
    },

    confirmProcess(order_id, url, printRecipt = false) {
      if (this.selectedItemForVarify.length) {
        axios
          .post(url, {
            order_id,
            food_items: this.selectedItemForVarify,
          })
          .then((res) => {
            if (res.data.status) {
              this.ordersData = this.ordersData.map((order) =>
                order.id === order_id ? { ...res.data.data } : order
              );

              if (printRecipt) {
                let order = { ...this.ordersData };
                let theorder = this.ordersData.find(
                  (order) => order.id === order_id
                );
                this.printKitechRecit(res.data.data);
              }

              this.selectedItemForVarify = [];
              this.selectedItemForKitchen = [];
              this.markAsServedPopup = false;
              this.varifyPopup = false;
            }
          })
          .catch((err) => {
            this.showActionMessage("error", err.response.statusText);

            // checking error code
            this.checkError(err);
          });
      } else {
        this.showActionMessage("error", "Please select food!");
      }
    },

    createInvoice(order_id) {
      // this.printRecipt(order_id);
      axios
        .post("/restaurant_management/dashboard/order/create_invoice/", {
          order_id,
        })
        .then((res) => {
          if (res.data.status) {
            this.ordersData = this.ordersData.map((order) =>
              order.id === order_id ? { ...res.data.data } : order
            );
            this.printRecipt(res.data.data);
          }
        })
        .catch((err) => {
          this.showActionMessage("error", err);
          this.checkError(err);
        });
    },

    collectOrdersPayment(order_id) {
      axios
        .post("/restaurant_management/dashboard/order/confirm_payment/", {
          order_id,
        })
        .then((res) => {
          // printRecipt(res.data.data);
          if (res.data.status) {
            this.ordersData = this.ordersData.map((order) =>
              order.id === order_id ? { ...order, status: "" } : order
            );
          }
        })
        .catch((err) => {
          this.showActionMessage("error", err);
          this.checkError(err);
        });
    },

    cancelOrderItem(order_id, item_id) {
      axios
        .post("/restaurant_management/dashboard/order/cart/cancel_items/", {
          order_id,
          food_items: [item_id],
        })
        .then((res) => {
          if (res.data.status) {
            this.ordersData = this.ordersData.map((order) =>
              order.id === order_id ? { ...res.data.data } : order
            );

            this.orderToServed = res.data.data;
          }
        })
        .catch((err) => {
          this.showActionMessage("error", err);
          this.checkError(err);
        });
    },

    verifyOrderItem(order_id, item_id) {
      axios
        .post(
          "/restaurant_management/dashboard/order/status/confirm_status_without_cancel/",
          {
            order_id,
            food_items: [item_id],
          }
        )
        .then((res) => {
          if (res.data.status) {
            this.ordersData = this.ordersData.map((order) =>
              order.id === order_id ? { ...res.data.data } : order
            );

            this.orderToServed = res.data.data;
            // this.printKitechRecit(orderToServed, item_id);
          }
        })
        .catch((err) => {
          this.showActionMessage("error", err);
          this.checkError(err);
        });
    },

    calculateLength(arr, status = "") {
      return arr.filter((el) => el.status === status).length;
    },

    getTime() {
      setInterval(() => {
        this.time = moment().format("h:mm:ss A");
      }, 1000);
    },

    cancelOrder(order_id) {
      axios
        .post("/restaurant_management/dashboard/order/cancel_order/", {
          order_id,
        })
        .then((res) => {
          if (res.data.status) {
            this.ordersData = this.ordersData.map((order) =>
              order.id === order_id ? { ...order, status: "" } : order
            );
          }
        })
        .catch((err) => {
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
    //sabbir
    printRecipt(order) {
      console.log(order);
      const WinPrint = window.open(
        "",
        "",
        "left=0,top=0,width=600,height=600,toolbar=0,scrollbars=0,status=0"
      );

      let itemDetail = "";
      let resLogo = document.querySelector("#res_logo").src;

      order.ordered_items.forEach((el) => {
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
                    VAT Reg: ${this.resturent.tax_percentage}</br>
                    Phone : 012938210983</br>
                </p>
            </div>
        </div>
        <div id="bot">
            <center>
                <h2>Order # ${order.invoice.id}</h2>
                <h2>Table No: ${order.table_no}</h2>
                <h2>Waiter: ${order.waiter.name}</h2>
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
                    <tr class="tabletitle final">
                        <td class="Rate">
                            <h2>Net Total:</h2>
                        </td>
                        <td></td>
                        <td class="payment">
                            <h2>${order.price.grand_total_price}/-
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

    printKitechRecit(order, items = []) {
      const WinPrint = window.open(
        "",
        "",
        "left=0,top=0,width=600,height=600,toolbar=0,scrollbars=0,status=0"
      );
      let itemDetail = "";
      let allItems = [];
      if (items.length > 0) {
        allItems = order.ordered_items.filter((itm) => items.includes(itm.id));
      } else {
        allItems = order.ordered_items;
      }

      allItems.forEach((el) => {
        if (el.status == "2_ORDER_CONFIRMED") {
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
        }
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

    revertOrder(order_id) {
      axios
        .post(
          `/restaurant_management/dashboard/order/revert_back_to_in_table/`,
          {
            order_id,
          }
        )
        .then((res) => {
          if (res.data.status) {
            this.ordersData = this.ordersData.map((order) =>
              order.id === order_id ? { ...res.data.data } : order
            );
          }
        })
        .catch((err) => {
          this.showActionMessage("error", err.response.statusText);
          console.log(err);
        });
    },
    playSound() {
      var audio = new Audio(
        "https://ihost-space.sgp1.digitaloceanspaces.com/music/ring.mp3"
      );
      audio.play();
    },

    webSocket() {
      let updateSocket;
      let vm = this;
      function connectSocket() {
        updateSocket = new WebSocket(
          `ws://production.i-host.com.bd/ws/dashboard/${vm.resturent_id}/`
        );
        // console.log(updateSocket);
        updateSocket.onmessage = function (e) {
          let res = JSON.parse(e.data);

          if (res.data != vm.ordersData) {
            vm.orderDisburse(res.data);
            vm.playSound();
          }

          if (vm.varifyPopup) {
            vm.orderToVarify = res.data.find(
              (order) => order.id == vm.orderToVarify.id
            );
            console.log('jj')
          }

          if (vm.markAsServedPopup) {
            vm.orderToServed = res.data.find(
              (order) => order.id == vm.orderToServed.id
            );
            console.log('kk')
          }

          // vm.queriedItems = res.list.length;

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
  },

  created() {
    this.getTime();
    this.webSocket();

    // setInterval(() => {
    this.getRestaurantOrderItemList();
    // }, 5000);
  },
  // computed: {
  //   ...mapGetters(["ordersData"]),
  // },
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

  .order-manger-area {
    max-height: 60vh;
    overflow-y: scroll;
  }
</style>

