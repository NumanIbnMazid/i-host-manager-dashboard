<template>
  <div id="data-list-thumb-view" class="data-list-container">
    <div class="flex flex-wrap-reverse items-center data-list-btn-container">
      <vs-input class="m-2" placeholder="Limit Per Page" v-model="limit" />
      <vs-input class="m-2" placeholder="Offset" v-model="offset" />

<!--      <vs-button class="m-2" @click="getAllDiscountList()">Go</vs-button>-->
    </div>
    <vs-table
      ref="table"
      pagination
      :max-items="itemsPerPage"
      search
      :data="all_promo_codes"
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
              promoCode = { clearFormPreview: null };
              promoCodeFormActionMethod = createNewPromoCode;
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
                all_promo_codes.length -
                  currentPage * itemsPerPage >
                0
                  ? currentPage * itemsPerPage
                  : all_promo_codes.length
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
        <vs-th class="text-center">Promo Code</vs-th>
        <vs-th class="text-center">Start Date</vs-th>
        <vs-th class="text-center">End Date</vs-th>
        <vs-th class="text-center">Promo Type</vs-th>
        <vs-th class="text-center">Maximum Amount</vs-th>
        <vs-th class="text-center">Minimum Purchase Amount</vs-th>
        <vs-th class="text-center">Amount</vs-th>
        <vs-th class="text-center">Maximum Limit</vs-th>
        <vs-th class="text-center">Created At</vs-th>
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

            <vs-td>
              <p class="product-name font-medium truncate text-center">
                {{tr.code}}
              </p>
            </vs-td>


            <vs-td>
              <p class="product-name font-medium truncate text-center">
                {{formattDate(tr.start_date)}}
              </p>
            </vs-td>

            <vs-td>
              <p class="product-name font-medium truncate text-center">
                {{formattDate(tr.end_date)}}
              </p>
            </vs-td>

            <vs-td>
              <p class="product-name font-medium truncate text-center">
                {{tr.promo_type}}
              </p>
            </vs-td>

            <vs-td>
              <p class="product-name font-medium truncate text-center">
                {{tr.max_amount}}
              </p>
            </vs-td>

            <vs-td>
              <p class="product-name font-medium truncate text-center">
                {{tr.minimum_purchase_amount}}
              </p>
            </vs-td>
            <vs-td>
              <p class="product-name font-medium truncate text-center">
                {{tr.amount}}
              </p>
            </vs-td>
            <vs-td>
              <p class="product-name font-medium truncate text-center">
                {{tr.max_limit}}
              </p>
            </vs-td>
            <vs-td>
              <p class="product-name font-medium truncate text-center">
                {{formattDate(tr.created_at)}}
              </p>
            </vs-td>

            <vs-td class="whitespace-no-wrap">

              <feather-icon
                icon="EditIcon"
                svgClasses="w-5 h-5 hover:text-primary stroke-current"
                @click ="updatePromoCode(tr)"
              />
              <feather-icon
                icon="TrashIcon"
                svgClasses="w-5 h-5 hover:text-danger stroke-current"
                class="ml-2"
                @click="confirmAction(deletePromoCode, [tr.id])"
              />
            </vs-td>
          </vs-tr>
        </tbody>
      </template>
    </vs-table>

    <!-- NEW PROMO CODE POPUP FORM -->
    <vs-popup
      class="holamundo"
      title="Promo Code"
      :active.sync="popupActive"
    >
      <vs-row>

        <!-- name -->
        <div class="w-full">
          <vs-input
            icon-pack="feather"
            icon=""
            label="Promo Code"
            v-model="promoCode.code"
            class="mt-5 w-full"
            type="text"
            v-validate="'required'"
          />
        </div>
        <!-- start and end date -->
        <div class="w-full" >
          <label for="" class="vs-input--label">Start Date </label>
          <datepicker
            icon-pack="feather"
            icon="icon-clock"
            label="Start Date"
            class="mt-2 w-full"
            placeholder="Start Date"
            v-model="promoCode.start_date"
          ></datepicker>

          <label for="" class="vs-input--label">End Date</label>
          <datepicker
            icon-pack="feather"
            icon="icon-clock"
            label="End Date"
            class="mt-2 w-full"
            placeholder="End Date"
            v-model="promoCode.end_date"
          ></datepicker>
        </div>

        <div class="mt-5 w-full">
          <label for=""><small>Promo Type</small></label>
          <v-select
            icon-pack="feather"
            icon="icon-edit"
            label="name"
            v-model="promoCode.promo_type"
            class="w-full"
            :options="['PERCENTAGE', 'AMOUNT']"
            v-validate="'required'"
          />
        </div>
        <!-- name -->
        <div class="w-full">
          <vs-input
            icon-pack="feather"
            icon=""
            label="Maximum Amount"
            v-model="promoCode.max_amount"
            class="mt-5 w-full"
            type="integer"
            v-validate="'required'"
          />
        </div>
        <!-- name -->
        <div class="w-full">
          <vs-input
            icon-pack="feather"
            icon=""
            label="Minimum Purchase Amount"
            v-model="promoCode.min_purchase_amount"
            class="mt-5 w-full"
            type="integer"
            v-validate="'required'"
          />
        </div>
        <!-- name -->
        <div class="w-full">
          <vs-input
            icon-pack="feather"
            icon=""
            label="Amount"
            v-model="promoCode.amount"
            class="mt-5 w-full"
            type="integer"
            v-validate="'required'"
          />
        </div>

        <!-- name -->
        <div class="w-full">
          <vs-input
            icon-pack="feather"
            icon=""
            label="Maximum Limit"
            v-model="promoCode.max_limit"
            class="mt-5 w-full"
            type="integer"
            v-validate="'required'"
          />
        </div>

        <vs-button
          class="mb-2 w-full mt-5"
          @click="promoCodeFormActionMethod"
          >Save</vs-button
        >
      </vs-row>
    </vs-popup>
  </div>
