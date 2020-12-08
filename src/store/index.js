import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    s_accountingList: [],
    s_userInfo: {}
  },
  mutations: {
    m_setAccountingList (state, accountingList) {
      state.s_accountingList = accountingList
    },
    m_setUserInfo (state, userInfo) {
      console.log(userInfo)
      state.s_userInfo = userInfo
      console.log(state.s_userInfo)
    }
  },
  actions: {
    a_getAccountingList () {}

  },
  modules: {
  }
})
