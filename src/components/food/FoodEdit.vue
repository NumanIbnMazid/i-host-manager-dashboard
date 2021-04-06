<template>
  <vx-card title="Add new food">
    <form-wizard
      color="rgba(var(--vs-secondary), 1)"
      errorColor="rgba(var(--vs-danger), 1)"
      :title="null"
      :subtitle="null"
      finishButtonText="Submit"
    >
      <tab-content
        title="General Info"
        class="mb-5"
        icon="feather icon-home"
        :before-change="updateFood"
      >
        <vs-row>
          <div class="md:w-4/12 p-5 my-auto">
            <input
              type="file"
              class="hidden"
              ref="newImgInput"
              @change="newImgAdd"
              accept="image/*"
            />
            <div
              class="vx-col mx-auto w-full rounded flex justify-center items-center text-cnter"
              style="border: 1px solid #ddd; height: 250px"
            >
              <img
                v-if="!tempImage"
                :src="preview"
                style="height: 250px !important"
                class="w-full"
                alt="img"
              />

              <vue-cropper
                v-else
                class="w-full"
                style="border: 1px solid #ddd; height: 250px"
                ref="cropper"
                :src="tempImage"
                :guides="true"
                :aspectRatio="1 / 1"
                :initialAspectRatio="1 / 1"
                :fixed="true"
                :outputSize="1"
                :autoCropWidth="200"
                :autoCropHeight="200"
                :full="true"
              ></vue-cropper>

              <!-- <span class="text-center" v-else
                >Food Image <br />
                (300px*200px)</span
              > -->
            </div>
            <vs-row>
              <vs-button
                v-if="!image && !preview"
                class="vx-col mx-auto w-full mt-2"
                @click="$refs.newImgInput.click()"
                >Upload Image</vs-button
              >

              <vs-button
                v-else-if="tempImage"
                class="vx-col mx-auto w-full mt-2"
                @click="cropImage()"
                >Crop Image</vs-button
              >
              <vs-button
                v-else
                class="vx-col mx-auto w-full mt-2"
                color="danger"
                @click="$refs.newImgInput.click()"
                >Change Image</vs-button
              >
            </vs-row>
          </div>

          <div class="md:w-8/12">
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
                label="Food Code"
                v-model="food_code"
                class="mt-5 w-full"
                name="item-name"
              />
            </div>


            <div class="w-full mt-5">
              <label for=""><small>Category</small></label>
              <v-select
                label="name"
                class="w-full"
                v-model="category"
                :options="allcategorys"
                :reduce="(allcategorys) => allcategorys.id"
              />
            </div>

            <div class="w-full mt-5">
              <label for=""><small>Discount</small></label>
              <v-select
                label="name"
                class="w-full"
                v-model="discount"
                :options="allDiscounts"
                :reduce="(allDiscounts) => allDiscounts.id"

              />
            </div>

            <div class="w-full">
              <vs-input
                label="Description"
                class="mt-5 w-full"
                name="item-name"
                v-model="description"
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
              <div class="md:flex">
                <div class="">
                  <label for="">
                    <small> Top Food?</small>
                  </label>
                  <ul class="">
                    <li>
                      <vs-radio v-model="is_top" name="is_top" vs-value="1"
                        >Yes</vs-radio
                      >
                    </li>
                    <li>
                      <vs-radio v-model="is_top" name="is_top" vs-value="0"
                        >No</vs-radio
                      >
                    </li>
                  </ul>
                </div>
                <div class="ml-5">
                  <label for="">
                    <small>Recommended Item? </small>
                  </label>
                  <ul class="">
                    <li>
                      <vs-radio
                        v-model="is_recommended"
                        name="is_recommended"
                        vs-value="true"
                        >Yes</vs-radio
                      >
                    </li>
                    <li>
                      <vs-radio
                        v-model="is_recommended"
                        name="is_recommended"
                        vs-value="false"
                        >No</vs-radio
                      >
                    </li>
                  </ul>
                </div>
                <div class="ml-5">
                  <label for="">
                    <small>Is Available? </small>
                  </label>
                  <ul class="">
                    <li>
                      <vs-radio v-model="is_available" vs-value="2"
                      >Yes</vs-radio
                      >
                    </li>
                    <li>
                      <vs-radio v-model="is_available" vs-value="3"
                      >No</vs-radio
                      >
                    </li>
                  </ul>
                </div>

                <div class="ml-5">
                  <label for="">
                    <small>Is Vat Applicable? </small>
                  </label>
                  <ul class="">
                    <li>
                      <vs-radio v-model="is_vat_applicable" vs-value="4"
                      >Yes</vs-radio
                      >
                    </li>
                    <li>
                      <vs-radio v-model="is_vat_applicable" vs-value="5"
                      >No</vs-radio
                      >
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </vs-row>
      </tab-content>

      <!-- tab 2 content -->
      <tab-content
        title="Food Options"
        class="mb-5"
        icon="feather icon-briefcase"
        :before-change="addOption"
      >
        <vs-row>
          <h4 class="text-center w-full">Is single food?</h4>
          <ul class="centerx slect-type mx-auto">
            <li>
              <vs-radio v-model="is_single" vs-value="yes">Yes</vs-radio>
            </li>
            <li>
              <vs-radio v-model="is_single" vs-value="no">No</vs-radio>
            </li>
          </ul>
        </vs-row>

        <div class="md:w-1/2 mx-auto">
          <vs-row v-if="is_single == 'yes'">
            <div class="md:w-1/2 mx-auto">
              <vs-input
                label="Price"
                v-model="single_price"
                class="mt-5 w-full"
                name="item-name"
                type=""
              />
            </div>
          </vs-row>

          <vs-row v-else>
            <vs-row>
              <div class="md:w-4/12 px-2">
                <vs-input
                  label="Name"
                  class="mt-5 w-full"
                  name="item-name"
                  v-model="temp_options.name"
                />
              </div>
              <div class="md:w-3/12 px-2">
                <vs-input
                  label="Price"
                  v-model="temp_options.price"
                  class="mt-5 w-full"
                  name="item-name"
                  type="number"
                />
              </div>
              <div class="md:w-3/12 pt-5 px-2">
                <label for=""><small>Option Type</small></label>
                <v-select
                  label="name"
                  class="w-full"
                  v-model="temp_options.type"
                  :options="optionsTypes"
                  :reduce="(optionsTypes) => optionsTypes.id"
                />
              </div>
              <div class="md:w-2/12 pt-10">
                <vs-button
                  class="w-full"
                  @click="addFoodOption()"
                  icon-pack="feather"
                  icon="icon-plus"
                  >Add</vs-button
                >
              </div>
            </vs-row>
            <vs-row v-for="(option, i) in options" :key="i">
              <div
                v-if="option.option_type.name != 'single_type'"
                class="w-100 flex"
              >
                <div class="md:w-4/12 px-2">
                  <vs-input
                    class="mt-5 w-full"
                    name="item-name"
                    :value="option.name"
                    disabled
                  />
                </div>
                <div class="md:w-3/12 px-2">
                  <vs-input
                    :value="option.price"
                    class="mt-5 w-full"
                    name="item-name"
                    type="number"
                    disabled
                  />
                </div>
                <div class="md:w-3/12 px-2">
                  <vs-input
                    :value="option.option_type.name"
                    class="mt-5 w-full"
                    name="item-name"
                    type="text"
                    disabled
                  />
                </div>

                <div class="md:w-2/12 pt-5">
                  <div class="flex">
                    <vs-button
                      icon-pack="feather"
                      icon="icon-trash"
                      color="danger"
                      @click="removeFoodOption(option.id)"
                      >Remove</vs-button
                    >
                  </div>
                </div>
              </div>
            </vs-row>
          </vs-row>
        </div>
      </tab-content>

      <!-- tab 3 content -->
      <tab-content
        title="Food Extra"
        class="mb-5"
        icon="feather icon-image"
        :before-change="validateStep3"
        ><div class="md:w-1/2 mx-auto">
          <vs-row>
            <div class="md:w-4/12 px-2">
              <vs-input
                label="Name"
                class="mt-5 w-full"
                name="item-name"
                v-model="temp_extra.name"
              />
            </div>
            <div class="md:w-3/12 px-2">
              <vs-input
                label="Price"
                v-model="temp_extra.price"
                class="mt-5 w-full"
                name="item-name"
                type="number"
              />
            </div>
            <div class="md:w-3/12 pt-5 px-2">
              <label for=""><small>Extra Type</small></label>
              <v-select
                label="name"
                class="w-full"
                v-model="temp_extra.type"
                :options="extrasTypes"
                :reduce="(extrasTypes) => extrasTypes.id"
              />
            </div>
            <div class="md:w-2/12 pt-10">
              <vs-button
                class="w-full"
                @click="addFoodExtra()"
                icon-pack="feather"
                icon="icon-plus"
                >Add</vs-button
              >
            </div>
          </vs-row>

          <vs-row v-for="(extra, i) in extras" :key="i">
            <div class="md:w-4/12 px-2">
              <vs-input
                class="mt-5 w-full"
                name="item-name"
                :value="extra.name"
                disabled
              />
            </div>
            <div class="md:w-3/12 px-2">
              <vs-input
                :value="extra.price"
                class="mt-5 w-full"
                name="item-name"
                type="number"
                disabled
              />
            </div>
            <div class="md:w-3/12 px-2">
              <vs-input
                :value="extra.extra_type.name"
                class="mt-5 w-full"
                name="item-name"
                type="text"
                disabled
              />
            </div>
            <div class="md:w-2/12 pt-5">
              <vs-button
                class="w-full"
                icon-pack="feather"
                icon="icon-trash"
                color="danger"
                @click="removeFoodExtra(extra.id)"
                >Remove</vs-button
              >
            </div>
          </vs-row>
        </div>
      </tab-content>
    </form-wizard>
  </vx-card>
