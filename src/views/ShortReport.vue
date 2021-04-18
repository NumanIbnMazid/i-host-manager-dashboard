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
       placeholder="Select Type By Payment"
       class="mr-3"
       v-model="type_of_month_basis"
       :options="['Life Time', 'Current Month','Previous Month','Weekly']"
       style="min-width: 200px"

     />

     <v-select
       placeholder="Select Type By Takeaway"
       v-model="type_of_takeaway_basis"
       :options="['Life Time', 'Current Month','Previous Month','Weekly','Daily']"
       style="min-width: 210px"

     />
     <label class="l-print">
       Daily report:
     </label>
     <vs-button
       class="ml-2"
       color="success"
       @click="createInvoice()"
     >Print</vs-button
     >
     <img id="res_logo" :src="resturent.logo" alt="" style="display: none" />

   </div>

      <div>
        <div v-if="type_of_month_basis == 'Life Time'">
          <div class="vx-row mt-6 mb-3">
            <div class="vx-col md:w-1/2">
              <h3 class="text-grey-dark">Total: {{total_item(this.total_payment_received)}}</h3>
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
      </div>
      <div v-if="type_of_month_basis == 'Current Month'">
        <div class="vx-row mt-6 mb-3">
          <div class="vx-col md:w-1/2">
            <h3 class="text-grey-dark">Total Amount of Current Month: {{current_month_total(this.current_month_total_received)}}</h3>
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
            <h3 class="text-grey-dark">Total Amount of Last Month : {{last_month_total(this.last_month_total_received)}}</h3>
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
            <h3 class="text-grey-dark">Weekly Total Amount: {{weekly_total(this.weekly_month_total_received)}}</h3>
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

      <div>
        <div v-if="type_of_takeaway_basis == 'Life Time'">
          <div class="vx-row mt-6 mb-3">
            <div class="vx-col md:w-1/2">
              <h3 class="text-grey-dark">Total: {{total_item(this.total_payment_received_by_takeaway_type)}}</h3>
            </div>
          </div>

          <div class="vx-row mb-3" >
            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4" v-for="(tr, index) in total_payment_received_by_takeaway_type" :key="index">
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
      <div v-if="type_of_takeaway_basis == 'Current Month'">
        <div class="vx-row mt-6 mb-3">
          <div class="vx-col md:w-1/2">
            <h3 class="text-grey-dark">Total Amount of Current Month: {{current_month_total(this.current_month_total_received_by_takeaway_type)}}</h3>
          </div>
        </div>

        <div class="vx-row mb-3"  >
          <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4" v-for="(tr, index) in current_month_total_received_by_takeaway_type" :key="index">
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
      <div v-if="type_of_takeaway_basis == 'Previous Month'">
        <div class="vx-row mt-6 mb-3">
          <div class="vx-col md:w-1/2">
            <h3 class="text-grey-dark">Total Amount of Last Month : {{last_month_total(this.last_month_total_received_by_takeaway_type)}}</h3>
          </div>
        </div>

        <div class="vx-row mb-3"  >
          <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4" v-for="(tr, index) in last_month_total_received_by_takeaway_type" :key="index">
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
      <div v-if="type_of_takeaway_basis == 'Weekly'">
        <div class="vx-row mt-6 mb-3">
          <div class="vx-col md:w-1/2">
            <h3 class="text-grey-dark">Weekly Total Amount: {{weekly_total(this.weekly_month_total_received_by_takeaway_type)}}</h3>
          </div>
        </div>

        <div class="vx-row mb-3" >
          <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4" v-for="(tr, index) in weekly_month_total_received_by_takeaway_type" :key="index">
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

    <div v-if="type_of_takeaway_basis == 'Daily'">
      <div class="vx-row mt-6 mb-3">
        <div class="vx-col md:w-1/2">
          <h3 class="text-grey-dark">Daily Total Amount: {{daily_total(this.daily_total_received_by_takeaway_type)}}</h3>
        </div>
      </div>

      <div class="vx-row mb-3" >
        <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4" v-for="(tr, index) in daily_total_received_by_takeaway_type" :key="index">
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
      resturent: JSON.parse(localStorage.getItem("resturent")),

      total_sell_detail:[],
      total_payment_received:[],
      current_month_total_received: [],
      last_month_total_received: [],
      weekly_month_total_received: [],
      type_of_month_basis: '',
      type_of_takeaway_basis: '',
      total_payment_received_by_takeaway_type:[],
      current_month_total_received_by_takeaway_type: [],
      last_month_total_received_by_takeaway_type: [],
      weekly_month_total_received_by_takeaway_type: [],
      daily_total_received_by_takeaway_type: [],
      total: '',
      div_open : true,
      all_daily_report: [],

    };

  },

  methods: {

    total_item: function(payment_received)
    {
      let sum = 0;
      payment_received.forEach(function(item) {
        sum += (parseFloat(item.amount));
      });
      return sum.toFixed(2);
    },
    current_month_total: function(current_month)
    {
      let sum = 0;
      current_month.forEach(function(item) {
        sum += (parseFloat(item.amount));
      });

      return sum.toFixed(2);
    },
    last_month_total: function(last_month)
    {
      let sum = 0;
      last_month.forEach(function(item) {
        sum += (parseFloat(item.amount));
      });

      return sum.toFixed(2);
    },
    weekly_total: function(weekly)
    {
      let sum = 0;
      weekly.forEach(function(item) {
        sum += (parseFloat(item.amount));
      });

      return sum.toFixed(2);
    },
    daily_total: function(daily)
    {
      let sum = 0;
      daily.forEach(function(item) {
        sum += (parseFloat(item.amount));
      });

      return sum.toFixed(2);
    },






    // getDailyReport()
    // {
    //   axios.
    //   get(
    //     `/restaurant_management/dashboard/daily_report/${this.resturent_id}`
    //   )
    //     .then((res)=>{
    //
    //       this.all_daily_report = res.data.data;
    //       console.log("daily report",this.all_daily_report);
    //
    //     })
    //     .catch((err)=>{
    //
    //     })
    // },

    getAllReportDetails()
    {
      axios.
        get(
        `/restaurant_management/dashboard/dashboard_total_report/${this.resturent_id}`
      )
      .then((res)=>{

        this.total_sell_detail = res.data.data;
        this.total_payment_received = res.data.data.payment_method_distribution.current_month_total_payment_method_distribution;
        this.total_payment_received_by_takeaway_type = res.data.data.takeway_order_type_distribution.total_amount_received_by_takeway_order_type;
        this.current_month_total_received = res.data.data.payment_method_distribution.current_month_total_payment_method_distribution;
        this.current_month_total_received_by_takeaway_type = res.data.data.takeway_order_type_distribution.current_month_total_takeway_order_type_distribution;
        this.last_month_total_received = res.data.data.payment_method_distribution.last_month_total_payment_method_distribution;
        this.last_month_total_received_by_takeaway_type = res.data.data.takeway_order_type_distribution.last_month_total_takeway_order_type_distribution;
        this.weekly_month_total_received = res.data.data.payment_method_distribution.weekly_total_payment_method_distribution;
        this.weekly_month_total_received_by_takeaway_type = res.data.data.takeway_order_type_distribution.weekly_total_takeway_order_type_distribution;
        this.daily_total_received_by_takeaway_type = res.data.data.takeway_order_type_distribution.daily_total_takeway_order_type_distribution;

      })
      .catch((err)=>{

      })
    },
    createInvoice()
    {
      axios.
      get(
        `/restaurant_management/dashboard/daily_report/${this.resturent_id}`
      )
        .then((res)=>{

          this.printRecipt(res.data.data);

        })
        .catch((err)=>{

        })

    },
    printRecipt(all_daily_report) {

      let itemDetail = "";
      let takeawayDetail = "";
      let resLogo = document.querySelector("#res_logo").src;


      console.log("all daily report",all_daily_report);

      // console.log(order);
      const WinPrint = window.open(
        "",
        "",
        "left=0,top=0,width=600,height=600,toolbar=0,scrollbars=0,status=0"
      );



      all_daily_report.payment_method_summary.forEach((el) => {
          itemDetail += `<tr class="tabletitle">
                        <td class="Rate">
                            ${el.name}
                        </td>
                        <td class="payment">
                            <h2>${
            el.sell_percentage
          }%</h2>
                        </td>
                        <td></td>
                        <td class="payment">
                            <h2>${
            el.total_sell
          }/-</h2>
                        </td>
                    </tr>`;
             });


      all_daily_report.takeway_order_details_summary.forEach((el) => {
        takeawayDetail += `<tr class="tabletitle">
                        <td class="Rate">
                            ${el.name}
                        </td>
                        <td class="payment">
                            <h2>${
          el.sell_percentage
        }%</h2>
                        </td>
                        <td></td>
                        <td class="payment">
                            <h2>${
          el.total_sell
        }/-</h2>
                        </td>
                    </tr>`;
      });




      WinPrint.document.write(`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Invoice</title>

<style>
        * {
            margin: 0;
            padding: 0;
        }

        body {
            margin: 0;
            padding: 0;
        }

        #invoice-POS {
            box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5);
            padding: 2mm;
            margin: 0 auto;
            width: 44mm;
            background: #FFF;
        }

        #invoice-POS ::selection {
            background: #f31544;
            color: #000;
        }

        #invoice-POS ::moz-selection {
            background: #f31544;
            color: #000;
        }

        #invoice-POS h1 {
            font-size: 1.5em;
            color: #222;
        }

        #invoice-POS h2 {
            font-size: .9em;
        }

        #invoice-POS h3 {
            font-size: 1.2em;
            font-weight: 300;
            line-height: 2em;
        }

        #invoice-POS p {
            font-size: .7em;
            color: #000;
            line-height: 1.2em;
        }
        /* #invoice-POS #top,
        #invoice-POS #mid,
        #invoice-POS #bot {
            border-bottom: 1px solid #000;
        } */

        #invoice-POS #top {
            min-height: 77px;
        }

        #invoice-POS #bot {
            min-height: 50px;
        }

        #invoice-POS #top .logo {
            height: 60px;
            width: 60px;
        }

        #invoice-POS .info {
            display: block;
            margin-left: 0;
        }

        #invoice-POS .title {
            float: right;
        }

        #invoice-POS .title p {
            text-align: right;
        }

        #invoice-POS table {
            width: 100%;
            border-collapse: collapse;
        }

        #invoice-POS .tabletitle {
            font-size: .7em;
            background: #EEE;
        }

        #invoice-POS .service {
            border-bottom: 1px solid #EEE;
        }

        #invoice-POS .item {
            width: 24mm;
        }

        #invoice-POS .itemtext {
            font-size: .7em;
        }

        #invoice-POS #legalcopy {
            margin-top: 5mm;
        }

        .price>p,
        .price>h2,
        .payment>h2 {
            float: right;
            margin-right: 5px;
        }

        .info {
            padding: 5px 0px;
        }

        .info>p {
            text-align: center !important;
        }

        .final {
            border: 1px solid #000;
            border-left: 0;
            border-right: 0;
        }

        .itemname>p {
            margin-right: 5px;
        }
    </style>

</head>

<body>
    <div id="invoice-POS">
        <center id="top">
            <div class="logo">
                <img src="${resLogo}" style="width: 100%;" alt="">

          </div>

            <div class="info">
                <h2>${this.resturent.name}</h2>

                <h2>Daily Report</h2>
            </div>
        </center>
        <div id="mid">
            <div class="info">
                <p>
                   <strong>Address:</strong> ${this.resturent.address}</br>
                    <strong>Phone :</strong> ${this.resturent.phone}</br>
                </p>
            </div>
        </div>
        <div id="bot">
            <center>
<!--                <h2>Order # </h2>-->
<!--                <h2>Table No:</h2>-->
                <h2>Time: ${moment().format("DD/MM/Y, h:mma")}</h2>
            </center>
            <div id="table">
                <table>
                   <tr id="bot">
                   <center>
             <p>General Information</p>

                   </center>
                     </td>
                   </tr>

                <table class="mr-2">

                 <tr class="tabletitle">
                        <td class="item">
                            <h2>Item</h2>
                        </td>
                        <td class="Payment">
                            <h2>Percentage</h2>
                        </td>
                        <td>&nbsp; &nbsp;</td>
                        <td class="Rate price">
                            <h2>Amount</h2>
                        </td>
                    </tr>
                    <tr class="tabletitle">
                        <td class="Rate">
                            <h2>Dining Order</h2>
                        </td>
                        <td class="payment">
                            <h2>${all_daily_report.dining_order_summary.sell_percentage}%</h2>
                        </td>
                        <td></td>
                         <td class="payment">
                            <h2>${all_daily_report.dining_order_summary.total_sell}/-</h2>
                        </td>
                    </tr>
                     <tr class="tabletitle">
                        <td class="Rate">
                            <h2>Takeaway Order</h2>
                        </td>
                        <td class="payment">
                            <h2>${all_daily_report.takeway_order_summary.sell_percentage}%</h2>
                        </td>
                        <td></td>
                         <td class="payment">
                            <h2>${all_daily_report.takeway_order_summary.total_sell}/-</h2>
                        </td>
                    </tr>



                    <tr class="tabletitle final">
                        <td class="Rate">
                            <h2>Net Total:</h2>
                        </td>
                         <td class="payment">
                            <h2>${all_daily_report.dining_order_summary.sell_percentage+all_daily_report.takeway_order_summary.sell_percentage}%</h2>
                        </td>
                        <td></td>
                         <td class="payment">
                            <h2>${(all_daily_report.dining_order_summary.total_sell+all_daily_report.takeway_order_summary.total_sell).toFixed(2)}/-</h2>
                        </td>
                    </tr>



                </table>
                  <table>
                   <tr id="bot">
                   <center>
             <p>Payment Information</p>

                   </center>
                     </td>
                   </tr>

                <table class="mr-2">

                 <tr class="tabletitle">
                        <td class="item">
                            <h2>Item</h2>
                        </td>
                        <td class="Payment">
                            <h2>Percentage</h2>
                        </td>
                        <td>&nbsp; &nbsp;</td>
                        <td class="Rate price">
                            <h2>Amount</h2>
                        </td>
                    </tr>
                         ${itemDetail}
<!--                    <tr class="tabletitle">-->
<!--                        <td class="Rate">-->
<!--                        -->
<!--                        </td>-->
<!--                        <td class="payment">-->
<!--                            <h2></h2>-->
<!--                        </td>-->
<!--                        <td></td>-->
<!--                         <td class="payment">-->
<!--                            <h2></h2>-->
<!--                        </td>-->
<!--                    </tr>-->
                    <tr class="tabletitle final">
                        <td class="Rate">
                            <h2>Net Total:</h2>
                        </td>
                         <td class="payment">
                            <h2>${all_daily_report.total_calculation.total_payment_sell_percentage}%</h2>
                        </td>
                        <td></td>
                         <td class="payment">
                            <h2>${(all_daily_report.total_calculation.total_payment_sell_amount).toFixed(2)}/-</h2>
                        </td>
                    </tr>
                </table>
 <table>
                   <tr id="bot">
                   <center>
             <p>Takeaway Information</p>

                   </center>
                     </td>
                   </tr>

                <table class="mr-2">

                 <tr class="tabletitle">
                        <td class="item">
                            <h2>Item</h2>
                        </td>
                        <td class="Payment">
                            <h2>Percentage</h2>
                        </td>
                        <td>&nbsp; &nbsp;</td>
                        <td class="Rate price">
                            <h2>Amount</h2>
                        </td>
                    </tr>
                         ${takeawayDetail}
<!--                    <tr class="tabletitle">-->
<!--                        <td class="Rate">-->
<!--                        -->
<!--                        </td>-->
<!--                        <td class="payment">-->
<!--                            <h2></h2>-->
<!--                        </td>-->
<!--                        <td></td>-->
<!--                         <td class="payment">-->
<!--                            <h2></h2>-->
<!--                        </td>-->
<!--                    </tr>-->
                    <tr class="tabletitle final">
                        <td class="Rate">
                            <h2>Net Total:</h2>
                        </td>
                         <td class="payment">
                            <h2>${all_daily_report.total_calculation.total_takeaway_sell_percentage}%</h2>
                        </td>
                        <td></td>
                         <td class="payment">
                            <h2>${(all_daily_report.total_calculation.total_takeaway_sell_amount).toFixed(2)}/-</h2>
                        </td>
                    </tr>
                </table>
                 <table>
                   <tr id="bot">
                   <center>
             <p>Additional Information</p>

                   </center>
                     </td>
                   </tr>

                <table class="mr-2">

                 <tr class="tabletitle">
                        <td class="item">
                            <h2>Item</h2>
                        </td>
                       <td class="Payment">
                            <h2></h2>
                        </td>
                        <td>&nbsp; &nbsp;</td>
                        </td>
                        <td class="Rate price">
                            <h2>Amount</h2>
                        </td>
                    </tr>
                     <tr class="tabletitle">
                        <td class="Rate">
                            <h2>Total Discount</h2>
                        </td>
                        <td class="payment">
                            <h2></h2>
                        </td>
                        <td></td>
                         <td class="payment">
                            <h2>${all_daily_report.total_discount}</h2>
                        </td>
                    </tr>
                     <tr class="tabletitle">
                        <td class="Rate">
                            <h2>Total Order</h2>
                        </td>
                        <td class="payment">
                            <h2></h2>
                        </td>
                        <td></td>
                         <td class="payment">
                            <h2>${all_daily_report.total_order}/-</h2>
                        </td>
                    </tr>
                        <tr class="tabletitle">
                        <td class="Rate">
                            <h2>Total Sell</h2>
                        </td>
                        <td class="payment">
                            <h2></h2>
                        </td>
                        <td></td>
                         <td class="payment">
                            <h2>${all_daily_report.total_sell}/-</h2>
                        </td>
                    </tr>
                        </tr>
                        <tr class="tabletitle">
                        <td class="Rate">
                            <h2>Total Vat</h2>
                        </td>
                        <td class="payment">
                            <h2></h2>
                        </td>
                        <td></td>
                         <td class="payment">
                            <h2>${all_daily_report.total_tax}/-</h2>
                        </td>
                    </tr>





                </table>

            </div>
            <div id="legalcopy">
                <center>
                    <p>Thank You</p>
                    <hr>
                    <p class="legal"><strong> Powerd by @i-host <br> <small>www.i-host.com.bd</small></strong>
                    </p>
                </center>
            </div>
        </div>

    </div>
</body>

</html>`);

      WinPrint.document.close();
      WinPrint.focus();

      WinPrint.print();
      // WinPrint.close();
    },

  },

  mounted() {
    // this.$store.dispatch("getMonthWeekData");
  },
  created()
  {
    this.getAllReportDetails();
    // this.getDailyReport();
  },

    computed: {

      // total_item: function(payment_received)
      // {
      //   console.log("payment_received",payment_received);
      //   let sum = 0;
      //   payment_received.forEach(function(item) {
      //       sum += (parseFloat(item.amount));
      //     });
      //   return sum;
      // },

      // current_month_total: function()
      // {
      //   let sum = 0;
      //   this.current_month_total_received.forEach(function(item) {
      //     sum += (parseFloat(item.amount));
      //   });
      //
      //   return sum;
      // },
      // last_month_total: function()
      // {
      //   let sum = 0;
      //   this.last_month_total_received.forEach(function(item) {
      //     sum += (parseFloat(item.amount));
      //   });
      //
      //   return sum;
      // },
      // weekly_total: function()
      // {
      //   let sum = 0;
      //   this.weekly_month_total_received.forEach(function(item) {
      //     sum += (parseFloat(item.amount));
      //   });
      //
      //   return sum;
      // },
      //

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

