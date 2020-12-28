<template>
  <div>
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
              ><p>{{ tr.order }}</p></vs-td
            >
            <vs-td
              ><p>{{ tr.order_info.table }}</p></vs-td
            >
            <vs-td
              ><p>{{ dateFromat(tr.order_info.created_at) }}</p>
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

export default {
  components: {},

  data: () => ({
    resturent_id: localStorage.getItem("resturent_id"),
    orders: [],
    limit: 10,
  }),

  methods: {
    getTodaysOrder() {
      axios
        .get(
          `/restaurant_management/dashboard/restaurant/${this.resturent_id}/invoice_history/?limit=${this.limit}`
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