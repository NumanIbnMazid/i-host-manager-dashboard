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

        <vs-row>
          <div class="w-2/12">
            <vs-button
              v-for="i in 10"
              :key="i"
              class="w-full my-1"
              color="primary"
              type="filled"
              >Primary</vs-button
            >
          </div>

          <div class="w-10/12">
            <div class="w-full mx-2">
              <vs-input
                class="w-full"
                placeholder="Search for item......"
              ></vs-input>

              <vs-table class="p-0" ref="table" :data="foods">
                <template slot="thead">
                  <vs-th>Sl</vs-th>
                  <vs-th>Item</vs-th>
                  <vs-th>Item</vs-th>
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
                      <vs-td>
                        <p class="img-container font-medium">
                          <img :src="tr.image" class="product-img" />
                        </p>
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
                        <feather-icon
                          icon="EditIcon"
                          svgClasses="w-5 h-5 hover:text-primary stroke-current"
                          @click="$router.push(`/food/edit/${tr.id}`)"
                        />
                        <feather-icon
                          icon="TrashIcon"
                          svgClasses="w-5 h-5 hover:text-danger stroke-current"
                          class="ml-2"
                          @click="confirmAction(deleteFood, [tr.id])"
                        />
                      </vs-td>
                    </vs-tr>
                  </tbody>
                </template>
              </vs-table>
            </div>
          </div>
        </vs-row>
      </div>
      <div class="vx-col w-1/4">
        <div class="w-100 h-100 bg-bl">hello</div>
      </div>
    </vs-row>
  </div>
</template>


<script>
import axios from "@/axios.js";
import moment from "moment";
export default {
  data: () => ({
    resturent_id: localStorage.getItem("resturent_id"),
    time: "",
    foods: [],
  }),

  methods: {
    getTime() {
      setInterval(() => {
        this.time = moment().format("h:mm:ss A");
      }, 1000);
    },

    getFood() {
      axios
        .get(`restaurant_management/restaurant/${this.resturent_id}/foods/`)
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
  },

  created() {
    this.getTime();
    this.getFood();
  },
};
</script>


<style lang="scss" >
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
</style>

