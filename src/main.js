/*=========================================================================================
  File Name: main.js
  Description: main vue(js) file
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import Vue from "vue";
import App from "./App.vue";

// Vuesax Component Framework
import Vuesax from "vuesax";
import "material-icons/iconfont/material-icons.css"; //Material Icons
import "vuesax/dist/vuesax.css"; // Vuesax
Vue.use(Vuesax);

// axios
import axios from "./axios.js";
Vue.prototype.$http = axios;

// Filters
import "./filters/filters.js";

// Theme Configurations
import "../themeConfig.js";

// Globally Registered Components
import "./globalComponents.js";

// Styles: SCSS
import "./assets/scss/main.scss";

// Tailwind
import "@/assets/css/main.css";

// Vue Router
import router from "./router";

// Vuex Store
import store from "./store/store";

// alert message
import Swal from "sweetalert2";

// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from "vue2-hammer";
Vue.use(VueHammer);

// PrismJS
import "prismjs";
import "prismjs/themes/prism-tomorrow.css";

// Feather font icon
require("./assets/css/iconfont.css");

Array.prototype.sum = function(prop) {
    var total = 0;
    for (var i = 0, _len = this.length; i < _len; i++) {
        total += this[i][prop];
    }
    return total;
};

const plugin = {
    install() {
        Vue.prototype.showActionMessage = (type, msg) => {
            const Toast = Swal.mixin({
                toast: true,
                position: "top",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                onOpen: toast => {
                    toast.addEventListener("mouseleave", Swal.resumeTimer);
                }
            });

            Toast.fire({
                icon: type,
                title: msg
            });
        };

        // checking error status
        Vue.prototype.checkError = err => {
            if (err.response.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("resturent_id");
                // this.$router.push("/login").catch(() => {});
                window.location.href = "/login";
            }
        };

        Vue.prototype.selectColor = status => {
            switch (status) {
                case "0_ORDER_INITIALIZED":
                    return "bl";
                case "1_ORDER_PLACED":
                    return "ihosts";
                case "2_ORDER_CONFIRMED":
                    return "ihostm";
                case "3_IN_TABLE":
                    return "pl";
                case "4_PAID":
                    return "gn";
                case "":
                    return "hard";
                default:
                    return "";
            }
        };
    }
};

Vue.use(plugin);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");