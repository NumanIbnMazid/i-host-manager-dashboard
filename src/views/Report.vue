<template>
  <div>
    <div id="data-list-list-view" class="data-list-container">
      <vs-table
        ref="table"
        v-model="selected"
        pagination
        :max-items="itemsPerPage"
        search
        :data="orders"
      >
        <div
          slot="header"
          class="flex flex-wrap-reverse items-center flex-grow justify-between"
        >
          <div
            class="flex flex-wrap-reverse items-center data-list-btn-container"
          >
            <datepicker placeholder="Start Date" v-model="date"></datepicker>
            <datepicker placeholder="End Date" v-model="date"></datepicker>
          </div>

          <!-- ITEMS PER PAGE -->
          <vs-dropdown
            vs-trigger-click
            class="cursor-pointer mr-3 items-per-page-handler"
          >
            <div
              class="p-3 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
            >
              <span class="mr-2"
                >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} -
                {{
                  orders.length - currentPage * itemsPerPage > 0
                    ? currentPage * itemsPerPage
                    : orders.length
                }}
                of {{ queriedItems }}</span
              >
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>
            <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
            <vs-dropdown-menu>
              <vs-dropdown-item @click="itemsPerPage = 4">
                <span>4</span>
              </vs-dropdown-item>
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
          <vs-th sort-key="order_id">Order Id</vs-th>
          <vs-th>Status</vs-th>
          <vs-th>Item</vs-th>
          <vs-th>Total Price</vs-th>
          <vs-th>Items Detail</vs-th>
        </template>

        <template slot-scope="{ data }">
          <tbody>
            <vs-tr
              :data="tr"
              :key="indextr"
              v-for="(tr, indextr) in data"
              style="border-collapse: separate; border-spacing: 0 1.3rem"
            >
              <vs-td>
                <p class="product-name font-medium truncate">{{ tr.id }}</p>
              </vs-td>

              <vs-td>
                <vs-chip
                  transparent
                  :color="statusColor(tr.order_status.status)"
                  :style="`${
                    statusColor(tr.order_status.status) == 'red'
                      ? 'color: #fff !important'
                      : ''
                  }`"
                  >{{ tr.order_status.status }}
                </vs-chip>
              </vs-td>

              <vs-td>
                <p class="product-category">{{ tr.table.table_no }}</p>
              </vs-td>

              <vs-td>
                <p class="product-category">{{ tr.total_price }}/-</p>
              </vs-td>

              <vs-td>
                <vs-chip
                  class="p-3"
                  transparent
                  color="primary"
                  v-for="(item, i) in tr.food"
                  :key="i"
                >
                  Name: {{ item.food.name }} <br />
                  Price: {{ item.food.price }} | Qty: {{ item.quantity }} <br />
                  Total: {{ item.price }}/-</vs-chip
                >
              </vs-td>
            </vs-tr>
          </tbody>
        </template>
      </vs-table>
    </div>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import axios from "@/axios.js";
export default {
  components: {
    Datepicker,
  },

  data: () => ({
    resturent_id: localStorage.getItem("resturent_id"),
    orders: [],
    itemsPerPage: 10,
    selected: "",
    currentPage: 1,
    queriedItems: 0,
    date: null,
  }),

  methods: {
    getData() {
      axios
        .get(`/reporting/sales-report/?res_id=${this.resturent_id}`, {
          // from_date: "2020-09-27",
          // to_date: "2020-09-27",
          // order_status: "Paid",
        })
        .then((res) => {
          // console.log(res.data.data);
          this.orders = res.data.data;
          this.queriedItems = res.data.data.length;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    statusColor(status) {
      switch (status) {
        case "Paid":
          return "success";
          break;

        case "Pending":
          return "danger";
          break;

        case "Received":
          return "warning";
          break;

        case "Verified":
          return "#009a45";
          break;

        case "Rejected":
          return "red";
          break;

        case "Delivered":
          return "green";
          break;

        default:
          break;
      }
    },
  },

  created() {
    this.getData();
  },
};
</script>

<style scoped>
td {
  border-top: 10px solid #f8f8f8;
}
</style>