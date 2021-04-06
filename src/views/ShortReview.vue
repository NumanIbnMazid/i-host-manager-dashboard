<template>
  <div>
    <div class="vx-row mb-10">
      <div class="vx-col md:w-1/2">
        <h1 class="text-grey-dark">Review Dashboard</h1>
      </div>
    </div>

    <div class="vx-row mb-3">
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <statistics-card-line
          hideChart
          class="mb-base"
          icon="CpuIcon"
          icon-right
          :statistic="`৳ ${total_sell_detail.current_month_total_sell}`"
          statisticTitle="Total Sell current month"
        />
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <statistics-card-line
          hideChart
          class="mb-base"
          icon="ServerIcon"
          icon-right
          :statistic="`${total_sell_detail.current_month_total_order}`"
          statisticTitle="Total Order current month"
          color="success"
        />
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <statistics-card-line
          hideChart
          class="mb-base"
          icon="ActivityIcon"
          icon-right
          :statistic="`৳ ${total_sell_detail.last_month_total_sell}`"
          statisticTitle="Total Sell last month"
          color="danger"
        />
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <statistics-card-line
          hideChart
          class="mb-base"
          icon="AlertOctagonIcon"
          icon-right
          :statistic="`${total_sell_detail.last_month_total_order}`"
          statisticTitle="Total Order last month"
          color="warning"
        />
      </div>
    </div>

   <div class="flex flex-wrap-reverse items-center data-list-btn-container">
     <v-select
       placeholder="Select Type"
       v-model="type_of_month_basis"
       :options="['Life Time', 'Current Month','Previous Month','Weekly']"
       style="min-width: 200px"

     />
   </div>


    <div v-if="type_of_month_basis == 'Life Time'">
      <div class="vx-row mt-6 mb-3">
      <div class="vx-col md:w-1/2">
        <h3 class="text-grey-dark">Total: {{total_item}}</h3>
      </div>
      </div>

      <div class="vx-row mb-3" >
        <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4" v-for="(tr, index) in total_payment_received" :key="index">
          <statistics-card-line
            hideChart
            class="mb-base"
            :statistic="`${tr.name}`"
            icon="CpuIcon"
            icon-right
            :statisticTitle="`Amount ${tr.amount}, Order: ${tr.total_order}`"
          />
        </div>
      </div>
    </div>
    <div v-if="type_of_month_basis == 'Current Month'">
      <div class="vx-row mt-6 mb-3">
        <div class="vx-col md:w-1/2">
          <h3 class="text-grey-dark">Total Payment of Current Month: {{current_month_total}}</h3>
        </div>
      </div>

      <div class="vx-row mb-3"  >
        <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4" v-for="(tr, index) in current_month_total_received" :key="index">
          <statistics-card-line
            hideChart
            class="mb-base"
            :statistic="`${tr.name}`"
            icon="CpuIcon"
            icon-right
            :statisticTitle="`Amount ${tr.amount}, Order: ${tr.total_order}`"
          />
        </div>
      </div>

    </div>
    <div v-if="type_of_month_basis == 'Previous Month'">
      <div class="vx-row mt-6 mb-3">
        <div class="vx-col md:w-1/2">
          <h3 class="text-grey-dark">Total Payment of Last Month : {{last_month_total}}</h3>
        </div>
      </div>

      <div class="vx-row mb-3"  >
        <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4" v-for="(tr, index) in last_month_total_received" :key="index">
          <statistics-card-line
            hideChart
            class="mb-base"
            :statistic="`${tr.name}`"
            icon="CpuIcon"
            icon-right
            :statisticTitle="`Amount ${tr.amount}, Order: ${tr.total_order}`"
          />
        </div>
      </div>

    </div>
    <div v-if="type_of_month_basis == 'Weekly'">
      <div class="vx-row mt-6 mb-3">
        <div class="vx-col md:w-1/2">
          <h3 class="text-grey-dark">Weekly Total Payment: {{weekly_total}}</h3>
        </div>
      </div>

      <div class="vx-row mb-3" >
        <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4" v-for="(tr, index) in weekly_month_total_received" :key="index">
          <statistics-card-line
            hideChart
            class="mb-base"
            :statistic="`${tr.name}`"
            icon="CpuIcon"
            icon-right
            :statisticTitle="`Amount ${tr.amount}, Order: ${tr.total_order}`"
          />
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import StatisticsCardLine from "@/components/statistics-cards/StatisticsCardLine.vue";
import VxTimeline from "@/components/timeline/VxTimeline";
import vSelect from "vue-select";
import axios from "@/axios.js";
import moment from "moment";

