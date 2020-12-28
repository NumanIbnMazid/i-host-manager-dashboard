<template>
  <div>Date wise</div>
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