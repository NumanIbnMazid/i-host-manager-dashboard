
<template>
  <div
    class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center"
    id="page-login"
  >
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row no-gutter justify-center items-center">
            <div class="vx-col hidden lg:block lg:w-1/2">
              <img
                src="@/assets/images/pages/forgotPassword.png"
                alt="login"
                class="mx-auto"
              />
            </div>

            <!-- phone number enter field -->
            <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
              <div class="p-8 login-tabs-container">
                <div class="vx-card__title mb-4">
                  <h4 class="mb-4">Forgot Password</h4>
                  <!-- <p>Welcome back, please login to your account.</p> -->
                </div>

                <div>
                  <vs-input
                    name="phone-number"
                    icon-no-border
                    icon="icon icon-user"
                    icon-pack="feather"
                    label-placeholder="Phone Number"
                    class="w-full"
                  />
                  <!-- otp code -->
                  <vs-input
                    v-if="this.newPassFieldOpen"
                    name="otp"
                    icon-no-border
                    icon="icon icon-user"
                    icon-pack="feather"
                    label-placeholder="OTP Code"
                    class="w-full"
                  />
                  <!-- new pass -->
                  <vs-input
                    v-if="this.newPassFieldOpen"
                    name="new-password"
                    icon-no-border
                    icon="icon icon-user"
                    icon-pack="feather"
                    label-placeholder="New Password"
                    class="w-full"
                  />
                  <!-- confirm pass -->
                  <vs-input
                    v-if="this.newPassFieldOpen"
                    name="confirm-password"
                    icon-no-border
                    icon="icon icon-user"
                    icon-pack="feather"
                    label-placeholder="Confirm Password"
                    class="w-full"
                  />
                  <vs-button class="float-left my-5" @click="getOtpCode"
                    >Send</vs-button
                  >
                  <vs-button
                    class="float-right my-5"
                    type="border"
                    @click="viewLoginPage"
                    >Login</vs-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "ForgotPassword",

  data: () => ({
    newPassFieldOpen: false,
  }),

  methods: {
    viewLoginPage() {
      this.$router.push("/login");
    },

    getOtpCode() {
      this.newPassFieldOpen = !this.newPassFieldOpen;
    },
  },
};
</script>