import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 创建vuex的store
const store = new Vuex.Store({
  state: {
    token: '',
    roles: []
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
