<template>
  <div>
    <vs-card>
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
          <img v-if="image" :src="preview" class="w-full" alt="img" />
          <span v-else
            >Category Image <br />
            (300px*200px)</span
          >
        </div>
        <vs-row>
          <vs-button
            v-if="!image"
            class="vx-col sm:w-1/3 mx-auto w-full mt-2"
            @click="$refs.newImgInput.click()"
            >Upload Image</vs-button
          >

          <vs-button
            v-else
            class="vx-col sm:w-1/3 mx-auto w-full mt-2"
            color="danger"
            @click="image = ''"
            >Remove Image</vs-button
          >
        </vs-row>

        <div class="w-full">
          <vs-input
            label="Name"
            v-model="name"
            class="mt-5 w-full"
            name="item-name"
          />
        </div>
        <div class="w-full">
          <vs-input
            label="Price"
            v-model="price"
            class="mt-5 w-full"
            name="item-name"
          />
        </div>
        <div class="w-full">
          <vs-input
            label="Discount Price"
            v-model="discount_price"
            class="mt-5 w-full"
            name="item-name"
          />
        </div>
        <div class="w-full">
          <vs-input
            label="Ingredients"
            v-model="ingredients"
            class="mt-5 w-full"
            name="item-name"
          />
        </div>

        <div class="w-full mt-5">
          <label for>Category</label>
          <v-select
            class="w-full"
            v-model="category"
            :options="categorys"
            label="name"
            :reduce="(categorys) => categorys.id"
          />
        </div>
        <vs-button class="mb-2 w-full mt-5" @click="addFood()"
          >Add New</vs-button
        >
      </vs-row>
    </vs-card>
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
    };
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
              this.image = input.target.files[0];
              this.preview = e.target.result;
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

    addImage(id) {
      let formData = new FormData();
      formData.append("image", this.image);
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
          this.image = "";
          this.preview = "";
        })
        .catch((err) => {
          console.log(err);
        });
    },

    addFood() {
      const vm = this;
      function optionManupulate() {
        const optM = [];

        vm.options.forEach((elem) => {
          let ndata = { option_name: elem, option_description: "" };
          optM.push(ndata);
        });

        console.log(optM);
        return optM;
      }
      axios
        .post(`resturant/${this.resturent_id}/food/`, {
          category: this.category,
          discount_price: this.discount_price,
          restaurant: this.resturent_id,
          ingredients: this.ingredients,
          name: this.name,
          price: this.price,
          type: this.type,
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
        .get(`/restaurant_management/restaurant/${this.resturent_id}/foods/`)
        .then((res) => {
          console.log(res);
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


