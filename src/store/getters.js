/*=========================================================================================
  File Name: getters.js
  Description: Vuex Store - getters
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

// added so later we can keep breakpoint in sync automatically using this config file
// import tailwindConfig from "../../tailwind.config.js"

const getters = {
    // COMPONENT
    // vx-autosuggest
    // starredPages: state => state.navbarSearchAndPinList.data.filter((page) => page.highlightAction),
    windowBreakPoint: state => {
        // This should be same as tailwind. So, it stays in sync with tailwind utility classes
        if (state.windowWidth >= 1200) return "xl";
        else if (state.windowWidth >= 992) return "lg";
        else if (state.windowWidth >= 768) return "md";
        else if (state.windowWidth >= 576) return "sm";
        else return "xs";
    },

    scrollbarTag: state => {
        return state.is_touch_device ? "div" : "VuePerfectScrollbar";
    },

    ordersData: state => {
        return state.ordersData;
    },
    todayData: state => {
        return state.todayData;
    },
    monthWeekData: state => {
        return state.monthWeekData;
    },
    // waiter data for *pwa*
    waiterData: state => {
        return state.waiterData;
    },
    // foods data for *pwa*
    foodsData: state => {
        return state.foodsData;
    },
    // foodCategories data for *pwa*
    foodCategoriesData: state => {
        return state.foodCategoriesData;
    },
    // tables data for *pwa*
    tablesData: state => {
        return state.tablesData;
    },
    // takewayTypes data for *pwa*
    takewayTypesData: state => {
        return state.takewayTypesData;
    },
};

export default getters;