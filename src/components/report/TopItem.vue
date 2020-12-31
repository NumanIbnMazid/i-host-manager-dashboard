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

      <v-select
        label="name"
        multiple
        v-model="category"
        :options="categories"
        :reduce="(categories) => categories.id"
        style="min-width: 200px"
      />
      <vs-button
        class="m-2"
        @click="
          getAllItem();
          search = true;
        "
        >Go</vs-button
      >
      <vs-button class="m-2" color="danger" v-if="search" @click="resetFilter()"
        >Reset</vs-button
      >
    </div>

    <vs-table class="p-0" ref="table" :data="orders">
      <template slot="thead">
        <th>Rank</th>
        <th style="text-align: left !important;padding-left: 10.2% !important;">Item Name</th>
        <th>Category</th>
        <th>Quantity</th>
        <th>Total Sell</th>
      </template>

      <template slot-scope="{ data }">
        <tbody>
          <vs-tr :data="tr" v-for="(tr, i) in data" :key="i">
            <vs-td
              ><p>{{ i+1 }}</p></vs-td
            >
            <vs-td class="text-left"
              ><p class="ml-5" style="padding-left: 20%">{{ tr.name }}</p></vs-td
            >
            <vs-td><p>-</p> </vs-td>
            <vs-td
              ><p>{{ tr.quantity }}</p>
            </vs-td>
            <vs-td
              ><p>৳{{ tr.price }}</p>
            </vs-td>
          </vs-tr>
        </tbody>
      </template>
    </vs-table>
    <!-- <br />
    <vs-pagination
      :total="Math.ceil(total / 10)"
      v-model="currentx"
    ></vs-pagination> -->
  </div>
</template>

<script>
import axios from "@/axios.js";
import moment from "moment";
import Datepicker from "vuejs-datepicker";
import vSelect from "vue-select";

export default {
  components: {
    Datepicker,
    vSelect,
  },

  data: () => ({
    resturent_id: localStorage.getItem("resturent_id"),
    search: false,
    currentx: 1,
    orders: [],
    total: [],
    categories: [],
    limit: 10,
    startDate: moment().format("YYYY-MM-01"),
    endDate: moment().format(),
    category: [],
  }),

  methods: {
    getAllItem() {
      axios
        .post(
          `/restaurant_management/dashboard/top_food_items_by_date_range/${this.resturent_id}/?limit=100&offset=0`,
          {
            start_date: moment(this.startDate).format("Y-M-D"),
            end_date: moment(this.endDate).format("Y-M-D"),
            category: this.category,
          }
        )
        .then((res) => {
          this.orders = res.data.data.results;
          // this.total = res.data.data.total_order;
        })
        .catch((err) => {
          this.showActionMessage("error", err.response.statusText);
          this.checkError(err);
        });
    },
    getCategorys() {
      axios
        .get(
          `/restaurant_management/dashboard/category_list/${this.resturent_id}`
        )
        .then((res) => {
          if (res.data.status) this.categories = res.data.data;
        })
        .catch((err) => {
          this.showActionMessage("error", err.response.statusText);
          this.checkError(err);
        });
    },

    resetFilter() {
      this.startDate = moment().format("YYYY-MM-01");
      this.endDate = moment().format();
      this.category = [];
      this.search = false;

      this.getAllItem();
    },

    dateFromat(date) {
      return moment(date).format("D-M-Y h:mm:ss");
    },
  },

  created() {
    this.getAllItem();
    this.getCategorys();
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