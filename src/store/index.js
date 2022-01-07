import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import * as Cookies from "js-cookie";

import timeWindow from "./modules/timeWindow";
import franchisee from "./modules/franchisee";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { timeWindow, franchisee },
  plugins: [
    createPersistedState({
      // storage: window.sessionStorage,
      storage: {
        getItem: (key) => Cookies.get(key),
        // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
        setItem: (key, value) => {
          Cookies.set(key, value, { expires: 3, secure: true });
        },
        // setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: true }),
        removeItem: (key) => Cookies.remove(key),
      },
    }),
  ],
});
