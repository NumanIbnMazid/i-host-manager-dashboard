<template>
  <vx-card title="Add new food">
    <form-wizard
      color="rgba(var(--vs-secondary), 1)"
      errorColor="rgba(var(--vs-danger), 1)"
      :title="null"
      :subtitle="null"
      finishButtonText="Submit"
    >
      <!-- <tab-content
        title="General Info"
        class="mb-5"
        icon="feather icon-home"
        :before-change="createFood"
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
              class="vx-col mx-auto w-full rounded flex justify-center items-center"
              style="border: 1px solid #ddd; height: 250px"
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
                class="vx-col mx-auto w-full mt-2"
                @click="$refs.newImgInput.click()"
                >Upload Image</vs-button
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
                      <vs-radio v-model="is_top" vs-value="1">Yes</vs-radio>
                    </li>
                    <li>
                      <vs-radio v-model="is_top" vs-value="0">No</vs-radio>
                    </li>
                  </ul>
                </div>
                <div class="ml-5">
                  <label for="">
                    <small>Recommended Item? </small>
                  </label>
                  <ul class="">
                    <li>
                      <vs-radio v-model="is_recommended" vs-value="true"
                        >Yes</vs-radio
                      >
                    </li>
                    <li>
                      <vs-radio v-model="is_recommended" vs-value="false"
                        >No</vs-radio
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </vs-row>
      </tab-content> -->

      <!-- tab 2 content -->
      <tab-content
        title="Food Options"
        class="mb-5"
        icon="feather icon-briefcase"
        :before-change="validateStep2"
      >
        <div class="md:w-1/2 mx-auto">
          <vs-row>
            <div class="md:w-1/2">
              <vs-input
                label="Name"
                class="mt-5 w-full"
                name="item-name"
                disabled
              />
            </div>
            <div class="md:w-1/2">
              <vs-input
                label="Ingredients"
                v-model="ingredients"
                class="mt-5 w-full"
                name="item-name"
              />
            </div>
          </vs-row>
        </div>
      </tab-content>

      <!-- tab 3 content -->
      <tab-content
        title="Food Extra"
        class="mb-5"
        icon="feather icon-image"
        :before-change="validateStep3"
      >
      </tab-content>
    </form-wizard>
  </vx-card>
</template>

<script>
import axios from "@/axios.js";
import vSelect from "vue-select";
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";

export default {
  components: {
    FormWizard,
    TabContent,
    vSelect,
  },
  data() {
    return {
      name: "",
      description: "",
      ingredients: "",
      image: "",
      is_top: "0",
      is_recommended: "false",
      preview: "",
      category: "",
      allcategorys: [],
      food: "",
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

    createFood() {
      let formData = new FormData();

      formData.append("name", this.name);
      formData.append("restaurant", localStorage.getItem("resturent_id"));
      formData.append("category", this.category);
      formData.append("ingredients", this.ingredients);
      formData.append("description", this.description);
      formData.append("image", this.image);
      formData.append("is_top", this.is_top == "0" ? false : true);
      formData.append(
        "is_recommended",
        this.is_recommended == "false" ? false : true
      );

      return new Promise((resolve, reject) => {
        axios
          .post("restaurant_management/food/", formData, {
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
    validateStep2() {
      alert("Second");
      return true;
    },
    validateStep3() {
      alert("Third");
      return true;
    },

    /** Get all categor */
    getCatgory() {
      axios
        .get(`restaurant_management/food_category/`)
        .then((res) => {
          console.log(res);
          this.allcategorys = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  created() {
    this.getCatgory();
  },
};
</script>
    