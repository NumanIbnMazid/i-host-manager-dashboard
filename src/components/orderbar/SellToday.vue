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
      @click="showCloseSalePopup= true"

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

    <vs-popup
      class="holamundo"
      title="Open sales"
      :active.sync="showCloseSalePopup"
    >
      <vs-row>
        <vs-col class="md:w-1/1 text-center">
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
            @click="closeSlase()"
          >Close Sales</vs-button
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
    resturent: JSON.parse(localStorage.getItem("resturent")),
    resturent_id: localStorage.getItem("resturent_id"),
    showOpenSalePopup: false,
    showCloseSalePopup: false,
    statusNow: null,
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
            let resturent = JSON.parse(localStorage.getItem('resturent'))
            this.resturent.cash_log = res.data.data;
            resturent.cash_log = res.data.data;
            localStorage.setItem("resturent", JSON.stringify(resturent));
            this.showOpenSalePopup = false;
            this.statusNow = true
          }
        });
    },
    closeSlase() {
      // console.log(localStorage.getItem("resturent"))
      let theRes = JSON.parse(localStorage.getItem("resturent"))
      axios
        .patch(
          `/restaurant_management/dashboard/cash_log/${theRes.cash_log.id}/`,
          {
            restaurant: this.resturent_id,
            // ending_time: this.timeNow,
            remarks: "",
          }
        )
        .then((res) => {
          if (res.status) {

            let resturent = JSON.parse(localStorage.getItem('resturent'))
            this.resturent.cash_log = res.data.data;
            resturent.cash_log = res.data.data;
            localStorage.setItem("resturent", JSON.stringify(resturent));
            this.showCloseSalePopup = false;
            this.statusNow = false

          }
        });
    },
    closeSales() {
      axios.patch();
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

  mounted() {
    let restaurant = JSON.parse(localStorage.getItem("resturent"));
    this.statusNow = restaurant.cash_log
      ? restaurant.cash_log.ending_time
        ? false
        : true
      : false;
  },
};

// "id": 15,
//         "starting_time": "2021-03-10T10:59:06.747593",
//         "ending_time": null,
//         "in_cash_while_opening": 1000,
//         "in_cash_while_closing": null,
//         "total_received_payment": null,
//         "total_cash_received": null,
//         "remarks": null
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

