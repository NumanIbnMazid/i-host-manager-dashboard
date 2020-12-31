<template>
  <vs-popup
    class="holamundo"
    :title="`Order #${showOrder.id}`"
    :active.sync="showDetailsPopup"
  >
    <vs-table :data="showOrder.ordered_items">
      <template slot="thead">
        <vs-th class="text-center">Item Id</vs-th>
        <vs-th class="text-center">Name</vs-th>
        <vs-th class="text-center">Qty</vs-th>
        <vs-th class="text-center">Options</vs-th>
        <vs-th class="text-center">Price</vs-th>
      </template>

      <template slot-scope="{ data }">
        <vs-tr class="text-center" :key="i" v-for="(tr, i) in data">
          <vs-td :data="tr.id">
            {{ tr.id }}
          </vs-td>

          <vs-td class="text-center" :data="tr.food_name">
            {{ tr.food_name }}
          </vs-td>

          <vs-td class="text-center" :data="tr.quantity">
            {{ tr.quantity }}
          </vs-td>

          <vs-td class="text-center" :data="tr.food_option">
            <span class="bg-gn p-1 rounded text-white">
              <i v-if="tr.food_option.option_type.name != 'single_type'">
                {{ tr.food_option.option_type.name }}:</i
              >
              {{ tr.food_option.name }}
            </span>
          </vs-td>
          <vs-td :data="tr.food_option.price">
            ৳{{ tr.food_option.price }}
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </vs-popup>
</template>

<script>
export default {
  props: ["showOrder", "showDetailsPopup"],
};
</script>

<style scoped>
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