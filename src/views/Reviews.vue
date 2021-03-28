<template>
  <div id="data-list-thumb-view" class="data-list-container">
    <vs-table
      ref="table"
      pagination
      :max-items="itemsPerPage"
      search
      :data="reviews"
    >
      <div
        slot="header"
        class="flex flex-wrap-reverse items-center flex-grow justify-between"
      >
        <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4">
          <div
            class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
          >
            <span class="mr-2"
              >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} -
              {{
                reviews.length - currentPage * itemsPerPage > 0
                  ? currentPage * itemsPerPage
                  : reviews.length
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
        <th class="text-center">Order Id</th>
        <th class="text-center">Customer Info</th>
        <th class="text-center">Review Text</th>
        <th class="text-center">Rating</th>
      </template>

      <template slot-scope="{ data }">
        <tbody>
          <vs-tr v-for="(tr, indextr) in data" :key="indextr">
            <vs-td>
              <p class="product-name font-medium truncate">
                #{{ tr.order_no }}
              </p>
            </vs-td>
            <vs-td v-if="tr.customer_info.name == null">
              <p class="product-name font-medium truncate">
                {{ "-" }}
              </p>
            </vs-td>
            <vs-td v-else>
              <p class="product-name font-medium truncate">
                {{ tr.customer_info.name }}
              </p>
            </vs-td>

<!--            <vs-td>-->
<!--              <p class="product-name font-medium truncate">-->
<!--                {{ tr.customer_info ? tr.customer_info.name : "-" }}-->
<!--              </p>-->
<!--            </vs-td>-->
            <vs-td>
              <p class="product-name font-medium truncate">
                {{ tr.review_text }}
              </p>
            </vs-td>
            <vs-td>
              <p class="product-name font-medium truncate">
                {{ tr.rating }}
              </p>
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
  data: () => ({
    resturent_id: localStorage.getItem("resturent_id"),
    food: [],
    itemsPerPage: 20,
    currentPage: 5,
    limit: 10,
    offset: 1,
    reviews: [],
  }),

  methods: {
    getReviews() {
      axios
        .get(
          `/restaurant_management/dashboard/review_list/${this.resturent_id}/`
        )
        .then((res) => (
          this.reviews = res.data.data
        ))
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
  },
  created() {
    this.getReviews();
  },
};
</script>

<style scoped>
.product-img {
  height: 80px;
  width: auto;
  border-radius: 5px;
}
td {
  border-top: 10px solid #f8f8f8;
  text-align: center;
}
th {
  text-align: center !important;
  background-color: #31314e;
  color: #fff !important;
}
th .vs-table-text {
  justify-content: center !important;
}
</style>

