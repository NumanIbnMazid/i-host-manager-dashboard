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
            <div class="v-col w-full sm:w-12/12">
              <div class="text-center mb-2">
                <b>Table: {{ table.table_no }}</b> <br />
                <b>Name: {{ table.name }}</b>
              </div>
            </div>
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
            <!-- <hr /> -->

            <div class="vx-row mt-3">
              <div class="v-col w-full sm:w-12/12">
                <div class="text-center">
                  <!-- waiters avatar -->
                  <div class="waiters-avater flex">
                    <vx-tooltip
                      v-for="(waiter, i) in table.staff_assigned"
                      :key="i"
                      :text="`${waiter.user.first_name}`"
                      position="top"
                    >
                      <!-- <vs-avatar
                        :src="`${waiter.image}`"
                        @click="detailsWaiterInfo(waiter, table)"
                      /> -->
                      <vs-chip
                        :style="`background-color: rgb(${getRandomInt(
                          0,
                          255
                        )}, ${getRandomInt(0, 255)}, ${getRandomInt(
                          0,
                          255
                        )}); color: white; margin-top: 5px; font-size: 10px;
                        scrollbar-color: red yellow;`"
                      >
                        <vs-avatar
                          :src="`${waiter.image}`"
                          @click="detailsWaiterInfo(waiter, table)"
                        />
                        {{ waiter.first_name }}
                      </vs-chip>
                      <!-- <div v-if="i % 2 === 0">
                        <br />
                        hellow
                      </div> -->
                    </vx-tooltip>
                    <vs-avatar
                      @click="
                        assignWaiterPopupActive = true;
                        table_id = table.id;
                      "
                      color="success"
                      icon-pack="feather"
                      icon="icon-plus"
                    />
                  </div>

                  <!-- action buttons -->
                  <div class="vx-row w-full m-0" style="width: 100% !important">
                    <div class="v-col w-full sm:w-1/1 md:w-1/1 lg:w-1/5 ml-4">
                      <vs-button
                        color="primary"
                        icon-pack="feather"
                        icon="icon-printer"
                        type="gradient"
                        class="mt-2 lg:mr-2 md:mr-0 sm:mr-0 w-full"
                        @click="printQr(table.id)"
                      ></vs-button>
                    </div>

                    <div class="v-col w-full sm:w-1/1 md:w-1/1 lg:w-1/5">
                      <vs-button
                        color="primary"
                        icon-pack="feather"
                        icon="icon-download"
                        type="gradient"
                        class="mt-2 lg:ml-1 md:ml-0 sm:ml-0 w-full"
                        @click="downloadImg(table.id)"
                      ></vs-button>
                    </div>

                    <div class="v-col w-full sm:w-1/1 md:w-1/1 lg:w-1/4">
                      <vs-button
                        color="primary"
                        icon-pack="feather"
                        icon="icon-edit"
                        type="gradient"
                        class="mt-2 lg:ml-2 md:ml-0 sm:ml-0 w-full"
                        @click="
                          (tableEditPopupActive = true),
                            (table_id = table.id),
                            (table_no = table.table_no),
                            (name = table.name)
                        "
                      ></vs-button>
                    </div>

                    <!-- table delete button -->
                    <div class="v-col w-full sm:w-1/1 md:w-1/1 lg:w-1/4 ml-1">
                      <vs-button
                        color="danger"
                        icon-pack="feather"
                        icon="icon-trash"
                        type="gradient"
                        class="mt-2 mr-4 lg:ml-2 md:ml-0 sm:ml-0 w-full"
                        @click="confirmAction(deleteTable, [table.id])"
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

    <!-- staff detail info popup form -->
    <vs-popup
      class="holamundo"
      :title="detailWaiter.tableName"
      :active.sync="staffDetailPpopupActive"
    >
      <template>
        <div class="con-expand-users w-full">
          <div class="con-btns-user flex items-center justify-between">
            <div class="con-userx items-center justify-start mx-auto">
              <!-- staff profile avatar -->
              <img
                class="rounded"
                style="height: 180px"
                :src="detailWaiter.image"
              />
            </div>
          </div>

          <!-- staff details information -->
          <vs-list class="w-1/3 p-2 mx-auto">
            <p>
              <strong>Name : </strong>
              {{ detailWaiter.first_name }}
            </p>
            <p>
              <strong>NID : </strong>
              {{ detailWaiter.nid }}
            </p>
            <p>
              <strong>Shift Days : </strong>
              {{ detailWaiter.shift_days }}
            </p>

            <p>
              <strong>Shift Start : </strong>
              {{ detailWaiter.shift_start }}
            </p>

            <p>
              <strong>Shift End : </strong>
              {{ detailWaiter.shift_end }}
            </p>

            <div class="flex mt-2">
              <!-- <vs-button
                title="Remove From Table"
                type="border"
                size="small"
                color="danger"
                @click="
                  staffDetailPpopupActive = false;
                  confirmAction(removeWaiterFromTable, [
                    detailWaiter.waiterId,
                    detailWaiter.tableId,
                  ]);
                "
              >
                <feather-icon icon="TrashIcon" svgClasses="h-4 w-4" />
                <span class="text-primary">Remove From Table</span>
              </vs-button> -->

              <div
                class="flex mt-2 rounded-lg cursor-pointer flex items-center justify-between text-sm font-small text-base text-primary border border-solid border-danger text-danger"
                title="Remove Waiter From Table"
                @click="
                  staffDetailPpopupActive = false;
                  confirmAction(removeWaiterFromTable, [
                    detailWaiter.waiterId,
                    detailWaiter.tableId,
                  ]);
                "
              >
                <feather-icon icon="TrashIcon" svgClasses="h-4 w-4" class="ml-2"/>
                <span class="text-danger m-1">Remove From Table</span>
              </div>
            </div>
          </vs-list>
        </div>
      </template>
    </vs-popup>

    <!-- add new table popup form -->
    <vs-popup
      class="holamundo"
      title="Add new table"
      :active.sync="popupActive"
    >
      <vs-row>
        <div class="w-full mt-5">
          <label for>Select Waiters</label>
          <v-select
            label="first_name"
            class="w-full"
            v-validate="'required'"
            v-model="waiter"
            :options="waiters"
            :reduce="(waiters) => waiters.id"
            multiple
            taggable
          />
        </div>

        <div class="w-full">
          <vs-input
            label="Table No"
            v-model="table_no"
            class="mt-5 w-full"
            type="number"
            v-validate="'required'"
          />
        </div>

        <div class="w-full">
          <vs-input
            label="Name"
            v-model="name"
            class="mt-5 w-full"
            type="text"
            v-validate="'required'"
          />
        </div>

        <div class="w-full">
          <vs-input
            label="Restaurant Id"
            v-model="resturent_id"
            class="mt-5 w-full"
            type="text"
            disabled
          />
        </div>

        <vs-button class="mb-2 w-full mt-5" @click="addTable()"
          >Add New</vs-button
        >
      </vs-row>
    </vs-popup>

    <!-- add new table popup form -->
    <vs-popup
      class="holamundo"
      title="Add new table"
      :active.sync="tableEditPopupActive"
    >
      <vs-row>
        <div class="w-full">
          <vs-input
            label="Table No"
            v-model="table_no"
            class="mt-5 w-full"
            type="text"
            v-validate="'required'"
          />
        </div>

        <div class="w-full">
          <vs-input
            label="Name"
            v-model="name"
            class="mt-5 w-full"
            type="text"
            v-validate="'required'"
          />
        </div>

        <div class="w-full">
          <vs-input
            label="Restaurant Id"
            v-model="resturent_id"
            class="mt-5 w-full"
            type="text"
            disabled
          />
        </div>

        <vs-button class="mb-2 w-full mt-5" @click="editTable()"
          >Save Changes</vs-button
        >
      </vs-row>
    </vs-popup>

    <!-- popup form for assign waiter to a table -->
    <vs-popup
      class="holamundo"
      title="Add new table"
      :active.sync="assignWaiterPopupActive"
    >
      <vs-row>
        <div class="w-full mt-5">
          <label for>Select Waiters</label>
          <v-select
            label="first_name"
            class="w-full"
            v-validate="'required'"
            v-model="waiter"
            :options="waiters"
            :reduce="(waiters) => waiters.id"
            multiple
            taggable
          />
        </div>

        <div class="w-full">
          <vs-input
            label="Table No"
            v-model="table_id"
            class="mt-5 w-full"
            type="text"
            v-validate="'required'"
            disabled
          />
        </div>

        <vs-button class="mb-2 w-full mt-5" @click="assignStaff(table_id)"
          >Assign Waiter</vs-button
        >
      </vs-row>
    </vs-popup>
  </div>
</template>

<script>
import axios from "@/axios.js";
import QrcodeVue from "qrcode.vue";
import vSelect from "vue-select";
import Swal from "sweetalert2";

export default {
  components: {
    QrcodeVue,
    "v-select": vSelect,
  },
  data: () => ({
    resturent_id: localStorage.getItem("resturent_id"),
    popupActive: false,
    staffDetailPpopupActive: false,
    assignWaiterPopupActive: false,
    tableEditPopupActive: false,
    tables: [],
    table_no: "",
    table_id: "",
    name: "",

    colorCode: Math.floor(Math.random() * (255 - 0)) + 0,
    detailWaiter: {
      tableName: "",
      tableId: "",
      image: "",
      nid: "",
      retaurant: "",
      first_name: "",
      shift_start: "",
      shift_end: "",
      email_address: "",
      waiterId: "",
      phone: "",
    },
    waiter: "",
    waiters: [],
  }),

  methods: {
    // random code
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },

    getTables() {
      console.log('table func called!!')
      axios
        .get(`/restaurant_management/dashboard/restaurant/${this.resturent_id}/tables/`)
        .then((res) => {
          console.log("tables ", res.data.data);
          this.tables = res.data.data;
        })
        .catch((err) => {
          console.log("table error ", err.response);
          this.showActionMessage("error", err.response.statusText);
          // console.log("sremove error ", err);
          this.checkError(err);
        });
    },

    // add new table
    addTable() {
      axios
        .post("/restaurant_management/dashboard/table/", {
          table_no: this.table_no,
          name: this.name,
          restaurant: this.resturent_id,
        })
        .then((res) => {
          console.log("ntres ", res);
          if (res.data.status) {
            this.showActionMessage("success", "New table created successfully");

            // creating staff based on table id
            this.tables.push(res.data.data);
            this.assignStaff(res.data.data.id);
          } else {
            this.showActionMessage("error", "New table create failed");
          }

          this.popupActive = false;

          this.table_no = "";
          this.waiter = "";
        })
        .catch((err) => {
          this.showActionMessage("error", err.response.statusText);
          this.checkError(err);
        });
    },

    // table update function
    editTable() {
      axios
        .patch(`/restaurant_management/dashboard/table/${this.table_id}/`, {
          table_no: this.table_no,
          name: this.name,
          retaurant: this.resturent_id,
        })
        .then((res) => {
          console.log("tur ", res);
          if (res.data.status) {
            this.showActionMessage(
              "success",
              `${this.name} updated successfully!`
            );

            // updating tables array
            this.tables = this.tables.map((table) =>
              table.id === this.table_id ? { ...res.data.data } : table
            );

            this.tableEditPopupActive = false;
          } else {
            this.showActionMessage("Error", `${this.name} faild to update!`);
          }
        })
        .catch((err) => {
          console.log("tuerr ", err.response);
          this.showActionMessage("error", "Something went wrong! Try again.");
          this.checkError(err);
        });
    },

    assignStaff(tid) {
      axios
        .post(`/restaurant_management/dashboard/table/${tid}/add_staff/`, {
          staff_list: this.waiter,
        })
        .then((res) => {
          console.log("Staff Created Successfully", res);

          // if (res.data.status)

          // updating tables object
          this.tables = this.tables.map((table) =>
            table.id === tid
              ? {
                  ...table,
                  staff_assigned: (table.staff_assigned =
                    res.data.data.staff_assigned),
                }
              : table
          );
          this.waiter = "";
          this.assignWaiterPopupActive = false;
        })
        .catch((err) => {
          this.showActionMessage("error", err.response.statusText);
          this.checkError(err);
        });
    },

    // table delete function
    deleteTable(table_id) {
      axios
        .delete(`/restaurant_management/dashboard/table/${table_id}/`)
        .then((res) => {
          if (res.data.status) {
            this.tables = this.tables.filter((table) => table.id !== table_id);
          }
          this.showActionMessage("success", res.data.msg);
        })
        .catch((err) => {
          this.showActionMessage("error", err.response.statusText);
          this.checkError(err);
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
      // WinPrint.close();
    },
    downloadImg(id) {
      const imgSrc = document.querySelector("#table-qr-" + id + ">img").src;
      let link = `<a id="tempDown" href='${imgSrc}' download style="display:none">download</a>`;
      document
        .querySelector("#table-qr-" + id)
        .insertAdjacentHTML("afterend", link);
      document.getElementById("tempDown").click();
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
        .get(`/account_management/restaurant/${this.resturent_id}/waiter_info/`)
        .then((res) => {
          console.log("waiter res ", res);
          if (res.data.data) this.waiters = res.data.data;
          else this.showActionMessage("error", "Something went wrong!");
        })
        .catch((err) => {
          console.log("waiter error ", err.response);
          this.showActionMessage("error", err.response.statusText);
          this.checkError(err);
        });
    },

    detailsWaiterInfo(waiter, table) {
      this.detailWaiter.tableName = table.name;
      this.detailWaiter.tableId = table.id;

      this.detailWaiter.waiterId = waiter.id;
      this.detailWaiter.image = waiter.image;
      this.detailWaiter.nid = waiter.nid;
      this.detailWaiter.first_name = waiter.user.first_name;
      this.detailWaiter.shift_start = waiter.shift_start;
      this.detailWaiter.shift_end = waiter.shift_end;
      this.detailWaiter.email_address = waiter.user.email_address;
      this.detailWaiter.phone = waiter.user.phone;

      this.staffDetailPpopupActive = !this.staffDetailPpopupActive;
    },

    removeWaiterFromTable(waiterId, tableId) {
      axios
        .post(`/restaurant_management/dashboard/table/${tableId}/staff_remove/`, {
          staff_list: [waiterId],
        })
        .then((res) => {
          // updating tables object
          this.tables = this.tables.map((table) =>
            table.id === tableId
              ? {
                  ...table,
                  staff_assigned: table.staff_assigned.filter(
                    (staff) => staff.id !== waiterId
                  ),
                }
              : table
          );
          this.staffDetailPpopupActive = false;

          this.showActionMessage("success", "Waiter removed successfully!");
        })
        .catch((err) => {
          this.showActionMessage("error", err.response.statusText);
          this.checkError(err);
        });
    },
  },

  created() {
    this.getTables();
    this.getWaiters();
  },
  mounted() {
    setInterval(() => {
      this.imageRenderFromQr();
    }, 100);
  },
};
</script>

<style scoped>
  .waiters-avater {
    overflow-x: auto;
    scrollbar-width: 2px;
    scrollbar-color: red yellow;
  }

  /* width */
  ::-webkit-scrollbar {
    height: 4px; /* height of horizontal scrollbar ← You're missing this */
    /* width of vertical scrollbar */
    border: 1px solid #d5d5d5;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    background: #000 !important;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #000;
  }
</style>
