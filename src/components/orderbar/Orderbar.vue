<template>
  <vs-sidebar
    position-right
    default-index="1"
    color="primary"
    class="sidebarx new-sidebar"
    spacer
    v-model="active"
  >
    <!-- user profile and notification -->
    <UserProfile />

    <vs-sidebar-item index="1">
      <div class="mx-10 py-4 w-full text-center bg-primary rounded shadow-md">
        <h1 class="text-white">{{ total_sell }} ৳</h1>
        <p class="text-ihosts"><b> Total Sell Today </b></p>
      </div>
    </vs-sidebar-item>
    <vs-sidebar-item index="2">
      <h5 class="text-center mx-auto">{{ date }}</h5></vs-sidebar-item
    >
    <vs-sidebar-item index="3">
      <div class="w-full">
        <table class="order-table w-full">
          <thead>
            <tr class="bg-primary">
              <th class="text-center text-white">Order&nbsp;No</th>
              <th class="text-center text-white">Table</th>
              <th class="text-center text-white">Amount</th>
              <th class="text-center text-white">
                &nbsp;&nbsp; Status &nbsp;&nbsp;
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, i) in orders" :key="i">
              <td class="text-center">
                <div class="order-box first-box">#{{ order.id }}</div>
              </td>
              <td class="text-center">
                <div class="order-box">
                  {{ order.table_no }}
                </div>
              </td>
              <td class="text-center">
                <div class="order-box">
                  {{ order.price.total_price }}
                </div>
              </td>
              <td class="text-center">
                <div class="order-box last-box">
                  <span
                    :class="`status-chip rounded text-white bg-${selectColor(
                      order.status
                    )}`"
                    >{{ order.status_details }}</span
                  >
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </vs-sidebar-item>
  </vs-sidebar>
</template>

<script>
import axios from "@/axios.js";
import moment from "moment";

import UserProfile from "../../views/UserProfile";
export default {
  components: {
    UserProfile,
  },
  data: () => ({
    staff_info: JSON.parse(localStorage.getItem("staff_info")),
    user: JSON.parse(localStorage.getItem("user")),
    active: true,
    resturent_id: localStorage.getItem("resturent_id"),
    orders: [],
    total_sell: "",
    date: "",
  }),

  methods: {
    getTodaysTotalSell() {
      axios
        .get(
          `/restaurant_management/dashboard/restaurant/${this.resturent_id}/today_sell/`
        )
        .then((res) => {
          if (res.data.status) {
            this.total_sell = res.data.data.total_sell;
          } else {
            this.showActionMessage(
              "error",
              "Something went wrong getting total sell!"
            );
          }
        })
        .catch((err) => {
          this.showActionMessage("error", err);
          this.checkError(err);
        });
    },

    getOrderItemList() {
      axios
        .get(
          `/restaurant_management/dashboard/restaurant/${this.resturent_id}/order_item_list/`
        )
        .then((res) => {
          console.log("r ", res);
          this.orders = res.data.data.filter((el) => el.status);
        })
        .catch((err) => {
          console.log("eroil ", err.response);
          this.showActionMessage("error", err);
          this.checkError(err);
        });
    },

    getDate() {
      this.date = moment().format("DD/MM/YYYY");
    },

    profilePage() {
      this.$router.push("/profile/setting").catch(() => {});
    },

    logout() {
      axios
        .post("/account_management/auth/logout/")
        .then((res) => {
          console.log(res);
          localStorage.removeItem("token");
          localStorage.removeItem("resturent_id");
          localStorage.removeItem("resturent");
          localStorage.removeItem("user");
          localStorage.removeItem("staff_info");
        })
        .catch((err) => {
          localStorage.removeItem("token");
          localStorage.removeItem("resturent_id");
          localStorage.removeItem("resturent");
          localStorage.removeItem("user");
          localStorage.removeItem("staff_info");
          console.log("log out error ", err);
        });

      // localStorage.removeItem("token");
      // localStorage.removeItem("resturent_id");

      this.$router.push("/login").catch(() => {});
    },
  },

  created() {
    this.getOrderItemList();
    this.getDate();
    this.getTodaysTotalSell();
  },
};
</script>

<style >
  .new-sidebar .vs-sidebar {
    max-width: 325px !important;
    background: #ffffff !important;
    position: fixed;
    height: 100% !important;
    top: 0;
    z-index: 1;
  }

  .vs-sidebar--header {
    border-bottom: 0px !important;
  }

  .vs-sidebar-primary .vs-sidebar-item-active {
    border-right: 0px !important;
  }
  .vs-sidebar--item a {
    opacity: 1 !important;
  }

  .order-table {
    border-collapse: collapse;
  }

  table.order-table th {
    padding: 6px 4px;
  }

  table.order-table th:first-child {
    border-radius: 3px 0px 0px 3px;
  }

  table.order-table th:last-child {
    border-radius: 0px 3px 3px 0px;
  }

  /* table.order-table tbody tr {
                        padding: 6px 4px;
                        border-top: 1px solid #ddd;
                        border-bottom: 1px solid #ddd;
                        margin: 10px 0px !important;
                      } */

  .order-box {
    padding: 5px 0px;
    margin: 3px 0px;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }
  .first-box {
    border-left: 1px solid #ddd;
    border-radius: 2px 0px 0px 2px;
  }

  .last-box {
    border-right: 1px solid #ddd;
    border-radius: 0px 2px 2px 0px;
  }

  .con-vs-chip {
    font-size: 8px;
    min-height: 20px;
  }
  .status-chip {
    border: 1px solid #ddd;
    /* margin: 1px; */
    padding: 2px 3px;
  }
</style>

