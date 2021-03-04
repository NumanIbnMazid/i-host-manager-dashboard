<template>
  <div class="mx-10 py-4 w-full text-center bg-primary rounded shadow-md">
    <h1 class="text-white">{{ todayData.total_sell }} ৳</h1>
    <p class="text-ihosts"><b> Total Sell Today </b></p>

    <vs-button
      v-if="!statusNow"
      color="success"
      class="p-1 px-2 text-sm rounded-full mt-1 inline-flex"
      icon-pack="feather"
      icon="icon-check-circle"
      @click="showOpenSalePopup = true"
      >Open
    </vs-button>

    <vs-button
      v-else
      color="danger"
      class="p-1 px-2 text-sm rounded-full mt-1 inline-flex"
      icon-pack="feather"
      icon="icon-x-circle"
    >
      Close
    </vs-button>

    <vs-popup
      class="holamundo"
      title="Open sales"
      :active.sync="showOpenSalePopup"
    >
      <vs-row>
        <vs-col class="md:w-1/1 text-center">
          <div class="text-left inline-block mx-2">
            <label for="" class="">Starting Cash </label>
            <br />
            <vs-input class="" type="number" v-model="cashStart"> </vs-input>
          </div>

          <div class="text-left inline-block mx-2">
            <label for="" class="">Date</label>
            <br />
            <vs-input class="text-center" v-model="timeNow" disabled>
            </vs-input>
          </div>
        </vs-col>
        <vs-col class="w-1/8 text-center">
          <vs-button
            color="primary"
            class="mt-5 inline-flex"
            icon-pack="feather"
            icon="icon-check-circle"
            @click="openSlase()"
            >Open Sales</vs-button
          >
        </vs-col>
      </vs-row>
    </vs-popup>
  </div>
</template>

<script>
import moment from "moment";
import axios from "@/axios.js";

export default {
  props: ["todayData"],
  data: () => ({
    resturent_id: localStorage.getItem("resturent_id"),
    showOpenSalePopup: false,
    statusNow: localStorage.getItem("openStatus"),
    cashStart: 0,
    timeNow: moment().format("h:mm:ss A"),
  }),

  methods: {
    openSlase() {
      axios
        .post("/restaurant_management/dashboard/cash_log/", {
          restaurant: this.resturent_id,
          in_cash_while_opening: this.cashStart,
        })
        .then((res) => {
          if (res.status) {
            this.statusNow = true;
            localStorage.setItem("openStatus", true);
            this.showOpenSalePopup = false;
          }
        });
    },
    closeSales(){
      axios.patch()
    },
    getTime() {
      setInterval(() => {
        this.timeNow = moment().format("D-MM-y h:mm:ss A");
      }, 1000);
    },
  },

  created() {
    this.getTime();
  },
};
</script>

<style scoped>
.label-input {
  padding: 0.6rem;
  border-radius: 5px 0px 0px 5px !important;
}
.vs-input--input {
  border-radius: 0px 5px 5px 0px !important;
}

</style>
