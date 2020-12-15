<template>
  <div id="data-list-thumb-view-alt" class="data-list-container">
    <vs-row>
      <div class="vx-col w-3/4">
        <div class="vx-row mb-10">
          <div class="vx-col md:w-1/2">
            <h1 class="text-grey-dark">Order Dashboard</h1>
          </div>
          <div class="vx-col md:w-1/2 text-right">
            <h1 class="text-grey-dark">
              {{ time }}
            </h1>
          </div>
        </div>

        <!-- list and grid btn -->
        <vs-row>
          <div class="grid-btns grid grid-cols-12 gap-4 w-full">
            <!-- list btn -->
            <vs-button
              class="col-end-12 m-2 mr-0"
              :color="isList ? 'primary' : 'secondary'"
              type="filled"
              icon-pack="feather"
              icon="icon-list"
              @click="
                isGrid = false;
                isList = true;
              "
              >List</vs-button
            >

            <!-- grid btn -->
            <vs-button
              class="col-end-13 m-2 ml-0"
              :color="isGrid ? 'primary' : 'secondary'"
              type="filled"
              icon-pack="feather"
              icon="icon-grid"
              @click="
                isGrid = true;
                isList = false;
              "
              >Grid</vs-button
            >
          </div>
        </vs-row>

        <vs-row>
          <div class="w-2/12">
            <p class="text-center">Menu Categories</p>
            <vs-divider class="my-2" />
            <vs-button
              class="w-full my-1"
              :color="!slectedCategory ? 'secondary' : 'primary'"
              type="filled"
              @click="allItem()"
              >All</vs-button
            >
            <hooper
              :vertical="true"
              style="height: 80vh"
              :itemsToShow="17"
              :itemsToSlide="4"
              :initialSlide="7"
            >
              <slide v-for="(category, i) in categories" :key="i">
                <vs-button
                  class="w-full my-1"
                  :color="
                    slectedCategory == category.id ? 'secondary' : 'primary'
                  "
                  type="filled"
                  @click="findFooitemByCat(category.id)"
                  >{{ category.name }}</vs-button
                >
              </slide>
              <hooper-navigation
                v-if="categories.length > 16"
                slot="hooper-addons"
              ></hooper-navigation>
            </hooper>
          </div>

          <div class="w-10/12">
            <div class="w-full mx-2">
              <vs-input
                class="w-full px-1"
                placeholder="Search for item......"
                v-model="search"
                @keypress="findFooitem()"
              ></vs-input>

              <!-- food grid view -->
              <div id="demo-basic-card" class="mt-4" v-if="isGrid">
                <div class="vx-row">
                  <div
                    class="vx-col w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-base"
                    v-for="(food, indextr) in foods"
                    :key="indextr"
                  >
                    <vx-card>
                      <div slot="no-body">
                        <img
                          style="height: 176px; width: 235px"
                          :src="food.image"
                          alt="content-img"
                          class="responsive card-img-top"
                        />
                      </div>
                      <vx-tooltip :text="food.name">
                        <h5 class="mb-2 text-center">
                          {{
                            food.name.length > 11
                              ? food.name.substr(0, 10) + "..."
                              : food.name
                          }}
                        </h5>
                      </vx-tooltip>
                      <p class="text-grey text-center mb-2">
                        <strong>Price : </strong> {{ food.price }}
                      </p>
                      <!-- <p class="text-grey">{{ "card_1.subtitle_2" }}</p> -->

                      <!-- <vs-button
                          class="mt-4 mr-2 shadow-lg"
                          type="gradient"
                          color="#7367F0"
                          gradient-color-secondary="#CE9FFC"
                          >Download</vs-button
                        > -->

                      <!-- <vs-button
                          color="primary"
                          type="border"
                          icon-pack="feather"
                          icon="icon-plus"
                          class="w-full"
                          @click="itemAddToCart(food)"
                          >Add</vs-button
                        > -->
                      <div class="flex" v-if="!checkIfCart(food)">
                        <vs-button
                          color="primary"
                          type="border"
                          icon-pack="feather"
                          icon="icon-plus"
                          class="w-full"
                          @click="itemAddToCart(food)"
                          >Add</vs-button
                        >
                      </div>

                      <div v-else class="flex">
                        <vs-button
                          color="primary"
                          type="border"
                          icon-pack="feather"
                          icon="icon-minus"
                          @click="decraseItem(food)"
                        ></vs-button>

                        <vs-input
                          class="px-1 text-center"
                          :value="checkIfCart(food).qty"
                          :ref="`quantityItem-${food}`"
                          @keyup="itemQtyAdd(food)"
                        ></vs-input>
                        <vs-button
                          color="primary"
                          type="border"
                          icon-pack="feather"
                          icon="icon-plus"
                          @click="increaseItem(food)"
                        ></vs-button>
                      </div>
                    </vx-card>
                  </div>
                </div>
              </div>

              <!-- foods table view -->
              <vs-table class="p-0" ref="table" :data="foods" v-if="isList">
                <template slot="thead">
                  <vs-th class="text-center">Image</vs-th>
                  <vs-th>Name</vs-th>
                  <vs-th>Price</vs-th>
                  <vs-th>Price</vs-th>
                  <vs-th>Action</vs-th>
                </template>

                <template slot-scope="{ data }">
                  <tbody>
                    <vs-tr
                      :data="tr"
                      :key="indextr"
                      v-for="(tr, indextr) in data"
                    >
                      <vs-td style="width: 10%">
                        <!-- <p class="img-container font-medium"> -->
                        <img :src="tr.image" class="product-img" />
                        <!-- </p> -->
                      </vs-td>
                      <vs-td>
                        <p>{{ tr.name }}</p>
                      </vs-td>

                      <vs-td>
                        <p class="product-name font-medium truncate">
                          {{ tr.price }}
                        </p>
                      </vs-td>

                      <vs-td class="text-center">
                        <p
                          class="product-name font-medium truncate"
                          :title="tr.ingredients"
                        >
                          {{ tr.ingredients }}
                        </p>
                      </vs-td>

                      <vs-td>
                        <div class="flex" v-if="!checkIfCart(tr)">
                          <vs-button
                            color="primary"
                            type="border"
                            icon-pack="feather"
                            icon="icon-plus"
                            class="w-full"
                            @click="itemAddToCart(tr)"
                            >Add</vs-button
                          >
                        </div>

                        <div v-else class="flex">
                          <vs-button
                            color="primary"
                            type="border"
                            icon-pack="feather"
                            icon="icon-minus"
                            @click="decraseItem(tr)"
                          ></vs-button>

                          <vs-input
                            class="px-1 text-center"
                            :value="checkIfCart(tr).qty"
                            :ref="`quantityItem-${tr}`"
                            @keyup="itemQtyAdd(tr)"
                          ></vs-input>
                          <vs-button
                            color="primary"
                            type="border"
                            icon-pack="feather"
                            icon="icon-plus"
                            @click="increaseItem(tr)"
                          ></vs-button>
                        </div>
                      </vs-td>
                    </vs-tr>
                  </tbody>
                </template>
              </vs-table>
            </div>
          </div>
        </vs-row>
      </div>

      <!-- side bar -->
      <div
        class="vx-col w-1/4 pl-3"
        style="
          position: fixed;
          right: 0px;
          top: 0;
          height: 100%;
          width: 22% !important;
        "
      >
        <div class="w-100 shadow-lg rounded" style="height: 100%">
          <!-- profile information & notification -->
          <div class="profile mb-4">
            <UserProfile />
          </div>

          <div class="flex text-center">
            <!-- take out -->
            <div class="w-1/2">
              <vs-button
                color="white"
                class="text-dark shadow"
                type="filled"
                @click="
                  isTakeOut = !isTakeOut;
                  isDinein = false;
                "
                v-bind:class="[
                  isTakeOut ? 'text-white bg-warning' : 'text-dark',
                ]"
                >Take Out</vs-button
              >
            </div>

            <!-- dine in 🍴🍽 -->
            <div class="w-1/2">
              <vs-button
                v-bind:class="[
                  isDinein ? 'text-white bg-warning' : 'text-dark',
                ]"
                color="white"
                class="w-100 shadow"
                @click="
                  isDinein = !isDinein;
                  isTakeOut = false;
                  getTables();
                "
                >Dine In</vs-button
              >
            </div>
          </div>

          <!-- take out information table -->
          <div class="table-info mt-4 pt-4" v-if="isTakeOut">
            <div class="table-card">
              <vs-table>
                <template slot="thead">
                  <vs-th class="text-xs">Variant</vs-th>
                  <vs-th class="text-xs">Item</vs-th>
                  <vs-th class="text-xs">Qty</vs-th>
                  <vs-th class="text-xs">Amount</vs-th>
                </template>

                <template>
                  <vs-tr
                    class="text-xs"
                    v-for="item in itemsCarts"
                    :key="item.id"
                  >
                    <!-- <vs-tr class="text-xs"> -->
                    <vs-td> {{ item.name }} </vs-td>

                    <vs-td> Double patty </vs-td>

                    <vs-td> {{ item.qty }} </vs-td>

                    <vs-td> {{ item.price }} </vs-td>
                  </vs-tr>

                  <!-- <vs-tr class="text-xs">
                    <vs-td> Lemonda </vs-td>

                    <vs-td> Single patty </vs-td>

                    <vs-td> 6 </vs-td>

                    <vs-td> 30.00 </vs-td>
                  </vs-tr> -->
                </template>
              </vs-table>
            </div>
          </div>

          <!-- table card -->
          <div class="table-info mt-4 pt-4" v-if="isDinein">
            <div class="table-card">
              <div class="table-list m-2 grid grid-cols-3 gap-4">
                <div
                  class="restaurant-tables mr-2 text-white center"
                  v-for="(table, index) in tables"
                  :key="index"
                >
                  <div
                    :style="`${
                      table.is_occupied
                        ? 'cursor: not-allowed'
                        : 'cursor: pointer'
                    }`"
                    class="table-no mx-auto"
                    :class="
                      !table.is_occupied
                        ? table.id == slectedTable
                          ? 'bg-primary'
                          : 'bg-success'
                        : 'bg-grey'
                    "
                    @click="slectedTable = table.id"
                  >
                    <div class="table-svg">
                      <p class="table-number text-center text-2xl mt-0 pt-0">
                        {{ table.table_no }}
                      </p>

                      <svg
                        class="ml-4"
                        width="26"
                        height="19"
                        viewBox="0 0 24 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M23.1431 16.2857V5.14285H0.857422V16.2857H2.57171V6.42857C2.57171 6.19189 2.7636 6 3.00028 6H21.0003C21.237 6 21.4288 6.19189 21.4288 6.42857V16.2857H23.1431Z"
                          fill="#fff"
                        />
                        <path
                          d="M1.51507 0L0.37207 1.71429H23.6279L22.4849 0H1.51507Z"
                          fill="#fff"
                        />
                        <path
                          d="M0 2.57143H24V4.28571H0V2.57143Z"
                          fill="#fff"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <!-- select button -->
              <div class="mx-auto text-center mt-4 mb-4">
                <vs-button class="w-3/4 text-2xl" color="dark" type="filled"
                  >Select</vs-button
                >
              </div>
            </div>
          </div>

          <!-- place order btn -->
          <div
            v-if="isDinein"
            class="place-order w-2/3 mx-auto mt-4 text-center"
          >
            <vs-button color="primary" class="text-3xl text-white" type="flat"
              >Place Order</vs-button
            >
          </div>
        </div>
      </div>
    </vs-row>
  </div>
</template>


<script>
import axios from "@/axios.js";
import moment from "moment";
import { Hooper, Slide, Navigation as HooperNavigation } from "hooper";
import "hooper/dist/hooper.css";

import UserProfile from "./UserProfile";
import Tables from "./Tables";
export default {
  components: {
    Hooper,
    Slide,
    HooperNavigation,
    UserProfile,
  },
  data: () => ({
    resturent_id: localStorage.getItem("resturent_id"),
    time: "",
    foods: [],
    search: "",
    tables: [],
    categories: [],
    itemsCarts: [],
    slectedCategory: "",
    isGrid: false,
    isList: true,
    isDinein: false,
    isTakeOut: true,
    slectedTable: null,
  }),

  methods: {
    testFunc() {
      console.log("hellow world!");
    },

    getTime() {
      setInterval(() => {
        this.time = moment().format("h:mm:ss A");
      }, 1000);
    },

    findFooitem() {
      axios
        .get(
          `/restaurant_management/dashboard/dashboard_food_search/${this.search}?restaurant=${this.resturent_id}`
        )
        .then((res) => {
          console.log("food ", res);
          this.foods = res.data.data;
        })
        .catch((err) => {
          console.log("get food error ", err.response);
          this.showActionMessage("error", err.response.statusText);
          this.checkError(err);
        });
    },

    findFooitemByCat(category_id) {
      this.slectedCategory = category_id;
      axios
        .get(
          `/restaurant_management/dashboard/food_list/${category_id}?restaurant=${this.resturent_id}`
        )
        .then((res) => {
          console.log("food ", res);
          this.foods = res.data.data;
        })
        .catch((err) => {
          console.log("get food error ", err.response);
          this.showActionMessage("error", err.response.statusText);
          this.checkError(err);
        });
    },

    allItem() {
      this.slectedCategory = "";
      this.getFood();
    },

    itemAddToCart(item) {
      let theitem = this.itemsCarts.filter((arr) => arr.id == item.id);
      // console.log("1 ", theitem);
      if (theitem.length == 0) {
        item["qty"] = 1;
        this.itemsCarts.push(item);

        // console.log("2 ", this.itemsCarts);
      }
    },
    increaseItem(item) {
      let theitem = this.itemsCarts.find((arr) => arr.id == item.id).qty++;
    },

    decraseItem(item) {
      let theitem = this.itemsCarts.find((arr) => arr.id == item.id);
      if (theitem.qty == 1) {
        let index = this.itemsCarts.indexOf(theitem);
        if (index > -1) {
          this.itemsCarts.splice(index, 1);
        }
      } else {
        theitem.qty--;
      }
    },

    checkIfCart(item) {
      let theitem = this.itemsCarts.find((arr) => arr == item);
      // console.log("3 ", theitem);
      return theitem ? theitem : false;
    },

    getFood() {
      axios
        .get(
          `restaurant_management/dashboard/restaurant/${this.resturent_id}/foods/`
        )
        .then((res) => {
          console.log("food ", res);
          this.foods = res.data.data;
        })
        .catch((err) => {
          console.log("get food error ", err.response);
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
          console.error(err);
        });
    },

    getTables() {
      console.log("table func called!!");
      axios
        .get(
          `/restaurant_management/dashboard/restaurant/${this.resturent_id}/tables/`
        )
        .then((res) => {
          console.log("tables ", res.data.data);
          this.tables = res.data.data;
        })
        .catch((err) => {
          console.log("table error ", err.response);
          this.showActionMessage("error", err.response.statusText);
          // console.log("sremove error ", err);
          this.checkError(err);
        });
    },
  },

  created() {
    this.getFood();
    this.getCategorys();
    this.getTime();
  },
};
</script>


<style lang="scss" >
.vs-input--input {
  text-align: center;
}
#data-list-thumb-view-alt {
  .vs-con-table {
    .product-name {
      max-width: 23rem;
    }

    .vs-table--header {
      display: flex;
      flex-wrap: wrap-reverse;
      margin-left: 1.5rem;
      margin-right: 1.5rem;
      > span {
        display: flex;
        flex-grow: 1;
      }

      .vs-table--search {
        padding-top: 0;

        .vs-table--search-input {
          padding: 0.9rem 2.5rem;
          font-size: 1rem;

          & + i {
            left: 1rem;
          }

          &:focus + i {
            left: 1rem;
          }
        }
      }
    }

    .vs-table {
      border-collapse: separate;
      // border-spacing: 0 1.3rem;
      // padding: 0 1rem;

      tr {
        box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);
        td {
          padding: 10px;
          &:first-child {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }
          &:last-child {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
          &.img-container {
            // width: 1rem;
            // background: #fff;

            span {
              display: flex;
              justify-content: flex-start;
            }

            .product-img {
              height: 50px;
              width: 50px !important;
            }
          }
        }
        td.td-check {
          padding: 20px !important;
        }
      }
    }

    .vs-table--thead {
      th {
        padding-top: 0;
        padding-bottom: 0;

        .vs-table-text {
          text-transform: uppercase;
          font-weight: 600;
        }
      }
      th.td-check {
        padding: 0 15px !important;
      }
      tr {
        background: none;
        box-shadow: none;
      }
    }

    .vs-table--pagination {
      justify-content: center;
    }
  }
}

.vs-sidebar {
  z-index: 100000;
}

.sidebar-custom > .header-sidebar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  h4 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    > button {
      margin-left: 10px;
    }
  }
}

.footer-sidebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  > button {
    border: 0px solid rgba(0, 0, 0, 0) !important;
    border-left: 1px solid rgba(0, 0, 0, 0.07) !important;
    border-radius: 0px !important;
  }
}

.sidebar-custom > .vs-sidebar-primary {
  max-width: 400px !important;
}

// th:first-child .vs-table-text {
//   justify-content: center !important;
//   cursor: pointer;
// }
.vs-table--thead {
  background-color: #32304e;
  color: #fff;
}

.vs-con-table .vs-con-tbody .vs-table--tbody-table .vs-table--thead th {
  padding: 10px 15px !important;
}

.product-img {
  width: 150px !important;
  // width: 100px !important;
}

.th .sort-th,
th .vs-table-text {
  justify-content: center !important;
}

.place-order {
  position: sticky;
  top: 900px;

  background: #c4c4c4;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25),
    inset 0px -3px 5px rgba(0, 0, 0, 0.38);
  border-radius: 7px;
}

// table card styles
.table-card {
  margin: 4px 0 4px 12px;
  width: 387px;
  height: auto;
  left: 1517px;
  top: 258px;

  background: #ffffff;
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 9px;
}

// restaurant table styles
.restaurant-tables {
  width: 89px;
  height: 63px;
  left: 1544px;
  top: 283px;

  background: #ffffff;
  border: 2px solid #c4c4c4;
  box-sizing: border-box;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;

  // table number styles
  .table-no {
    width: 56.97px;
    height: 59px;
  }
}
</style>

