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
              @click="activeWaiterForm()"
            >
              <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
              <span class="ml-2 text-base text-primary">Add New Waiter</span>
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
          <!-- <vs-th>Sl</vs-th> -->
          <vs-th>Waiter Details</vs-th>
          <vs-th>Assigned Tables</vs-th>
          <vs-th>Action</vs-th>
        </template>

        <template slot-scope="{ data }">
          <tbody>
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <!-- <vs-td style="width: fixed;">
                <p class="product-name font-medium truncate text-center">
                  {{ itemsPerPage * (currentPage - 1) + indextr + 1 }}
                </p>
              </vs-td> -->
              <vs-td class="img-container">
                <div class="md:w-8/12 sm:w-12/12">
                  <div class="vx-row">
                    <!-- Avatar Col -->
                    <div class="vx-col flex" id="avatar-col">
                      <div class="img-container mx-auto">
                        <img
                          :src="tr.image"
                          class="product-img"
                          style="
                            height: 126px;
                            width: 126px;
                            border-radius: 9px;
                            box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.39);
                          "
                        />
                      </div>

                      <!-- Information - Col 1 -->
                      <div class="ml-8 pl-5" id="account-info-col-1">
                        <div class="waiter-name">
                          <strong>Name : </strong>
                          {{ tr.name }}
                        </div>

                        <div class="waiter-phone" :title="tr.user.phone">
                          <strong>Phone : </strong>
                          {{ tr.phone }}
                        </div>

                        <div class="waiter-email">
                          <strong>Email : </strong>
                          {{ tr.email }}
                        </div>

                        <div class="waiter-shift-start">
                          <strong>Shift Start : </strong>
                          {{ tr.shift_start }}
                        </div>

                        <div class="waiter-shift-end">
                          <strong>Shift End : </strong>
                          {{ tr.shift_end }}
                        </div>

                        <div class="waiter-nid">
                          <strong>NID : </strong>
                          {{ tr.nid }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </vs-td>
              <!-- style="width: 486px;" -->
              <!-- style="width: 261px;" -->
              <vs-td>
                <div class="grid gap-x-0 gap-y-2 grid-cols-3">
                  <!-- <div class="flex flex-wrap"> -->

                  <div
                    class="waiter-table mr-2"
                    v-for="(table, index) in tr.table_no"
                    :key="index"
                  >
                    <div class="table-svg flex">
                      <svg
                        class="mt-2 ml-2 mr-2"
                        width="24"
                        height="17"
                        viewBox="0 0 24 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M23.1431 16.2857V5.14285H0.857422V16.2857H2.57171V6.42857C2.57171 6.19189 2.7636 6 3.00028 6H21.0003C21.237 6 21.4288 6.19189 21.4288 6.42857V16.2857H23.1431Z"
                          fill="#F8B843"
                        />
                        <path
                          d="M1.51507 0L0.37207 1.71429H23.6279L22.4849 0H1.51507Z"
                          fill="#F8B843"
                        />
                        <path
                          d="M0 2.57143H24V4.28571H0V2.57143Z"
                          fill="#F8B843"
                        />
                      </svg>
                      <p class="table-number text-2xl mt-0 pt-0 ml-3">
                        {{ table }}
                      </p>
                    </div>
                  </div>
                </div>
              </vs-td>

              <vs-td class="whitespace-no-wrap">
                <feather-icon
                  icon="EditIcon"
                  svgClasses="w-5 h-5 hover:text-primary stroke-current"
                  @click="activeWaiterForm(tr)"
                />
                <feather-icon
                  icon="TrashIcon"
                  svgClasses="w-5 h-5 hover:text-danger stroke-current"
                  class="ml-2"
                  @click="confirmAction(deleteStaff, [tr.id])"
                />
              </vs-td>
            </vs-tr>
          </tbody>
        </template>
      </vs-table>
    </div>

    <!-- WAITER POPUP FORM -->
    <vs-popup class="holamundo" title="Waiter Form" :active.sync="popupActive">
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
                >Upload waiter image</vs-button
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

        <div class="w-full" v-if="user.showPassField">
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

        <!-- nid field -->
        <div class="w-full">
          <vs-input
            icon-pack="feather"
            icon="icon-credit-card"
            label="Nid"
            v-model="user.nid"
            class="mt-5 w-full"
            type="number"
            v-validate="'required'"
          />
        </div>

        <!-- shift start field -->
        <div class="w-full">
          <vs-input
            icon-pack="feather"
            icon="icon-clock"
            label="Shift Start"
            v-model="user.shift_start"
            class="mt-5 w-full"
            type="time"
            v-validate="'required'"
          />
        </div>

        <!-- shift end field -->
        <div class="w-full">
          <vs-input
            icon-pack="feather"
            icon="icon-clock"
            label="Shift End"
            v-model="user.shift_end"
            class="mt-5 w-full"
            type="time"
            v-validate="'required'"
          />
        </div>

        <vs-button class="mb-2 w-full mt-5" @click="waiterFormActionMethod()"
          >Save</vs-button
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
    waiterEditPopupActive: false,
    waiterFormActionMethod: "",
    user: {
      staffId: "",
      image: "",
      logoPreview: "",
      email: "",
      first_name: "",
      phone: "",
      password: "",
      showPassField: true,
      nid: "",
      shift_start: "",
      shift_end: "",
    },
  }),

  methods: {
    getWaiters() {
      axios
        .get(
          `/account_management/restaurant/${this.restaurant_id}/waiter_info/`
        )
        .then((res) => {
          console.log("all waiters ", res);
          this.waiters = res.data.data;
        })
        .catch((err) => {
          this.showActionMessage("error", err.response.statusText);
          this.checkError(err);
        });
    },

    // decided if open form for add new waiter or update waiter
    activeWaiterForm(data = null) {
      if (data) {
        this.staffId = data.id;
        this.user.image = data.image;
        this.user.logoPreview = data.image;
        this.user.email = data.email;
        this.user.first_name = data.user.first_name;
        this.user.phone = data.user.phone;
        this.user.nid = data.nid;
        this.user.shift_start = data.shift_start;
        this.user.shift_end = data.shift_end;
        this.user.showPassField = false;

        this.popupActive = true;
        this.waiterFormActionMethod = this.updateStaffInfo;
      } else {
        this.user = {
          staffId: "",
          image: "",
          logoPreview: "",
          email: "",
          first_name: "",
          phone: "",
          password: "",
          showPassField: true,
          nid: "",
          shift_start: "",
          shift_end: "",
        };
        this.popupActive = true;
        this.waiterFormActionMethod = this.addWaiters;
      }
    },

    // add new waiter
    addWaiters() {
      let formData = new FormData();
      formData.append("restaurant_id", this.restaurant_id);

      formData.append("email_address", this.user.email);
      formData.append("name", this.user.first_name);
      formData.append("phone", this.user.phone);
      formData.append("password", this.user.password);
      formData.append("nid", this.user.nid);
      formData.append("shift_start", this.user.shift_start);
      formData.append("shift_end", this.user.shift_end);

      if (this.user.logoPreview != "") {
        formData.append("image", this.user.image);
      }
console.log('formData ', formData);
      axios
        .post(`/account_management/restaurant/create_waiter/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          // Checking errors
          if (res.data.error.code == 400) {
            const errors = res.data.error.error_details;
            for (const property in errors) {
              this.$vs.notify({
                title: "Create Failed",
                text: `${property}: ${errors[property]}`,
                color: "danger",
                position: "top-right",
              });
            }
          } else {
            console.log("added waiter res ", res);
            this.waiters.push(res.data.data);
            this.popupActive = false;
            this.user.first_name = "";
            this.user.phone = "";
            this.user.email = "";
            this.user.image = "";
            this.user.logoPreview = "";
            this.user.password = "";
            this.showActionMessage("success", "Waiter Created Successfully!");
          }
        })
        .catch((err) => {
          console.log(err);
          this.showActionMessage("error", err.response.statusText);
          this.checkError(err);
        });
    },

    // waiter update functionality
    updateStaffInfo() {
      let formData = new FormData();
      formData.append("email", this.user.email);
      formData.append("name", this.user.first_name);
      // formData.append("phone", this.user.phone);
      formData.append("nid", this.user.nid);
      formData.append("shift_start", this.user.shift_start);
      formData.append("shift_end", this.user.shift_end);

      if (
        this.user.logoPreview != "" &&
        !this.user.image.toString().includes("https")
      ) {
        formData.append("image", this.user.image);
      }

      axios
        .patch(
          `/account_management/restaurant/staff/${this.staffId}/`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then((res) => {
          if (res.data.status) {
            this.popupActive = false;

            // udpating waiter object for real time ui update
            this.waiters = this.waiters.map((waiter) =>
              waiter.id === this.staffId
                ? {
                    ...waiter,
                    email: res.data.data.email,
                    image: res.data.data.image,
                    first_name: res.data.data.name,
                    name: res.data.data.name,
                    nid: res.data.data.nid,
                    shift_start: res.data.data.shift_start,
                    shift_end: res.data.data.shift_end,
                    user: {
                      first_name: res.data.data.name,
                    },
                  }
                : waiter
            );

            this.showActionMessage(
              "success",
              "Waiter Inforamtion updated successfully!"
            );
          } else {
            const errors = res.data.error.error_details;
            for (const property in errors) {
              this.$vs.notify({
                title: "Create Failed",
                text: `${property}: ${errors[property]}`,
                color: "danger",
                position: "top-right",
              });
            }
          }

          console.log("sures ", res);
        })
        .catch((err) => {
          this.showActionMessage("error", err.response.statusText);
          this.checkError(err);
        });
    },

    // delete staff
    deleteStaff(staff_id) {
      axios
        .delete(`/account_management/restaurant/${staff_id}/delete_staff/`)
        .then((res) => {
          console.log("sd ", res);
          this.waiters = this.waiters.filter(
            (waiter) => waiter.id !== staff_id
          );

          this.showActionMessage("success", "Waiter Deleted Successfully!");
        })
        .catch((err) => {
          this.showActionMessage("error", err.response.statusText);
          this.checkError(err);
        });
    },

    // checking image size
    updateCurrImg(input) {
      if (input.target.files && input.target.files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(input.target.files[0]);

        reader.onload = (e) => {
          let img = new Image();
          img.src = e.target.result;
          img.onload = () => {
            if (input.target.files[0].size > 1.5e6) {
              alert("Image size must be below 1.50 mb");
              this.user.image = "";
              this.user.logoPreview = "";
            } else {
              this.user.image = input.target.files[0];
              this.user.logoPreview = e.target.result;
            }
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

<style lang="scss">
.waiter-table {
  width: 77px;
  height: 34px;
  left: 1085px;
  top: 370px;

  background: #31314e;
  border-radius: 5px;
}

.table-number {
  color: #f8b843;
}

.waiter-info {
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
}

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
.vs-table--thead {
  background-color: #32304e;
  color: #fff;
}

.vs-con-table .vs-con-tbody .vs-table--tbody-table .vs-table--thead th {
  padding: 10px 15px !important;
}
</style>