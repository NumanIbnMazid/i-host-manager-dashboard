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

      <vs-button
        class="m-2"
        @click="
          getWaitersData();
          search = true;
        "
        >Go</vs-button
      >
      <vs-button class="m-2" color="danger" v-if="search" @click="resetFilter()"
        >Reset</vs-button
      >
    </div>
    <vs-table class="p-0" ref="table" :data="waiters">
      <template slot="thead">
        <th>Rank</th>
        <th style="text-align: left !important">Item Name</th>
        <th>Total Order Serve</th>
        <th>Total Order Amount</th>
        <!-- <th>Total Sell</th> -->
      </template>

      <template slot-scope="{ data }">
        <tbody>
          <vs-tr :data="tr" v-for="(tr, i) in data" :key="i">
            <vs-td
              ><p>{{ i + 1 }}</p></vs-td
            >
            <vs-td class="text-left"
              ><p class="ml-5">
                {{ tr.staff_info.name }}
              </p></vs-td
            >

            <vs-td
              ><p>{{ tr.total_served_order }}</p>
            </vs-td>
            <vs-td
              ><p>৳{{ tr.total_payment_amount }}</p>
            </vs-td>
            <!-- <vs-td
              ><p>{{ tr.price }}</p>
            </vs-td> -->
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
  components: { Datepicker },

  data: () => ({
    resturent_id: localStorage.getItem("resturent_id"),
    waiters: [],
    startDate: moment().format("YYYY-MM-01"),
    endDate: moment().format(),
    limit: 10,
    search: false,
  }),

  methods: {
    getWaitersData() {
      axios
        .post(
          `/restaurant_management/dashboard/waiter_report_by_date_range/${this.resturent_id}/?limit=100&offset=0`,
          {
            start_date: moment(this.startDate).format("Y-M-D"),
            end_date: moment(this.endDate).format("Y-M-D"),
          }
        )
        .then((res) => {
          this.waiters = res.data.data.results;
        })
        .catch((err) => {
          this.showActionMessage("error", err.response.statusText);
          this.checkError(err);
        });
    },
    resetFilter() {
      this.startDate = moment().format("YYYY-MM-01");
      this.endDate = moment().format();
      this.search = false;

      this.getWaitersData();
    },

    dateFromat(date) {
      return moment(date).format("D-M-Y h:mm:ss");
    },
  },

  created() {
    this.getWaitersData();
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