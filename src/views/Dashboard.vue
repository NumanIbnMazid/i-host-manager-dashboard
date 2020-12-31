<template>
  <div>
    <div class="vx-row mb-10">
      <div class="vx-col md:w-1/2">
        <h1 class="text-grey-dark">Order Dashboard</h1>
      </div>
      <div class="vx-col md:w-1/2 text-right">
        <h1 class="text-grey-dark">
          {{ time }}
        </h1>
      </div>
    </div>

    <div class="vx-row mb-3">
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <statistics-card-line
          hideChart
          class="mb-base"
          icon="CpuIcon"
          icon-right
          :statistic="`৳ ${cmSell}`"
          statisticTitle="Total Sell current month"
        />
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <statistics-card-line
          hideChart
          class="mb-base"
          icon="ServerIcon"
          icon-right
          :statistic="`${cmOrder}`"
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
          :statistic="`৳ ${lmSell}`"
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
          :statistic="`${lmOrder}`"
          statisticTitle="Total Order last month"
          color="warning"
        />
      </div>
    </div>
    <vs-divider />

    <div class="vx-row">
      <vx-card>
        <chartjs-component-bar-chart
          :height="150"
          :data="weekChart"
          :options="options"
        ></chartjs-component-bar-chart>
      </vx-card>
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
  data: () => ({
    time: "",
    resturent_id: localStorage.getItem("resturent_id"),
    resturent: JSON.parse(localStorage.getItem("resturent")),

    // weekChart: "",
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: "This week sales",
      },
    },
  }),

  methods: {},

  mounted() {
    this.$store.dispatch("getMonthWeekData");
  },

  computed: {
    ...mapGetters(["monthWeekData"]),
    cmSell() {
      return this.monthWeekData && this.monthWeekData.current_month_total_sell;
    },
    cmOrder() {
      return this.monthWeekData && this.monthWeekData.current_month_total_order;
    },
    lmSell() {
      return this.monthWeekData && this.monthWeekData.last_month_total_sell;
    },
    lmOrder() {
      return this.monthWeekData && this.monthWeekData.last_month_total_order;
    },
    weekChart() {
      return {
        labels: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        datasets: [
          {
            label: "Total Sale amount",
            backgroundColor: [
              "#27ae60",
              "#8e44ad",
              "#e67e22",
              "#1abc9c",
              "#34495e",
              "#c45850",
              "#f1c40f",
            ],
            data:
              this.monthWeekData &&
              this.monthWeekData.week_data &&
              this.monthWeekData.week_data.day_wise_income,
          },
        ],
      };
    },
  },
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

