import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    username: '',
    password: '',
    json: '',
    saved: '',
  },
  getters: {
    username: username => state.username,
    password: password => state.password,
    json: json => state.json,
    saved: saved => state.saved,
  },
});
