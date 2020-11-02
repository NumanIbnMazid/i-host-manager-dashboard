<template>
  <div class="vx-row">
    <div
      class="vx-col w-full md:w-1/3 sm:w-1/2 mb-base"
      v-for="item in kb"
      :key="item.id"
      @click="$router.push(item.url).catch(() => {})"
    >
      <vx-card class="text-center cursor-pointer">
        <img
          :src="item.graphic"
          alt="graphic"
          width="180"
          class="mx-auto mb-4"
        />
        <h4 class="mb-2">{{ item.title.toUpperCase() }}</h4>
      </vx-card>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
export default {
  components: {
    VueApexCharts,
  },
  data: () => ({
    lineAreaChartSpline: {
      series: [
        {
          name: "Last Month",
          data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
          name: "Current Month",
          data: [11, 32, 45, 32, 34, 52, 41],
        },
      ],
      chartOptions: {
        chart: {
          height: 350,
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        colors: ["#31314e", "#f8b843"],
        xaxis: {
          type: "datetime",
          categories: [
            "2018-09-19T00:00:00",
            "2018-09-19T01:30:00",
            "2018-09-19T02:30:00",
            "2018-09-19T03:30:00",
            "2018-09-19T04:30:00",
            "2018-09-19T05:30:00",
            "2018-09-19T06:30:00",
            "2018-09-19T06:30:00",
            "2018-09-19T06:30:00",
            "2018-09-19T06:30:00",
            "2018-09-19T06:30:00",
            "2018-09-19T06:30:00",
            "2018-09-19T06:30:00",
            "2018-09-19T06:30:00",
            "2018-09-19T06:30:00",
            "2018-09-19T06:30:00",
            "2018-09-19T06:30:00",
            "2018-09-19T06:30:00",
            "2018-09-19T06:30:00",
            "2018-09-19T06:30:00",
            "2018-09-19T06:30:00",
            "2018-09-19T06:30:00",
            "2018-09-19T06:30:00",
          ],
        },
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm",
          },
        },
      },
    },

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
    kb: [
      {
        id: 5,
        title: "Kitchen Dashboard",
        description:
          "Pudding oat cake carrot cake lemon drops gummies marshmallow.",
        graphic:
          "https://i.pinimg.com/originals/98/82/ec/9882ec514a7646b304d06f8f42a15a0c.png",
        url: "/kitchen",
      },
      {
        id: 5,
        title: "Reports",
        description:
          "Pudding oat cake carrot cake lemon drops gummies marshmallow.",
        graphic:
          "https://www.pinclipart.com/picdir/big/85-850772_svg-charts-pie-graphic-library-download-pie-chart.png",
        url: "/report",
      },
      {
        id: 4,
        title: "Waiter",
        description:
          "Pudding oat cake carrot cake lemon drops gummies marshmallow.",
        graphic:
          "https://i.pinimg.com/originals/94/1d/e1/941de114525baf04ae04a449dcac5ff1.png",
        url: "/waiter",
      },
      {
        id: 1,
        title: "Category",
        description:
          "Muffin lemon drops chocolate carrot cake chocolate bar sweet roll.",
        graphic:
          "https://icon-library.com/images/categories-icon/categories-icon-7.jpg",
        url: "/category",
      },
      {
        id: 2,
        title: "Food",
        description:
          "Gingerbread sesame snaps wafer soufflé. Macaroon brownie ice cream",
        graphic:
          "https://img2.pngio.com/food-icon-white-395433-free-icons-lib-413729-png-images-pngio-food-icon-black-png-2400_2400.png",
        url: "/food",
      },
      {
        id: 3,
        title: "Tables",
        description:
          "cotton candy caramels danish chocolate cake pie candy. Lemon drops tart.",
        graphic:
          "https://icons555.com/images/icons-black/image_icon_table_pic_512x512.png",
        url: "/table",
      },
    ],
  }),
};
</script>

<style>

</style>