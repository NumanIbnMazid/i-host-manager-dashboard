<template>
  <div>
    <div id="data-list-list-view" class="data-list-container">
      <span class="text-danger" v-if="!startDate || !endDate">Please fill up date fields...</span>
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
            <datepicker
              class="m-2"
              placeholder="Start Date"
              v-model="startDate"
            ></datepicker>
            <datepicker
              class="m-2"
              placeholder="End Date"
              v-model="endDate"
            ></datepicker>

            <vs-button class="m-2" @click="getData()">Go</vs-button>
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
          <vs-th sort-key="order_id">Name</vs-th>
          <vs-th>Food Extra</vs-th>
          <vs-th>Food Option</vs-th>
          <vs-th>Price</vs-th>
          <vs-th>Qty</vs-th>
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
                <p class="product-name font-medium truncate">{{ tr.name }}</p>
              </vs-td>

              <vs-td>
                <p
                  class="product-category"
                  v-for="(foodExtra, indexNum) in tr.food_extra"
                  :key="indexNum"
                >
                  {{ foodExtra.name }} {{ foodExtra.quatity }}
                </p>
              </vs-td>

              <vs-td>
                <p
                  class="product-category"
                  v-for="(foodOption, indexNum) in tr.food_option"
                  :key="indexNum"
                >
                  {{ foodOption.name }} {{ foodOption.quatity }}
                </p>
              </vs-td>

              <vs-td>
                <p class="product-category">{{ tr.price }}/-</p>
              </vs-td>

              <vs-td>
                <p class="product-category">{{ tr.quantity }}/-</p>
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
import moment from 'moment';
export default {
  components: {
    Datepicker,
  },

  data: () => ({
    resturent_id: localStorage.getItem("resturent_id"),
    orders: [],
    startDate: moment().format('YYYY-MM-01'),
    endDate: moment().format(),
    itemsPerPage: 10,
    selected: "",
    currentPage: 1,
    queriedItems: 0,
    date: null,
  }),

  methods: {
    getData() {
      console.log(this.startDate)
      console.log(this.endDate)
      axios
        .post(`/restaurant_management/dashboard/food_report_by_date_range/`, {
          start_date: this.startDate,
          end_date: this.endDate,
          restaurant_id: this.resturent_id
        })
        .then((res) => {
          console.log("report data ", res.data.data);
          this.orders = res.data.data;
          this.queriedItems = res.data.data.length;
        })
        .catch((err) => {
          console.log("error report", err.response);
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