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
      <SellToday :todayData="todayData"></SellToday>
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
            <tr v-for="(order, i) in ordersData" :key="i" v-show="order.status">
              <td class="text-center">
                <div class="order-box first-box">#{{ order.order_no }}</div>
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
import SellToday from "./SellToday";

import UserProfile from "../../views/UserProfile";
import { mapGetters } from "vuex";
export default {
  components: {
    UserProfile,
    SellToday,
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

  // watch:{

  // },

  methods: {
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
    // TODO: Logout problem
    // logout() {
    //   axios
    //     .post("/account_management/auth/logout/")
    //     .then((res) => {
    //       localStorage.clear();
    //       window.location.href = "/login";
    //     })
    //     .catch((err) => {
    //       this.checkError(err);
    //     });
    // },
  },

  created() {
    // this.getOrderItemList();
    this.getDate();
  },
  computed: {
    ...mapGetters(["ordersData", "todayData"]),
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

