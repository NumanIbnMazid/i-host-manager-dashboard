<template>
  <div>
    <div
      slot="header"
      class="flex flex-wrap-reverse items-center flex-grow justify-between"
    >
      <div class="flex flex-wrap-reverse items-center">
        <!-- ACTION - DROPDOWN -->
        <div
          class="p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary"
          @click="popupActive = true"
        >
          <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
          <span class="ml-2 text-base text-primary">Add New</span>
        </div>
        <div
          class="p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary bg-primary"
          @click="popupActive = true"
        >
          <span class="text-base text-white">
            Total:<b> {{ categories.length }}</b>
          </span>
        </div>
      </div>
    </div>
    <div class="vx-row">
      <div
        class="vx-col sm:w-2/12 w-full mb-2 p-2"
        v-for="(category, i) in categories"
        :key="i"
      >
        <vx-card>
          <template>
            <div class="w-full flex items-center mb-2">
              <img :src="category.image" class="product-img w-full" />
            </div>
            <hr />
            <h3 class="text-center py-1">{{ category.name }}</h3>
            <hr />
            <div class="vx-row">
              <div class="v-col w-full sm:w-12/12">
                <div class="text-center">
                  <div
                    class="vx-row w-full m-0 text-center"
                    style="width: 98% !important"
                  >
                    <div class="v-col w-full sm:w-1/1 md:w-1/1 lg:w-1/2">
                      <vs-button
                        color="primary"
                        icon-pack="feather"
                        icon="icon-trash"
                        class="mt-2 mx-auto"
                        @click="deleteCategory(category.id)"
                      ></vs-button>
                    </div>

                    <div class="v-col w-full sm:w-1/1 md:w-1/1 lg:w-1/2">
                      <vs-button
                        color="primary"
                        icon-pack="feather"
                        icon="icon-edit"
                        class="mt-2 mx-auto"
                        @click="editItem(category)"
                      ></vs-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </vx-card>
      </div>
    </div>

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
        <!-- Image Container -->
        <div
          class="img-container w-64 mx-auto flex items-center justify-center mt-5"
        >
          <img
            v-if="!editData.preview"
            :src="editData.image"
            alt="img"
            class="responsive"
          />

          <img v-else :src="editData.preview" alt="img" class="responsive" />
        </div>

        <div class="modify-img flex justify-between mt-5 mx-5">
          <input
            type="file"
            class="hidden"
            ref="updateImgInput"
            @change="updateCurrImg"
            accept="image/*"
          />
          <vs-button class="mb-2 mx-auto" @click="$refs.updateImgInput.click()"
            >Update Image</vs-button
          >
        </div>

        <div class="flex m-5">
          <vs-input
            label="Category"
            v-model="editData.name"
            class="mt-5 w-full"
            name="item-name"
            v-validate="'required'"
          />
        </div>
      </template>

      <div class="flex flex-wrap items-center p-6" slot="footer">
        <vs-button class="mr-6" @click="updateProduct">Save Change</vs-button>
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

        <div class="w-full m-5">
          <vs-input
            label="Category"
            v-model="newData.name"
            class="mt-5 w-full"
            name="item-name"
            v-validate="'required'"
          />
        </div>

        <vs-button class="mb-2 w-full" @click="addProduct()">Add New</vs-button>
      </vs-row>
    </vs-popup>
  </div>
</template>

<script>
// import DataViewSidebar from "./DataViewSidebar.vue";
// import moduleDataList from "@/store/data-list/moduleDataList.js";
import axios from "@/axios.js";
export default {
  components: {
    // DataViewSidebar,
  },
  data() {
    return {
      resturent_id: localStorage.getItem("resturent_id"),
      selected: [],
      categories: [],
      itemsPerPage: 10,
      isMounted: false,
      addNewDataSidebar: false,
      sidebarData: {},
      active: false,
      popupActive: false,
      testImg: null,

      editData: {
        image: null,
        name: null,
        id: null,
        preview: null,
      },
      newData: {
        image: null,
        name: null,
        id: null,
        preview: null,
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
    // categories() {
    //   return this.$store.state.dataList.categories;
    // },
    queriedItems() {
      return this.$refs.table
        ? this.$refs.table.queriedResults.length
        : this.categories.length;
    },
  },
  methods: {
    // onFileChange(e) {
    //   console.log(e.target.files[0]);
    //   const file = e.target.files[0];
    //   this.newData.image = URL.createObjectURL(file);
    // },
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
        // const reader = new FileReader();
        // reader.onload = (e) => {
        //   this.editData.image = e.target.result;
        // };
        // reader.readAsDataURL(input.target.files[0]);

        const reader = new FileReader();
        reader.readAsDataURL(input.target.files[0]);

        reader.onload = (e) => {
          let img = new Image();
          img.src = e.target.result;
          img.onload = () => {
            if (img.width !== 300 && img.height !== 200) {
              alert("Image size must be 300px*200px");
            } else {
              this.editData.image = input.target.files[0];
              this.editData.preview = e.target.result;
            }
          };
        };
      }
    },
    addNewData() {
      this.sidebarData = {};
      this.toggleDataSidebar(true);
    },
  
    editItem(data) {
      console.log(data);
      this.editData.image = data.image;
      this.editData.name = data.name;
      this.editData.id = data.id;
      this.active = true;
    },

    addProduct() {
      let formData = new FormData();
      formData.append("name", this.newData.name);
      if (this.addNewData.preview) {
        formData.append("image", this.newData.image);
      }
      formData.append("restaurant", this.resturent_id);

      axios
        .post(`resturant/${this.resturent_id}/category/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.categories.unshift(res.data);
          this.newData.image = null;
          this.newData.name = null;
          this.newData.id = null;
          this.newData.preview = null;

          this.popupActive = false;
        })
        .catch((err) => {
          console.log(res);
        });
    },
    getProduct() {
      axios
        .get(`resturant/${this.resturent_id}/category/`)
        .then((res) => {
          console.log(res);
          this.categories = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateProduct() {
      let formData = new FormData();
      formData.append("name", this.editData.name);
      if (this.editData.preview) {
        formData.append("image", this.editData.image);
      }

      formData.append("restaurant", this.resturent_id);

      axios
        .patch(
          `resturant/${this.resturent_id}/category/${this.editData.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          let arr = this.categories;
          let item = this.categories.find((arr) => arr.id == this.editData.id);
          console.log(item);
          item = res.data;
          console.log(item);
          console.log(res);
          this.active = false;
        })
        .catch((err) => {
          console.log(res);
        });
    },

    deleteCategory(id) {
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: `Confirm`,
        text: "Confirm update",
        accept: this.deleteCategoryGo(id),
      });
    },
    deleteCategoryGo(id) {
      axios
        .delete(`resturant/${this.resturent_id}/category/${id}`)
        .then((res) => {
          let item = this.categories.findIndex((arr) => arr.id == id);
          this.categories.splice(item, 1);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getProduct();
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
</style>


