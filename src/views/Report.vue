<template>
  <div>
    <div class="vx-row">
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <statistics-card-line
          class="mb-base"
          v-if="subscribersGained.analyticsData"
          icon="UsersIcon"
          icon-right
          :statistic="subscribersGained.analyticsData.subscribers | k_formatter"
          statisticTitle="Orders"
          :chartData="subscribersGained.series"
          type="area"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import axios from "@/axios.js";
import StatisticsCardLine from "@/components/statistics-cards/StatisticsCardLine.vue";
export default {
  components: {
    Datepicker,
    StatisticsCardLine,
  },

  data: () => ({
    resturent_id: localStorage.getItem("resturent_id"),
    subscribersGained: {
      series: [{ name: "Order", data: [28, 40, 36, 52, 38, 60, 100] }],
      analyticsData: { subscribers: 92600 },
    },
  }),

  methods: {},

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