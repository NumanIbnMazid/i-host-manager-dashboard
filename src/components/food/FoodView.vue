<template>
  <div id="data-list-thumb-view" class="data-list-container">
    <vs-table
      ref="table"
      v-model="selected"
      pagination
      :max-items="itemsPerPage"
      search
      :data="foods"
    >
      <div
        slot="header"
        class="flex flex-wrap-reverse items-center flex-grow justify-between"
      >
        <div class="flex flex-wrap-reverse items-center">
          <div
            class="p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary"
            @click="$router.push('/food/create')"
          >
            <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
            <span class="ml-2 text-base text-primary">Add New</span>
          </div>
        </div>

        <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4">
          <div
            class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
          >
            <span class="mr-2"
              >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} -
              {{
                foods.length - currentPage * itemsPerPage > 0
                  ? currentPage * itemsPerPage
                  : foods.length
              }}
              of {{ queriedItems }}</span
            >
            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
          </div>

          <vs-dropdown-menu>
            <vs-dropdown-item @click="itemsPerPage = 10">
              <span>10</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage = 15">
              <span>15</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage = 20">
              <span>20</span>
            </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>

      <template slot="thead">
        <vs-th>Sl</vs-th>
        <vs-th>Image</vs-th>
        <vs-th>Name</vs-th>
        <vs-th>Category</vs-th>
        <vs-th>Price</vs-th>
        <vs-th>Is available</vs-th>
        <vs-th>Is vat applicable</vs-th>
        <vs-th class="text-center">Options</vs-th>
        <vs-th>Action</vs-th>
      </template>

      <template slot-scope="{ data }">
        <tbody>
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <vs-td>
              <p class="product-name font-medium truncate text-center">
                {{ itemsPerPage * (currentPage - 1) + indextr + 1 }}
              </p>
            </vs-td>
            <vs-td class="img-container text-center">
              <img :src="tr.image" class="product-img" />
            </vs-td>

            <vs-td>
              <p class="product-name font-medium truncate">{{ tr.name }}</p>
            </vs-td>

            <vs-td>
              <p class="product-name font-medium truncate">
                {{ tr.category ? tr.category.name : "" }}
              </p>
            </vs-td>

            <vs-td>
              <p class="product-name font-medium truncate">{{ tr.price }}</p>
            </vs-td>
            <vs-td>
              <p class="product-name font-medium truncate">{{ tr.is_available }}</p>
            </vs-td>
            <vs-td>
              <p class="product-name font-medium truncate">{{ tr.is_vat_applicable }}</p>
            </vs-td>


            <vs-td class="text-center flex">
              <span v-for="(opt, i) in tr.food_options" :key="i">
                <vs-chip>
                  <b>{{ opt.option_type.name }}: </b>
                  {{ opt.name }}</vs-chip
                >
                <br />
              </span>
            </vs-td>

            <vs-td class="whitespace-no-wrap">
              <feather-icon
                icon="EyeIcon"
                svgClasses="w-5 h-5 m-3 hover:text-primary stroke-current"
                @click="
                  foodDetailPpopupActive = true;
                  selectedFood = tr;
                "
              />
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

    <!-- food detail info popup -->
    <vs-popup
      class="holamundo w-full"
      :title="`${selectedFood.name} Details`"
      :active.sync="foodDetailPpopupActive"
    >
      <template>
        <div class="con-expand-users w-full">
          <div class="con-btns-user flex items-center justify-between">
            <img
              class="rounded mx-auto"
              style="height: 180px"
              :src="selectedFood.image"
            />
          </div>

          <table class="mx-auto mt-4 center">
            <tr>
              <td class="font-semibold">Name :</td>
              <td>{{ selectedFood.name }}</td>
            </tr>

            <tr>
              <td class="font-semibold">Category :</td>
              <td>
                <p>
                  {{
                    selectedFood.category ? selectedFood.category.name : null
                  }}
                </p>
              </td>
            </tr>

            <tr>
              <td class="font-semibold">Price :</td>
              <td>
                <p>{{ selectedFood.price }}</p>
              </td>
            </tr>

            <tr>
              <td class="font-semibold">Description :</td>
              <td>
                {{
                  selectedFood.description &&
                  selectedFood.description.length > 10
                    ? selectedFood.description.substr(0, 10) + "..."
                    : selectedFood.description
                }}
              </td>
            </tr>
            <tr>
              <td class="font-semibold">Ingredients :</td>
              <td>
                <p>
                  {{
                    selectedFood.ingredients &&
                    selectedFood.ingredients.length > 10
                      ? selectedFood.ingredients.substr(0, 10) + "..."
                      : selectedFood.ingredients
                  }}
                </p>
              </td>
            </tr>

            <tr>
              <td class="font-semibold">Options :</td>
              <td class="flex">
                <span v-for="(opt, i) in selectedFood.food_options" :key="i">
                  <vs-chip>
                    <b>{{ opt.option_type.name }}: </b>
                    {{ opt.name }}</vs-chip
                  >
                </span>
              </td>
            </tr>

            <tr>
              <td class="font-semibold">Extra Type :</td>
              <td class="flex">
                <span v-for="(opt, i) in selectedFood.food_extras" :key="i">
                  <vs-chip> {{ opt.type_name }}</vs-chip>
                </span>
              </td>
            </tr>

            <tr>
              <td class="font-semibold">Top :</td>
              <td>{{ selectedFood.is_top ? "Yes" : "No" }}</td>
            </tr>

            <tr>
              <td class="font-semibold">Recommended :</td>
              <td>
                <p>
                  {{ selectedFood.is_recommended ? "Yes" : "No" }}
                </p>
              </td>
            </tr>


          </table>
        </div>
      </template>
    </vs-popup>
  </div>
