<template>
  <div id="data-list-thumb-view" class="data-list-container">
    <vs-table
      ref="table"
      pagination
      :max-items="itemsPerPage"
      search
      :data="notifications"
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
              newNotification = { logoPreview: null, image: null };
              notificaionFormActionMethod = createNewNotificaion;
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
                notifications.length - currentPage * itemsPerPage > 0
                  ? currentPage * itemsPerPage
                  : notifications.length
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
        <vs-th class="text-center">Title</vs-th>
        <vs-th class="text-center">Body</vs-th>
        <vs-th class="text-center">Food</vs-th>
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
              <p class="product-name font-medium truncate">{{ tr.title }}</p>
            </vs-td>

            <vs-td>
              <vx-tooltip position="bottom">
                <p class="product-name font-medium truncate">
                  {{ tr.body }}
                </p>
              </vx-tooltip>
            </vs-td>

            <vs-td>
              <vx-tooltip position="bottom">
                <p class="product-name font-medium truncate">
                  {{ tr.data ? tr.data.foodName : 'null' }}
                </p>
              </vx-tooltip>
            </vs-td>

            <vs-td>
              <vx-tooltip :text="tr.url" position="bottom">
                <p class="product-name font-medium truncate">
                  {{ tr.restaurant }}
                </p>
              </vx-tooltip>
            </vs-td>

            <vs-td class="whitespace-no-wrap">
              <feather-icon
                icon="EditIcon"
                svgClasses="w-5 h-5 hover:text-primary stroke-current"
                @click="updateNotificaionGo(tr)"
              />
              <feather-icon
                icon="TrashIcon"
                svgClasses="w-5 h-5 hover:text-danger stroke-current"
                class="ml-2"
                @click="confirmAction(deleteANotificaion, [tr.id])"
              />
            </vs-td>
          </vs-tr>
        </tbody>
      </template>
    </vs-table>

    <!-- NEW NOTIFICATION POPUP FORM -->
    <vs-popup
      class="holamundo"
      title="Discount Offer"
      :active.sync="popupActive"
    >
      <vs-row>
        <div class="vx-col sm:w-8/12 w-full mb-2 mx-auto">
          <img
            :src="newNotification.logoPreview"
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

        <!-- title -->
        <div class="w-full">
          <vs-input
            icon-pack="feather"
            icon="icon-user"
            label="Title"
            v-model="newNotification.title"
            class="mt-5 w-full"
            type="text"
            v-validate="'required'"
          />
        </div>

        <!-- body -->
        <div class="w-full">
          <vs-input
            icon-pack="feather"
            icon="icon-file-text  "
            label="Body"
            v-model="newNotification.body"
            class="mt-5 mb-5 w-full"
            type="text"
            v-validate="'required'"
          />
        </div>

        <!-- food -->
        <div class="w-full">
          <label for=""><small>Food</small></label>
          <v-select
            label="name"
            class="w-full"
            v-model="newNotification.food"
            :options="food"
            :reduce="(food) => food"
            :value="food.id"
          />
        </div>

        <vs-button class="mb-2 w-full mt-5" @click="notificaionFormActionMethod"
          >Save</vs-button
        >
      </vs-row>
    </vs-popup>
  </div>
</template>

<script>
import axios from "@/axios.js";
import Datepicker from "vuejs-datepicker";
import vSelect from "vue-select";
export default {
  name: "NotificationView",
  components: {
    Datepicker,
    vSelect,
  },
  data() {
    return {
      resturent_id: localStorage.getItem("resturent_id"),
      food: [],
      itemsPerPage: 5,
      currentPage: 5,
      limit: 10,
      offset: 1,
      notifications: [],
      popupActive: false,
      notificaionFormActionMethod: null,

      newNotification: {
        id: null,
        logoPreview: "",
        image: null,
        title: null,
        body: null,
        food: null,
      },
    };
  },

  methods: {
    getNotifications() {
      axios
        .get("/account_management/customer_notification/")
        .then((res) => (this.notifications = res.data.data))
        .catch((err) => {
          this.showActionMessage("error", err.response.statusText);
          this.checkError(err);
        });
    },

    getFood() {
      axios
        .get(
          `/restaurant_management/dashboard/restaurant/${this.resturent_id}/foods/`
        )
        .then((res) => {
          this.food = res.data.data;
          console.log("res ", this.food);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    createNewNotificaion() {
      // console.log(this.newNotification.food)
      axios
        .post("/account_management/customer_notification/", {
          image: this.newNotification.logoPreview,
          title: this.newNotification.title,
          body: this.newNotification.body,
          restaurant: this.resturent_id,
          data: {
            foodId: this.newNotification.food.id,
            foodName: this.newNotification.food.name,
          },
        })
        .then((res) => {
          if (res.data.status) {
            this.notifications.push(res.data.data);
            this.$vs.notify({
              title: "Offer",
              text: "Offer Created Successfully!",
              iconPack: "feather",
              icon: "icon-alert-circle",
              color: "success",
              position: "top-right",
            });

            this.newNotification = {
              id: null,
              logoPreview: "",
              image: null,
              title: null,
              body: null,
            };

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

    updateNotificaionGo(notification) {
      this.newNotification.id = notification.id;
      this.newNotification.logoPreview = notification.image;
      this.newNotification.title = notification.title;
      this.newNotification.body = notification.body;
      this.notificaionFormActionMethod = this.updateNotificaion;
      this.popupActive = !this.popupActive;
    },

    updateNotificaion() {
      const body = {
        title: this.newNotification.title,
        body: this.newNotification.body,
        restaurant: this.resturent_id,
      };

      if (this.newNotification.image) {
        console.log("1111");
        body.image = this.newNotification.logoPreview;
      }
      console.log(this.newNotification.image);

      axios
        .patch(
          `/account_management/customer_notification/${this.newNotification.id}/`,
          body
        )
        .then((res) => {
          console.log("body ", body);
          console.log("res ", res.data);
          if (res.data.status) {
            const updatedNotifications = this.notifications.map(
              (notification) =>
                notification.id === this.newNotification.id
                  ? { ...res.data.data }
                  : notification
            );

            this.notifications = updatedNotifications;

            this.popupActive = false;
            this.showActionMessage("success", "Notification updated!");
          }
        })
        .catch((err) => {
          this.showActionMessage("error", err.response.statusText);
          this.checkError(err);
        });
    },

    deleteANotificaion(notificaion_id) {
      axios
        .delete(`/account_management/customer_notification/${notificaion_id}`)
        .then((res) => {
          if (res.data.status) {
            // filter
            const leftNotifications = this.notifications;
            this.notifications = leftNotifications.filter(
              (ln) => ln.id !== notificaion_id
            );
          } else this.showErrorLog(res.data.error.error_details);
        })
        .catch((err) => {
          this.showActionMessage("error", err.response.statusText);
          this.checkError(err);
        });
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
          this.newNotification.image = e.target.result;
          this.newNotification.logoPreview = e.target.result;
        };
      }
    },
  },
  created() {
    this.getNotifications();
    this.getFood();
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
