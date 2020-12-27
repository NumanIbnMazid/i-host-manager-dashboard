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
        <vs-th class="text-center">Amount</vs-th>
        <vs-th class="text-center">Restaurant</vs-th>
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
              <p class="product-name font-medium truncate">{{ tr.name }}</p>
            </vs-td>

            <vs-td>
              <vx-tooltip position="bottom">
                <p class="product-name font-medium truncate">
                  {{ tr.description }}
                </p>
              </vx-tooltip>
            </vs-td>

            <vs-td>
              <vx-tooltip :text="tr.url" position="bottom">
                <p class="product-name font-medium truncate">
                  {{ tr.url }}
                </p>
              </vx-tooltip>
            </vs-td>

            <vs-td>
              <p class="product-name font-medium truncate">
                {{ tr.start_date }}
              </p>
            </vs-td>

            <vs-td>
              <p class="product-name font-medium truncate">
                {{ tr.end_date }}
              </p>
            </vs-td>

            <vs-td class="text-center">
              <p class="product-name font-medium truncate">
                {{ tr.amount }}
              </p>
            </vs-td>
            <vs-td class="text-center">
              <p class="product-name font-medium truncate">
                {{ tr.restaurant }}
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
    <vs-popup class="holamundo" title="Discount Offer" :active.sync="popupActive">
      <vs-row>
        <div class="vx-col sm:w-8/12 w-full mb-2 mx-auto">
          <img
            v-if="!newOffer.logoPreview"
            :src="newOffer.iamge"
            style="width: 100%"
            class="rounded"
            alt
          />
          <img
            v-else
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
import Datepicker from "vuejs-datepicker";
import moment from "moment";
export default {
  name: "OfferView",
  components: {
    Datepicker,
  },
  data() {
    return {
      resturent_id: localStorage.getItem("resturent_id"),
      itemsPerPage: 5,
      currentPage: 5,
      limit: 10,
      offset: 1,
      all_discount_offers: null,
      popupActive: false,
      discountOfferFormActionMethod: null,

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

    createNewDiscountOffer() {
      axios
        .post("/restaurant_management/dashboard/restaurant/create_discount/", {
          name: this.newOffer.name,
          description: this.newOffer.description,
          url: this.newOffer.url,
          start_date:
            moment(this.newOffer.start_date).format("YYYY-MM-DD") + "T00:00",
          end_date:
            moment(this.newOffer.end_date).format("YYYY-MM-DD") + "T00:00",
          amount: this.newOffer.amount,
          restaurant: this.resturent_id,
          image: this.newOffer.logoPreview,
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
      this.newOffer.id = offer.id;
      this.newOffer.logoPreview = offer.image;
      this.newOffer.name = offer.name;
      this.newOffer.description = offer.description;
      this.newOffer.url = offer.url;
      this.newOffer.start_date = offer.start_date;
      this.newOffer.end_date = offer.end_date;
      this.newOffer.amount = offer.amount;
      this.discountOfferFormActionMethod = this.updateDiscountOffer;
      this.popupActive = !this.popupActive;
    },

    // TODO:
    updateDiscountOffer(offerId) {
      axios
        .patch(
          `/restaurant_management/dashboard/update_discount/${this.newOffer.id}`,
          this.newOffer
        )
        .then((res) => {
          console.log("ures1 ", res);
          if (res.data.status) {
            console.log("ures ", res);
          } else this.showErrorLog(res.data.error.error_details);
        })
        .catch((err) => console.log("u err ", err.response));
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
          text: errorList[error][0],
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
          this.newOffer.image = "";
        };
      }
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