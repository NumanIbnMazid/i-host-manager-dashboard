<template>
  <div id="data-list-thumb-view" class="data-list-container">
    <h2 class="m-2 text-center">Running Orders</h2>

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
            <span class="mr-2" v-if="takeAwayOrders !=null"
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

          <vs-dropdown-menu v-if="takeAwayOrders !=null">
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

            <vs-td class="text-center">
              <!-- <p class="product-name font-medium truncate">{{ tr.ordered_items }}</p> -->
              <span  v-for="(ordered_item, i) in tr.ordered_items" :key="i">
                <vs-chip > {{ ordered_item.food_name }}</vs-chip>
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
                  getUpdatedPriceDetails(tr.id);

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


    <!-- order details info popup -->
    <vs-popup
      class="holamundo"
      :title="selectedOrder.status_details != 'Create Invoice' ? `Order No #${selectedOrder.order_no}, Status: Processing` : `Order No #${selectedOrder.order_no}, Status: ${selectedOrder.status_details}`"

      :active.sync="orderDetailPopupActive"
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
              @click="addOrderedItems(selectedOrder, '3_IN_TABLE')"

            ></vs-button>
          </div>
        </div>
      </div>

      <vs-table>

        <template slot="thead">
          <vs-th class="text-center">Check</vs-th>
          <vs-th class="text-center">Item Id</vs-th>
          <vs-th class="text-center">Name</vs-th>
          <vs-th class="text-center">Options</vs-th>
          <vs-th class="text-center">Price</vs-th>
          <vs-th class="text-center">Action</vs-th>
        </template>

        <template slot-scope="{ data }">
          <vs-tr
            :data="selectedOrder.ordered_items"
            :class="`text-center ${
              selectedOrder.ordered_items.status == '0_ORDER_INITIALIZED' ? 'bg-grey' : ''
            }`"
            :key="i"
            v-for="(tr, i) in selectedOrder.ordered_items"
          >
            <!-- v-show="data[i].status != '0_ORDER_INITIALIZED'" -->
            <vs-td>

              <span
                v-if="tr.status === '4_CANCELLED'"
                class="badge bg-danger text-white rounded"
              >Canceled</span
              >
              <span
                v-if="tr.status === '0_ORDER_INITIALIZED'"
                class="text-yl"
              >Item Carts by user</span
              >
            </vs-td>

            <vs-td>
              {{ tr.id }}
            </vs-td>

            <vs-td class="text-center">
              {{ tr.food_name }}
            </vs-td>


            <vs-td class="text-center">
              <span class="bg-gn p-1 rounded text-white">
                <i v-if="tr.food_option.option_type.name != 'single_type'">
                  {{ tr.food_option.option_type.name }}:</i
                >
                {{ tr.food_option.name }}
              </span>
            </vs-td>
            <vs-td > ৳{{ tr.price }} </vs-td>
            <vs-td>
              <span
                v-if="tr.status != '4_CANCELLED'"
                class="badge rounded bg-rd text-white"
                style="cursor: pointer"
                @click="cancelOrderItem(selectedOrder.id, tr.id)"

              >Cancel</span
              >
              <br />

            </vs-td>
          </vs-tr>
        </template>


      </vs-table>
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



                  <!-- price details -->
                  <tr>
                    <td>
                      <div
                        class="price-details table-card mt-5 w-full"
                        v-if="priceDetails.price"
                      >
                        <p class="text-ihostm m-2 text-center">Price Details</p>
                        <hr />
                        <table class="m-2">

                          <tr>
                            <td class="font-semibold">Total Price :</td>
                            <td>{{ priceDetails.price.total_price }}</td>
                          </tr>
                          <tr>
                            <td class="font-semibold">Service Charge :</td>
                            <td>
                              <p>{{ priceDetails.price.service_charge }}</p>
                            </td>
                          </tr>
                          <tr>
                            <td class="font-semibold">Vat Amount :</td>
                            <td>
                              <p>{{ priceDetails.price.tax_amount }}</p>
                            </td>
                          </tr>
                          <tr>
                            <td class="font-semibold">Grand Total :</td>
                            <td>
                              <p>{{ priceDetails.price.grand_total_price }}</p>
                            </td>
                          </tr>

                          <tr>
                            <td class="font-semibold">Discount Amount :</td>
                            <td>
                              <p>{{ priceDetails.price.discount_amount }}</p>
                            </td>
                          </tr>

                          <tr>
                            <td class="font-semibold">Net Total :</td>
                            <td>
                              <p>{{ priceDetails.price.payable_amount }}</p>
                            </td>
                          </tr>


                        </table>
                      </div>
                    </td>
                  </tr>

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

      <!-- action buttons -->

    </vs-popup>

<!--&lt;!&ndash; First Version &ndash;&gt;-->
<!--    &lt;!&ndash; order detail info popup &ndash;&gt;-->
<!--    <vs-popup-->
<!--      class="holamundo w-full"-->
<!--      :title="`Order Details`"-->
<!--      :active.sync="orderDetailPopupActive"-->
<!--    >-->
<!--      <template>-->
<!--        <div class="con-expand-users w-full">-->
<!--          &lt;!&ndash; <div class="con-btns-user flex items-center justify-between">-->
<!--            <img-->
<!--              class="rounded mx-auto"-->
<!--              style="height: 180px"-->
<!--              :src="selectedOrder.image"-->
<!--            />-->
<!--          </div> &ndash;&gt;-->

<!--          <table class="mx-auto mt-4 center">-->
<!--            <tr>-->
<!--              <td class="font-semibold">Order No :</td>-->
<!--              <td>{{ selectedOrder.order_no }}</td>-->
<!--            </tr>-->
<!--&lt;!&ndash;            <tr>&ndash;&gt;-->
<!--&lt;!&ndash;              <td class="font-semibold">Take away type :</td>&ndash;&gt;-->
<!--&lt;!&ndash;              <td>{{ selectedOrder.take_away_type_method.name }}</td>&ndash;&gt;-->
<!--&lt;!&ndash;            </tr>&ndash;&gt;-->

<!--            <tr>-->
<!--              <td class="font-semibold">Status Details :</td>-->
<!--              <td v-if="selectedOrder.status_details != 'Create Invoice'">-->
<!--                <p>Processing</p>-->
<!--              </td>-->
<!--              <td v-else>-->
<!--                <p>{{ selectedOrder.status_details }}</p>-->
<!--              </td>-->
<!--            </tr>-->

<!--            &lt;!&ndash; price details &ndash;&gt;-->
<!--            <tr>-->
<!--              <td>-->
<!--                <div-->
<!--                  class="price-details table-card mt-5 w-full"-->
<!--                  v-if="selectedOrder.price"-->
<!--                >-->
<!--                  <td class="text-ihostm m-2 text-center">Price Details</td>-->
<!--                  <hr />-->
<!--                  <table class="m-2">-->

<!--                    <tr>-->
<!--                      <td class="font-semibold">Total Price :</td>-->
<!--                      <td>{{ selectedOrder.price.total_price }}</td>-->
<!--                    </tr>-->
<!--                    <tr>-->
<!--                      <td class="font-semibold">Service Charge :</td>-->
<!--                      <td>-->
<!--                        <p>{{ selectedOrder.price.service_charge }}</p>-->
<!--                      </td>-->
<!--                    </tr>-->
<!--                    <tr>-->
<!--                      <td class="font-semibold">Vat Amount :</td>-->
<!--                      <td>-->
<!--                        <p>{{ selectedOrder.price.tax_amount }}</p>-->
<!--                      </td>-->
<!--                    </tr>-->
<!--                    <tr>-->
<!--                      <td class="font-semibold">Grand Total :</td>-->
<!--                      <td>-->
<!--                        <p>{{ selectedOrder.price.grand_total_price }}</p>-->
<!--                      </td>-->
<!--                    </tr>-->

<!--                    <tr>-->
<!--                      <td class="font-semibold">Discount Amount :</td>-->
<!--                      <td>-->
<!--                        <p>{{ selectedOrder.price.discount_amount }}</p>-->
<!--                      </td>-->
<!--                    </tr>-->

<!--                    <tr>-->
<!--                      <td class="font-semibold">Net Total :</td>-->
<!--                      <td>-->
<!--                        <p>{{ selectedOrder.price.payable_amount }}</p>-->
<!--                      </td>-->
<!--                    </tr>-->


<!--                  </table>-->
<!--                </div>-->
<!--              </td>-->
<!--            </tr>-->

<!--          </table>-->
<!--          <br />-->

<!--          <div class="flex flex-wrap-reverse items-center">-->
<!--            &lt;!&ndash; <vs-button-->
<!--              v-if="confirmOrder"-->
<!--              color="dark"-->
<!--              class="text-1xl text-white w-64 bg-black mx-auto"-->
<!--              type="flat"-->
<!--              @click="inTable(selectedOrder)"-->
<!--              :disabled="isBtnLoading ? true : false"-->
<!--            >-->
<!--              Confirm Order</vs-button-->
<!--            > &ndash;&gt;-->

<!--&lt;!&ndash;            <vs-button&ndash;&gt;-->
<!--&lt;!&ndash;              v-if="isInvoiceCreated"&ndash;&gt;-->
<!--&lt;!&ndash;              color="dark"&ndash;&gt;-->
<!--&lt;!&ndash;              class="text-1xl text-white w-64 bg-black mx-auto"&ndash;&gt;-->
<!--&lt;!&ndash;              type="flat"&ndash;&gt;-->
<!--&lt;!&ndash;              @click="createInvoice(selectedOrder)"&ndash;&gt;-->
<!--&lt;!&ndash;              :disabled="isBtnLoading ? true : false"&ndash;&gt;-->
<!--&lt;!&ndash;            >&ndash;&gt;-->
<!--&lt;!&ndash;              Create Invoice</vs-button&ndash;&gt;-->
<!--&lt;!&ndash;            >&ndash;&gt;-->
<!--            <vs-button-->
<!--              v-if="selectedOrder.status_details != 'Create Invoice'"-->
<!--              color="dark"-->
<!--              class="text-1xl text-white w-64 bg-black mx-auto"-->
<!--              type="flat"-->
<!--              @click="show_discount_form()"-->
<!--              :disabled="isBtnLoading ? true : false"-->
<!--            >-->
<!--              Create Invoice</vs-button-->
<!--            >-->


<!--            <vs-button-->
<!--              v-if="selectedOrder.status_details =='Create Invoice'"-->
<!--              color="dark"-->
<!--              class="text-1xl text-white w-64 bg-black mx-auto"-->
<!--              type="flat"-->
<!--              @click="confirmPaymentOrder(selectedOrder)"-->
<!--              :disabled="isBtnLoading ? true : false"-->
<!--            >-->
<!--              Collect Cash</vs-button-->
<!--            >-->
<!--          </div>-->
<!--        </div>-->
<!--      </template>-->
<!--    </vs-popup>-->

          <vs-popup title="Invoice Preview" :active.sync="takeawayOrdersPaymentShow">
          <TakeawayPayments
            :theOrder="TakeawayPaymentOrder"
            @emitAfterTakeawayPayments="afterTakeawayPayments"


          ></TakeawayPayments>
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
                      <span class="mr-2" v-if="completeTakeawayOrders !=null"
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

              <vs-dropdown-menu v-if="completeTakeawayOrders != null">
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
import TakeawayPayments from "./TakeawayPayments";


export default {
  components: {
    "v-select": vSelect,
    TakeawayPayments
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
      takeawayOrdersPaymentShow: false,
      TakeawayPaymentOrder: "",
      selectedFood: "",
      foods: [],
      foodExtraTypes: [],
      foodExtras: [],
      foodOptions: [],
      selectedOption: "",
      selectedFoodExtraTypes: [],
      quantity: 1,
      selectedItemForVarify: [],
      clicked_on_add_ordered_items: false,
      priceDetails:[],




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


    getUpdatedPriceDetails(orderId)
    {
      axios
        .get(`/restaurant_management/dashboard/order/create_order/${orderId}/`)
        .then((res) => {
          this.priceDetails = res.data.data;
          console.log("price details",this.priceDetails);
        })
        .catch((err) => {
          this.showActionMessage("error", err.response.statusText);
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
            // this.ordersData = this.ordersData.map((order) =>
            //   order.id === order_id ? { ...res.data.data } : order
            // );
            // if(!this.checkAllCanceled(res.data.data.order_item)){
            this.selectedOrder = res.data.data;
            this.getTakeAwayOrderList();
            this.getUpdatedPriceDetails(order_id);
            // }else{
            //   this.orderToServed = [];
            // }
          }
        })
        .catch((err) => {
          this.showActionMessage("error", err);
          this.checkError(err);
        });
    },


    // adding food order to order cart
    addOrderedItems(orderToProcess, status) {
      this.clicked_on_add_ordered_items = true;
      console.log("orderToProcess1 ", orderToProcess);
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
            // this.ordersData.map(
            //   (order) =>
            //     order.id === orderToProcess.id &&
            //     order.ordered_items.push(res.data.data[0])
            // );

            orderToProcess.ordered_items.push(res.data.data[0]);
            this.getTakeAwayOrderList();
            this.getUpdatedPriceDetails(orderToProcess.id);

            console.log("selected orderrrrrrrrrrrrrrrrrrr",this.selectedOrder);
            console.log("before selected orderrrrrr",res.data.data);

            // clear food state after add item to cart
            this.selectedFood = "";

            //clear food option after add item to cart
            this.selectedOption = "";
          } else this.showActionMessage("error", "New Item Add Failed!");
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



    show_discount_form()
    {
      this.popup_discount_form = true;
      this.orderDetailPopupActive = false;

    },

    afterTakeawayPayments(is_invoice_preview_false) {

      this.takeawayOrdersPaymentShow = is_invoice_preview_false;
      this.getTakeAwayOrderList();
      this.getAllTakeawayOrders();
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
      console.log("ordersssssssssssssssss",order);
      this.orderDetailPopupActive = false;
      this.takeawayOrdersPaymentShow = true;
      this.TakeawayPaymentOrder = order;
       //
       // this.isBtnLoading = true;
       // axios
       //   .post("/restaurant_management/dashboard/order/confirm_payment/", {
       //     order_id: order.id,
       //   })
       //   .then((res) => {
       //     if (res.data.status) {
       //
       //       const leftTakeAwayOrders = this.takeAwayOrders.filter(
       //         (takeAwayorder) => takeAwayorder.id !== order.id
       //       );
       //
       //       // if the order is running then remove order from newOrder board
       //       if (order.id === this.runningTakeAwayOrder.id) {
       //         localStorage.removeItem("orderData");
       //       }
       //
       //       this.takeAwayOrders = leftTakeAwayOrders;
       //       this.getAllTakeawayOrders();
       //       this.isInvoiceCreated = false;
       //       this.collectCash = true;
       //       this.isBtnLoading = false;
       //       this.orderDetailPopupActive = false;
       //     } else this.showErrorLog(res.data.error.error_details);
       //   })
       //   .catch((err) => {
       //     console.log("err co ", err.response);
       //   });

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
        var error_message = '';
        error_message = res.data.msg;
        if (error_message != 'success') {

          return this.showActionMessage("error", error_message);
        }
        else
          {
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
        }


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
