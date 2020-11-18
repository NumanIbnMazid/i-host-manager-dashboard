<template>
  <div>
    <vx-card :title="userInfo.first_name">
      <vs-tabs>
        <vs-tab label="Profile" icon-pack="feather" icon="icon-home">
          <div class="vx-row mt-5">
            <div class="vx-col md:w-8/12 sm:w-12/12 mx-auto mb-2">
              <img
                v-if="!logoPreview"
                :src="userInfo.image"
                class="rounded mx-auto"
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
                    >Change Picture</vs-button
                  >
                </div>
              </div>
              <!-- </div>

            <div class="vx-col sm:w-12/12 w-full mb-2"> -->

              <div class="vx-row mb-6">
                <div class="vx-col w-full">
                  <vs-input
                    class="w-full"
                    icon-pack="feather"
                    icon="icon-user"
                    icon-no-border
                    label="First Name"
                    v-model="userInfo.first_name"
                  />
                </div>
              </div>

              <div class="vx-row mb-6">
                <div class="vx-col w-full">
                  <vs-input
                    class="w-full"
                    icon-pack="feather"
                    icon="icon-user"
                    icon-no-border
                    label="Last Name"
                    v-model="userInfo.last_name"
                  />
                </div>
              </div>

              <div class="vx-row mb-6">
                <div class="vx-col w-full">
                  <vs-input
                    class="w-full"
                    icon-pack="feather"
                    icon="icon-phone"
                    icon-no-border
                    label="Phone"
                    v-model="userInfo.phone"
                  />
                </div>
              </div>

              <div v-if="userInfo.is_manager">
                <div class="vx-row mb-6">
                  <div class="vx-col w-full">
                    <vs-input
                      class="w-full"
                      icon-pack="feather"
                      icon="icon-link"
                      icon-no-border
                      label="Shift Start"
                      v-model="userInfo.shift_start"
                    />
                  </div>
                </div>

                <div class="vx-row mb-6">
                  <div class="vx-col w-full">
                    <vs-input
                      class="w-full"
                      icon-pack="feather"
                      icon="icon-help-circle"
                      icon-no-border
                      label="Shift End"
                      v-model="userInfo.shift_end"
                    />
                  </div>
                </div>
              </div>

              <div class="vx-row mb-6">
                <div class="vx-col w-full">
                  <vs-input
                    class="w-full"
                    icon-pack="feather"
                    icon="icon-code"
                    icon-no-border
                    label="NID"
                    v-model="userInfo.nid"
                  />
                </div>
              </div>

              <div class="vx-row">
                <div class="vx-col w-full">
                  <vs-button class="mr-3 mb-2">Save Change</vs-button>
                </div>
              </div>
            </div>
          </div>
        </vs-tab>

        <!-- change password -->
        <vs-tab label="Change Password" icon-pack="feather" icon="icon-lock">
          <div class="vx-row mt-5">
            <div class="vx-col md:w-8/12 sm:w-12/12 mx-auto mb-2">
              <div class="vx-row mb-6">
                <div class="vx-col w-2/3">
                  <vs-input
                    type="password"
                    class="w-full"
                    icon-pack="feather"
                    icon="icon-lock"
                    icon-no-border
                    label="New Password"
                    v-model="newPass"
                  />
                </div>
              </div>

              <div class="vx-row mb-6">
                <div class="vx-col w-2/3">
                  <vs-input
                    type="password"
                    class="w-full"
                    icon-pack="feather"
                    icon="icon-lock"
                    icon-no-border
                    label="Confirm Password"
                    v-model="confirmPass"
                  />
                </div>
              </div>

              <div class="vx-row">
                <div class="vx-col w-full">
                  <vs-button class="mr-3 mb-2">Save Password</vs-button>
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
export default {
  data() {
    return {
      staff_info: JSON.parse(localStorage.getItem("staff_info")),
      user: JSON.parse(localStorage.getItem("user")),

      userInfo: {
        first_name: "",
        last_name: "",
        image: "",
        phone: "",
        is_owner: "",
        is_manager: "",
        shift_start: "",
        shift_end: "",
        nid: "",
      },

      newPass: "",
      confirmPass: "",
    };
  },

  methods: {
    getUser() {
      this.userInfo.first_name = this.user.first_name;
      this.userInfo.last_name = this.user.last_name;
      this.userInfo.image = this.staff_info.image;
      this.userInfo.phone = this.user.phone;
      this.userInfo.is_owner = this.staff_info.is_owner;
      this.userInfo.is_manager = this.staff_info.is_manager;
      this.userInfo.shift_start = this.staff_info.shift_start;
      this.userInfo.shift_end = this.staff_info.shift_end;
      this.userInfo.nid = this.staff_info.nid;
    },
  },

  created() {
    this.getUser();
  },
};
</script>