import { login, logout } from '@/api/user'
import { getToken, setToken, getUserInfo, setUserInfo, removeAllAuthInfo } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    userInfo: getUserInfo() || null,
    permissionsRoutes: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USER_INFO: (state, info) => {
    state.userInfo = info
  },
  SET_PERMISSIONS_ROUTES: (state, routes) => {
    state.permissionsRoutes = routes
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { name, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ name: name.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.auth_token)
        setToken(data.auth_token)
        commit('SET_USER_INFO', data)
        setUserInfo(data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(async(res) => {
        if (res.header.code === 0) {
          await dispatch('resetToken')
        } else {
          reject(res)
          return
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  setPermissionsRoutes({ commit }, routes) {
    commit('SET_PERMISSIONS_ROUTES', routes)
  },
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      resetRouter()
      removeAllAuthInfo()
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

