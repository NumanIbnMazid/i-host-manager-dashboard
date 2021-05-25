/*=========================================================================================
  File Name: store.js
  Description: Vuex store
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Vuex from 'vuex'

import state from "./state"
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"
// Import the plugin module here
import localStoragePlugin from '../plugins/localStorage';

Vue.use(Vuex)

export default new Vuex.Store({
    // register the plugin using the `plugins` property on the store
    plugins: [localStoragePlugin],
    getters,
    mutations,
    state,
    actions,
    strict: process.env.NODE_ENV !== 'production'
})
