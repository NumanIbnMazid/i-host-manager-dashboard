<template>
  <div>
    <div class="vx-row mb-10">
      <div class="vx-col md:w-1/2">
        <h1 class="text-grey-dark">Order Dashboard</h1>
      </div>
      <div class="vx-col md:w-1/2 text-right">
        <h1 class="text-grey-dark">
          {{ time }}
        </h1>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "@/axios.js";
import moment from "moment";
export default {
  data: () => ({
    time: "",
  }),

  methods: {
    getTime() {
      setInterval(() => {
        this.time = moment().format("h:mm:ss A");
      }, 1000);
    },
  },

  created() {
    this.getTime();
  },

  
};
</script>
