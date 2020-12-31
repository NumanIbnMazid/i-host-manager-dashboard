<template>
  <div>
    <div>
      <div class="vx-row">
        <div
          class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4"
          style="cursor: pointer"
          @click="showReport = 'today'"
        >
          <vs-card
            class="mb-3"
            :class="showReport == 'today' ? 'border-ih' : 'border'"
          >
            <div class="flex">
              <div class="w-1/2">
                <span>Today Sale</span>
                <h3>৳ {{ todayData.total_sell }}</h3>
              </div>
              <div class="w-1/2 text-right mr-2">
                <span>Today Order</span>
                <h3>{{ todayData.total_order }}</h3>
              </div>
            </div>
            <chartjs-component-area-chart
              :height="120"
              :data="weekChart"
              :options="options"
            >
            </chartjs-component-area-chart>
          </vs-card>
        </div>

        <div
          class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4"
          style="cursor: pointer"
          @click="showReport = 'datewise'"
        >
          <vs-card
            class="mb-3"
            :class="showReport == 'datewise' ? 'border-ih' : 'border'"
          >
            <div class="flex">
              <div class="w-1/2">
                <span>Date wise sales report</span> <br />
                <span
                  >Current month sale: <b> ৳{{ cmSell }} </b></span
                >
              </div>
              <div class="w-1/2 text-right mr-2">
                <span>Current month order</span>
                <h3>{{ cmOrder }}</h3>
              </div>
            </div>
            <chartjs-component-area-chart
              :height="120"
              :data="monthChart"
              :options="options"
            >
            </chartjs-component-area-chart>
          </vs-card>
        </div>
        <div
          class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4"
          style="cursor: pointer"
          @click="showReport = 'top'"
        >
          <vs-card
            class="mb-3"
            :class="showReport == 'top' ? 'border-ih' : 'border'"
          >
            <div class="flex">
              <div class="w-1/2">
                <span>Item wise reports</span> <br />
                <span> <b> Top items </b></span>
                <div class="my-auto mt-5">
                  <h6
                    class="text-sm text-success my-1"
                    v-for="(item, i) in topItems"
                    :key="i"
                  >
                    #{{ i + 1 }} {{ item.name }}
                  </h6>
                </div>
              </div>
              <div class="w-1/2 text-right mr-2 mt-5 mb-5 pb-2">
                <svg
                  width="87"
                  height="106"
                  viewBox="0 0 87 106"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M35.1943 93.5783C36.3371 93.5783 37.2646 94.5058 37.2646 95.6486C37.2646 96.7914 36.3371 97.7189 35.1943 97.7189C34.0515 97.7189 33.124 96.7914 33.124 95.6486C33.124 94.5058 34.0515 93.5783 35.1943 93.5783Z"
                    fill="#31314E"
                  />
                  <path
                    d="M6.21094 9.52344H12.4219V6.21094C12.4219 2.78623 15.2081 0 18.6328 0H68.3203C71.745 0 74.5312 2.78623 74.5312 6.21094V9.52344H80.7422C84.1669 9.52344 86.9531 12.3097 86.9531 15.7344C86.9531 29.2032 80.6507 39.1014 70.4262 41.8572C66.9212 49.5722 61.3794 56.1307 54.3453 60.8699C52.7251 61.9616 51.7578 63.8304 51.7578 65.8691V77.2763C53.177 77.6402 54.479 78.3781 55.5426 79.4418C57.1071 81.0066 57.9688 83.0858 57.9688 85.2969H60.0391C63.4638 85.2969 66.25 88.0831 66.25 91.5078V103.93C66.25 105.073 65.3229 106 64.1797 106H22.7734C21.6302 106 20.7031 105.073 20.7031 103.93V91.5078C20.7031 88.0831 23.4894 85.2969 26.9141 85.2969H28.9844C28.9844 81.4453 31.6275 78.1992 35.1953 77.2777V65.8794C35.1953 63.8342 34.2274 61.9618 32.6058 60.8701C25.5711 56.1305 20.0292 49.5718 16.5244 41.8565C6.30141 39.0997 0 29.2022 0 15.7344C0 12.3097 2.78622 9.52344 6.21094 9.52344ZM82.8125 15.7344C82.8125 14.5928 81.8838 13.6641 80.7422 13.6641H74.5312V22.9184C74.5312 27.6376 73.8164 32.259 72.405 36.7095C78.9934 33.4461 82.8125 25.9091 82.8125 15.7344ZM26.9141 89.4375C25.7725 89.4375 24.8438 90.3662 24.8438 91.5078V101.859H62.1094V91.5078C62.1094 90.3662 61.1806 89.4375 60.0391 89.4375H26.9141ZM16.5625 22.9184C16.5625 28.5736 17.6883 34.0765 19.9094 39.2738C23.0687 46.6684 28.2589 52.9487 34.9187 57.4356C37.6847 59.2975 39.3359 62.4541 39.3359 65.8794V79.0859C39.3359 80.2294 38.4089 81.1562 37.2656 81.1562C34.9825 81.1562 33.125 83.0137 33.125 85.2969H53.8281C53.8281 84.1917 53.3971 83.1522 52.6147 82.3697C51.8706 81.6256 50.8941 81.1995 49.8498 81.1594C49.7962 81.1635 49.7422 81.1656 49.6877 81.1656C48.5445 81.1656 47.6174 80.2294 47.6174 79.0859V65.8691C47.6174 62.451 49.2676 59.2985 52.0317 57.4361C58.6921 52.9489 63.8824 46.6686 67.0421 39.2734C69.264 34.078 70.3906 28.5753 70.3906 22.9184V6.21094C70.3906 5.06937 69.4619 4.14062 68.3203 4.14062H18.6328C17.4912 4.14062 16.5625 5.06937 16.5625 6.21094V22.9184ZM14.5473 36.7091C13.1365 32.2575 12.4219 27.6364 12.4219 22.9184V13.6641H6.21094C5.06937 13.6641 4.14062 14.5928 4.14062 15.7344C4.14062 25.9085 7.95931 33.4453 14.5473 36.7091Z"
                    fill="#31314E"
                  />
                  <path
                    d="M27.09 24.463C27.3333 23.7133 27.9813 23.167 28.7614 23.0539L37.6961 21.7571L41.6924 13.6591C42.0412 12.9523 42.7609 12.5049 43.549 12.5049C44.3372 12.5049 45.0568 12.9523 45.4057 13.6591L49.402 21.7571L58.3365 23.0539C59.1165 23.1672 59.7643 23.7135 60.008 24.463C60.2515 25.2127 60.0484 26.0354 59.484 26.5855L53.0176 32.8875L54.5438 41.7872C54.677 42.5639 54.3577 43.3488 53.7201 43.8121C53.0824 44.2753 52.2371 44.3363 51.5398 43.9697L43.5488 39.7684L35.556 43.9697C34.8541 44.3386 34.0092 44.2724 33.3757 43.8119C32.7383 43.3486 32.419 42.5635 32.5524 41.7868L34.0803 32.8873L27.614 26.5855C27.0495 26.0354 26.8466 25.2127 27.09 24.463ZM37.7499 30.6818C38.2379 31.1576 38.4608 31.843 38.3453 32.5149L37.3431 38.3525L42.5857 35.5967C43.1892 35.2798 43.9097 35.2798 44.5124 35.5969L49.7533 38.3525L48.7521 32.5144C48.637 31.8426 48.8598 31.1574 49.3478 30.6818L53.5886 26.5486L47.7294 25.6981C47.0549 25.6002 46.4719 25.1766 46.1703 24.5655L43.5488 19.2533L40.9274 24.5655C40.6258 25.1766 40.0428 25.6002 39.3682 25.6981L33.5088 26.5486L37.7499 30.6818Z"
                    fill="#31314E"
                  />
                  <path
                    d="M43.4766 93.5783H51.7578C52.901 93.5783 53.8281 94.5051 53.8281 95.6486C53.8281 96.792 52.901 97.7189 51.7578 97.7189H43.4766C42.3333 97.7189 41.4062 96.792 41.4062 95.6486C41.4062 94.5051 42.3333 93.5783 43.4766 93.5783Z"
                    fill="#31314E"
                  />
                  <path
                    d="M11.5889 99.7889H10.4347C11.0226 99.6723 11.4181 99.6607 11.5889 99.7889Z"
                    fill="#31314E"
                  />
                </svg>
              </div>
            </div>
            <!-- <div class="flex">
            <div class="w-1/1">
              
            </div>
          </div> -->
          </vs-card>
        </div>
        <div
          class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4"
          style="cursor: pointer"
          @click="showReport = 'waiterwise'"
        >
          <vs-card
            class="mb-3"
            :class="showReport == 'waiterwise' ? 'border-ih' : 'border'"
          >
            <div class="flex">
              <div class="w-1/2">
                <span>Waiter sales report</span> <br />
                <span><b>Top Waiter </b></span>
                <div class="my-auto mt-5">
                  <h6
                    class="text-sm text-pl my-1"
                    v-for="(item, i) in topWaiters"
                    :key="i"
                  >
                    #{{ i + 1 }} {{ item.staff_info.name }}
                  </h6>
                </div>
              </div>
              <div class="w-1/2 text-right mr-2 mt-5 mb-5 pb-2">
                <svg
                  width="87"
                  height="106"
                  viewBox="0 0 87 106"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M35.1943 93.5783C36.3371 93.5783 37.2646 94.5058 37.2646 95.6486C37.2646 96.7914 36.3371 97.7189 35.1943 97.7189C34.0515 97.7189 33.124 96.7914 33.124 95.6486C33.124 94.5058 34.0515 93.5783 35.1943 93.5783Z"
                    fill="#31314E"
                  />
                  <path
                    d="M6.21094 9.52344H12.4219V6.21094C12.4219 2.78623 15.2081 0 18.6328 0H68.3203C71.745 0 74.5312 2.78623 74.5312 6.21094V9.52344H80.7422C84.1669 9.52344 86.9531 12.3097 86.9531 15.7344C86.9531 29.2032 80.6507 39.1014 70.4262 41.8572C66.9212 49.5722 61.3794 56.1307 54.3453 60.8699C52.7251 61.9616 51.7578 63.8304 51.7578 65.8691V77.2763C53.177 77.6402 54.479 78.3781 55.5426 79.4418C57.1071 81.0066 57.9688 83.0858 57.9688 85.2969H60.0391C63.4638 85.2969 66.25 88.0831 66.25 91.5078V103.93C66.25 105.073 65.3229 106 64.1797 106H22.7734C21.6302 106 20.7031 105.073 20.7031 103.93V91.5078C20.7031 88.0831 23.4894 85.2969 26.9141 85.2969H28.9844C28.9844 81.4453 31.6275 78.1992 35.1953 77.2777V65.8794C35.1953 63.8342 34.2274 61.9618 32.6058 60.8701C25.5711 56.1305 20.0292 49.5718 16.5244 41.8565C6.30141 39.0997 0 29.2022 0 15.7344C0 12.3097 2.78622 9.52344 6.21094 9.52344ZM82.8125 15.7344C82.8125 14.5928 81.8838 13.6641 80.7422 13.6641H74.5312V22.9184C74.5312 27.6376 73.8164 32.259 72.405 36.7095C78.9934 33.4461 82.8125 25.9091 82.8125 15.7344ZM26.9141 89.4375C25.7725 89.4375 24.8438 90.3662 24.8438 91.5078V101.859H62.1094V91.5078C62.1094 90.3662 61.1806 89.4375 60.0391 89.4375H26.9141ZM16.5625 22.9184C16.5625 28.5736 17.6883 34.0765 19.9094 39.2738C23.0687 46.6684 28.2589 52.9487 34.9187 57.4356C37.6847 59.2975 39.3359 62.4541 39.3359 65.8794V79.0859C39.3359 80.2294 38.4089 81.1562 37.2656 81.1562C34.9825 81.1562 33.125 83.0137 33.125 85.2969H53.8281C53.8281 84.1917 53.3971 83.1522 52.6147 82.3697C51.8706 81.6256 50.8941 81.1995 49.8498 81.1594C49.7962 81.1635 49.7422 81.1656 49.6877 81.1656C48.5445 81.1656 47.6174 80.2294 47.6174 79.0859V65.8691C47.6174 62.451 49.2676 59.2985 52.0317 57.4361C58.6921 52.9489 63.8824 46.6686 67.0421 39.2734C69.264 34.078 70.3906 28.5753 70.3906 22.9184V6.21094C70.3906 5.06937 69.4619 4.14062 68.3203 4.14062H18.6328C17.4912 4.14062 16.5625 5.06937 16.5625 6.21094V22.9184ZM14.5473 36.7091C13.1365 32.2575 12.4219 27.6364 12.4219 22.9184V13.6641H6.21094C5.06937 13.6641 4.14062 14.5928 4.14062 15.7344C4.14062 25.9085 7.95931 33.4453 14.5473 36.7091Z"
                    fill="#31314E"
                  />
                  <path
                    d="M27.09 24.463C27.3333 23.7133 27.9813 23.167 28.7614 23.0539L37.6961 21.7571L41.6924 13.6591C42.0412 12.9523 42.7609 12.5049 43.549 12.5049C44.3372 12.5049 45.0568 12.9523 45.4057 13.6591L49.402 21.7571L58.3365 23.0539C59.1165 23.1672 59.7643 23.7135 60.008 24.463C60.2515 25.2127 60.0484 26.0354 59.484 26.5855L53.0176 32.8875L54.5438 41.7872C54.677 42.5639 54.3577 43.3488 53.7201 43.8121C53.0824 44.2753 52.2371 44.3363 51.5398 43.9697L43.5488 39.7684L35.556 43.9697C34.8541 44.3386 34.0092 44.2724 33.3757 43.8119C32.7383 43.3486 32.419 42.5635 32.5524 41.7868L34.0803 32.8873L27.614 26.5855C27.0495 26.0354 26.8466 25.2127 27.09 24.463ZM37.7499 30.6818C38.2379 31.1576 38.4608 31.843 38.3453 32.5149L37.3431 38.3525L42.5857 35.5967C43.1892 35.2798 43.9097 35.2798 44.5124 35.5969L49.7533 38.3525L48.7521 32.5144C48.637 31.8426 48.8598 31.1574 49.3478 30.6818L53.5886 26.5486L47.7294 25.6981C47.0549 25.6002 46.4719 25.1766 46.1703 24.5655L43.5488 19.2533L40.9274 24.5655C40.6258 25.1766 40.0428 25.6002 39.3682 25.6981L33.5088 26.5486L37.7499 30.6818Z"
                    fill="#31314E"
                  />
                  <path
                    d="M43.4766 93.5783H51.7578C52.901 93.5783 53.8281 94.5051 53.8281 95.6486C53.8281 96.792 52.901 97.7189 51.7578 97.7189H43.4766C42.3333 97.7189 41.4062 96.792 41.4062 95.6486C41.4062 94.5051 42.3333 93.5783 43.4766 93.5783Z"
                    fill="#31314E"
                  />
                  <path
                    d="M11.5889 99.7889H10.4347C11.0226 99.6723 11.4181 99.6607 11.5889 99.7889Z"
                    fill="#31314E"
                  />
                </svg>
              </div>
            </div>
          </vs-card>
        </div>
      </div>
    </div>

    <Daily v-if="showReport == 'today'"></Daily>
    <DateWise v-if="showReport == 'datewise'"></DateWise>
    <TopItem v-if="showReport == 'top'"></TopItem>
    <WaiterWise v-if="showReport == 'waiterwise'"></WaiterWise>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import axios from "@/axios.js";
