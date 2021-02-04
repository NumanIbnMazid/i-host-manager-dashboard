<template>
  <div id="data-list-thumb-view" class="data-list-container">
    <div class="flex flex-wrap-reverse items-center data-list-btn-container">
      <vs-input class="m-2" placeholder="Limit Per Page" v-model="limit" />
      <vs-input class="m-2" placeholder="Offset" v-model="offset" />

      <vs-button class="m-2" @click="getAllDiscountList()">Go</vs-button>
    </div>
    <vs-table
      ref="table"
      pagination
      :max-items="itemsPerPage"
      search
      :data="all_discount_offers.results"
    >
      <div
        slot="header"
        class="flex flex-wrap-reverse items-center flex-grow justify-between"
      >
        <div class="flex flex-wrap-reverse items-center">
          <div
            class="p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary"
            @click="
              popupActive = !popupActive;
              newOffer = { logoPreview: null };
              discountOfferFormActionMethod = createNewDiscountOffer;
            "
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
                all_discount_offers.results.length -
                  currentPage * itemsPerPage >
                0
                  ? currentPage * itemsPerPage
                  : all_discount_offers.results.length
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
        <vs-th class="text-center">Sl</vs-th>
        <vs-th class="text-center">Image</vs-th>
        <vs-th class="text-center">Name</vs-th>
        <vs-th class="text-center">Description</vs-th>
        <vs-th class="text-center">URL</vs-th>
        <vs-th class="text-center">Start Date</vs-th>
        <vs-th class="text-center">End Date</vs-th>
        <vs-th class="text-center">Amount (%)</vs-th>
        <!-- <vs-th class="text-center">Restaurant</vs-th> -->
        <vs-th class="text-center">Clickable</vs-th>
        <vs-th class="text-center">Is Popup</vs-th>
        <vs-th class="text-center">Is Slider</vs-th>
        <vs-th class="text-center">Serial No</vs-th>
        <vs-th class="text-center">Featured Food</vs-th>
        <vs-th class="text-center">Discounted Foods</vs-th>
        <vs-th class="text-center">Action</vs-th>
      </template>

      <template slot-scope="{ data }">
        <tbody>
          <vs-tr v-for="(tr, indextr) in data" :key="indextr">
            <vs-td>
              <p class="product-name font-medium truncate text-center">
                {{ itemsPerPage * (currentPage - 1) + indextr + 1 }}
              </p>
            </vs-td>

            <vs-td class="img-container">
              <img :src="tr.image" class="product-img" />
            </vs-td>

            <vs-td>
              <vx-tooltip :text="tr.name" position="top">
                <p class="product-name font-medium truncate">
                  <!-- {{ tr.name }} -->
                  {{ truncate(tr.name, 10) }}
                </p>
              </vx-tooltip>
            </vs-td>

            <vs-td>
              <vx-tooltip :text="tr.description" position="top">
                <p class="product-name font-medium truncate">
                  {{ truncate(tr.description, 15) }}
                </p>
              </vx-tooltip>
            </vs-td>

            <vs-td>
              <vx-tooltip :text="tr.url" position="bottom">
                <p class="product-name font-medium truncate">
                  <a :href="tr.url" target="__blank">
                    {{ truncate(tr.url) }}
                  </a>
                </p>
              </vx-tooltip>
            </vs-td>

            <vs-td>
              <p class="product-name font-medium truncate">
                {{ formattDate(tr.start_date) }}
              </p>
            </vs-td>

            <vs-td>
              <p class="product-name font-medium truncate">
                {{ formattDate(tr.end_date) }}
              </p>
            </vs-td>

            <vs-td class="text-center">
              <p class="product-name font-medium truncate">{{ tr.amount }}%</p>
            </vs-td>

            <!-- <vs-td class="text-center">
              <p class="product-name font-medium truncate">
                {{ tr.restaurant }}
              </p>
            </vs-td> -->

            <vs-td class="text-center">
              <p class="product-name font-medium truncate">
                {{ tr.clickable }}
              </p>
            </vs-td>

            <vs-td class="text-center">
              <p class="product-name font-medium truncate">
                {{ tr.is_popup }}
              </p>
            </vs-td>

            <vs-td class="text-center">
              <p class="product-name font-medium truncate">
                {{ tr.is_slider }}
              </p>
            </vs-td>

            <vs-td class="text-center">
              <p class="product-name font-medium truncate">
                {{ tr.serial_no }}
              </p>
            </vs-td>

            <vs-td class="text-center">
              <p class="product-name font-medium truncate">
                {{ truncate(tr.food_name) }}
              </p>
            </vs-td>

            <vs-td class="text-center">
              <p
                class="product-name font-medium truncate"
                v-for="(food, index) in tr.food_name_list"
                :key="index"
              >
                {{ food }}
              </p>
            </vs-td>

            <vs-td class="whitespace-no-wrap">
              <feather-icon
                icon="EditIcon"
                svgClasses="w-5 h-5 hover:text-primary stroke-current"
                @click="updateDiscountOfferGo(tr)"
              />
              <feather-icon
                icon="TrashIcon"
                svgClasses="w-5 h-5 hover:text-danger stroke-current"
                class="ml-2"
                @click="confirmAction(deleteADiscount, [tr.id])"
              />
            </vs-td>
          </vs-tr>
        </tbody>
      </template>
    </vs-table>

    <!-- NEW OFFER POPUP FORM -->
    <vs-popup
      class="holamundo"
      title="Discount Offer"
      :active.sync="popupActive"
    >
      <vs-row>
        <div class="vx-col sm:w-8/12 w-full mb-2 mx-auto">
          <img
            :src="newOffer.logoPreview"
            style="width: 100%"
            class="rounded"
            alt
          />

          <input
            type="file"
            class="hidden"
            @change="newImgAdd"
            ref="logoInput"
            accept="image/*"
          />

          <div class="vx-row mt-4">
            <div class="vx-col w-full">
              <vs-button
                class="mr-5 mb-2 w-full"
                icon-pack="feather"
                icon="icon-edit"
                @click="$refs.logoInput.click()"
                >Upload image</vs-button
              >
            </div>
          </div>
        </div>

        <!-- name -->
        <div class="w-full">
          <vs-input
            icon-pack="feather"
            icon="icon-user"
            label="Name"
            v-model="newOffer.name"
            class="mt-5 w-full"
            type="text"
            v-validate="'required'"
          />
        </div>

        <!-- description -->
        <div class="w-full">
          <vs-input
            icon-pack="feather"
            icon="icon-file-text  "
            label="Description"
            v-model="newOffer.description"
            class="mt-5 w-full"
            type="text"
            v-validate="'required'"
          />
        </div>

        <!-- url field -->
        <div class="w-full">
          <vs-input
            icon-pack="feather"
            icon="icon-link"
            label="URL"
            v-model="newOffer.url"
            class="mt-5 w-full"
            type="text"
            v-validate="'required'"
          />
        </div>

        <!-- start date field -->
        <div class="w-full mt-2">
          <label for="" class="vs-input--label">Start Date</label>
          <datepicker
            icon-pack="feather"
            icon="icon-clock"
            label="Start Date"
            class="mt-2 w-full"
            placeholder="Start Date"
            v-model="newOffer.start_date"
          ></datepicker>
        </div>

        <!-- end date field -->
        <div class="w-full mt-2">
          <label for="" class="vs-input--label">End Date</label>
          <datepicker
            icon-pack="feather"
            icon="icon-clock"
            label="End Date"
            class="mt-2 w-full"
            placeholder="End Date"
            v-model="newOffer.end_date"
          ></datepicker>
        </div>

        <div class="w-full">
          <vs-input
            icon-pack="feather"
            icon="icon-dollar-sign"
            label="Amount"
            v-model="newOffer.amount"
            class="mt-5 w-full"
            type="text"
            v-validate="'required'"
          />
        </div>

        <div class="mt-5 w-full">
          <label for=""><small>Clickable</small></label>
          <v-select
            icon-pack="feather"
            icon="icon-edit"
            label="name"
            v-model="newOffer.clickable"
            class="w-full"
            :options="['true', 'false']"
            v-validate="'required'"
          />
        </div>

        <div class="mt-5 w-full">
          <label for=""><small>Is Popup</small></label>
          <v-select
            icon-pack="feather"
            icon="icon-edit"
            label="name"
            v-model="newOffer.is_popup"
            class="w-full"
            :options="['true', 'false']"
            v-validate="'required'"
          />
        </div>

        <div class="mt-5 w-full">
          <label for=""><small>Is Slider</small></label>
          <v-select
            icon-pack="feather"
            icon="icon-edit"
            label="name"
            v-model="newOffer.is_slider"
            class="w-full"
            :options="['true', 'false']"
            v-validate="'required'"
          />
        </div>

        <div class="mt-5 w-full" @click="getFoodNames()">
          <label for=""><small>Featured Food</small></label>
          <v-select
            label="name"
            class="w-full"
            v-model="newOffer.food"
            v-validate="'required'"
            :options="foods"
            :reduce="(foods) => foods.id"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
          />
        </div>

        <div class="mt-5 w-full" @click="getFoodNames()">
          <label for=""><small>Discounted Foods</small></label>
          <v-select
            label="name"
            class="w-full"
            multiple
            v-model="newOffer.food_id_list"
            v-validate="'required'"
            :options="foods"
            :reduce="(foods) => foods.id"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
          />
        </div>

        <!-- 
        <div class="w-full">
          <vs-input
            icon-pack="feather"
            icon="icon-edit"
            label="Food"
            class="mt-5 w-full"
            type="text"
          />
        </div> -->

        <div class="w-full">
          <vs-input
            icon-pack="feather"
            icon="icon-edit"
            label="Serial No"
            v-model="newOffer.serial_no"
            class="mt-5 w-full"
            type="number"
            min="0"
            v-validate="'required'"
          />
        </div>

        <vs-button
          class="mb-2 w-full mt-5"
          @click="discountOfferFormActionMethod"
          >Save</vs-button
        >
      </vs-row>
    </vs-popup>
  </div>
