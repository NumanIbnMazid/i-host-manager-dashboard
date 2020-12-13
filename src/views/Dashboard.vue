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
          statistic="86%"
          statisticTitle="CPU Usage"
        />
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <statistics-card-line
          hideChart
          class="mb-base"
          icon="ServerIcon"
          icon-right
          statistic="1.2gb"
          statisticTitle="Memory Usage"
          color="success"
        />
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <statistics-card-line
          hideChart
          class="mb-base"
          icon="ActivityIcon"
          icon-right
          statistic="0.1%"
          statisticTitle="Downtime Ratio"
          color="danger"
        />
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <statistics-card-line
          hideChart
          class="mb-base"
          icon="AlertOctagonIcon"
          icon-right
          statistic="13"
          statisticTitle="Issues Found"
          color="warning"
        />
      </div>
    </div>
    <vs-divider />

    <div class="vx-row">
      <div class="vx-col w-full md:w-2/3 mb-base">
        <vx-card title="Revenue">
          <template slot="actions">
            <feather-icon
              icon="SettingsIcon"
              svgClasses="w-6 h-6 text-grey"
            ></feather-icon>
          </template>
          <div slot="no-body" class="p-6 pb-0">
            <div class="flex" v-if="revenueComparisonLine.analyticsData">
              <div class="mr-6">
                <p class="mb-1 font-semibold">This Month</p>
                <p class="text-3xl text-success">
                  <sup class="text-base mr-1">$</sup
                  >{{
                    revenueComparisonLine.analyticsData.thisMonth.toLocaleString()
                  }}
                </p>
              </div>
              <div>
                <p class="mb-1 font-semibold">Last Month</p>
                <p class="text-3xl">
                  <sup class="text-base mr-1">$</sup
                  >{{
                    revenueComparisonLine.analyticsData.lastMonth.toLocaleString()
                  }}
                </p>
              </div>
            </div>
            <vue-apex-charts
              type="line"
              height="266"
              :options="analyticsData.revenueComparisonLine.chartOptions"
              :series="revenueComparisonLine.series"
            />
          </div>
        </vx-card>
      </div>
    </div>
  </div>
</template>

<script>
import StatisticsCardLine from "@/components/statistics-cards/StatisticsCardLine.vue";
import VxTimeline from "@/components/timeline/VxTimeline";
import VueApexCharts from "vue-apexcharts";
import vSelect from "vue-select";
import axios from "@/axios.js";
import moment from "moment";

export default {
  components: {
    StatisticsCardLine,
    VueApexCharts,
    VxTimeline,
    "v-select": vSelect,
  },
  data: () => ({
    time: "",
    resturent_id: localStorage.getItem("resturent_id"),
    resturent: JSON.parse(localStorage.getItem("resturent")),

    revenueComparisonLine: {
      analyticsData: { thisMonth: 86589, lastMonth: 73683 },
      series: [
        {
          name: "This Month",
          data: [45000, 47000, 44800, 47500, 45500, 48000, 46500, 48600],
        },
        {
          name: "Last Month",
          data: [46000, 48000, 45500, 46600, 44500, 46500, 45000, 47000],
        },
      ],
    },
    analyticsData: {
      revenueComparisonLine: {
        chartOptions: {
          chart: {
            toolbar: { show: false },
            dropShadow: {
              enabled: true,
              top: 5,
              left: 0,
              blur: 4,
              opacity: 0.1,
            },
          },
          stroke: { curve: "smooth", dashArray: [0, 8], width: [4, 2] },
          grid: { borderColor: "#e7e7e7" },
          legend: { show: false },
          colors: ["#F97794", "#b8c2cc"],
          fill: {
            type: "gradient",
            gradient: {
              shade: "dark",
              inverseColors: false,
              gradientToColors: ["#7367F0", "#b8c2cc"],
              shadeIntensity: 1,
              type: "horizontal",
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 100, 100, 100],
            },
          },
          markers: { size: 0, hover: { size: 5 } },
          xaxis: {
            labels: { style: { cssClass: "text-grey fill-current" } },
            axisTicks: { show: false },
            categories: ["01", "05", "09", "13", "17", "21", "26", "31"],
            axisBorder: { show: false },
            convertedCatToNumeric: true,
          },
          yaxis: {
            tickAmount: 5,
            labels: {
              style: { cssClass: "text-grey fill-current" },
              formatter: {
                _custom: {
                  type: "function",
                  display: "<span>ƒ</span> formatter(val)",
                },
              },
            },
          },
          tooltip: { x: { show: false } },
        },
      },
    },
  }),

  methods: {},

  created() {},
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

