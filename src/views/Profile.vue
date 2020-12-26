<template>
  <div>
    <!-- restaurent info -->
    <vx-card class="mb-base" v-show="!showEditField">
      <!-- restaurent name -->
      <h3 class="text-center mb-4 pb-4">{{ resturent.name }}</h3>

      <!-- Avatar -->
      <div
        class="md:w-12/12 sm:w-12/12 lg:w-4/12 mx-auto rounded pt-3"
        style="border: 1px solid grey; overflow: hidden"
      >
        <!-- <div class="md:w-8/12 sm:w-12/12 lg:w-4/12 mx-auto border-dashed border-4 border-light-blue-500"> -->
        <div class="vx-row">
          <!-- Avatar Col -->
          <div
            class="vx-col mt-2 mx-auto sm:w-8/12 md:w-6/12 lg:w-11/12"
            id="avatar-col"
          >
            <div class="img-container mb-4">
              <img :src="logo" class="rounded w-full" />
            </div>
          </div>
        </div>

        <div class="vx-row">
          <!-- Information - Col 1 -->
          <!-- <div class="vx-col pl-4 mx-auto mb-4" id="account-info-col-1"> -->
          <div
            class="vx-col m-4 sm:w-8/12 md:w-6/12 lg:w-11/12 mx-auto"
            id="account-info-col-1"
          >
            <table>
              <tr>
                <td class="font-semibold">Name</td>
                <td>{{ name }}</td>
              </tr>

              <tr>
                <td class="font-semibold">Address</td>
                <td>
                  <p>{{ address }}</p>
                </td>
              </tr>

              <tr>
                <td class="font-semibold">Website</td>
                <td>
                  <p>
                    <a
                      class="text-success"
                      :href="website"
                      rel="noopener noreferrer"
                      target="_blank"
                      >{{ website }}</a
                    >
                  </p>
                </td>
              </tr>
              <tr>
                <td class="font-semibold">Created At</td>
                <td>
                  <p>{{ created_at }}</p>
                </td>
              </tr>

              <tr>
                <td class="font-semibold">Tax Percentage</td>
                <td>{{ tax_percentage }}</td>
              </tr>

              <tr>
                <td class="font-semibold">Service Charge</td>
                <td>
                  <span v-if="!service_charge_is_percentage">৳</span>
                  {{ service_charge }}
                  <span v-if="service_charge_is_percentage">%</span>
                </td>
              </tr>

              <tr>
                <td class="font-semibold">Subscription Ends</td>
                <td>{{ subscription_ends }}</td>
              </tr>

              <tr>
                <td class="font-semibold">Subscription</td>
                <td>{{ subscription.title }}</td>
              </tr>
              

              <tr>
                <td class="font-semibold">Tax Percentage</td>
                <td>{{ tax_percentage }}</td>
              </tr>

              <tr>
                <td class="font-semibold">Trade Licence No</td>
                <td>{{ trade_licence_no }}</td>
              </tr>

              <tr>
                <td class="font-semibold">Vat Registration No</td>
                <td>{{ vat_registration_no }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <!-- /edit button -->
      <div
        class="w-full object-right-bottom flex flex-row-reverse"
        id="account-manage-buttons"
      >
        <vs-button
          icon-pack="feather"
          icon="icon-edit"
          class="mr-4"
          @click="showEditField = true"
          >Edit</vs-button
        >
      </div>
    </vx-card>

    <vx-card :title="resturent.name" v-show="showEditField">
      <vs-tabs>
        <vs-tab label="Restaurant" icon-pack="feather" icon="icon-home">
          <div class="vx-row mt-5">
            <div class="vx-col sm:w-6/12 md:w-6/12 lg:w-6/12 mx-auto">
              <img
                v-if="!logoPreview"
                :src="logo"
                class="rounded mx-auto"
                style="width: 300px"
                alt
              />
              <img
                v-else
                :src="logoPreview"
                class="rounded mx-auto"
                style="width: 300px"
                alt
              />

              <input
                type="file"
                class="hidden"
                ref="logoInput"
                @change="updateCurrImg"
                accept="image/*"
              />
              <div class="vx-row mt-4">
                <div class="vx-col w-full text-center">
                  <vs-button
                    class="mb-2 w-4/6 mx-auto"
                    icon-pack="feather"
                    icon="icon-edit"
                    @click="$refs.logoInput.click()"
                    >Change Restaurant Logo</vs-button
                  >
                </div>
              </div>
            </div>

            <div class="vx-col sm:w-6/12 md:w-8/12 lg:w-6/12 mb-2">
              <div class="vx-row mb-6">
                <div class="vx-col w-full">
                  <vs-input
                    class="w-full"
                    icon-pack="feather"
                    icon="icon-user"
                    icon-no-border
                    label="Name"
                    v-model="name"
                  />
                </div>
              </div>
              <div class="vx-row mb-6">
                <div class="vx-col w-full">
                  <vs-input
                    class="w-full"
                    icon-pack="feather"
                    icon="icon-map"
                    icon-no-border
                    label="Address"
                    v-model="address"
                  />
                </div>
              </div>
              <div class="vx-row mb-6">
                <div class="vx-col w-full">
                  <!-- <vs-input
                    class="w-full"
                    icon-pack="feather"
                    icon="icon-dollar-sign"
                    icon-no-border
                    label="Service Charge Is Percentage"
                    v-model="service_charge_is_percentage"
                  /> -->
                  <ul class="flex">
                    <label for=""> Service Charge Is Percentage </label>
                    <li class="ml-4">
                      <vs-radio
                        v-model="service_charge_is_percentage"
                        name="service_charge_is_percentage"
                        vs-value="1"
                        >Yes</vs-radio
                      >
                    </li>
                    <li class="ml-4">
                      <vs-radio
                        v-model="service_charge_is_percentage"
                        name="service_charge_is_percentage"
                        vs-value="0"
                        >No</vs-radio
                      >
                    </li>
                  </ul>
                </div>
              </div>
              <div class="vx-row mb-6">
                <div class="vx-col w-full">
                  <vs-input
                    type="email"
                    class="w-full"
                    icon-pack="feather"
                    icon="icon-dollar-sign"
                    icon-no-border
                    label="Service Charge"
                    v-model="service_charge"
                  />
                </div>
              </div>

              <div class="vx-row mb-6">
                <div class="vx-col w-full">
                  <vs-input
                    class="w-full"
                    icon-pack="feather"
                    icon="icon-calendar"
                    icon-no-border
                    label="Created At"
                    v-model="created_at"
                  />
                </div>
              </div>
              <div class="vx-row mb-6">
                <div class="vx-col w-full">
                  <vs-input
                    class="w-full"
                    icon-pack="feather"
                    icon="icon-link"
                    icon-no-border
                    label="Website"
                    v-model="website"
                  />
                </div>
              </div>

              <div class="vx-row mb-6">
                <div class="vx-col w-full">
                  <vs-input
                    class="w-full"
                    icon-pack="feather"
                    icon="icon-calendar"
                    icon-no-border
                    label="Subscription Ends"
                    v-model="subscription_ends"
                  />
                </div>
              </div>

              <div class="vx-row mb-6">
                <div class="vx-col w-full">
                  <vs-input
                    class="w-full"
                    icon-pack="feather"
                    icon="icon-calendar"
                    icon-no-border
                    label="Tax Percentage"
                    v-model="tax_percentage"
                  />
                </div>
              </div>

              <div class="vx-row mb-6">
                <div class="vx-col w-full">
                  <vs-input
                    class="w-full"
                    icon-pack="feather"
                    icon="icon-calendar"
                    icon-no-border
                    label="Trade Licence No"
                    v-model="trade_licence_no"
                  />
                </div>
              </div>

              <div class="vx-row mb-6">
                <div class="vx-col w-full">
                  <vs-input
                    class="w-full"
                    icon-pack="feather"
                    icon="icon-calendar"
                    icon-no-border
                    label="Vat Registration No"
                    v-model="vat_registration_no"
                  />
                </div>
              </div>

              <div class="vx-row">
                <div class="vx-col w-full flex">
                  <vs-button
                    icon-pack="feather"
                    icon="icon-save"
                    class="mr-3 mb-2"
                    color="success"
                    @click="
                      confirmAction(updateRestaurantGo, '', 'Confirm change?')
                    "
                    >Save Change</vs-button
                  >
                  <vs-button
                    icon-pack="feather"
                    icon="icon-delete"
                    class="mr-3 mb-2"
                    color="danger"
                    @click="showEditField = !showEditField"
                    >Cancel</vs-button
                  >
                </div>
              </div>
            </div>
          </div>
        </vs-tab>
      </vs-tabs>
    </vx-card>
  </div>
</template>

<script>
import vSelect from "vue-select";
import axios from "@/axios.js";

export default {
  components: {
    "v-select": vSelect,
  },

  data: () => ({
    resturent_id: localStorage.getItem("resturent_id"),
    resturent: JSON.parse(localStorage.getItem("resturent")),
    showEditField: false,
    name: "",
    address: "",
    logo: "",
    newLogo: "",
    logoPreview: "",
    service_charge_is_percentage: "",
    service_charge: "",
    tax_percentage: "",
    created_at: "",
    website: "",
    latitude: "",
    longitude: "",
    subscription: "",
    subscription_ends: "",
    tax_percentage: "",
    trade_licence_no: "",
    vat_registration_no: "",
    table: 0,
    start_date: "",
    end_date: "",
    is_auto_deactivate: null,
    mobile_no: "",
    email: "restaurant@dummymail.com",
    service_charge: "",
    vat: "",
    vat_reg_no: "",
    old_password: "",
    new_password: "",
  }),

  methods: {
    updateCurrImg(input) {
      if (input.target.files && input.target.files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(input.target.files[0]);

        reader.onload = (e) => {
          let img = new Image();
          img.src = e.target.result;
          img.onload = () => {
            if (img.width !== 500 && img.height !== 500) {
              alert("Image size must be 500px*500px");
            } else {
              this.newLogo = input.target.files[0];
              this.logoPreview = e.target.result;
            }
          };
        };
      }
    },

    getRestaurant() {
      let restaurant = JSON.parse(localStorage.getItem("resturent"));
      console.log("res ", restaurant);
      this.name = restaurant.name;
      this.logo = restaurant.logo;
      this.logoPreview = restaurant.logoPreview;
      this.address = restaurant.address;
      this.service_charge_is_percentage =
        restaurant.service_charge_is_percentage;
      this.service_charge = restaurant.service_charge;
      this.tax_percentage = restaurant.tax_percentage;
      this.created_at = restaurant.created_at;
      this.website = restaurant.website;
      this.subscription_ends = restaurant.subscription_ends;
      this.subscription = restaurant.subscription;
      this.latitude = restaurant.latitude;
      this.longitude = restaurant.longitude;
      this.tax_percentage = restaurant.tax_percentage;
      this.trade_licence_no = restaurant.trade_licence_no;
      this.vat_registration_no = restaurant.vat_registration_no;
    },

    updateRestaurantGo() {
      console.log("status ", this.status);
      let formData = new FormData();
      formData.append("name", this.name);
      formData.append("address", this.address);
      formData.append(
        "service_charge_is_percentage",
        this.service_charge_is_percentage === "1" ? true : false
      );
      formData.append("service_charge", this.service_charge);
      formData.append("tax_percentage", this.tax_percentage);
      formData.append("website", this.website);
      formData.append("subscription_ends", this.subscription_ends);
      formData.append("tax_percentage", this.tax_percentage);
      formData.append("trade_licence_no", this.trade_licence_no);
      formData.append("vat_registration_no", this.vat_registration_no);

      if (this.logoPreview != "" && this.newLogo !== "") {
        formData.append("logo", this.newLogo);
      }

      axios
        .patch(
          `/restaurant_management/dashboard/restaurant/${this.resturent_id}/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          if (res.data.status) {
            console.log("ur ", res.data.data);
            localStorage.setItem("resturent", JSON.stringify(res.data.data));
            this.$vs.notify({
              title: "Update Success",
              text: res.data.msg,
              color: "success",
              position: "top-right",
            });
            this.getRestaurant();
          } else {
            console.log(res.data.error.error_details);
            const errors = res.data.error.error_details;
            for (const property in errors) {
              this.$vs.notify({
                text: errors[property][0],
                color: "danger",
                position: "top-right",
              });
            }
          }
          // Window.location.href = "/restaurant"
          // alert('Date has been saved successfully!');
        })
        .catch((err) => {
          console.log(err);
          this.showActionMessage("error", err.response.statusText);
          this.checkError(err);
        });
    },
  },

  created() {
    this.getRestaurant();
  },
};
</script>

<style>
</style>