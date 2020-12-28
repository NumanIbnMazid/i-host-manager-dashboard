<template>
  <div>
    <Header></Header>
    <Daily v-show="$router.currentRoute.path == '/report'"></Daily>
    <DateWise v-show="$router.currentRoute.path == '/report/date-wise'"></DateWise>
    <TopItem v-show="$router.currentRoute.path == '/report/top'"></TopItem>
    <WaiterWise v-show="$router.currentRoute.path == '/report/waiter-wise'"></WaiterWise>
  </div>
</template>

<script>
import Header from "@/components/report/Header.vue";
import Daily from "@/components/report/Daily.vue";
import DateWise from "@/components/report/DateWise.vue";
import TopItem from "@/components/report/TopItem.vue";
import WaiterWise from "@/components/report/WaiterWise.vue";
export default {
  components: {
    Header,
    Daily,
    DateWise,
    TopItem,
    WaiterWise,
  },
};
</script>

<style>
</style>