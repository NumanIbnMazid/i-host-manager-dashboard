<template>
  <vs-sidebar
    position-right
    default-index="1"
    color="primary"
    class="sidebarx new-sider"
    spacer
    v-model="active"
  >
    <div class="header-sidebar md:flex" slot="header">
      <div class="md:flex bg-white rounded-lg px-6 py-3 w-full">
        <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
          <img
            class="h-16 w-16 md:h-12 md:w-12 rounded-full mx-auto md:mx-0 md:mr-6 shadow-md"
            src="http://i-host.com.bd/assets/team/karina.jpeg"
          />
          <vs-dropdown-menu class="vx-navbar-dropdown">
            <ul style="min-width: 9rem">
              <li
                class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                @click="logout"
              >
                <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4" />
                <span class="ml-2">Logout</span>
              </li>
            </ul>
          </vs-dropdown-menu>
        </vs-dropdown>
        <div class="text-center md:text-left my-auto w-full">
          <h6>Tahsin Karina</h6>
          <p class="text-sm">Manager</p>
        </div>

        <div class="text-right md:text-right float-right my-auto w-full">
          <vs-dropdown
            vs-custom-content
            vs-trigger-click
            class="cursor-pointer"
            badge="4"
          >
            <feather-icon
              icon="BellIcon"
              class="cursor-pointer mt-1 sm:mr-6 mr-2"
            />

            <vs-dropdown-menu
              class="notification-dropdown dropdown-custom vx-navbar-dropdown"
            >
              <div
                class="notification-top text-center p-5 bg-primary text-white"
              >
                <h3 class="text-white">8 New</h3>
                <p class="opacity-75">App Notifications</p>
              </div>

              <component
                :is="scrollbarTag"
                ref="mainSidebarPs"
                class="scroll-area--nofications-dropdown p-0 mb-10"
                :settings="settings"
                :key="$vs.rtl"
              >
                <ul class="bordered-items"></ul>
              </component>

              <div
                class="checkout-footer fixed bottom-0 rounded-b-lg text-primary w-full p-2 font-semibold text-center border border-b-0 border-l-0 border-r-0 border-solid d-theme-border-grey-light cursor-pointer"
              >
                <span>View All Notifications</span>
              </div>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>
      </div>
    </div>

    <vs-sidebar-item index="1">
      <div class="mx-10 py-4 w-full text-center bg-primary rounded shadow-md">
        <h1 class="text-white">88270৳</h1>
        <p class="text-ihosts"><b> Total Sell Today </b></p>
      </div>
    </vs-sidebar-item>
    <vs-sidebar-item index="2">
      <h5 class="text-center mx-auto">10/10/2020</h5></vs-sidebar-item
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
                <div class="order-box first-box">
                  #{{ order.id }}
                </div>
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
                  <span :class="`status-chip rounded text-white bg-${selectColor(order.status)}`">{{
                    order.status_details
                  }}</span>
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
export default {
  data: () => ({
    active: true,
    resturent_id: localStorage.getItem("resturent_id"),
    orders: [],
  }),

  methods: {
    getOrderItemList() {
      axios
        .get(
          `/restaurant_management/restaurant/${this.resturent_id}/order_item_list/`
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

    logout() {
      axios
        .post("/account_management/auth/logout/")
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          localStorage.removeItem("token");
          localStorage.removeItem("resturent_id");
          console.log("log out error ", err);
        });

      // localStorage.removeItem("token");
      // localStorage.removeItem("resturent_id");

      this.$router.push("/login").catch(() => {});
    },
  },

  created() {
    this.getOrderItemList();
  },
};
</script>

<style >
  .new-sider .vs-sidebar {
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

