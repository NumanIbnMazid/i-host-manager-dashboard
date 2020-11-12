<!-- =========================================================================================
    File Name: Login.vue
    Description: Login Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


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
                src="@/assets/images/pages/login.png"
                alt="login"
                class="mx-auto"
              />
            </div>

            <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
              <div class="p-8 login-tabs-container">
                <div class="vx-card__title mb-4">
                  <h4 class="mb-4">Login</h4>
                  <p>Welcome back, please login to your account.</p>
                </div>

                <div>
                  <vs-input
                    name="email"
                    icon-no-border
                    icon="icon icon-user"
                    icon-pack="feather"
                    label-placeholder="Email"
                    v-model="email"
                    class="w-full"
                  />

                  <vs-input
                    type="password"
                    name="password"
                    icon-no-border
                    icon="icon icon-lock"
                    icon-pack="feather"
                    label-placeholder="Password"
                    v-model="password"
                    class="w-full mt-6"
                  />

                  <div class="flex flex-wrap justify-between my-5">
                    <vs-checkbox v-model="checkbox_remember_me" class="mb-3"
                      >Remember Me</vs-checkbox
                    >
                    <router-link to>Forgot Password?</router-link>
                  </div>
                  <vs-button type="border">Register</vs-button>
                  <vs-button class="float-right" @click="getRestaurant()"
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
import axios from "@/axios.js";
export default {
  data: () => ({
    email: "",
    password: "",
    checkbox_remember_me: false,
  }),

  methods: {
    getRestaurant() {
      axios
        .post("account_management/auth/login/", {
          username: this.email,
          password: this.password,
        })
        .then((res) => {
          // console.log(res.data.data);
          if (res.data.data.auth.token) {
            localStorage.setItem("token", res.data.data.auth.token);
            // localStorage.setItem("resturent_id", res.data.data.restuarant_id);
            let rstrnt = res.data.data.staff_info;
            console.log(rstrnt[0].restaurant);
            if (rstrnt.length == 1) {
              localStorage.setItem(
                "resturent",
                JSON.stringify(rstrnt[0].restaurant)
              );
              localStorage.setItem("resturent_id", rstrnt[0].restaurant.id);
            }

            this.$router.push("/");
          } else {
            this.$vs.notify({
              title: "Login Failed",
              text: "Your email or password is wrong",
              color: "warning",
              position: "top-right",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("token");
          localStorage.removeItem("resturent_id");
          this.$vs.notify({
            title: "Login Failed",
            text: "Your email or password is wrong",
            color: "danger",
            position: "top-right",
          });
        });
    },
  },

  // created() {
  //   this.getRestaurant();
  // },
};
</script>

<style lang="scss">
  #page-login {
    .social-login-buttons {
      .bg-facebook {
        background-color: #1551b1;
      }
      .bg-twitter {
        background-color: #00aaff;
      }
      .bg-google {
        background-color: #4285f4;
      }
      .bg-github {
        background-color: #333;
      }
    }
  }
</style>
