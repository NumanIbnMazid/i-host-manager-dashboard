<template>
  <div>
    <!-- restaurent info -->
    <vx-card class="mb-base" v-show="!showEditField">
      <!-- restaurent name -->
      <h3 class="mb-4 pb-4">{{ resturent.name }}</h3>

      <div class="vx-row">
        <div
          class="vx-col mt-2 mx-auto sm:w-8/12 md:w-6/12 lg:w-11/12 flex space-x-20"
          id="avatar-col"
        >
          <!-- Avatar -->
          <div class="img-container m-4">
            <img :src="logo" class="rounded w-64" />
          </div>
          <div id="account-info-col-1">
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
                <td class="font-semibold">Phone number</td>
                <td>
                  <p>{{ phone }}</p>
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
      <!-- edit button -->
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

    <!-- PAYMENT INFORMATION -->
    <vx-card class="mb-base" v-show="!showEditField">
      <!-- restaurent name -->
      <h3 class="mb-4 pb-4">Payment Information</h3>

      <div class="vx-row">
        <div
          class="vx-col mt-2 mx-auto sm:w-8/12 md:w-6/12 lg:w-11/12 flex space-x-20"
          id="avatar-col"
        >
          <!-- Avatar -->
          <div class="w-1/6" v-for="pt in payment_type" :key="pt.id">
            <vx-card>
              <div class="option-logo">
                <img class="payment-logo w-28" :src="pt.image" :alt="pt.name" />
              </div>
              <hr />
              <h3 class="text-center py-1">{{ pt.name }}</h3>
              <hr />
            </vx-card>
          </div>
        </div>
      </div>
    </vx-card>

    <!-- Subscription Plan INFORMATION -->
    <vx-card class="mb-base" v-show="!showEditField">
      <!-- restaurent name -->
      <h3 class="mb-4 pb-4">Subscription Plan</h3>

      <div class="vx-row">
        <div
          class="vx-col mt-2 mx-auto sm:w-8/12 md:w-6/12 lg:w-11/12 flex space-x-20"
          id="avatar-col"
        >
          <!-- Avatar -->
          <div class="img-container m-4">
            <img :src="subscription.image" class="rounded w-64" />
          </div>
          <div id="account-info-col-1">
            <h2>Package Details</h2>
            <hr />
            <table>
              <tr>
                <td class="font-semibold">Title</td>
                <td>{{ subscription.title }}</td>
              </tr>

              <tr>
                <td class="font-semibold">Code</td>
                <td>{{ subscription.code }}</td>
              </tr>

              <tr>
                <td class="font-semibold">Details</td>
                <td>
                  <p>{{ subscription.details }}</p>
                </td>
              </tr>

              <tr>
                <td class="font-semibold">Bi Report</td>
                <td>{{ subscription.bi_report }}</td>
              </tr>

              <tr>
                <td class="font-semibold">Allow Popup</td>
                <td>{{ subscription.allow_popup }}</td>
              </tr>

              <tr>
                <td class="font-semibold">Table Limit</td>
                <td>{{ subscription.table_limit }}</td>
              </tr>

              <tr>
                <td class="font-semibold">Waiter Limit</td>
                <td>{{ subscription.waiter_limit }}</td>
              </tr>

              <tr>
                <td class="font-semibold">Manager Limit</td>
                <td>
                  <p>{{ subscription.manager_limit }}</p>
                </td>
              </tr>

              <!-- <tr>
                <td class="font-semibold">Restaurant Limit</td>
                <td>
                  <p>{{ subscription.restaurant_limit }}</p>
                </td>
              </tr> -->

              <tr>
                <td class="font-semibold pr-3">Subscription End</td>
                <td>{{ subscription_ends }}</td>
              </tr>
            </table>
          </div>

          <hr />

          <!-- test -->
          <div id="account-info-col-1">
            <h2>Available</h2>
            <hr />
            <table>
              <tr>
                <td class="font-semibold">Table</td>
                <td>{{ subscription.table_limit }}</td>
              </tr>

              <tr>
                <td class="font-semibold">Waiter</td>
                <td>{{ subscription.waiter_limit }}</td>
              </tr>

              <tr>
                <td class="font-semibold">Manager</td>
                <td>
                  <p>{{ subscription.manager_limit }}</p>
                </td>
              </tr>

              <!-- <tr>
                <td class="font-semibold pr-3">Restaurant</td>
                <td>
                  <p>{{ subscription.restaurant_limit }}</p>
                </td>
              </tr> -->
            </table>
          </div>
        </div>
      </div>
    </vx-card>

    <!-- update page -->
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
                  <vs-input
                    class="w-full"
                    icon-pack="feather"
                    icon="icon-map"
                    icon-no-border
                    label="Phone number"
                    v-model="phone"
                  />
                </div>
              </div>
              <div class="vx-row mb-6">
                <div class="vx-col w-full">
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

              <div class="vx-row mb-6">
                <div class="vx-col w-full">
                  <label for class="text-sm">Accepted payment(s)</label>
                  <v-select
                    label="name"
                    class="w-full"
                    multiple
                    v-model="payment_type"
                    :options="payments"
                    :reduce="(payments) => payments.id"
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
    phone: "",
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
    payment_type: "",
    subscription: "",

    payments: [],
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
      axios
        .get(`/restaurant_management/dashboard/restaurant/${restaurant.id}/`)
        .then((res) => {
          if (res.data.status) {
            restaurant = res.data.data;
            this.name = restaurant.name;
            this.logo = restaurant.logo;
            this.phone = restaurant.phone;
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
            this.payment_type = restaurant.payment_type;
            JSON.setItem("resturent", JSON.stringify(restaurant));
          }
        })
        .catch((err) => {
          this.showActionMessage("error", err.response.statusText);
          this.checkError(err);
        });
    },

    updateRestaurantGo() {
      let payment_type = this.payment_type.map((pt) => (pt.name ? pt.id : pt));

      let updateData = {
        name: this.name,
        address: this.address,
        phone: this.phone,
        service_charge_is_percentage: this.service_charge_is_percentage,
        service_charge: this.service_charge,
        tax_percentage: this.tax_percentage,
        website: this.website,
        vat_registration_no: this.vat_registration_no,
        trade_licence_no: this.trade_licence_no,
        payment_type: payment_type,
      };

      if (this.logoPreview != "" && this.newLogo !== "") {
        updateData = {
          name: this.name,
          address: this.address,
          phone: this.phone,
          service_charge_is_percentage: this.service_charge_is_percentage,
          service_charge: this.service_charge,
          tax_percentage: this.tax_percentage,
          website: this.website,
          vat_registration_no: this.vat_registration_no,
          trade_licence_no: this.trade_licence_no,
          payment_type: payment_type,
          logo: this.logoPreview,
        };
      }
      axios
        .patch(
          `/restaurant_management/dashboard/restaurant/${this.resturent_id}/`,
          updateData
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
    getAllPaymentsOptions() {
      axios
        .get(`/restaurant_management/dashboard/payment_type/`)
        .then((res) => {
          this.payments = res.data.data;
        })
        .catch((err) => {
          console.log(err);
          this.$vs.notify({
            title: "Error",
            text: "Something went wrong!",
            color: "danger",
            position: "top-right",
          });
        });
    },
  },

  created() {
    this.getRestaurant();
    this.getAllPaymentsOptions();
  },
};
</script>

<style lang="css">
  .vx-card {
    /* width: 35%; */
  }
  .option-logo {
    display: flex;
    justify-content: center;
  }
  .payment-logo {
    height: 70px;
    width: 80%;
  }
</style>