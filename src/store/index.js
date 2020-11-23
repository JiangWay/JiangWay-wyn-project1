import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    s_accountingList: []
  },
  mutations: {
    m_setAccountingList (state, accountingList) {
      state.s_accountingList = accountingList
    }
  },
  actions: {
    a_getAccountingList () {}

  },
  modules: {
  }
})
