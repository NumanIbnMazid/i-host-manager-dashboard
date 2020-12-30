import axios from "@/axios.js";
const actions = {
    // /////////////////////////////////////////////
    // COMPONENTS
    // /////////////////////////////////////////////

    // Vertical NavMenu
    updateVerticalNavMenuWidth({ commit }, width) {
        commit("UPDATE_VERTICAL_NAV_MENU_WIDTH", width);
    },

    // VxAutoSuggest
    updateStarredPage({ commit }, payload) {
        commit("UPDATE_STARRED_PAGE", payload);
    },

    // The Navbar
    arrangeStarredPagesLimited({ commit }, list) {
        commit("ARRANGE_STARRED_PAGES_LIMITED", list);
    },
    arrangeStarredPagesMore({ commit }, list) {
        commit("ARRANGE_STARRED_PAGES_MORE", list);
    },

    // /////////////////////////////////////////////
    // UI
    // /////////////////////////////////////////////

    toggleContentOverlay({ commit }) {
        commit("TOGGLE_CONTENT_OVERLAY");
    },
    updateTheme({ commit }, val) {
        commit("UPDATE_THEME", val);
    },

    // /////////////////////////////////////////////
    // User/Account
    // /////////////////////////////////////////////

    updateUserInfo({ commit }, payload) {
        commit("UPDATE_USER_INFO", payload);
    },

    getOrderData({ commit }) {
        let updateSocket;
        let resturent_id = localStorage.getItem("resturent_id");

        function connectSocket() {
            updateSocket = new WebSocket(
                `ws://production.i-host.com.bd/ws/dashboard/${resturent_id}/`
            );

            updateSocket.onmessage = function(e) {
                let res = JSON.parse(e.data);

                commit("GET_ORDERS_DATA", res.data);
                // vm.queriedItems = res.list.length;

                console.log("Received a message from the socket:", e.data);
            };
            updateSocket.onclose = function(e) {
                console.error("Chat socket closed unexpectedly; reconnecting");
                setTimeout(connectSocket, 1000);
            };
            updateSocket.onopen = function(e) {
                console.log("Socket connected; sending a ping");
                updateSocket.send(resturent_id);
            };
        }
        connectSocket();

        // axios
        //     .get(
        //         `/restaurant_management/dashboard/restaurant/${resturent_id}/order_item_list/`
        //     )
        //     .then((res) => {
        //         console.log("datas ", res.data.data);
        //         // this.orderDisburse(res.data.data);
        //         commit("GET_ORDERS_DATA", res.data.data);
        //     })
        //     .catch((err) => {
        //         console.log("eroil ", err.response);
        //         // this.showActionMessage("error", err);
        //         // this.checkError(err);
        //     });
    },

    getTodayData({ commit }) {
        let resturent_id = localStorage.getItem("resturent_id");
        axios
            .get(
                `/restaurant_management/dashboard/restaurant/${resturent_id}/today_sell/`
            )
            .then(res => {
                if (res.data.status) {
                    commit("GET_TODAY_DATA", res.data.data);
                }
            })
            .catch(err => {
                console.log(err);
            });
    },
    getMonthWeekData({ commit }) {
        let resturent_id = localStorage.getItem("resturent_id");
        axios
            .get(
                `/restaurant_management/dashboard/dashboard_total_report/${resturent_id}`
            )
            .then(res => {
                if (res.data.status) {
                    commit("GET_MONTH_WEEK_DATA", res.data.data);
                }
            })
            .catch(err => {
                console.error(err);
            });
    }
};

export default actions;