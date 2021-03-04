<template>
  <div>
    <vs-table :data="therOrder.ordered_items">
      <template slot="thead">
        <th class="text-left bg-grey">Sl.</th>
        <th class="text-left bg-grey">Name</th>
        <th class="text-center bg-grey">Quantity</th>
        <th class="text-right bg-grey">Price</th>
      </template>

      <template slot-scope="{ data }">
        <vs-tr class="text-left" :key="i" v-for="(tr, i) in data">
          <vs-td>
            {{ i + 1 }}
          </vs-td>

          <vs-td class="text-left" :data="tr.food_name">
            {{ tr.food_name }}
            <span
              v-if="tr.food_option.option_type.name != 'single_type'"
              class="text-sm"
            >
              ({{ tr.food_option.option_type.name }}-{{ tr.food_option.name }})
            </span>
            <br />
            <small>
              <i class="" v-for="(extra, i) in tr.food_extra" :key="i">
                {{ extra.name }} {{ tr.food_extra.length == i + 1 ? "" : "," }}
              </i>
            </small>
          </vs-td>

          <vs-td class="text-center" :data="tr.quantity">
            {{ tr.quantity }}
          </vs-td>

          <vs-td class="text-right" :data="tr.price"> ৳{{ tr.price }} </vs-td>
        </vs-tr>
        <vs-tr class="bg-grey-light font-bold">
          <vs-td colspan="3" class="text-right">Total:</vs-td>
          <vs-td class="text-right"> ৳{{ therOrder.price.total_price }} </vs-td>
        </vs-tr>
        <vs-tr class="bg-grey-light font-bold">
          <vs-td colspan="3" class="text-right">Service Charge(+):</vs-td>
          <vs-td class="text-right">
            ৳{{ therOrder.price.service_charge }}
          </vs-td>
        </vs-tr>
        <vs-tr class="bg-grey-light font-bold">
          <vs-td colspan="3" class="text-right"
            >VAT({{ therOrder.price.tax_percentage }})(+):</vs-td
          >
          <vs-td class="text-right"> ৳{{ therOrder.price.tax_amount }} </vs-td>
        </vs-tr>
        <vs-tr class="bg-hard font-bold">
          <vs-td colspan="3" class="text-right">Net Total:</vs-td>
          <vs-td class="text-right">
            ৳{{ therOrder.price.grand_total_price }}
          </vs-td>
        </vs-tr>
        <vs-tr class="bg-grey-light font-bold">
          <vs-td colspan="3" class="text-right">Discount(-):</vs-td>
          <vs-td class="text-right">
            ৳{{ therOrder.price.discount_amount }}
          </vs-td>
        </vs-tr>
        <vs-tr class="bg-dark text-white font-bold">
          <vs-td colspan="3" class="text-right">Grand Total:</vs-td>
          <vs-td class="text-right">
            ৳{{ therOrder.price.payable_amount }}
          </vs-td>
        </vs-tr>
        <vs-tr v-if="payMethod == 2" class="bg-white font-bold">
          <vs-td colspan="3" class="text-right">Paid Cash:</vs-td>
          <vs-td class="text-right pr-0">
            ৳
            <input
              type="text"
              class="text-right p-1 rounded text-dark font-bold"
              style="width: 60px; border: 1px solid #ddd"
              v-model="paidCash"
              @focus="$event.target.select()"
            />
          </vs-td>
        </vs-tr>
        <vs-tr v-if="payMethod == 2" class="bg-white font-bold">
          <vs-td colspan="3" class="text-right">Change Cash:</vs-td>
          <vs-td class="text-right">
            ৳
            {{
              paidCash > therOrder.price.payable_amount
                ? (paidCash - therOrder.price.payable_amount).toFixed(2)
                : 0
            }}
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
    <div>
      <h4 class="text-grey-dark pl-2 m-0">Pay By:</h4>
      <ul class="centerx slect-type mx-auto">
        <li
          class="float-left p-2 pb-0"
          v-for="(paym, i) in resturent.payment_type"
          :key="i"
        >
          <vs-radio
            v-model="payMethod"
            :vs-value="paym.id"
            name="payment_method"
            >{{ paym.name }}</vs-radio
          >
        </li>
      </ul>
    </div>
    <vs-button
      class="float-right"
      color="success"
      @click="createInvoice(therOrder)"
      >Print</vs-button
    >

    <!-- Please dont' touch my below  code 😡😡😡😡-->
    <img id="res_logo" :src="resturent.logo" alt="" style="display: none" />
  </div>
