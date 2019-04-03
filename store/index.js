// store/index.js
export const state = () => ({
  userinfo: null
})

export const mutations = {
  login(state, payload) {
    state.userinfo = {
      ...state.userinfo,
      ...payload
    }
  },
  logout(state) {
    state.userinfo = null
  }
}
