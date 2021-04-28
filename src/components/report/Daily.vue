<template>
  <div>
    <div class="flex">
      <div class="pt-5 pl-1 mb-4 mr-auto rounded-lg cursor-pointer">
        <span class="text-lg text-primary justify-between"
          ><b>Total Sell Today</b></span
        >
      </div>
      <div
        class="p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary"
      >
        <span class="ml-2 text-base text-primary"
          >Total Order: ৳ {{ totalAmount }}</span
        >
      </div>
      <div
        class="p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary"
      >
        <span class="ml-2 text-base text-primary">Total: {{ totalOrder }}</span>
      </div>
    </div>

    <vs-table class="p-0" ref="table" :data="orders">
      <template slot="thead">
        <th>Order Number</th>
        <th>Table Number</th>
        <th>Time</th>
        <th>Customer Name</th>
        <th>Waiter Name</th>
        <th>Price</th>
        <th>Discount Price</th>
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
              ><p>{{ dateFromat(tr.order_info.created_at) }}</p>
            </vs-td>
            <vs-td
              ><p>
                {{ tr.order_info.customer ? tr.order_info.customer.name : "-" }}
              </p>
            </vs-td>
            <vs-td
              ><p>{{ tr.order_info.waiter.name }}</p>
            </vs-td>
            <vs-td
              ><p>{{ tr.order_info.price.grand_total_price }}</p>
            </vs-td>
            <vs-td
              ><p>{{ tr.order_info.price.discount_amount }}</p>
            </vs-td>
            <vs-td>
              <!-- <vs-button @click="showDetailsInfo(tr.order_info)"
                >Show Details</vs-button
              > -->
              <ItemDetails :showOrder="tr.order_info" :cancelOrderItem="cancelOrderItem"></ItemDetails>
            </vs-td>
          </vs-tr>
        </tbody>
      </template>
    </vs-table>
    <!-- <ItemDetails
      :showOrder="showOrder"
      :showDetailsPopup="showDetailsPopup"
    ></ItemDetails> -->
  </div>
</template>

<script>
import axios from "@/axios.js";
import moment from "moment";
import ItemDetails from "@/components/report/ItemDetails.vue";

export default {
  components: {
    ItemDetails,
  },

  data: () => ({
    resturent_id: localStorage.getItem("resturent_id"),
    orders: [],
    limit: 10,
    totalOrder: 0,
    totalAmount: 0,
    showOrder: [],
    showDetailsPopup: false,
  }),

  methods: {
    getTodaysOrder() {
      // this.$vs.loading();
      axios
        .post(
          `/restaurant_management/dashboard/invoice_all_report/${this.resturent_id}/?limit=100&offset=0`
        )
        .then((res) => {
          this.orders = res.data.data.results;
          this.totalOrder = res.data.data.total_order;
          this.totalAmount = res.data.data.total_amaount;
          console.log("total order fdfdsfdf",this.totalOrder);
          this.$vs.loading.close();
        })
        .catch((err) => {
          this.showActionMessage("error", err.response.statusText);
          this.checkError(err);
          // this.$vs.loading.close();
        });
    },
    cancelOrderItem(order_id, item_id) {
      axios
        .post("/restaurant_management/dashboard/order/cart/cancel_items/", {
          order_id,
          food_items: [item_id],
        })
        .then((res) => {
          if (res.data.status) {
            this.orders = this.orders.map((order) =>
              order.id === order_id ? { ...res.data.data } : order
            );
            // if(!this.checkAllCanceled(res.data.data.order_item)){
            // this.orderToServed = res.data.data;
            // }else{
            //   this.orderToServed = [];
            // }
          }
        })
        .catch((err) => {
          this.showActionMessage("error", err);
          this.checkError(err);
        });
    },

    dateFromat(date) {
      return moment(date).format("D-M-Y h:mm:ss");
    },
    showDetailsInfo(orderInfo) {
      this.showOrder = orderInfo;
      this.showDetailsPopup = !this.showDetailsPopup;
    },
  },

  created() {
    this.getTodaysOrder();
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
