<template>
  <div>
    <div class="flex flex-wrap-reverse items-center data-list-btn-container">
      <datepicker
        class="m-2 ml-0"
        placeholder="Start Date"
        v-model="startDate"
      ></datepicker>
      <datepicker
        class="m-2"
        placeholder="End Date"
        v-model="endDate"
      ></datepicker>

      <vs-button class="m-2" @click="getTodaysOrder()">Go</vs-button>
    </div>

    <vs-table class="p-0" ref="table" :data="orders">
      <template slot="thead">
        <th>Order Number</th>
        <th>Table Number</th>
        <th>Time</th>
        <th>Customer Name</th>
        <th>Waiter Name</th>
        <th>Price</th>
        <th>Discount Price</th>
      </template>

      <template slot-scope="{ data }">
        <tbody>
          <vs-tr :data="tr" v-for="(tr, i) in data" :key="i">
            <vs-td
              ><p>#{{ tr.order }}</p></vs-td
            >
            <vs-td
              ><p>{{ tr.order_info.table }}</p></vs-td
            >
            <vs-td
              ><p>{{ dateFromat(tr.created_at) }}</p>
            </vs-td>
            <vs-td><p>-</p> </vs-td>
            <vs-td
              ><p>{{ tr.order_info.waiter.name }}</p>
            </vs-td>
            <vs-td
              ><p>{{ tr.order_info.price.grand_total_price }}</p>
            </vs-td>
            <vs-td
              ><p>{{ tr.order_info.price.discount_amount }}</p>
            </vs-td>
          </vs-tr>
        </tbody>
      </template>
    </vs-table>
  </div>
</template>

<script>
import axios from "@/axios.js";
import moment from "moment";
import Datepicker from "vuejs-datepicker";

export default {
  components: {
    Datepicker,
  },

  data: () => ({
    resturent_id: localStorage.getItem("resturent_id"),
    orders: [],
    limit: 10,
    startDate: moment().format("YYYY-MM-01"),
    endDate: moment().format(),
  }),

  methods: {
    getTodaysOrder() {
      axios
        .post(
          `/restaurant_management/dashboard/invoice_all_report/${this.resturent_id}/`,
          {
            start_date: moment(this.startDate).format('Y-M-D'),
            end_date: moment(this.endDate).format('Y-M-D'),
          }
        )
        .then((res) => {
          this.orders = res.data.data.results;
        })
        .catch((err) => {
          this.showActionMessage("error", err.response.statusText);
          this.checkError(err);
        });
    },

    dateFromat(date) {
      return moment(date).format("D-M-Y h:mm:ss");
    },
  },

  created() {
    this.getTodaysOrder();
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