</template>

<script>
import axios from "@/axios.js";
import moment from "moment";

export default {
  props: ["therOrder"],
  data: () => ({
    resturent_id: localStorage.getItem("resturent_id"),
    resturent: JSON.parse(localStorage.getItem("resturent")),
    paidCash: 0,
    payMethod: 2,
  }),
  methods: {
    createInvoice(order) {
      let order_id = order.id;
      axios
        .post("/restaurant_management/dashboard/order/confirm_payment/", {
          order_id,
          payment_method: this.payMethod,
          cash_received: parseFloat(this.paidCash),
        })
        .then((res) => {
          if (res.data.status) {
            this.$emit("emitAfterCollectPayments", res.data.data);
            this.printRecipt(res.data.data);
          }
        })
        .catch((err) => {
          this.showActionMessage("error", err);
          this.checkError(err);
        });
    },

    printRecipt(order) {
      // console.log(order);
      const WinPrint = window.open(
        "",
        "",
        "left=0,top=0,width=600,height=600,toolbar=0,scrollbars=0,status=0"
      );

      let itemDetail = "";
      let resLogo = document.querySelector("#res_logo").src;

      order.ordered_items.forEach((el) => {
        if (el.status != "4_CANCELLED") {
          itemDetail += `<tr class="service">
                        <td class="tableitem itemname">
                            <p class="itemtext">${el.food_name}(<b>${
            el.quantity
          }</b>)</p>
                        </td>
                        <td class="tableitem">
                            <p class="itemtext" style="text-align:center">${
                              el.food_option.price
                            }/-</p>
                        </td>
                        <td class="tableitem price">
                            <p class="itemtext">${
                              el.food_option.price * el.quantity
                            }/-</p>
                        </td>
                    </tr>`;
        }
      });

      WinPrint.document.write(`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Invoice</title>

<style>
        * {
            margin: 0;
            padding: 0;
        }
        
        body {
            margin: 0;
            padding: 0;
        }
        
        #invoice-POS {
            box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5);
            padding: 2mm;
            margin: 0 auto;
            width: 44mm;
            background: #FFF;
        }
        
        #invoice-POS ::selection {
            background: #f31544;
            color: #000;
        }
        
        #invoice-POS ::moz-selection {
            background: #f31544;
            color: #000;
        }
        
        #invoice-POS h1 {
            font-size: 1.5em;
            color: #222;
        }
        
        #invoice-POS h2 {
            font-size: .9em;
        }
        
        #invoice-POS h3 {
            font-size: 1.2em;
            font-weight: 300;
            line-height: 2em;
        }
        
        #invoice-POS p {
            font-size: .7em;
            color: #000;
            line-height: 1.2em;
        }
        /* #invoice-POS #top,
        #invoice-POS #mid,
        #invoice-POS #bot {
            border-bottom: 1px solid #000;
        } */
        
        #invoice-POS #top {
            min-height: 77px;
        }
        
        #invoice-POS #bot {
            min-height: 50px;
        }
        
        #invoice-POS #top .logo {
            height: 60px;
            width: 60px;
        }
        
        #invoice-POS .info {
            display: block;
            margin-left: 0;
        }
        
        #invoice-POS .title {
            float: right;
        }
        
        #invoice-POS .title p {
            text-align: right;
        }
        
        #invoice-POS table {
            width: 100%;
            border-collapse: collapse;
        }
        
        #invoice-POS .tabletitle {
            font-size: .7em;
            background: #EEE;
        }
        
        #invoice-POS .service {
            border-bottom: 1px solid #EEE;
        }
        
        #invoice-POS .item {
            width: 24mm;
        }
        
        #invoice-POS .itemtext {
            font-size: .7em;
        }
        
        #invoice-POS #legalcopy {
            margin-top: 5mm;
        }
        
        .price>p,
        .price>h2,
        .payment>h2 {
            float: right;
            margin-right: 5px;
        }
        
        .info {
            padding: 5px 0px;
        }
        
        .info>p {
            text-align: center !important;
        }
        
        .final {
            border: 1px solid #000;
            border-left: 0;
            border-right: 0;
        }
        
        .itemname>p {
            margin-right: 5px;
        }
    </style>
  
</head>

<body>
    <div id="invoice-POS">
        <center id="top">
            <div class="logo">
                <img src="${resLogo}" style="width: 100%;" alt="">
            </div>

            <div class="info">
                <h2>${this.resturent.name}</h2>
                <h2>Invoice</h2>
            </div>
        </center>
        <div id="mid">
            <div class="info">
                <p>
                    VAT Reg: ${this.resturent.vat_registration_no}</br>
                    Phone : ${this.resturent.phone}</br>
                </p>
            </div>
        </div>
        <div id="bot">
            <center>
                <h2>Order # ${order.order_no}</h2>
                <h2>Table No: ${order.table_no}</h2>
                <h2>Time: ${moment().format("DD/MM/Y, h:mma")}</h2>
            </center>
            <div id="table">
                <table>
                    <tr class="tabletitle">
                        <td class="item">
                            <h2>Item</h2>
                        </td>
                        <td class="Hours">
                            <h2>U.Price</h2>
                        </td>
                        <td class="Rate price">
                            <h2>T.Price</h2>
                        </td>
                    </tr>

                    ${itemDetail}

                    <tr class="tabletitle">
                        <td class="Rate">
                            <h2>Total</h2>
                        </td>
                        <td></td>
                        <td class="payment">
                            <h2>${order.price.total_price}/-</h2>
                        </td>
                    </tr>
                    <tr class="tabletitle">
                        <td class="Rate">
                            <h2>Service Charge</h2>
                        </td>
                        <td></td>
                        <td class="payment">
                            <h2>${order.price.service_charge}/-</h2>
                        </td>
                    </tr>
                    <tr class="tabletitle">
                        <td class="Rate">
                            <h2>VAT (${order.price.tax_percentage}%)</h2>
                        </td>
                        <td></td>
                        <td class="payment">
                            <h2>${order.price.tax_amount}/-</h2>
                        </td>
                    </tr>
                    <tr class="tabletitle">
                        <td class="Rate">
                            <h2>Net Total:</h2>
                        </td>
                        <td></td>
                        <td class="payment">
                            <h2>${order.price.grand_total_price}/-
                            </h2>
                        </td>
                    </tr>
                    <tr class="tabletitle">
                        <td class="Rate">
                            <h2>Discount Amount</h2>
                        </td>
                        <td></td>
                        <td class="payment">
                            <h2>(-) ${order.price.discount_amount}/-</h2>
                        </td>
                    </tr>
                    <tr class="tabletitle final">
                        <td class="Rate">
                            <h2>Net Total:</h2>
                        </td>
                        <td></td>
                        <td class="payment">
                            <h2>${order.price.payable_amount}/-
                            </h2>
                        </td>
                    </tr>
                    
                </table>
            </div>
            <div id="legalcopy">
                <center>
                    <p class="legal"><strong> Powerd by @i-host <br> <small>www.i-host.com.bd</small></strong>
                    </p>
                </center>
            </div>
        </div>
    </div>
</body>

</html>`);

      WinPrint.document.close();
      WinPrint.focus();

      WinPrint.print();
      // WinPrint.close();
    },
  },
};
</script>
<style scoped>
.vs-con-table .vs-con-tbody .vs-table--tbody-table .tr-values .vs-table--td {
  padding: 2px 10px;
}
</style>