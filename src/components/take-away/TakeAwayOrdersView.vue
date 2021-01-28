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
              of {{ queriedItems }}</span
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
        <vs-th>Order No</vs-th>
        <vs-th>Ordered Items</vs-th>
        <vs-th>Price</vs-th>
        <vs-th>Status Details</vs-th>
        <vs-th>Action</vs-th>
      </template>

      <template slot-scope="{ data }">
        <tbody>
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <vs-td>
              <p class="product-name font-medium truncate text-center">
                {{ itemsPerPage * (currentPage - 1) + indextr + 1 }}
              </p>
            </vs-td>
            <vs-td class="img-container text-center">
              <!-- <img :src="tr.order_no" class="product-img" /> -->
              <p class="product-name font-medium truncate">{{ tr.order_no }}</p>
            </vs-td>

            <vs-td>
              <!-- <p class="product-name font-medium truncate">{{ tr.ordered_items }}</p> -->
              <span v-for="(ordered_item, i) in tr.ordered_items" :key="i">
                <vs-chip> {{ ordered_item.food_name }}</vs-chip>
                <br />
              </span>
            </vs-td>

            <vs-td>
              <p class="product-name font-medium truncate">
                {{ tr.price.payable_amount }}
              </p>
            </vs-td>

            <vs-td>
              <p class="product-name font-medium truncate">
                {{ tr.status_details }}
              </p>
            </vs-td>

            <vs-td class="whitespace-no-wrap">
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

            <tr>
              <td class="font-semibold">Status Details :</td>
              <td>
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
                      <td class="font-semibold">Payable Amount :</td>
                      <td>
                        <p>{{ selectedOrder.price.payable_amount }}</p>
                      </td>
                    </tr>

                    <tr>
                      <td class="font-semibold">Tax Amount :</td>
                      <td>
                        <p>{{ selectedOrder.price.tax_amount }}</p>
                      </td>
                    </tr>

                    <tr>
                      <td class="font-semibold">Vat Percentage :</td>
                      <td>
                        <p>{{ selectedOrder.price.tax_percentage }}</p>
                      </td>
                    </tr>

                    <tr>
                      <td class="font-semibold">Service Charge :</td>
                      <td>
                        <p>{{ selectedOrder.price.service_charge }}</p>
                      </td>
                    </tr>

                    <tr>
                      <td class="font-semibold">Service Base Amount :</td>
                      <td>
                        <p>
                          {{ selectedOrder.price.service_charge_base_amount }}
                          {{
                            selectedOrder.price.service_charge_is_percentage
                              ? "%"
                              : "৳"
                          }}
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td class="font-semibold">Discount Amount :</td>
                      <td>
                        <p>{{ selectedOrder.price.discount_amount }}</p>
                      </td>
                    </tr>

                    <tr>
                      <td class="font-semibold">Grand Total Price :</td>
                      <td>{{ selectedOrder.price.grand_total_price }}</td>
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
            <div
              class="p-3 mb-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary mx-auto"
            >
              <!-- @click="$router.push('/food/create')" -->
              <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
              <span class="ml-2 text-base text-primary">?? ??</span>
            </div>
          </div>
        </div>
      </template>
    </vs-popup>
  </div>
</template>

<script>
import vSelect from "vue-select";
import axios from "@/axios.js";
export default {
  components: {
    "v-select": vSelect,
  },
  data() {
    return {
      resturent_id: localStorage.getItem("resturent_id"),
      selected: [],
      takeAwayOrders: [],
      itemsPerPage: 10,
      isMounted: false,
      active: false,
      popupActive: false,
      selectedOrder: { price: {} },
      orderDetailPopupActive: false,
      isBtnLoading: false
    };
  },
  computed: {
    currentPage() {
      if (this.isMounted) {
        return this.$refs.table.currentx;
      }
      return 0;
    },
  },

  methods: {
    getTakeAwayOrderList() {
      axios
        .get(
          `/restaurant_management/dashboard/take_away_order/${this.resturent_id}/`
        )
        .then((res) => (this.takeAwayOrders = res.data.data))
        .catch((err) => {
          this.showActionMessage("error", err.response.statusText);
          this.checkError(err);
        });
    },

    inTable(order_id, food_items) {
      this.isBtnLoading = true;
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

    createInvoice(order_id) {
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
            this.isBtnLoading = false;
          } else this.showErrorLog(res.data.error.error_details);
        })
        .catch((err) => {
          console.log("error invoice ", err.response);
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
  },
  created() {
    this.getTakeAwayOrderList();
  },
  mounted() {
    this.isMounted = true;
  },
};
</script>

<style lang="scss" >
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
