import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 创建vuex的store
const store = new Vuex.Store({
  state: {
    token: '',
    roles: [],
    account: ""
  },
  // 更改store的状态
  mutations: {
    setToken (state, token) {
      state.token = token
      localStorage.setItem('resToken', token)
    },
    removeToken (state) {
      state.token = ''
      localStorage.removeItem('resToken')
    },
    setAccount (state, account) {
      state.account = account
      localStorage.setItem('resAccount', account)
    },
    removeAccount (state) {
      state.account = ''
      localStorage.removeItem('resAccount')
    },
    setRoles (state, roles) {
      state.roles = roles
      localStorage.setItem('resRoles', roles)
    },
    removeRoles (state) {
      state.roles = []
      localStorage.removeItem('resRoles')
    }
  },
  // 有异步的时候， 需要action
  actions: {
    setToken(context, token) {
      context.commit('setToken', token)
    },
    removeToken(context) {
      context.commit('removeToken')
    },
    setToken(context, account) {
      context.commit('setAccount', account)
    },
    removeToken(context) {
      context.commit('removeAccount')
    },
    setRoles(context, roles) {
      context.commit('setRoles', roles)
    },
    removeRoles(context) {
      context.commit('removeRoles')
    }
  },
  // 通过getter 进行数据获取
  getters: {
    getToken(state) {
      if(!state.token){
        let token = localStorage.getItem('resToken')
        if(token){
          state.token = token
        }
      }
      return state.token
    },
    getAccount(state) {
      if(!state.account){
        let account = localStorage.getItem('resAccount')
        if(account){
          state.account = account
        }
      }
      return state.account
    },
    getRoles(state) {
      if(!state.roles || state.roles.length  === 0){
        let roles = localStorage.getItem('resRoles')
        if(roles && roles.length > 0){
          state.roles = roles
        }
      }
      return state.roles
    }
  }
})

export default store