</template>

<script>
import axios from "@/axios.js";
import vSelect from "vue-select";
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";

export default {
  components: {
    FormWizard,
    TabContent,
    vSelect,
    VueCropper,
  },
  data() {
    return {
      resturent_id: localStorage.getItem("resturent_id"),

      id: null,
      name: "",
      food_code: "",
      description: "",
      ingredients: "",
      image: "",
      preview: "",
      tempImage: "",
      is_top: "0",
      is_recommended: "false",
      is_available: null,
      is_vat_applicable: null,
      category: "",
      discount: "",
      food: {},
      is_single: "yes",
      single_price: 0,
      options: [],
      extras: [],
      temp_options: {
        name: "",
        price: "",
        type: null,
      },
      temp_extra: {
        name: "",
        price: "",
        type: null,
      },

      /** For dropdown*/
      optionsTypes: [],
      extrasTypes: [],
      allcategorys: [],
      allDiscounts: [],

    };
  },
  methods: {
    cropImage() {
      this.image = this.$refs.cropper.getCroppedCanvas().toDataURL();
      this.preview = this.$refs.cropper.getCroppedCanvas().toDataURL();
      this.tempImage = "";
    },
    newImgAdd(input) {
      if (input.target.files && input.target.files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(input.target.files[0]);

        reader.onload = (e) => {
          let img = new Image();
          img.src = e.target.result;
          // img.onload = () => {
          // if (img.width !== 300 && img.height !== 200) {
          //   alert("Image size must be 300px*200px");
          // } else {
          // this.image = input.target.files[0];
          this.preview = e.target.result;
          this.image = "";
          this.tempImage = e.target.result;
          this.$refs.cropper.replace(e.target.result);
          // }
          // };
        };
      }
    },
    getFood() {
      axios
        .get(`restaurant_management/dashboard/food/${this.$route.params.id}/`)
        .then((res) => {
          console.log("get_food",res.data.data);
          let food = res.data.data;
          this.id = food.id;
          this.name = food.name;
          this.food_code = food.code;
          this.category = food.category.id;
          this.discount = food.discount_details.id;
          this.ingredients = food.ingredients;
          this.description = food.description;
          this.preview = food.image;
          this.is_top = food.is_top ? "1" : "0";
          this.is_recommended = food.is_recommended ? "true" : "false";
          this.is_available = food.is_available == true ? "2" : "3";
          this.is_vat_applicable = food.is_vat_applicable == true ? "4" : "5"


          this.is_single =
            food.food_options.length == 1 &&
            food.food_options[0].option_type.name == "single_type"
              ? "yes"
              : "no";

          this.single_price =
            food.food_options.length == 1 &&
            food.food_options[0].option_type.name == "single_type"
              ? food.food_options[0].price
              : 0;

          this.food = res.data.data;
        });
    },

    updateFood() {
      let formData = new FormData();

      formData.append("name", this.name);
      formData.append("code", this.food_code);
      formData.append("restaurant", localStorage.getItem("resturent_id"));
      formData.append("category", this.category);
      formData.append("discount",this.discount);
      formData.append("ingredients", this.ingredients);
      formData.append("description", this.description);
      if (this.image) {
        formData.append("image", this.image);
      }
      formData.append("is_top", this.is_top == "0" ? false : true);
      formData.append(
        "is_recommended",
        this.is_recommended == "false" ? false : true
      );
      formData.append("is_available",this.is_available == "2"? true : false);
      formData.append("is_vat_applicable", this.is_vat_applicable == "4"? true : false)

      return new Promise((resolve, reject) => {
        axios
          .patch(`restaurant_management/dashboard/food/${this.id}/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            this.food = res.data.data;
            if (res.data.status) {
              resolve(true);
            } else {
              reject("Something went wrong");
            }
          });
      });
    },
    addOption() {
      if (this.is_single == "yes") {
        return new Promise((resolve, reject) => {
          axios
            .post("restaurant_management/dashboard/food_option/", {
              name: "Default",
              price: this.single_price,
              food: this.food.id,
              option_type: 1,
            })
            .then((res) => {
              console.log(res);
              if (res.data.status) {
                resolve(true);
              } else {
                reject("Something went wrong");
              }
            });
        });
      } else {
        return new Promise((resolve, reject) => {
          if (this.options.length == 0) {
            reject("Something went wrong");
          } else {
            resolve(true);
          }
        });
      }
    },

    validateStep3() {
      // return true;

      this.$router.push("/food");
    },

    addFoodOption() {
      if (
        this.food.food_options.length == 1 &&
        this.food.food_options[0].option_type.name == "single_type"
      ) {
        axios
          .delete(
            `restaurant_management/dashboard/food_option/${this.food.food_options[0].id}`
          )
          .then((res) => {
            this.options.shift();
          });
      }

      axios
        .post("restaurant_management/dashboard/food_option/", {
          name: this.temp_options.name,
          price: this.temp_options.price,
          food: this.food.id,
          option_type: this.temp_options.type,
        })
        .then((res) => {
          if (res.data.status) {
            this.options.push(res.data.data);

            this.temp_options.name = "";
            this.temp_options.price = "";
            this.temp_options.type = "";
          } else {
            alert("Something went worng!");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    removeFoodOption(id) {
      axios
        .delete(`restaurant_management/dashboard/food_option/${id}`)
        .then((res) => {
          if (res.data.status) {
            let options = { ...this.options };
            let opt = this.options.find((options) => options.id == id);
            if (this.options.indexOf(opt) > -1) {
              this.options.splice(this.options.indexOf(opt), 1);
            }
            console.log(this.options);
          } else {
            alert("Something went worng!");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    addFoodExtra() {
      axios
        .post("restaurant_management/dashboard/food_extra/", {
          name: this.temp_extra.name,
          price: this.temp_extra.price,
          food: this.food.id,
          extra_type: this.temp_extra.type,
        })
        .then((res) => {
          if (res.data.status) {
            this.extras.push(res.data.data);

            this.temp_extra.name = "";
            this.temp_extra.price = "";
            this.temp_extra.type = "";
          } else {
            alert("Something went worng!");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },

    removeFoodExtra(id) {
      axios
        .delete(`restaurant_management/dashboard/food_extra/${id}`)
        .then((res) => {
          if (res.data.status) {
            let extras = { ...this.extras };
            let opt = this.extras.find((extras) => extras.id == id);
            if (this.extras.indexOf(opt) > -1) {
              this.extras.splice(this.extras.indexOf(opt), 1);
            }
            console.log(this.extras);
          } else {
            alert("Something went worng!");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },

    /** Get all category */
    getCatgory() {
      axios
        .get(`restaurant_management/dashboard/food_category/`)
        .then((res) => {
          console.log(res);
          this.allcategorys = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDiscount()
    {
      axios
        .get(`restaurant_management/dashboard/restaurant/${this.resturent_id}/discount_list/`)
        .then((res) => {
          console.log(res);
          this.allDiscounts = res.data.data.results;
          console.log("all_discount_list",this.allDiscounts);

        })
        .catch((err) => {
          console.log(err);
        });
    },

    /** Get all option type */
    getAllOptionsType() {
      axios
        .get("restaurant_management/dashboard/food_option_type/")
        .then((res) => {
          console.log(res);
          this.optionsTypes = res.data.data;
        })
        .then((err) => {
          console.log(err);
        });
    },

    /** Get all option type */
    getAllExtrasType() {
      axios
        .get("restaurant_management/dashboard/food_extra_type/")
        .then((res) => {
          console.log(res);
          this.extrasTypes = res.data.data;
        })
        .then((err) => {
          console.log(err);
        });
    },

    getOptionsOfFood() {
      axios
        .get(
          `restaurant_management/dashboard/food_option_by_food/${this.$route.params.id}`
        )
        .then((res) => {
          this.options = res.data.data;
        });
    },
    getExtrasOfFood() {
      axios
        .get(
          `restaurant_management/dashboard/food_extra_by_food/${this.$route.params.id}/`
        )
        .then((res) => {
          this.extras = res.data.data;
        });
    },
  },

  created() {
    this.getFood();
    this.getCatgory();
    this.getDiscount();
    this.getAllOptionsType();
    this.getAllExtrasType();
    this.getOptionsOfFood();
    this.getExtrasOfFood();
  },
};
</script>

<style scoped>
.slect-type > li {
  float: left;
  margin: 10px;
}
.vs-input--input {
  text-align: left;
}
</style>
