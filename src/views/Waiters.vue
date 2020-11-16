<template>
  <div>
    <div id="data-list-thumb-view" class="data-list-container">
      <vs-table
        ref="table"
        v-model="selected"
        pagination
        :max-items="itemsPerPage"
        search
        :data="waiters"
      >
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
          </div>

          <!-- ITEMS PER PAGE -->
          <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4">
            <div
              class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
            >
              <span class="mr-2"
                >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} -
                {{
                  waiters.length - currentPage * itemsPerPage > 0
                    ? currentPage * itemsPerPage
                    : waiters.length
                }}
                of {{ "queriedItems" }}</span
              >
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>
            <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
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
          <vs-th sort-key="name">Name</vs-th>
          <vs-th>Email</vs-th>
          <vs-th>Phone No.</vs-th>
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
              <vs-td class="img-container">
                <img :src="tr.image" class="product-img" style="height: 60px" />
              </vs-td>

              <vs-td>
                <p class="product-name font-medium truncate">
                  {{ tr.user.first_name }}
                </p>
              </vs-td>

              <vs-td>
                <p class="product-name font-medium truncate">
                  {{ tr.user.email_address }}
                </p>
              </vs-td>

              <vs-td>
                <p class="product-name font-medium truncate">
                  {{ tr.user.phone }}
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
                  @click.stop="deleteData(tr.id)"
                />
              </vs-td>
            </vs-tr>
          </tbody>
        </template>
      </vs-table>
    </div>

    <vs-popup
      class="holamundo"
      title="Add new category"
      :active.sync="popupActive"
    >
      <vs-row>
        <div class="vx-col sm:w-8/12 w-full mb-2 mx-auto">
          <img
            v-if="!user.logoPreview"
            :src="user.image"
            style="width: 100%"
            class="rounded"
            alt
          />
          <img
            v-else
            :src="user.logoPreview"
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
            <div class="vx-col w-full">
              <vs-button
                class="mr-5 mb-2 w-full"
                icon-pack="feather"
                icon="icon-edit"
                @click="$refs.logoInput.click()"
                >Change restaurants logo</vs-button
              >
            </div>
          </div>
        </div>

        <div class="w-full">
          <vs-input
            icon-pack="feather"
            icon="icon-user"
            label="Name"
            v-model="user.first_name"
            class="mt-5 w-full"
            type="email"
            v-validate="'required'"
          />
        </div>
        <div class="w-full">
          <vs-input
            icon-pack="feather"
            icon="icon-phone"
            label="Phone"
            v-model="user.phone"
            class="mt-5 w-full"
            type="email"
            v-validate="'required'"
          />
        </div>
        <div class="w-full">
          <vs-input
            icon-pack="feather"
            icon="icon-mail"
            label="Email"
            v-model="user.email"
            class="mt-5 w-full"
            type="email"
            v-validate="'required'"
          />
        </div>
        <div class="w-full">
          <vs-input
            icon-pack="feather"
            icon="icon-lock"
            label="Password"
            v-model="user.password"
            class="mt-5 w-full"
            type="password"
            v-validate="'required'"
          />
        </div>

        <vs-button class="mb-2 w-full mt-5" @click="addWaiters()"
          >Add New</vs-button
        >
      </vs-row>
    </vs-popup>
  </div>
</template>


<script>
import axios from "@/axios.js";
export default {
  data: () => ({
    restaurant_id: localStorage.getItem("resturent_id"),
    selected: "",
    waiters: [],
    itemsPerPage: 5,
    isMounted: false,
    popupActive: false,
    user: {
      image: "",
      logoPreview: "",
      email: "",
      first_name: "",
      phone: "",
      password: "",
    },
  }),

  methods: {
    getWaiters() {
      axios
        .get(`/account_management/restaurant/${this.restaurant_id}/waiter_info/`)
        .then((res) => {
          console.log(res);
          this.waiters = res.data.data;
        })
        .catch((err) => {
          this.showActionMessage("error", err.response.statusText);
          this.checkError(err);
        });
    },
    addWaiters() {
      let formData = new FormData();
      formData.append("restaurant_id", this.restaurant_id);

      formData.append("email", this.user.email);
      formData.append("first_name", this.user.first_name);
      formData.append("phone", this.user.phone);
      formData.append("password", this.user.password);

      if (this.user.logoPreview != "") {
        formData.append("image", this.user.image);
      }

      axios
        .post(`/account_management/restaurant/create_waiter/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.waiters.push(res.data.data);

          this.popupActive = false;
          this.user.first_name = "";
          this.user.phone = "";
          this.user.email = "";
          this.user.image = "";
          this.user.logoPreview = "";
          this.user.password = "";

          this.showActionMessage("success", "Waiter Created Successfully!");
        })
        .catch((err) => {
          console.log(err);
          this.showActionMessage("error", err.response.statusText);
          this.checkError(err);
        });
    },

    updateCurrImg(input) {
      if (input.target.files && input.target.files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(input.target.files[0]);

        reader.onload = (e) => {
          let img = new Image();
          img.src = e.target.result;
          img.onload = () => {
            this.user.image = input.target.files[0];
            this.user.logoPreview = e.target.result;
          };
        };
      }
    },
  },

  computed: {
    currentPage() {
      if (this.isMounted) {
        return this.$refs.table.currentx;
      }
      return 0;
    },
  },

  mounted() {
    this.isMounted = true;
  },

  created() {
    this.getWaiters();
  },
};
</script>

<style>
</style>