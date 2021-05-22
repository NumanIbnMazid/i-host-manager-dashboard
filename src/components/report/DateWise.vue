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

      <!-- <v-select
        label="name"
        multiple
        v-model="category"
        :options="categories"
        :reduce="(categories) => categories.id"
        style="min-width: 200px"
      /> -->

      <v-select
        placeholder="Select Waiter "
        label="name"
        multiple
        v-model="waiter"
        :options="waiters"
        :reduce="(waiters) => waiters.id"
        style="min-width: 200px"
      />

      <v-select
        placeholder="Select Item"
        label="name"
        class="m-2"
        multiple
        v-model="item"
        :options="foods"
        :reduce="(foods) => foods.id"
        style="min-width: 200px"
      />
      <vs-button
        class="m-2"
        @click="
          getAllOrder();
          search = true;
        "
        >Go</vs-button
      >
      <vs-button class="m-2" color="danger" v-if="search" @click="resetFilter()"
        >Reset</vs-button
      >

       <!-- <vs-button
        @click="createInvoice()"
         class="m-2"
        >Print
        </vs-button
      >
     -->
    </div>

        <vs-button class="m-2 float-right">
        <template>

            <printer-icon size="1.5x" @click="createInvoice()" class="custom-class">Print</printer-icon>

        </template >
        </vs-button>
     <vs-button
       class="m-2 float-right"
     >
       <!-- <a href="#"  class="text-white pr-4">EXCEL</a> -->
       <!-- <img src="../../assets/icon/excel_icon.png" alt="excel not found"> -->
       <!-- <i class="fa fa-file-excel-o" aria-hidden="true"></i> -->

       <template>
         <span class="pdf-and-excel" @click="downloadExcelReport"><i class="fas fa-file-excel fa-2x"></i></span>
         <!-- <download-icon size="1.5x" class="custom-class text-blue float-right" @click="downloadExcelReport"></download-icon> -->
       </template>
     </vs-button>
     <vs-button
      class="m-2 float-right"
     >
     <!-- <a href="#"  class="text-white pr-4">PDF</a> -->
       <template>
         <span class="pdf-and-excel" @click="downloadPdfReport"><i class="far fa-file-pdf fa-2x"></i> </span>
         <!-- <download-icon size="1.5x" class="custom-class text-blue float-right" @click="downloadPdfReport"></download-icon> -->
       </template>
     </vs-button>
   
    
   
    <div class="mt-4">
      <span class="mr-2 p-2"><b>Order:</b> {{total_order}}</span>
      <span class="mr-2 p-2"><b>Price:</b> {{total_food_price}}</span>
      <span class="mr-2 p-2"><b>Service Charge:</b> {{total_service_charge}}</span>
      <span class="mr-2 p-2"><b>Vat:</b> {{total_vat}}</span>
      <span class="mr-2 p-2"><b>Grand Total:</b> {{total_price}}</span>
      <span class="mr-2 p-2"><b>Discount:</b> {{total_discount}}</span>
      <div class="mt-1 mb-1">
        <span class="p-2"><b>Net Total:</b> {{totalAmount}}</span>
      </div>
    </div>
    <div class="loader"></div>

    <vs-table class="p-0" ref="table" :data="orders">
      <template slot="thead">
        <th>Order Number</th>
        <th>Table Number</th>
        <th>Time</th>
        <th>Customer Name</th>
        <th>Waiter Name</th>
        <th>Price</th>
        <th>Service Charge</th>
        <th>Vat Amount</th>
        <th>Grand Total</th>
        <th>Discount Price</th>
        <th>Net Price</th>
        <th>Action</th>
      </template>

      <template slot-scope="{ data }">
        <tbody>
          <vs-tr :data="tr" v-for="(tr, i) in data" :key="i">
            <vs-td
              ><p>#{{ tr.order_info.order_no }}</p></vs-td
            >
            <vs-td
              ><p>{{ tr.order_info.table_no }}</p></vs-td
            >
            <vs-td class="w-2/3">{{ dateFormat(tr.created_at)}}
            </vs-td>
            <vs-td class=""
              ><p>{{ tr.order_info.customer ? tr.order_info.customer.name : '-' }}</p>
            </vs-td>

            <vs-td class=""
              ><p>{{ tr.order_info.waiter ? tr.order_info.waiter.name : '' }}</p>
            </vs-td>
            <vs-td
            ><p>৳{{ tr.order_info.price.total_price }}</p>
            </vs-td>
            <vs-td
            ><p>৳{{ tr.order_info.price.service_charge }}</p>
            </vs-td>
            <vs-td
            ><p>৳{{ tr.order_info.price.tax_amount }}</p>
            </vs-td>
            <vs-td
              ><p>৳{{ tr.order_info.price.grand_total_price }}</p>
            </vs-td>
            <vs-td
              ><p>৳{{ tr.order_info.price.discount_amount }}</p>
            </vs-td>
            <vs-td
              ><p>৳{{ tr.order_info.price.payable_amount }}</p>
            </vs-td>

            <vs-td>
              <!-- <vs-button @click="showDetailsInfo(tr.order_info)"
                >Show Details</vs-button
              > -->
              <ItemDetails :showOrder="tr.order_info"></ItemDetails>
            </vs-td>
          </vs-tr>
        </tbody>
        <tbody>

        </tbody>
      </template>
    </vs-table>
    <br />
    <!-- <vs-pagination
      :total="Math.ceil(total / 10)"
      v-model="currentx"
    ></vs-pagination> -->

    <!-- <ItemDetails
      :showOrder="showOrder"
      :showDetailsPopup="showOrderDetailsPopup"
    ></ItemDetails> -->
  </div>
