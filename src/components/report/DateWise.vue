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


    </div>

     <vs-button
      class="m-2 float-right "
     >
       <a href="#"  class="text-white pr-4">EXCEL</a>
       <template>
         <download-icon size="1.5x" class="custom-class text-blue float-right" @click="downloadExcelReport"></download-icon>
       </template>
     </vs-button>
     <vs-button
      class="m-2 float-right"
     >
     <a href="#"  class="text-white pr-4">PDF</a>
       <template>
         <download-icon size="1.5x" class="custom-class text-blue float-right" @click="downloadPdfReport"></download-icon>
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


export default {
  components: {
    Datepicker,
    vSelect,
    ItemDetails,
    DownloadIcon,
  },

  data: () => ({
    restaurant_id: localStorage.getItem("resturent_id"),
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