import ChartjsComponentAreaChart from "@/components/ChartjsComponentAreaChart.vue";

import Daily from "@/components/report/Daily.vue";
import DateWise from "@/components/report/DateWise.vue";
import TopItem from "@/components/report/TopItem.vue";
import WaiterWise from "@/components/report/WaiterWise.vue";
import moment from "moment";

import { mapGetters } from "vuex";
export default {
  components: {
    Daily,
    DateWise,
    TopItem,
    WaiterWise,
    Datepicker,
    ChartjsComponentAreaChart,
  },
  data: () => ({
    resturent_id: localStorage.getItem("resturent_id"),
    topItems: [],
    topWaiters: [],
    showReport: "today",

    options: {
      legend: { display: false },
      title: {
        display: false,
        text: "This week sales",
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              display: false,
            },
            gridLines: {
              display: false,
            },
          },
        ],
      },
    },
  }),
  methods: {
    getTopItem() {
      axios
        .post(
          `/restaurant_management/dashboard/top_food_items_by_date_range/${this.resturent_id}/?limit=5&offset=0`,
          {
            start_date: "2020-01-01", //moment(this.startDate).format("Y-M-D"),
            end_date: moment().format("Y-M-D"),
          }
        )
        .then((res) => {
          this.topItems = res.data.data.results;
          // this.total = res.data.data.total_order;
        })
        .catch((err) => {
          this.showActionMessage("error", err.response.statusText);
          this.checkError(err);
        });
    },
    getTopWaiter() {
      axios
        .post(
          `/restaurant_management/dashboard/waiter_report_by_date_range/${this.resturent_id}/?limit=5&offset=0`,
          {
            start_date: "2020-01-01", //moment(this.startDate).format("Y-M-D"),
            end_date: moment().format("Y-M-D"),
          }
        )
        .then((res) => {
          this.topWaiters = res.data.data.results;
          // this.total = res.data.data.total_order;
        })
        .catch((err) => {
          this.showActionMessage("error", err.response.statusText);
          this.checkError(err);
        });
    },
  },

  created() {
    this.getTopItem();
    this.getTopWaiter();
  },
  computed: {
    ...mapGetters(["todayData", "monthWeekData"]),
    cmSell() {
      return this.monthWeekData && this.monthWeekData.current_month_total_sell;
    },
    cmOrder() {
      return this.monthWeekData && this.monthWeekData.current_month_total_order;
    },
    lmSell() {
      return this.monthWeekData && this.monthWeekData.last_month_total_sell;
    },
    lmOrder() {
      return this.monthWeekData && this.monthWeekData.last_month_total_order;
    },
    weekChart() {
      return {
        labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        datasets: [
          {
            label: "Total Sale amount",
            backgroundColor: ["rgba(36, 112, 183, 0.3)"],
            data:
              this.monthWeekData &&
              this.monthWeekData.week_data &&
              this.monthWeekData.week_data.day_wise_income,
          },
        ],
      };
    },
    monthChart() {
      return {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "Total Sale amount",
            backgroundColor: ["rgba(36, 112, 183, 0.3)"],
            data:
              this.monthWeekData &&
              this.monthWeekData.month_data &&
              this.monthWeekData.month_data.month_wise_income,
          },
        ],
      };
    },
  },
};
</script>

<style scoped>
.border-ih {
  border: 2px solid #f8b843 !important;
}
.border {
  border: 2px solid #f8b94300 !important;
}
</style>