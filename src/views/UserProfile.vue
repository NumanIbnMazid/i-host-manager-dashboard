<template>
  <div class="header-sidebar md:flex" slot="header">
    <div class="md:flex bg-white rounded-lg px-6 py-3 w-full">
      <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
        <img
          class="h-16 w-16 md:h-12 md:w-12 rounded-full mx-auto md:mx-0 md:mr-6 shadow-md"
          :src="staff_info.image"
        />
        <vs-dropdown-menu class="vx-navbar-dropdown">
          <ul style="min-width: 9rem">
            <li
              class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
              @click="profilePage"
            >
              <feather-icon icon="SettingsIcon" svgClasses="w-4 h-4" />
              <span class="ml-2">Settings</span>
            </li>

            <li
              class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
              @click="logout"
            >
              <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4" />
              <span class="ml-2">Logout</span>
            </li>
          </ul>
        </vs-dropdown-menu>
      </vs-dropdown>
      <div class="text-center md:text-left my-auto w-full">
        <h6>{{ user.first_name }}</h6>
        <p class="text-sm">
          {{ staff_info.is_owner ? "Owner" : "Manager" }}
        </p>
      </div>

      <div class="text-right md:text-right float-right my-auto w-full">
        <vs-dropdown
          vs-custom-content
          vs-trigger-click
          class="cursor-pointer"
          badge="4"
        >
          <feather-icon
            icon="BellIcon"
            class="cursor-pointer mt-1 sm:mr-6 mr-2"
          />

          <vs-dropdown-menu
            class="notification-dropdown dropdown-custom vx-navbar-dropdown"
          >
            <div class="notification-top text-center p-5 bg-primary text-white">
              <h3 class="text-white">8 New</h3>
              <p class="opacity-75">App Notifications</p>
            </div>

            <component
              :is="scrollbarTag"
              ref="mainSidebarPs"
              class="scroll-area--nofications-dropdown p-0 mb-10"
              :key="$vs.rtl"
            >
              <ul class="bordered-items"></ul>
            </component>

            <div
              class="checkout-footer fixed bottom-0 rounded-b-lg text-primary w-full p-2 font-semibold text-center border border-b-0 border-l-0 border-r-0 border-solid d-theme-border-grey-light cursor-pointer"
            >
              <span>View All Notifications</span>
            </div>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserProfile",
  data: () => ({
    staff_info: JSON.parse(localStorage.getItem("staff_info")),
    user: JSON.parse(localStorage.getItem("user")),
  }),
  methods: {
    profilePage() {
      this.$router.push("/profile/setting").catch(() => {});
    },

    logout() {
      axios
        .post("/account_management/auth/logout/")
        .then((res) => {
          console.log(res);
          localStorage.removeItem("token");
          localStorage.removeItem("resturent_id");
          localStorage.removeItem("resturent");
          localStorage.removeItem("user");
          localStorage.removeItem("staff_info");
        })
        .catch((err) => {
          localStorage.removeItem("token");
          localStorage.removeItem("resturent_id");
          localStorage.removeItem("resturent");
          localStorage.removeItem("user");
          localStorage.removeItem("staff_info");
          console.log("log out error ", err);
        });

      // localStorage.removeItem("token");
      // localStorage.removeItem("resturent_id");

      this.$router.push("/login").catch(() => {});
    },
  },
};
</script>