import ChartjsComponentBarChart from "@/components/ChartjsComponentBarChart.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    StatisticsCardLine,
    ChartjsComponentBarChart,
    VxTimeline,
    "v-select": vSelect,
  },

  data()
  {
    return {
      resturent_id : localStorage.getItem("resturent_id"),
      total_sell_detail:[],
      total_payment_received:[],
      current_month_total_received: [],
      last_month_total_received: [],
      weekly_month_total_received: [],
      type_of_month_basis: '',
      total: '',
    };

  },

  methods: {

    getAllReportDetails()
    {
      axios.
        get(
        `/restaurant_management/dashboard/dashboard_total_report/${this.resturent_id}`
      )
      .then((res)=>{
        this.total_sell_detail = res.data.data;
        this.total_payment_received = res.data.data.payment_method_distribution.current_month_total_payment_method_distribution;
        this.current_month_total_received = res.data.data.payment_method_distribution.current_month_total_payment_method_distribution;
        this.last_month_total_received = res.data.data.payment_method_distribution.last_month_total_payment_method_distribution;
        this.weekly_month_total_received = res.data.data.payment_method_distribution.weekly_total_payment_method_distribution;
      })
      .catch((err)=>{

      })
    }
  },

  mounted() {
    // this.$store.dispatch("getMonthWeekData");
  },
  created()
  {
    this.getAllReportDetails();
  },

    computed: {

      total_item: function()
      {
        let sum = 0;
        this.total_payment_received.forEach(function(item) {
          sum += (parseFloat(item.amount));
        });

        return sum;
      },
      current_month_total: function()
      {
        let sum = 0;
        this.current_month_total_received.forEach(function(item) {
          sum += (parseFloat(item.amount));
        });

        return sum;
      },
      last_month_total: function()
      {
        let sum = 0;
        this.last_month_total_received.forEach(function(item) {
          sum += (parseFloat(item.amount));
        });

        return sum;
      },
      weekly_total: function()
      {
        let sum = 0;
        this.weekly_month_total_received.forEach(function(item) {
          sum += (parseFloat(item.amount));
        });

        return sum;
      },


    }



  // computed: {
  //   //
  //   // ...mapGetters(["monthWeekData"]),
  //   // cmSell() {
  //   //   return this.monthWeekData && this.monthWeekData.current_month_total_sell;
  //   // },
  //   // cmOrder() {
  //   //   return this.monthWeekData && this.monthWeekData.current_month_total_order;
  //   // },
  //   // lmSell() {
  //   //   return this.monthWeekData && this.monthWeekData.last_month_total_sell;
  //   // },
  //   // lmOrder() {
  //   //   return this.monthWeekData && this.monthWeekData.last_month_total_order;
  //   // },
  //   // weekChart() {
  //   //   return {
  //   //     labels: [
  //   //       "Sunday",
  //   //       "Monday",
  //   //       "Tuesday",
  //   //       "Wednesday",
  //   //       "Thursday",
  //   //       "Friday",
  //   //       "Saturday",
  //   //     ],
  //   //     datasets: [
  //   //       {
  //   //         label: "Total Sale amount",
  //   //         backgroundColor: [
  //   //           "#27ae60",
  //   //           "#8e44ad",
  //   //           "#e67e22",
  //   //           "#1abc9c",
  //   //           "#34495e",
  //   //           "#c45850",
  //   //           "#f1c40f",
  //   //         ],
  //   //         data:
  //   //           this.monthWeekData &&
  //   //           this.monthWeekData.week_data &&
  //   //           this.monthWeekData.week_data.day_wise_income,
  //   //       },
  //   //     ],
  //   //   };
  //   // },
  // },
};
</script>

<style >
header.vs-collapse-item--header {
  padding: 0px !important;
}
.open-item {
  position: absolute;
  z-index: 999;
  width: 22.3%;
}
.mb-base {
  margin-bottom: 0.5rem !important;
}

.status-icon {
  width: 100% !important;
  height: 100%;
}
</style>

