import Axios from 'axios';
import Qs from 'qs';
import {
  Message
} from 'element-ui'

export default function (ctx, inject) {
  const axios = Axios.create({
    baseURL: 'http://10.11.101.99:9978/'
  });

  axios.interceptors.request.use(function (config) {
    config.data = Qs.stringify(config.data);
    let session = JSON.parse(window.sessionStorage.getItem("session"));
    if (session) {
      config.headers['Authorization'] = session.token;
    }
    return config;
  }, function (error) {
    Message.error({
      message: error
    });
  });

  axios.interceptors.response.use(data => {
    if (data.status && data.status == 200 && data.data.error_code !== 0) {
      Message.error({
        message: data.data.error_msg
      });
      return Promise.reject(data.data.error_code);
    }
    return data.data.data;
  }, err => {
    if (err.response.status == 504 || err.response.status == 404) {
      Message.error({
        message: '服務器異常'
      });
    } else if (err.response.status == 403) {
      Message.error({
        message: '權限不足!'
      });
    } else {
      Message.error({
        message: '未知錯誤!'
      });
    }
    return Promise.reject(err.response.status);
  })

  const api = {
    login: payload => axios.post('/auth/login', payload).then(),
    logout: () => axios.post('/auth/logout'),
    register: payload => axios.post('/user', payload),
    activate: payload => axios.post('/user/activate', payload),
    getUser: userId => axios.get(`/user/${userId}`),

    modifyPassword: (userId, payload) => axios.patch(`/user/${userId}/modify-password`, payload),
    modifyInfo: (userId, payload) => axios.patch(`/user/${userId}`, payload),

    requestResetPassword: (payload) => axios.post('/user/forget-password', payload),
    setNewPassword: payload => axios.post('/user/set-new-password', payload),

    getDataList: payload => axios.get('/datas', {
      params: payload
    }),

    ecg: (dataId, payload) => axios.get(`/data/${dataId}/ecg`, {
      params: payload
    }),

    heartrate: (dataId, payload) => axios.get(`/data/${dataId}/heart-rate`, {
      params: payload
    }),

    // --------------------------------------------------------



    getFile: (payload) => axios.get(payload),
    download: (payload) => Axios({
      url: 'https://service.uniiform.com:12345/' + payload.url + '?download=true',
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', payload.title); //or any other extension
      document.body.appendChild(link);
      link.click();
      link.remove();
    })
  }

  inject('api', api);
}