</template>

<script>
import axios from "@/axios.js";
import moment from "moment";
import Datepicker from "vuejs-datepicker";
import vSelect from "vue-select";


import ItemDetails from "@/components/report/ItemDetails.vue";
import { DownloadIcon } from 'vue-feather-icons'

import { PrinterIcon } from 'vue-feather-icons'

export default {
  components: {
    Datepicker,
    vSelect,
    ItemDetails,
    DownloadIcon,
    PrinterIcon,
  },

  data: () => ({
    restaurant_id: localStorage.getItem("resturent_id"),
    resturent: JSON.parse(localStorage.getItem("resturent")),

    search: false,
    currentx: 1,
    orders: [],
    total: [],
    categories: [],
    waiters: [],
    limit: 10,
    startDate: moment().format("YYYY-MM-01"),
    endDate: moment().format(),
    category: [],
    item: [],
    foods: [],
    waiter: [],
    showOrder: [],
    showOrderDetailsPopup: false,
    totalAmount: 0,
    total_order: 0,
    total_service_charge: 0,
    total_vat: 0,
    total_price: 0,
    total_food_price: 0,
    total_discount: 0,
  }),

  methods: {

    createInvoice()
    {
      console.log("printing.....");
      axios.
      post(
        `/restaurant_management/dashboard/invoice_short_report/${this.restaurant_id}/`
      )
        .then((res)=>{
          console.log("Here is your response",res.data.data);

          this.printRecipt(res.data.data);

        })
        .catch((err)=>{

           console.log("here is your error",err);
        })

    },

    loaderShow()
    {
      document.getElementsByClassName('loader')[0].style.display = 'block';

    },

    downloadFile(response,fileName,contentType)
    {
      // It is necessary to create a new blob object with mime-type explicitly set
      // otherwise only Chrome works like it should
      if(contentType == 'application/pdf')
      {
        var newBlob = new Blob([response.data], {type: 'application/pdf'})

      }
      else
      {
        var newBlob = new Blob([response.data], {type: 'application/vnd.ms-excel'})

      }

      // IE doesn't allow using a blob object directly as link href
      // instead it is necessary to use msSaveOrOpenBlob
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob)
        return
      }
      // For other browsers:
      // Create a link pointing to the ObjectURL containing the blob.
      const data = window.URL.createObjectURL(newBlob)
      var link = document.createElement('a')
      link.href = data
      if(contentType == 'application/pdf')
      {

        link.download = fileName + '.pdf'

      }
      else
      {
        link.download = fileName + '.xls'

      }
      link.click()
      document.getElementsByClassName('loader')[0].style.display = 'none';

      setTimeout(function () {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(data)
      }, 500)
    },

    downloadExcelReport()
    {
      this.loaderShow();
      console.log("downloading excel report");

      axios
        .post(
          `restaurant_management/dashboard/generate-datewise-report-excel/${this.restaurant_id}/`,
          {
            start_date: moment(this.startDate).format("YYYY-MM-DD"),
            end_date: moment(this.endDate).format("YYYY-MM-DD"),
            waiter: this.waiter,
            item: this.item,
          },
          {responseType: 'blob'}

        )
        .then((res) => {

          console.log("response of excel",res.headers['content-type']);
          console.log("response",res);
          var daily_report_excel = 'report_('+moment(this.startDate).format("YYYY-MM-DD")+'_to_'+moment(this.endDate).format("YYYY-MM-DD")+')';

          this.downloadFile(res, daily_report_excel,res.headers['content-type']);
        })
        .catch((err) => {

          this.checkError(err);

        });
    },
    downloadPdfReport()
    {
      this.loaderShow();
      axios
        .post(
          `/restaurant_management/dashboard/generate-datewise-report-pdf/${this.restaurant_id}/`,
          {
            start_date: moment(this.startDate).format("YYYY-MM-DD"),
            end_date: moment(this.endDate).format("YYYY-MM-DD"),
            waiter: this.waiter,
            item: this.item,
          },
        )
        .then((res) => {
          console.log("response of pdf",res);
          var daily_report_pdf = 'report_('+moment(this.startDate).format("YYYY-MM-DD")+'_to_'+moment(this.endDate).format("YYYY-MM-DD")+')';
          this.downloadFile(res, daily_report_pdf,  res.headers['content-type']);

        })
        .catch((err) => {

          this.checkError(err);

        });
    },
    getAllOrder() {

      console.log({
        start_date: moment(this.startDate).format("Y-M-D"),
        end_date: moment(this.endDate).format("Y-M-D"),
        // category: this.category,
        waiter: this.waiter,
        item: this.item,
      });
      axios
        .post(
          `/restaurant_management/dashboard/invoice_all_report/${this.restaurant_id}/?limit=2000&offset=0`,
          {
            start_date: moment(this.startDate).format("Y-M-D"),
            end_date: moment(this.endDate).format("Y-M-D"),
            // category: this.category,
            waiter: this.waiter,
            item: this.item,
          }
        )
        .then((res) => {
          this.orders = res.data.data.results;
          // this.total = res.data.data.total_order;
          this.totalAmount = res.data.data.total_amaount
          this.total_order = res.data.data.total_order
          this.total_service_charge = res.data.data.total_service_charge
          this.total_vat = res.data.data.total_vat
          this.total_price = res.data.data.total_grand_total_price
          this.total_food_price = res.data.data.total_food_price
          this.total_discount = res.data.data.total_discount

          console.log("orders pppppppppppppp", res.data.data);
        })
        .catch((err) => {
          this.showActionMessage("error", err.response.statusText);
          this.checkError(err);
        });
    },

    getFood() {
      axios
        .get(
          `/restaurant_management/dashboard/restaurant/${this.restaurant_id}/foods/`
        )
        .then((res) => {
          console.log("foods ", res);
          if (res.data.status) this.foods = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    updateFoodQuantity(food, objectToUpdate) {
      axios
        .patch(
          `/restaurant_management/dashboard/order/cart/items/${food.id}/`,
          {
            quantity: food.quantity,
            food_option: food.food_option.id,
            food_order: food.food_order,
            food_extra: food.food_extra.map((fe) => fe.id),
          }
        )
        .then((res) => {
          objectToUpdate = res.data.data.ordered_items;
        })
        .catch((err) => {
          this.showActionMessage("error", err.response.statusText);

          // checking error code
          this.checkError(err);
        });
    },

    getCategorys() {
      axios
        .get(
          `/restaurant_management/dashboard/category_list/${this.restaurant_id}`
        )
        .then((res) => {
          if (res.data.status) this.categories = res.data.data;
        })
        .catch((err) => {
          this.showActionMessage("error", err.response.statusText);
          this.checkError(err);
        });
    },

    getWaiter() {
      axios
        .get(
          `/account_management/restaurant/${this.restaurant_id}/waiter_info/`
        )
        .then((res) => {
          if (res.data.status) this.waiters = res.data.data;
        })
        .catch((err) => {
          this.showActionMessage("error", err.response.statusText);
          this.checkError(err);
        });
    },

    resetFilter() {
      this.startDate = moment().format("YYYY-MM-01");
      this.endDate = moment().format();
      this.waiter = [];
      this.search = false;

      this.getAllOrder();
    },

    // showDetailsInfo(orderInfo) {
    //   this.showOrder = orderInfo;
    //   this.showOrderDetailsPopup = true;
    // },

    dateFormat(date) {
      let date_time = date;
      return moment(date_time).format("D-M-Y  h:mm A");

    },

      printRecipt(all_daily_report) {

      let itemDetail = "";
      let takeawayDetail = "";
      let takeawayDetailWithDiscount = "";
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
      all_daily_report.takeway_order_details_summary.forEach((el) => {
        takeawayDetailWithDiscount += `<tr class="tabletitle">
                        <td class="Rate">
                            ${el.name}
                        </td>
                        <td class="payment">
                            <h2></h2>
                        </td>
                        <td></td>
                        <td class="payment">
                            <h2>${
          el.total_discount
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
                &nbsp;

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
                            <h2>${(all_daily_report.dining_order_summary.sell_percentage+all_daily_report.takeway_order_summary.sell_percentage).toFixed(2)}%</h2>
                        </td>
                        <td></td>
                         <td class="payment">
                            <h2>${(all_daily_report.dining_order_summary.total_sell+all_daily_report.takeway_order_summary.total_sell).toFixed(2)}/-</h2>
                        </td>
                    </tr>



                </table>
                  <table>
                   <tr id="bot">
             &nbsp;

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

                    <tr class="tabletitle final">
                        <td class="Rate">
                            <h2>Net Total:</h2>
                        </td>
                         <td class="payment">
                            <h2>${(all_daily_report.total_calculation.total_payment_sell_percentage).toFixed(2)}%</h2>
                        </td>
                        <td></td>
                         <td class="payment">
                            <h2>${(all_daily_report.total_calculation.total_payment_sell_amount).toFixed(2)}/-</h2>
                        </td>
                    </tr>
                </table>
 <table>
                   <tr id="bot">
                &nbsp;

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

                    <tr class="tabletitle final">
                        <td class="Rate">
                            <h2>Net Total:</h2>
                        </td>
                         <td class="payment">
                            <h2>${(all_daily_report.total_calculation.total_takeaway_sell_percentage).toFixed(2)}%</h2>
                        </td>
                        <td></td>
                         <td class="payment">
                            <h2>${(all_daily_report.total_calculation.total_takeaway_sell_amount).toFixed(2)}/-</h2>
                        </td>
                    </tr>
                </table>

<table>
                   <tr id="bot">
                &nbsp;

                   <center>
             <p>Discount Info Of Takeaway Order</p>

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
                        <td class="Rate price">
                            <h2>Discount</h2>
                        </td>
                    </tr>
                         ${takeawayDetailWithDiscount}
                </table>



                 <table>
                   <tr id="bot">
                    &nbsp;
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
                            <h2>${all_daily_report.total_discount}/-</h2>
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

  created() {
    this.getAllOrder();
    this.getWaiter();
    this.getFood();
    // this.getCategorys();
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
.pdf-and-excel{
  font-size: 12px;
}



.loader {
  border: 2px solid #f3f3f3;
  border-radius: 50%;
  border-top: 2px solid #FF8C00;
  width: 50px;
  height: 50px;
  /*float: right;*/
  margin: 0 auto;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 0.8s linear infinite;
  display: none;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>
