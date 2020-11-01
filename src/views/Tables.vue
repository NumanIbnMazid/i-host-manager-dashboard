<template>
  <div>
    <div
      slot="header"
      class="flex flex-wrap-reverse items-center flex-grow justify-between"
    >
      <div class="flex flex-wrap-reverse items-center">
        <!-- ACTION - DROPDOWN -->
        <div
          class="p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary"
          @click="popupActive = true"
        >
          <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
          <span class="ml-2 text-base text-primary">Add New</span>
        </div>
      </div>
    </div>

    <div class="vx-row">
      <div
        class="vx-col sm:w-2/12 w-full mb-2 p-2"
        v-for="(table, i) in tables"
        :key="i"
      >
        <vx-card>
          <template>
            <div class="w-full flex items-center mb-2">
              <qrcode-vue
                :value="`{&quot;table_id&quot;: &quot;${table.id}&quot;,&quot;table_no&quot;: &quot;${table.table_no}&quot;,&quot;res_no&quot;: &quot;${resturent_id}&quot;}`"
                size="500"
                renderAs="canvas"
                class="mx-auto"
                :id="`table-qr-${table.id}`"
              ></qrcode-vue>

              <!-- <qrcode-vue
                :value="`{'table_no': '${table.id}','res_no': '${resturent_id}'}`"
                size="500"
                renderAs="canvas"
                class="mx-auto"
                :id="`table-qr-${table.id}`"
              ></qrcode-vue>-->
            </div>
            <hr />

            <div class="vx-row mt-3">
              <div class="v-col w-full sm:w-12/12">
                <div class="text-center">
                  <b>Table: {{ table.table_no }}</b>
                  <br />
                  <div class="vx-row w-full m-0" style="width: 98% !important">
                    <div class="v-col w-full sm:w-1/1 md:w-1/1 lg:w-1/2">
                      <vs-button
                        color="primary"
                        icon-pack="feather"
                        icon="icon-printer"
                        type="gradient"
                        class="mt-2 lg:mr-1 md:mr-0 sm:mr-0 w-full"
                        @click="printQr(table.id)"
                      ></vs-button>
                    </div>

                    <div class="v-col w-full sm:w-1/1 md:w-1/1 lg:w-1/2">
                      <vs-button
                        color="primary"
                        icon-pack="feather"
                        icon="icon-download"
                        type="gradient"
                        class="mt-2 lg:ml-1 md:ml-0 sm:ml-0 w-full"
                        @click="downloadImg(table.id)"
                      ></vs-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </vx-card>
      </div>
    </div>

    <vs-popup
      class="holamundo"
      title="Add new table"
      :active.sync="popupActive"
    >
      <vs-row>
        <div class="w-full mt-5">
          <label for>Select Waiters</label>
          <v-select
            label="email"
            class="w-full"
            v-validate="'required'"
            v-model="waiter"
            :options="waiters"
            :reduce="(waiters) => waiters.id"
          />
        </div>

        <div class="w-full">
          <vs-input
            label="Table No"
            v-model="table_no"
            class="mt-5 w-full"
            type="text"
            v-validate="'required'"
          />
        </div>

        <vs-button class="mb-2 w-full mt-5" @click="addTable()"
          >Add New</vs-button
        >
      </vs-row>
    </vs-popup>
  </div>
</template>


<script>
import axios from "@/axios.js";
import QrcodeVue from "qrcode.vue";
import vSelect from "vue-select";

export default {
  components: {
    QrcodeVue,
    "v-select": vSelect,
  },
  data: () => ({
    resturent_id: localStorage.getItem("resturent_id"),
    popupActive: false,
    tables: [],
    table_no: "",
    waiter: "",
    waiters: [],
  }),

  methods: {
    getTable() {
      axios.get(`table_list/${this.resturent_id}`).then((res) => {
        this.tables = res.data.data;
      });
    },

    addTable() {
      axios
        .post(`resturant/${this.resturent_id}/table/`, {
          table_no: this.table_no,
          user_id: this.waiter,
        })
        .then((res) => {
          this.tables.push(res.data.data);
          this.popupActive = false;
          this.$vs.notify({
            title: "Create Success",
            text: "New table created successfully",
            color: "success",
            position: "top-right",
          });

          this.table_no = "";
          this.waiter = "";
        })
        .catch((err) => {
          console.log(err);
          this.$vs.notify({
            title: "Create Failed",
            text: "New table create failed",
            color: "danger",
            position: "top-right",
          });
        });
    },

    printQr(id) {
      const prtHtml = document.querySelector("#table-qr-" + id + ">img").src;
      const WinPrint = window.open(
        "",
        "",
        "left=0,top=0,width=600,height=600,toolbar=0,scrollbars=0,status=0"
      );

      WinPrint.document.write(`<!DOCTYPE html>
      <html>
      <head>
      <style type="text/css"> *, html {margin:100;padding:100;} body{margin-top: 10px}  @page { size: auto;  margin: 1mm; }</style>
      </head>
        <body>
          <img src="${prtHtml}" alt="">
        </body>
      </html>`);

      WinPrint.document.close();
      WinPrint.focus();
      WinPrint.print();
      WinPrint.close();
    },
    downloadImg(id) {
      const imgSrc = document.querySelector("#table-qr-" + id + ">img").src;
      let link = `<a id="tempDown" href='${imgSrc}' download style="display:none">download</a>`;
      document
        .querySelector("#table-qr-" + id)
        .insertAdjacentHTML("afterend", link);
      document.getElementById("tempDown").click();
      // console.log(link)
    },
  
    imageRenderFromQr() {
      this.tables.forEach((el) => {
        let can = document.querySelector("#table-qr-" + el.id + ">canvas");
        if (can != null) {
          let b64Img = can.toDataURL("image/png");
          let newImage = '<img src="' + b64Img + '" style="width:100%"/>';
          // console.log(b64Img);
          document.querySelector("#table-qr-" + el.id).innerHTML = newImage;
        }
      });
    },

    getWaiters() {
      axios
        .get(`resturant/${this.resturent_id}/waiter/`)
        .then((res) => {
          console.log(res);
          this.waiters = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  created() {
    this.getTable();
    this.getWaiters();
  },
  mounted() {
    setInterval(() => {
      this.imageRenderFromQr();
    }, 100);
  },
};
</script>

<style>
</style>