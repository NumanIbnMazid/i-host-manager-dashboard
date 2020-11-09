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
        <vs-th>Discount Price</vs-th>
        <vs-th>Description</vs-th>
        <vs-th>Ingredients</vs-th>
        <vs-th>Options</vs-th>
        <vs-th>Recommended</vs-th>
        <vs-th>Top</vs-th>
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
                {{ tr.category ? tr.category.name : ''  }}
              </p>
            </vs-td>

            <vs-td>
              <p class="product-name font-medium truncate">{{ tr.price }}</p>
            </vs-td>

            <vs-td>
              <p class="product-name font-medium truncate">
                {{ tr.discount_price }}
              </p>
            </vs-td>

            <vs-td>
              <p
                class="product-name font-medium truncate"
                :title="tr.description"
              >
                {{ tr.description }}
              </p>
            </vs-td>

            <vs-td>
              <p
                class="product-name font-medium truncate"
                :title="tr.ingredients"
              >
                {{ tr.ingredients }}
              </p>
            </vs-td>

            <vs-td>
              <vs-chip v-for="(opt, i) in tr.options" :key="i">{{
                opt.option_name
              }}</vs-chip>
            </vs-td>

            <vs-td>
              <p class="product-name font-medium truncate">
                {{ tr.is_recommended ? "Yes" : "No" }}
              </p>
            </vs-td>
            <vs-td>
              <p class="product-name font-medium truncate">
                {{ tr.is_top ? "Yes" : "No" }}
              </p>
            </vs-td>

            <vs-td class="whitespace-no-wrap">
              <feather-icon
                icon="EditIcon"
                svgClasses="w-5 h-5 hover:text-primary stroke-current"
                @click="editItem(tr)"
              />
              <feather-icon
                icon="TrashIcon"
                svgClasses="w-5 h-5 hover:text-danger stroke-current"
                class="ml-2"
                @click="deleteFood(tr.id)"
              />
            </vs-td>
          </vs-tr>
        </tbody>
      </template>
    </vs-table>

    <vs-sidebar
      click-not-close
      position-right
      parent="body"
      default-index="1"
      color="primary"
      class="sidebarx sidebar-custom"
      spacer
      v-model="active"
    >
      <div class="mt-6 flex items-center justify-between px-6">
        <h4>Edit {{ editData.name }}</h4>
        <feather-icon
          icon="XIcon"
          @click="active = !active"
          class="cursor-pointer"
        ></feather-icon>
      </div>
      <vs-divider class="mb-0"></vs-divider>
      <template>
        <div
          class="vs-row"
          style="height: 100%; overflow: scroll; padding-bottom: 45px"
        >
          <!-- Image Container -->
          <div
            class="img-container w-64 mx-auto flex items-center justify-center mt-5"
          >
            <img :src="editData.image" alt="img" class="responsive" />
          </div>

          <div class="modify-img flex justify-between mt-5 mx-5">
            <input
              type="file"
              class="hidden"
              ref="updateImgInput"
              @change="updateCurrImg"
              accept="image/*"
            />
            <vs-button class="mb-2" @click="$refs.updateImgInput.click()"
              >Update Image</vs-button
            >
            <!-- <vs-button class="mr-4" type="flat" @click="$refs.updateImgInput.click()">Update Image</vs-button> -->
            <!-- <vs-button type="flat" color="#999">Remove Image</vs-button> -->
            <vs-button
              color="warning"
              type="border"
              class="mb-2"
              @click="dataImg = null"
              >Remove Image</vs-button
            >
          </div>

          <div class="flex m-5">
            <vs-input
              label="Name"
              v-model="editData.name"
              class="mt-5 w-full"
              name="item-name"
            />
          </div>
          <div class="flex m-5">
            <vs-input
              label="Price"
              v-model="editData.price"
              class="mt-5 w-full"
              name="item-name"
            />
          </div>
          <div class="flex m-5">
            <vs-input
              label="Discount Price"
              v-model="editData.discount_price"
              class="mt-5 w-full"
              name="item-name"
            />
          </div>
          <div class="flex m-5">
            <vs-input
              label="Ingredients"
              v-model="editData.ingredients"
              class="mt-5 w-full"
              name="item-name"
            />
          </div>

          <div class="flex m-5">
            <vs-input
              label="Featured"
              v-model="editData.featured"
              class="mt-5 w-full"
              name="item-name"
            />
          </div>

          <div class="flex m-5">
            <v-select
              label="name"
              class="mt-5 w-full"
              v-model="editData.category"
              :options="categorys"
              :reduce="(categorys) => categorys.id"
            />
          </div>

          <!-- <div class="flex m-5">
            <v-select
              label="option_name"
              taggable
              multiple
              push-tags
              class="mt-5 w-full"
              v-model="editData.options"
              :options="editData.options"
              :create-option="
                (options) => ({
                  option_name: options,
                  option_description: '',
                  id: 0,
                })
              "
              :reduce="(options) => options.option_name"
            />
          </div> -->

          <div class="flex m-5">
            <vs-input
              label="Type"
              v-model="editData.type"
              class="mt-5 w-full"
              name="item-name"
            />
          </div>
        </div>
      </template>

      <div class="flex flex-wrap items-center p-6" slot="footer">
        <vs-button class="mr-6" @click="updateFood">Save Change</vs-button>
        <vs-button type="border" color="danger" @click="active = false"
          >Cancel</vs-button
        >
      </div>
    </vs-sidebar>

    <vs-popup
      class="holamundo"
      title="Add new category"
      :active.sync="popupActive"
    >
      <vs-row>
        <input
          type="file"
          class="hidden"
          ref="newImgInput"
          @change="newImgAdd"
          accept="image/*"
        />
        <div
          class="vx-col sm:w-1/3 mx-auto w-full rounded flex justify-center items-center"
          style="border: 1px solid #ddd; height: 150px"
        >
          <img
            v-if="newData.image"
            :src="newData.preview"
            class="w-full"
            alt="img"
          />
          <span v-else
            >Category Image <br />
            (300px*200px)</span
          >
        </div>
        <vs-row>
          <vs-button
            v-if="!newData.image"
            class="vx-col sm:w-1/3 mx-auto w-full mt-2"
            @click="$refs.newImgInput.click()"
            >Upload Image</vs-button
          >

          <vs-button
            v-else
            class="vx-col sm:w-1/3 mx-auto w-full mt-2"
            color="danger"
            @click="newData.image = ''"
            >Remove Image</vs-button
          >
        </vs-row>

        <div class="w-full">
          <vs-input
            label="Name"
            v-model="newData.name"
            class="mt-5 w-full"
            name="item-name"
          />
        </div>
        <div class="w-full">
          <vs-input
            label="Price"
            v-model="newData.price"
            class="mt-5 w-full"
            name="item-name"
          />
        </div>
        <div class="w-full">
          <vs-input
            label="Discount Price"
            v-model="newData.discount_price"
            class="mt-5 w-full"
            name="item-name"
          />
        </div>
        <div class="w-full">
          <vs-input
            label="Ingredients"
            v-model="newData.ingredients"
            class="mt-5 w-full"
            name="item-name"
          />
        </div>

        <!-- <div class="w-full">
          <vs-input
            label="Featured"
            v-model="newData.featured"
            class="mt-5 w-full"
            name="item-name"
            
          />
        </div>-->

        <div class="w-full mt-5">
          <label for>Category</label>
          <v-select
            class="w-full"
            v-model="newData.category"
            :options="categorys"
            label="name"
            :reduce="(categorys) => categorys.id"
          />
        </div>

        <!-- <div class="w-full mt-5">
          <label for>Options</label>
          <v-select
            taggable
            multiple
            push-tags
            :options="[]"
            class="w-full"
            v-model="newData.options"
          />
        </div>

      -->

        <vs-button class="mb-2 w-full mt-5" @click="addFood()"
          >Add New</vs-button
        >
      </vs-row>
    </vs-popup>
  </div>
