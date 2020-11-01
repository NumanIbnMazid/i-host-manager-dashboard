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
                of {{ queriedItems }}</span
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
                <img
                  :src="tr.user_info != null ? tr.user_info.profile_photo : ''"
                  class="product-img"
                  style="height: 100px"
                />
              </vs-td>

              <vs-td>
                <p class="product-name font-medium truncate">
                  {{ tr.user_info != null ? tr.user_info.name : "" }}
                </p>
              </vs-td>

              <vs-td>
                <p class="product-name font-medium truncate">{{ tr.email }}</p>
              </vs-td>

              <vs-td>
                <p class="product-name font-medium truncate">
                  {{ tr.user_info != null ? tr.user_info.phone_no : "" }}
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
        <div class="w-full">
          <vs-input
            icon-pack="feather"
            icon="icon-user"
            label="Name"
            v-model="user.name"
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
            v-model="user.phone_no"
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
            v-model="user.username"
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
    resturent_id: localStorage.getItem("resturent_id"),
    waiters: [],
    itemsPerPage: 5,
    isMounted: false,
    popupActive: false,
    user: {
      name: "",
      phone_no: "",
      username: "",
      password: "",
    },
  }),

  methods: {
    getWaiters() {
      axios
        .get(`resturant/${this.resturent_id}/waiter/`)
        .then((res) => {
          console.log(res);
          this.waiters = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addWaiters() {
      axios
        .post(`resturant/${this.resturent_id}/waiter/`, {
          name: this.user.name,
          phone_no: this.user.phone_no,
          username: this.user.username,
          password: this.user.password,
        })
        .then((res) => {
          this.waiters.unshift(res.data.data);
          this.popupActive = false;
          console.log(res);
          this.user.name = "";
          this.user.phone_no = "";
          this.user.username = "";
          this.user.password = "";

          this.$vs.notify({
            title: "Create Success",
            text: "Waiter created successfully",
            color: "success",
            position: "top-right",
          });
        })
        .catch((err) => {
          console.log(err);
        });
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