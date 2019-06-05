import {
  locales
} from '../locales/lang';

// browser detect
var BrowserDetect = {
  init: function () {
    this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
    this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
    this.OS = this.searchString(this.dataOS) || "an unknown OS";
  },
  searchString: function (data) {
    for (var i = 0; i < data.length; i++) {
      var dataString = data[i].string;
      var dataProp = data[i].prop;
      this.versionSearchString = data[i].versionSearch || data[i].identity;
      if (dataString) {
        if (dataString.indexOf(data[i].subString) != -1) return data[i].identity;
      } else if (dataProp) return data[i].identity;
    }
  },
  searchVersion: function (dataString) {
    var index = dataString.indexOf(this.versionSearchString);
    if (index == -1) return;
    return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
  },
  dataBrowser: [{
    string: navigator.userAgent,
    subString: "Chrome",
    identity: "Chrome"
  }, {
    string: navigator.userAgent,
    subString: "OmniWeb",
    versionSearch: "OmniWeb/",
    identity: "OmniWeb"
  }, {
    string: navigator.vendor,
    subString: "Apple",
    identity: "Safari",
    versionSearch: "Version"
  }, {
    prop: window.opera,
    identity: "Opera",
    versionSearch: "Version"
  }, {
    string: navigator.vendor,
    subString: "iCab",
    identity: "iCab"
  }, {
    string: navigator.vendor,
    subString: "KDE",
    identity: "Konqueror"
  }, {
    string: navigator.userAgent,
    subString: "Firefox",
    identity: "Firefox"
  }, {
    string: navigator.vendor,
    subString: "Camino",
    identity: "Camino"
  }, { // for newer Netscapes (6+)
    string: navigator.userAgent,
    subString: "Netscape",
    identity: "Netscape"
  }, {
    string: navigator.userAgent,
    subString: "MSIE",
    identity: "Explorer",
    versionSearch: "MSIE"
  }, {
    string: navigator.userAgent,
    subString: "Gecko",
    identity: "Mozilla",
    versionSearch: "rv"
  }, { // for older Netscapes (4-)
    string: navigator.userAgent,
    subString: "Mozilla",
    identity: "Netscape",
    versionSearch: "Mozilla"
  }],
  dataOS: [{
    string: navigator.platform,
    subString: "Win",
    identity: "Windows"
  }, {
    string: navigator.platform,
    subString: "Mac",
    identity: "Mac"
  }, {
    string: navigator.userAgent,
    subString: "iPhone",
    identity: "iPhone/iPod"
  }, {
    string: navigator.platform,
    subString: "Linux",
    identity: "Linux"
  }]
};
BrowserDetect.init();

// store/index.js
export const state = () => {
  return ({
    baseUrl: 'http://10.11.101.99:9978/',
    userinfo: window.sessionStorage["session"] ? JSON.parse(window.sessionStorage["session"]) : null,
    locales: locales,
    locale: window.localStorage["lang"] || locales[0],
    system: `OS:${BrowserDetect.OS} , Browser:${
      BrowserDetect.browser
    }, version:${BrowserDetect.version}`
  })
}

export const mutations = {
  LOGIN_SUCCESS(state, payload) {
    payload.avatar = payload.avatar ? state.baseUrl + payload.avatar : '/user128x128.png';
    state.userinfo = {
      ...state.userinfo,
      ...payload
    };
    window.sessionStorage["session"] = JSON.stringify(state.userinfo);
  },
  LOGOUT_SUCCESS(state) {
    state.userinfo = null;
    window.sessionStorage.removeItem("session");
  },
  SET_LANG(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale;
      window.localStorage["lang"] = locale;
    }
  },
  MODIFY_SUCCESS(state, payload) {
    state.userinfo = {
      ...state.userinfo,
      ...payload,
      avatar: state.baseUrl + payload.avatar + '?' + Math.random()
    };
    window.sessionStorage["session"] = JSON.stringify(state.userinfo);
  }
}
