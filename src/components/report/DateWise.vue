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

      <span class="float-right"><b>Total Amount:</b> {{totalAmount}}</span>
    </div>

    <vs-table class="p-0" ref="table" :data="orders">
      <template slot="thead">
        <th>Order Number</th>
        <th>Table Number</th>
        <th>Time</th>
        <th>Customer Name</th>
        <th>Waiter Name</th>
        <th>Price</th>
        <th>Vat Amount</th>
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
            <vs-td
              ><p>{{ dateFromat(tr.created_at) }}</p>
            </vs-td>
            <vs-td class="text-left"
              ><p>{{ tr.order_info.customer ? tr.order_info.customer.name : '-' }}</p>
            </vs-td>
            <vs-td class="text-left"
              ><p>{{ tr.order_info.waiter ? tr.order_info.waiter.name : '' }}</p>
            </vs-td>
            <vs-td
              ><p>৳{{ tr.order_info.price.grand_total_price }}</p>
            </vs-td>
            <vs-td
              ><p>৳{{ tr.order_info.price.tax_amount }}</p>
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

export default {
  components: {
    Datepicker,
    vSelect,
    ItemDetails,
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
  }),

  methods: {
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
          this.total = res.data.data.total_order;
          this.totalAmount = res.data.data.total_amaount
          console.log("this.orders ", this.orders);
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

    dateFromat(date) {
      return moment(date).format("D-M-Y h:mm:ss");
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
</style>
