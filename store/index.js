// store/index.js
export const state = () => ({
  userinfo: null
})

export const mutations = {
  login(state, payload) {
    state.userinfo = {
      ...state.userinfo,
      ...payload
    };
    window.sessionStorage["session"] = JSON.stringify(state.userinfo);
  },
  logout(state) {
    state.userinfo = null
  }
}
