/*=========================================================================================
  File Name: main.js
  Description: main vue(js) file
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import Vue from 'vue'
import App from './App.vue'

// Vuesax Component Framework
import Vuesax from 'vuesax'
import 'material-icons/iconfont/material-icons.css' //Material Icons
import 'vuesax/dist/vuesax.css' // Vuesax
Vue.use(Vuesax)

// axios
import axios from './axios.js'
Vue.prototype.$http = axios

// Filters
import './filters/filters.js'

// Theme Configurations
import '../themeConfig.js'

// Globally Registered Components
import './globalComponents.js'

// Styles: SCSS
import './assets/scss/main.scss'

// Tailwind
import '@/assets/css/main.css'

// Font Awesome integreted
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

// Vue Router
import router from './router'

// Vuex Store
import store from './store/store'

// alert message
import Swal from 'sweetalert2'

// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from 'vue2-hammer'
Vue.use(VueHammer)

// PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import { getPrototypeOf } from 'core-js/fn/object'
import './registerServiceWorker'

// Feather font icon
require('./assets/css/iconfont.css')

Array.prototype.sum = function (prop) {
    var total = 0;
    for (var i = 0, _len = this.length; i < _len; i++) {
        total += this[i][prop];
    }
    return total;
};

const plugin = {
    install() {
        // global alert message
        Vue.prototype.showActionMessage = (type, msg, stay = false) => {
            if (!stay) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    onOpen: toast => {
                        toast.addEventListener('mouseleave', Swal.resumeTimer);
                    }
                });

                Toast.fire({
                    icon: type,
                    title: msg
                });
            } else {
                Swal.fire({
                    icon: type,
                    title: msg
                });
            }
        };

        // checking error status
        Vue.prototype.checkError = err => {
            const redirectLogPage = () => {
                localStorage.clear();

                window.location.href = '/login';
                location.reload();
            };

            //   if (
            //     err.response.status === 404 &&
            //     localStorage.getItem('resturent_id') === null
            //   )
            //     return redirectLogPage();

            if (err.response.status === 401) redirectLogPage();
        };

        // global color selector based on case status
        Vue.prototype.selectColor = status => {
            switch (status) {
                case '0_ORDER_INITIALIZED':
                    return 'bl';
                case '1_ORDER_PLACED':
                    return 'ihosts';
                case '2_ORDER_CONFIRMED':
                    return 'rd';
                case '3_IN_TABLE':
                    return 'pl';
                case '4_CREATE_INVOICE':
                    return 'ihostm';
                case '5_PAID':
                    return 'gn';
                case '':
                    return 'hard';
                default:
                    return '';
            }
        };

        // global confirm action alert
        Vue.prototype.confirmAction = (acceptFunc, args = '', text = '') => {
            Swal.fire({
                title: 'Are you sure?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#32304e',
                cancelButtonColor: '#d33',
                confirmButtonText: text ? text : 'Yes!'
            }).then(result => {
                if (result.isConfirmed) {
                    if (args !== '') acceptFunc.apply(this, args);
                    else acceptFunc.apply(this);
                }
            });
        };

        // truncate long sentence
        Vue.prototype.truncate = (str, n = 10) =>
            str ? (str.length > n ? str.substr(0, n) + '....' : str) : 'N/A';

        // print Recipt
        //   Vue.prototype.printRecipt = (order, restaurantLogo) => {
        //     console.log('order qq', order, typeof restaurantLogo);

        //     let newItem = document.createElement('div');
        //     newItem.style = 'display: none';
        //     newItem.innerHTML = `<img src='${restaurantLogo}' id='res_logo'>`;

        //     const WinPrint = window.open(
        //       '',
        //       '',
        //       'left=0,top=0,width=600,height=600,toolbar=0,scrollbars=0,status=0'
        //     );

        //     let itemDetail = '';
        //     let resLogo = document.querySelector('#res_logo').src;
        //     console.log('resLogo ',resLogo);

        //     order.ordered_items.forEach(el => {
        //       if (el.status != '4_CANCELLED') {
        //         itemDetail += `<tr class='service'>
        //                         <td class='tableitem itemname'>
        //                             <p class='itemtext'>${el.food_name}(<b>${
        //           el.quantity
        //         }</b>)</p>
        //                         </td>
        //                         <td class='tableitem'>
        //                             <p class='itemtext' style='text-align:center'>${
        //                               el.food_option.price
        //                             }/-</p>
        //                         </td>
        //                         <td class='tableitem price'>
        //                             <p class='itemtext'>${el.food_option.price *
        //                               el.quantity}/-</p>
        //                         </td>
        //                     </tr>`;
        //       }
        //     });

        //     WinPrint.document.write(`<!DOCTYPE html>
        // <html lang='en'>

        // <head>
        //     <meta charset='UTF-8'>
        //     <title>Invoice</title>

        // <style>
        //         * {
        //             margin: 0;
        //             padding: 0;
        //         }

        //         body {
        //             margin: 0;
        //             padding: 0;
        //         }

        //         #invoice-POS {
        //             box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5);
        //             padding: 2mm;
        //             margin: 0 auto;
        //             width: 44mm;
        //             background: #FFF;
        //         }

        //         #invoice-POS ::selection {
        //             background: #f31544;
        //             color: #000;
        //         }

        //         #invoice-POS ::moz-selection {
        //             background: #f31544;
        //             color: #000;
        //         }

        //         #invoice-POS h1 {
        //             font-size: 1.5em;
        //             color: #222;
        //         }

        //         #invoice-POS h2 {
        //             font-size: .9em;
        //         }

        //         #invoice-POS h3 {
        //             font-size: 1.2em;
        //             font-weight: 300;
        //             line-height: 2em;
        //         }

        //         #invoice-POS p {
        //             font-size: .7em;
        //             color: #000;
        //             line-height: 1.2em;
        //         }
        //         /* #invoice-POS #top,
        //         #invoice-POS #mid,
        //         #invoice-POS #bot {
        //             border-bottom: 1px solid #000;
        //         } */
        //         #invoice-POS #top {
        //             min-height: 77px;
        //         }

        //         #invoice-POS #bot {
        //             min-height: 50px;
        //         }

        //         #invoice-POS #top .logo {
        //             height: 60px;
        //             width: 60px;
        //         }

        //         #invoice-POS .info {
        //             display: block;
        //             margin-left: 0;
        //         }

        //         #invoice-POS .title {
        //             float: right;
        //         }

        //         #invoice-POS .title p {
        //             text-align: right;
        //         }

        //         #invoice-POS table {
        //             width: 100%;
        //             border-collapse: collapse;
        //         }

        //         #invoice-POS .tabletitle {
        //             font-size: .7em;
        //             background: #EEE;
        //         }

        //         #invoice-POS .service {
        //             border-bottom: 1px solid #EEE;
        //         }

        //         #invoice-POS .item {
        //             width: 24mm;
        //         }

        //         #invoice-POS .itemtext {
        //             font-size: .7em;
        //         }

        //         #invoice-POS #legalcopy {
        //             margin-top: 5mm;
        //         }

        //         .price>p,
        //         .price>h2,
        //         .payment>h2 {
        //             float: right;
        //             margin-right: 5px;
        //         }

        //         .info {
        //             padding: 5px 0px;
        //         }

        //         .info>p {
        //             text-align: center !important;
        //         }

        //         .final {
        //             border: 1px solid #000;
        //             border-left: 0;
        //             border-right: 0;
        //         }

        //         .itemname>p {
        //             margin-right: 5px;
        //         }
        //     </style>

        // </head>

        // <body>
        //     <div id='invoice-POS'>
        //         <center id='top'>
        //             <div class='logo'>
        //                 <img src='${resLogo}' style='width: 100%;' alt=''>
        //             </div>

        //             <div class='info'>
        //                 <h2>${this.resturent.name}</h2>
        //                 <h2>Invoice</h2>
        //             </div>
        //         </center>
        //         <div id='mid'>
        //             <div class='info'>
        //                 <p>
        //                     VAT Reg: ${this.resturent.vat_registration_no}</br>
        //                     Phone : 012938210983</br>
        //                 </p>
        //             </div>
        //         </div>
        //         <div id='bot'>
        //             <center>
        //                 <h2>Order # ${order.invoice.id}</h2>
        //                 <h2>Table No: ${order.table_no}</h2>
        //                 <h2>Waiter: ${order.waiter.name}</h2>
        //                 <h2>Time: ${moment().format('DD/MM/Y, h:mma')}</h2>
        //             </center>
        //             <div id='table'>
        //                 <table>
        //                     <tr class='tabletitle'>
        //                         <td class='item'>
        //                             <h2>Item</h2>
        //                         </td>
        //                         <td class='Hours'>
        //                             <h2>U.Price</h2>
        //                         </td>
        //                         <td class='Rate price'>
        //                             <h2>T.Price</h2>
        //                         </td>
        //                     </tr>

        //                     ${itemDetail}

        //                     <tr class='tabletitle'>
        //                         <td class='Rate'>
        //                             <h2>Total</h2>
        //                         </td>
        //                         <td></td>
        //                         <td class='payment'>
        //                             <h2>${order.price.total_price}/-</h2>
        //                         </td>
        //                     </tr>
        //                     <tr class='tabletitle'>
        //                         <td class='Rate'>
        //                             <h2>Service Charge</h2>
        //                         </td>
        //                         <td></td>
        //                         <td class='payment'>
        //                             <h2>${order.price.service_charge}/-</h2>
        //                         </td>
        //                     </tr>
        //                     <tr class='tabletitle'>
        //                         <td class='Rate'>
        //                             <h2>VAT (${order.price.tax_percentage}%)</h2>
        //                         </td>
        //                         <td></td>
        //                         <td class='payment'>
        //                             <h2>${order.price.tax_amount}/-</h2>
        //                         </td>
        //                     </tr>
        //                     <tr class='tabletitle final'>
        //                         <td class='Rate'>
        //                             <h2>Net Total:</h2>
        //                         </td>
        //                         <td></td>
        //                         <td class='payment'>
        //                             <h2>${order.price.grand_total_price}/-
        //                             </h2>
        //                         </td>
        //                     </tr>
        //                 </table>
        //             </div>
        //             <div id='legalcopy'>
        //                 <center>
        //                     <p class='legal'><strong> Powerd by @i-host <br> <small>www.i-host.com.bd</small></strong>
        //                     </p>
        //                 </center>
        //             </div>
        //         </div>
        //     </div>
        // </body>

        // </html>`);

        //     WinPrint.document.close();
        //     WinPrint.focus();

        //     WinPrint.print();
        //     // WinPrint.close();
        //   };
    }
};

Vue.use(plugin);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