</template>

<script>
// import DataViewSidebar from "./DataViewSidebar.vue";
// import moduleDataList from "@/store/data-list/moduleDataList.js";
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
      addNewDataSidebar: false,
      sidebarData: {},
      active: false,
      popupActive: false,
      testImg: null,

      editData: {
        category: null,
        discount_price: null,
        featured: null,
        id: null,
        image: null,
        preview: null,
        ingredients: null,
        name: null,
        price: null,
        // type: null,
        options: "",
      },
      newData: {
        category: null,
        discount_price: null,
        featured: null,
        image: null,
        preview: null,
        ingredients: null,
        name: null,
        price: null,
        // type: null,
        options: [],
      },
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

    // getCatgory() {
    //   axios
    //     .get(`resturant/${this.resturent_id}/category/`)
    //     .then((res) => {
    //       console.log(res);
    //       this.categorys = res.data.data;
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },

    editItem(data) {
      console.log(data);
      this.editData.category = data.category;
      this.editData.discount_price = data.discount_price;
      this.editData.image = data.image;
      this.editData.ingredients = data.ingredients;
      this.editData.name = data.name;
      this.editData.price = data.price;
      this.editData.options = data.options;
      this.editData.id = data.id;
      this.active = true;
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
        })
        .catch((err) => {
          console.log(err);
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

          this.$vs.notify({
            title: "Create Success",
            text: "Food created successfully",
            color: "success",
            position: "top-right",
          });
        })
        .catch((err) => {
          console.log(err);

          this.$vs.notify({
            title: "Create Failed",
            text: "Food create failed",
            color: "danger",
            position: "top-right",
          });
        });
    },
    getFood() {
      axios
        .get(`/restaurant_management/food/`)
        .then((res) => {
          console.log('food ', res);
          this.foods = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateFood() {
      axios
        .patch(`resturant/${this.resturent_id}/food/${this.editData.id}`, {
          category: this.editData.category,
          discount_price: this.editData.discount_price,
          featured: this.editData.featured,
          ingredients: this.editData.ingredients,
          name: this.editData.name,
          price: this.editData.price,
          type: this.editData.type,
          options: this.editData.options,
          restaurant: this.resturent_id,
        })
        .then((res) => {
          let item = this.foods.find((arr) => arr.id == this.editData.id);
          console.log(item.indexOf);
          item = res.data;
          console.log(item);
          console.log(res);

          this.$vs.notify({
            title: "Update Success",
            text: "Food info updated successfully",
            color: "success",
            position: "top-right",
          });
        })
        .catch((err) => {
          console.log(res);

          this.$vs.notify({
            title: "Update Failed",
            text: "Food info update failed",
            color: "danger",
            position: "top-right",
          });
        });
    },

    deleteFood(id) {
      axios
        .delete(`resturant/${this.resturent_id}/food/${id}`)
        .then((res) => {
          let item = this.foods.findIndex((arr) => arr.id == id);
          this.foods.splice(item, 1);
        })
        .catch((err) => {
          console.log(err);
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

/** options data */

// category: 7
// discount_price: 0
// featured: true
// id: 20
// image: "/media/Beef_seek.jpg"
// ingredients: "meet"
// name: "Beef seek"
// options: [{id: 1, option_name: "Rare", option_description: null, food: 20},…]
// price: 350
// type: "Food"
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
</style>


