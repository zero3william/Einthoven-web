import {
  locales
} from '../locales/lang';

// store/index.js
export const state = () => {
  return ({
    userinfo: window.sessionStorage["session"] ? JSON.parse(window.sessionStorage["session"]) : null,
    locales: locales,
    locale: window.localStorage["lang"] || locales[0]
  })
}

export const mutations = {
  LOGIN(state, payload) {
    state.userinfo = {
      ...state.userinfo,
      ...payload
    };
    window.sessionStorage["session"] = JSON.stringify(state.userinfo);
  },
  LOGOUT(state) {
    state.userinfo = null;
    window.sessionStorage.removeItem("session");
  },
  SET_LANG(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale;
      window.localStorage["lang"] = locale;
    }
  }
}