</template>

<script>
import axios from "@/axios.js";
import vSelect from "vue-select";
import Datepicker from "vuejs-datepicker";
import moment from "moment";
export default {
  name: "OfferView",
  components: {
    Datepicker,
    vSelect,
  },
  data() {
    return {
      resturent_id: localStorage.getItem("resturent_id"),
      itemsPerPage: 5,
      currentPage: 5,
      limit: 10,
      offset: 0,
      all_discount_offers: { results: [] },
      popupActive: false,
      discountOfferFormActionMethod: null,
      foods: [],

      newOffer: {
        id: null,
        logoPreview: null,
        image: null,
        name: null,
        description: null,
        url: null,
        start_date: null,
        end_date: null,
        amount: null,
        clickable: null,
        is_popup: null,
        is_slider: null,
        food: null,
        food_id_list: [],
        serial_no: null,
      },
    };
  },
  methods: {
    getAllDiscountList() {
      axios
        .get(
          `/restaurant_management/dashboard/restaurant/${this.resturent_id}/discount_list/?limit=${this.limit}&offset=${this.offset}`
        )
        .then((res) => {
          this.all_discount_offers = res.data.data;
          console.log("offer res ", res.data.data);
        })
        .catch((err) => {
          console.log("error offer ", err.response);
          this.showActionMessage("error", err.response.statusText);
          this.checkError(err);
        });
    },

    // TODO: 177, 370 food id issue

    // TODO: new discount offer add problem
    createNewDiscountOffer() {
      axios
        .post("/restaurant_management/dashboard/restaurant/create_discount/", {
          name: this.newOffer.name,
          description: this.newOffer.description,
          url: this.newOffer.url,
          image: this.newOffer.logoPreview,
          start_date:
            moment(this.newOffer.start_date).format("YYYY-MM-DD") + "T00:00",
          end_date:
            moment(this.newOffer.end_date).format("YYYY-MM-DD") + "T00:00",
          amount: this.newOffer.amount,
          restaurant: this.resturent_id,
          clickable: this.newOffer.clickable,
          is_popup: this.newOffer.is_popup,
          is_slider: this.newOffer.is_slider,
          food: this.newOffer.food,
          food_id_list: this.newOffer.food_id_list,
          serial_no: this.newOffer.serial_no,
        })
        .then((res) => {
          if (res.data.status) {
            this.all_discount_offers.results.push(res.data.data);
            this.$vs.notify({
              title: "Offer",
              text: "Offer Created Successfully!",
              iconPack: "feather",
              icon: "icon-alert-circle",
              color: "success",
              position: "top-right",
            });

            this.popupActive = !this.popupActive;
          } else this.showErrorLog(res.data.error.error_details);
        })
        .catch((err) =>
          this.$vs.notify({
            text: "Something went wrong!",
            color: "danger",
            position: "top-right",
          })
        );
    },

    updateDiscountOfferGo(offer) {
      console.log('offer ', offer);
      this.newOffer.id = offer.id;
      this.newOffer.logoPreview = offer.image;
      this.newOffer.name = offer.name;
      this.newOffer.description = offer.description;
      this.newOffer.url = offer.url;
      this.newOffer.start_date = offer.start_date;
      this.newOffer.end_date = offer.end_date;
      this.newOffer.amount = offer.amount;

      // type casting boolean value to string coz of select input type
      this.newOffer.clickable = offer.clickable.toString();
      this.newOffer.is_popup = offer.is_popup.toString();
      this.newOffer.is_slider = offer.is_slider.toString();

      this.newOffer.food = offer.food;
      this.newOffer.food_id_list = offer.food_name_list;
      this.newOffer.serial_no = offer.serial_no;
      this.discountOfferFormActionMethod = this.updateDiscountOffer;
      this.popupActive = !this.popupActive;
    },

    updateDiscountOffer(offerId) {
      const body = {
        name: this.newOffer.name,
        description: this.newOffer.description,
        url: this.newOffer.url,
        start_date:
          moment(this.newOffer.start_date).format("YYYY-MM-DD") + "T00:00",
        end_date:
          moment(this.newOffer.end_date).format("YYYY-MM-DD") + "T00:00",
        amount: this.newOffer.amount,
        restaurant: this.resturent_id,
        clickable: this.newOffer.clickable,
        is_popup: this.newOffer.is_popup,
        is_slider: this.newOffer.is_slider,
        food: this.newOffer.food,
        food_id_list: this.newOffer.food_id_list,
        serial_no: this.newOffer.serial_no,
      };

      if (this.newOffer.image) {
        body.image = this.newOffer.logoPreview;
      }

      axios
        .patch(
          `/restaurant_management/dashboard/discount/${this.newOffer.id}`,
          body
        )
        .then((res) => {
          console.log("ures1 ", res);
          if (res.data.status) {
            console.log("ures ", res);
            const updateDiscountOffers = this.all_discount_offers.results.map(
              (offer) =>
                offer.id === this.newOffer.id ? { ...res.data.data } : offer
            );

            this.all_discount_offers.results = updateDiscountOffers;
            this.showActionMessage("success", "Offer Updated!");
            this.popupActive = !this.popupActive;
          } else this.showErrorLog(res.data.error.error_details);
        })
        .catch((err) => console.log("u err ", err.response));
    },

    // getting food names
    getFoodNames() {
      axios
        .get(
          `/restaurant_management/dashboard/restaurant/${this.resturent_id}/foods/`
        )
        .then((res) => {
          console.log("foods ", res);
          if (res.data.status) this.foods = res.data.data;
          else this.showActionMessage("error", "Failed to get foods name!");
        })
        .catch((err) => {
          this.showActionMessage("error", err.response.statusText);

          // checking error code
          this.checkError(err);
        });
    },

    deleteADiscount(discount_id) {
      console.log("aa ", this.all_discount_offers.results);
      axios
        .delete(
          `/restaurant_management/dashboard/delete_discount/${discount_id}`
        )
        .then((res) => {
          console.log("offer deleted ", res.data);
          if (res.data.status) {
            const updatedOffers = this.all_discount_offers.results.filter(
              (discount) => discount.id !== discount_id
            );

            this.all_discount_offers.results = updatedOffers;
          } else this.showErrorLog(res.data.error.error_details);
        })
        .catch((err) => console.log("error offer ", err.response));
    },

    showErrorLog(errorList) {
      for (const error in errorList) {
        this.$vs.notify({
          text: `${error} :  ${errorList[error][0]}`,
          color: "danger",
          position: "top-right",
        });
      }
    },

    // checking image size
    newImgAdd(input) {
      if (input.target.files && input.target.files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(input.target.files[0]);

        reader.onload = (e) => {
          let img = new Image();
          img.src = e.target.result;
          this.newOffer.logoPreview = e.target.result;
          this.newOffer.image = e.target.result;
        };
      }
    },

    formattDate(date) {
      return moment(date).format("YYYY-MM-DD");
    },
  },
  created() {
    this.getAllDiscountList();
  },
};
</script>

<style scoped>
  .product-img {
    height: 80px;
    width: auto;
    border-radius: 5px;
  }
</style>