</template>

<script>
import axios from "@/axios.js";
import vSelect from "vue-select";
import Datepicker from "vuejs-datepicker";
import moment from "moment";
export default {
  name: "PromoCodeView",
  components: {
    Datepicker,
    vSelect,
  },
  data() {
    return {
      resturent_id: localStorage.getItem("resturent_id"),
      itemsPerPage: 5,
      isMounted: false,

      // currentPage: 1,
      limit: 10,
      offset: "0",
      all_discount_offers: { results: [] },
      all_promo_codes : [],
      popupActive: false,
      promoCodeFormActionMethod: null,
      promoCode:{

        id:null,
        code:null,
        start_date:null,
        end_date:null,
        promo_type:null,
        max_amount:null,
        min_purchase_amount:null,
        amount:null,
        max_limit:null,
        clearFormPreview:null,
      },


    };
  },
  computed: {
    currentPage() {
      if (this.isMounted) {
        return this.$refs.table.currentx;
      }
      return 0;
    },
  },
  methods: {

    getAllPromoCodeList()
    {
      axios
        .get(
          `/restaurant_management/dashboard/promo_code_list/${this.resturent_id}/`
        )
        .then((res) => {
          this.all_promo_codes = res.data.data;
          console.log("Promo code",this.all_promo_codes);
        })
        .catch((err) => {
          console.log("error promo code ", err.response);
          this.showActionMessage("error", err.response.statusText);
          this.checkError(err);
        });
    },


// TODO: 177, 370 food id issue


    // TODO: new discount offer add problem
    createNewPromoCode()
    {
      console.log("creating...");
      axios.
        post("/restaurant_management/dashboard/restaurant_promo_code/",{

          code: this.promoCode.code,
          start_date: this.promoCode.start_date,
          end_date: this.promoCode.end_date,
          promo_type: this.promoCode.promo_type,
          max_amount:this.promoCode.max_amount,
          minimum_purchase_amount:this.promoCode.min_purchase_amount,
          amount:this.promoCode.amount,
          max_limit:this.promoCode.max_limit,
          restaurant:this.resturent_id,

      })
      .then((res)=>{
        if(res.data.status)
        {

          this.all_promo_codes.push(res.data.data);

          this.popupActive = !this.popupActive;

          this.$vs.notify({
                      title: "PromoCode",
                      text: "Promo Created Successfully!",
                      iconPack: "feather",
                      icon: "icon-alert-circle",
                      color: "success",
                      position: "top-right",
                    });

        } else this.showErrorLog(res.data.error.error_details);
      })
        .catch((err) =>
                this.$vs.notify({
                  text: "Something went wrong!",
                  color: "danger",
                  position: "top-right",
                })
              );
      console.log("creating promo code");
    },

    updatePromoCode(promoCode)
    {
      console.log("promo_code_id",this.promoCode.id);
      this.promoCode.id = promoCode.id;
      this.promoCode.code = promoCode.code;
      this.promoCode.start_date = promoCode.start_date;
      this.promoCode.end_date = promoCode.end_date;
      this.promoCode.promo_type = promoCode.promo_type;
      this.promoCode.max_amount = promoCode.max_amount;
      this.promoCode.min_purchase_amount = promoCode.minimum_purchase_amount;
      this.promoCode.amount = promoCode.amount;
      this.promoCode.max_limit = promoCode.max_limit;

      this.promoCodeFormActionMethod = this.updatePromoCodes;

      this.popupActive = !this.popupActive;

      console.log("getting promo code updation info for editing");
    },

    updatePromoCodes()
    {
      const body = {
        code: this.promoCode.code,
        start_date:
        moment(this.promoCode.start_date).format("YYYY-MM-DD")+ "T00:00",
        end_date:
          moment(this.promoCode.end_date).format("YYYY-MM-DD") + "T00:00",
        promo_type: this.promoCode.promo_type,
        max_amount: this.promoCode.max_amount,
        minimum_purchase_amount: this.promoCode.min_purchase_amount,
        amount: this.promoCode.amount,
        max_limit: this.promoCode.max_limit,
      };
      axios
      .patch(
        `/restaurant_management/dashboard/restaurant_promo_code/${this.promoCode.id}/`,
        body
          )
        .then((res) => {
          if (res.data.status) {
            console.log("ures ", res);
            const updatePromoCode = this.all_promo_codes.map(
              (promoCode) =>
                promoCode.id === this.promoCode.id ? { ...res.data.data } : promoCode
            );

            this.all_promo_codes = updatePromoCode;
            this.showActionMessage("success", "Promo code Updated!");
            this.popupActive = !this.popupActive;
          } else this.showErrorLog(res.data.error.error_details);
        })
        .catch((err) => console.log("u err ", err.response));
    },


    deletePromoCode(promo_code_id)
    {
      axios
      .delete(
        `/restaurant_management/dashboard/restaurant_promo_code/${promo_code_id}/`
      )
      .then((res)=>{
        if (res.data.status) {
          const updatedPromoCode = this.all_promo_codes.filter(
            (promoCode) => promoCode.id !== promo_code_id
          );

          this.all_promo_codes = updatedPromoCode;
        } else this.showErrorLog(res.data.error.error_details);
      })
        .catch((err) => console.log("error promoCode ", err.response));

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

    formattDate(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    formatTime(time){
      let md = "2021-01-01 "+time;
      return moment(md).format("h:mm:ss a");
    }
  },
  created() {

    this.getAllPromoCodeList();
  },
  mounted() {
    this.isMounted = true;
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
