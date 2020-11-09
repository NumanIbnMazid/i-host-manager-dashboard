<template>
  <div>
    <vx-card title="Restaurant profile">
      <vs-tabs>
        <vs-tab label="Account" icon-pack="feather" icon="icon-home">
          <div class="vx-row mt-5">
            <div class="vx-col sm:w-4/12 w-full mb-2">
              <img
                v-if="!logoPreview"
                :src="logo"
                style="width: 100%"
                class="rounded"
                alt
              />
              <img
                v-else
                :src="logoPreview"
                style="width: 100%"
                class="rounded"
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
                    class="mr-3 mb-2 w-full"
                    icon-pack="feather"
                    icon="icon-edit"
                    @click="$refs.logoInput.click()"
                    >Change restaurants logo</vs-button
                  >
                </div>
              </div>
            </div>
            <div class="vx-col sm:w-8/12 w-full mb-2">
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
                    icon="icon-smartphone"
                    icon-no-border
                    label="Mobile no"
                    v-model="mobile_no"
                  />
                </div>
              </div>
              <div class="vx-row mb-6">
                <div class="vx-col w-full">
                  <vs-input
                    type="email"
                    class="w-full"
                    icon-pack="feather"
                    icon="icon-mail"
                    icon-no-border
                    label="Email"
                    v-model="email"
                  />
                </div>
              </div>
              <div class="vx-row mb-6">
                <div class="vx-col w-full">
                  <vs-input
                    class="w-full"
                    icon-pack="feather"
                    icon="icon-archive"
                    icon-no-border
                    label="Total table"
                    v-model="table"
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
                    label="Start Date"
                    v-model="start_date"
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
                    label="End date"
                    v-model="end_date"
                  />
                </div>
              </div>

              <div class="vx-row mb-6">
                <div class="vx-col w-full">
                  <vs-input
                    class="w-full"
                    icon-pack="feather"
                    icon="icon-dollar-sign"
                    icon-no-border
                    label="VAT"
                    v-model="vat"
                  />
                </div>
              </div>

              <div class="vx-row mb-6">
                <div class="vx-col w-full">
                  <vs-input
                    class="w-full"
                    icon-pack="feather"
                    icon="icon-dollar-sign"
                    icon-no-border
                    label="VAT Registration No."
                    v-model="vat_reg_no"
                  />
                </div>
              </div>

              <div class="vx-row mb-6">
                <div class="vx-col w-full">
                  <vs-input
                    class="w-full"
                    icon-pack="feather"
                    icon="icon-dollar-sign"
                    icon-no-border
                    label="Service Charge"
                    v-model="service_charge"
                  />
                </div>
              </div>

              <div class="vx-row">
                <div class="vx-col w-full">
                  <vs-button class="mr-3 mb-2" @click="updateRestaurant"
                    >Save Change</vs-button
                  >
                
                </div>
              </div>
            </div>
          </div>
        </vs-tab>
        <vs-tab label="Credential" icon-pack="feather" icon="icon-lock">
          <vx-row class="mt-5 flex flex-wrap">
            <div class="vx-col sm:w-1/2 m-auto w-full mb-2">
              <div class="vx-row mb-6">
                <div class="vx-col w-full">
                  <vs-input
                    class="w-full"
                    icon-pack="feather"
                    icon="icon-lock"
                    icon-no-border
                    label="Old password"
                    v-model="old_password"
                  />
                </div>
              </div>

              <div class="vx-row mb-6">
                <div class="vx-col w-full">
                  <vs-input
                    class="w-full"
                    icon-pack="feather"
                    icon="icon-lock"
                    icon-no-border
                    label="New password"
                    v-model="new_password"
                  />
                </div>
              </div>

              <div class="vx-row mb-6">
                <div class="vx-col w-full">
                  <vs-input
                    class="w-full"
                    icon-pack="feather"
                    icon="icon-lock"
                    icon-no-border
                    label="Confirm password"
                  />
                </div>
              </div>

              <div class="vx-row">
                <div class="vx-col w-full text-center">
                  <vs-button class="mr-3 mb-2 w-full">Save Change</vs-button>
                </div>
              </div>
            </div>
          </vx-row>
        </vs-tab>
      </vs-tabs>
    </vx-card>
  </div>
</template>


<script>
import axios from "@/axios.js";
export default {
  data: () => ({
    resturent_id: localStorage.getItem("resturent_id"),
    name: "",
    address: "",
    table: 0,
    start_date: "",
    end_date: "",
    is_auto_deactivate: null,
    mobile_no: "",
    logo: "",
    logoPreview: "",
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
              this.logo = input.target.files[0];
              this.logoPreview = e.target.result;
            }
          };
        };
      }
    },
    getRestaurant() {
      // axios
      //   .get(`/restaurant_dashboard_info/${this.resturent_id}`)
      //   .then((res) => {
      //     console.log(res);
      //     this.name = res.data.data.name;
      //     this.address = res.data.data.address;
      //     this.table = res.data.data.table;
      //     this.start_date = res.data.data.start_date;
      //     this.end_date = res.data.data.end_date;
      //     this.mobile_no = res.data.data.mobile_no;
      //     this.logo = res.data.data.logo;
      //     this.vat = res.data.data.vat;
      //     this.vat_reg_no = res.data.data.vat_registration_number;
      //     this.service_charge = res.data.data.service_charge;
      //   });

      // let rest = JSON.parse(localStorage.getItem('res'));
      // this
    },

    updateRestaurant() {
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: `Confirm`,
        text:
          "Confirm update",
        accept: this.updateRestaurantGo,
      });
    },

    updateRestaurantGo() {
      let formData = new FormData();
      formData.append("name", this.name);
      formData.append("address", this.address);
      formData.append("mobile_no", this.mobile_no);
      formData.append("start_date", this.start_date);
      formData.append("end_date", this.end_date);
      formData.append("vat", this.vat);
      formData.append("vat_registration_number", this.vat_reg_no);
      formData.append("service_charge", this.service_charge);
      if (this.logoPreview != "") {
        formData.append("logo", this.logo);
      }

      axios
        .patch(`/restaurant_dashboard_info/${this.resturent_id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
          this.$vs.notify({
            title: "Update Success",
            text: "Resturent updated successfully",
            color: "success",
            position: "top-right",
          });
          // Window.location.href = "/restaurant"
          // alert('Date has been saved successfully!');
        })
        .catch((err) => {
          console.log(err);
          this.$vs.notify({
            title: "Update Failed",
            text: "Resturent updated failed",
            color: "danger",
            position: "top-right",
          });
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