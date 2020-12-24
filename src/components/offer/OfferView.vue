<template>
  <div id="data-list-thumb-view" class="data-list-container">
    <div class="flex flex-wrap-reverse items-center data-list-btn-container">
      <vs-input class="m-2" placeholder="Limit Per Page" v-model="limit" />
      <vs-input class="m-2" placeholder="Offset" v-model="offset" />

      <vs-button class="m-2" @click="getAllDiscountList()">Go</vs-button>
    </div>
    <vs-table
      ref="table"
      pagination
      :max-items="itemsPerPage"
      search
      :data="all_discount_offers.results"
    >
      <div
        slot="header"
        class="flex flex-wrap-reverse items-center flex-grow justify-between"
      >
        <div class="flex flex-wrap-reverse items-center">
          <div
            class="p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary"
            @click="$router.push('/food/create')"
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
                all_discount_offers.results.length -
                  currentPage * itemsPerPage >
                0
                  ? currentPage * itemsPerPage
                  : all_discount_offers.results.length
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
        <vs-th class="text-center">Name</vs-th>
        <vs-th class="text-center">Description</vs-th>
        <vs-th class="text-center">URL</vs-th>
        <vs-th class="text-center">Start Date</vs-th>
        <vs-th class="text-center">End Date</vs-th>
        <!-- <vs-th class="text-center">End Date</vs-th> -->
        <vs-th class="text-center">Amount</vs-th>
        <!-- <vs-th class="text-center">Amount</vs-th> -->
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
              <img :src="tr.image" class="product-img w-1/2" />
            </vs-td>

            <vs-td>
              <p class="product-name font-medium truncate">{{ tr.name }}</p>
            </vs-td>

            <vs-td>
              <vx-tooltip position="bottom">
                <p class="product-name font-medium truncate">
                  {{ tr.description }}
                </p>
              </vx-tooltip>
            </vs-td>

            <vs-td>
              <vx-tooltip :text="tr.url" position="bottom">
                <p class="product-name font-medium truncate">
                  {{ tr.url }}
                </p>
              </vx-tooltip>
            </vs-td>

            <vs-td>
              <p class="product-name font-medium truncate">
                {{ tr.start_date }}
              </p>
            </vs-td>

            <vs-td>
              <p class="product-name font-medium truncate">
                {{ tr.end_date }}
              </p>
            </vs-td>

            <vs-td class="text-center">
              <p class="product-name font-medium truncate">
                {{ tr.amount }}
              </p>
            </vs-td>
            <vs-td class="text-center">
              <p class="product-name font-medium truncate">
                {{ tr.restaurant }}
              </p>
            </vs-td>

            <vs-td class="whitespace-no-wrap">
              <feather-icon
                icon="EditIcon"
                svgClasses="w-5 h-5 hover:text-primary stroke-current"
                @click="$router.push(`/food/edit/${tr.id}`)"
              />
              <feather-icon
                icon="TrashIcon"
                svgClasses="w-5 h-5 hover:text-danger stroke-current"
                class="ml-2"
                @click="confirmAction(deleteADiscount, [tr.id])"
              />
            </vs-td>
          </vs-tr>
        </tbody>
      </template>
    </vs-table>
  </div>
</template>

<script>
import axios from "@/axios.js";
export default {
  name: "OfferView",
  data() {
    return {
      resturent_id: localStorage.getItem("resturent_id"),
      itemsPerPage: 5,
      currentPage: 5,
      limit: 10,
      offset: 1,
      all_discount_offers: null,
    };
  },
  methods: {
    getAllDiscountList() {
      axios
        .get(
          `/restaurant_management/dashboard/restaurant/${this.resturent_id}/discount_list/?limit=${this.limit}&offset=${this.offset}`
        )
        .then((res) => {
          this.all_discount_offers = res.data.data;
          console.log("offer res ", res.data.data);
        })
        .catch((err) => console.log("error offer ", err.response));
    },

    deleteADiscount(discount_id) {
      console.log('aa ', this.all_discount_offers.results)
      axios
        .delete(
          `/restaurant_management/dashboard/delete_discount/${discount_id}`
        )
        .then((res) => {
          console.log("offer deleted ", res.data);
          if (res.data.status) {
            const updatedOffers = this.all_discount_offers.results.filter(
              (discount) => discount.id !== discount_id
            );

            this.all_discount_offers.results = updatedOffers;
          }
        })
        .catch((err) => console.log("error offer ", err.response));
    },
  },
  created() {
    this.getAllDiscountList();
  },
};
</script>