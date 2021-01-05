import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const state = () => ({
  contactOpened: false,
  currentView: '',
  chatView: 'intro'
});

export const getters = {
}

export const mutations = {
  set_contactOpened: (state, {isOpened, currentView}) => {
    state.contactOpened = isOpened
    state.currentView = currentView
  },
  set_chatView: (state, payload) => {
    state.chatView = payload
  },
}