</template>

<script>
import vSelect from "vue-select";
import axios from "@/axios.js";
export default {
  components: {
    "v-select": vSelect,
  },
  data() {
    return {
      resturent_id: localStorage.getItem("resturent_id"),
      selected: [],
      foods: [],
      categorys: [],
      itemsPerPage: 10,
      isMounted: false,
      sidebarData: {},
      active: false,
      popupActive: false,
      testImg: null,
      selectedFood: {},
      foodDetailPpopupActive: false,
    };
  },
  computed: {
    currentPage() {
      if (this.isMounted) {
        return this.$refs.table.currentx;
      }
      return 0;
    },
  },

  methods: {
    newImgAdd(input) {
      if (input.target.files && input.target.files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(input.target.files[0]);

        reader.onload = (e) => {
          let img = new Image();
          img.src = e.target.result;
          img.onload = () => {
            if (img.width !== 300 && img.height !== 200) {
              alert("Image size must be 300px*200px");
            } else {
              this.newData.image = input.target.files[0];
              this.newData.preview = e.target.result;
            }
          };
        };
      }
    },
    updateCurrImg(input) {
      if (input.target.files && input.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.editData.image = e.target.result;
        };
        reader.readAsDataURL(input.target.files[0]);
      }
    },
    addNewData() {
      this.sidebarData = {};
      this.toggleDataSidebar(true);
    },

    addImage(id) {
      let formData = new FormData();
      formData.append("image", this.newData.image);
      axios
        .patch(`/resturant/${this.resturent_id}/food/${id}/image/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data);
          this.foods.find((food) => food.id == res.data.id).image =
            res.data.image;
          this.popupActive = false;
          this.newData.image = "";
          this.newData.preview = "";
          this.showActionMessage("success", "Image uploaded successfully!");
        })
        .catch((err) => {
          this.showActionMessage("error", err.response.statusText);
          this.checkError(err);
        });
    },

    addFood() {
      const vm = this;
      function optionManupulate() {
        const optM = [];

        vm.newData.options.forEach((elem) => {
          let ndata = { option_name: elem, option_description: "" };
          optM.push(ndata);
        });

        console.log(optM);
        return optM;
      }
      axios
        .post(`resturant/${this.resturent_id}/food/`, {
          category: this.newData.category,
          discount_price: this.newData.discount_price,
          restaurant: this.resturent_id,
          ingredients: this.newData.ingredients,
          name: this.newData.name,
          price: this.newData.price,
          type: this.newData.type,
          options: optionManupulate(),
        })
        .then((res) => {
          this.addImage(res.data.id);
          this.foods.unshift(res.data);

          console.log(res);

          this.showActionMessage("success", "Food created successfully");
        })
        .catch((err) => {
          console.log(err);

          this.showActionMessage("error", err.response.statusText);
          this.checkError(err);
        });
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

    deleteFood(id) {
      this.showActionMessage("success", "Food Deleted Successfully!");
      axios
        .delete(`/restaurant_management/dashboard/food/${id}/`)
        .then((res) => {
          if (res.data.status) {
            this.foods = this.foods.filter((food) => food.id !== id);
            console.log("df ", res);
          }
        })
        .catch((err) => {
          console.log("dfe ", err.response);
          this.showActionMessage("error", err.response.statusText);
          this.checkError(err);
        });
    },
  },
  created() {
    this.getFood();
    // this.getCatgory();
  },
  mounted() {
    this.isMounted = true;
  },
};
</script>

<style lang="scss" >
  #data-list-thumb-view {
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
        border-spacing: 0 1.3rem;
        padding: 0 1rem;

        tr {
          box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);
          td {
            padding: 10px;
            &:first-child {
              border-top-left-radius: 0.5rem;
              border-bottom-left-radius: 0.5rem;
            }
            &:last-child {
              border-top-right-radius: 0.5rem;
              border-bottom-right-radius: 0.5rem;
            }
            &.img-container {
              // width: 1rem;
              // background: #fff;

              span {
                display: flex;
                justify-content: flex-start;
              }

              .product-img {
                height: 110px;
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

  th:first-child .vs-table-text {
    justify-content: center !important;
    cursor: pointer;
  }
  .vs-table--thead {
    background-color: #32304e;
    color: #fff;
  }

  .vs-con-table .vs-con-tbody .vs-table--tbody-table .vs-table--thead th {
    padding: 10px 15px !important;
  }
</style>
