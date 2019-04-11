import Axios from 'axios';
import Qs from 'qs';

export default function (ctx, inject) {
  const axios = Axios.create({
    baseURL: 'http://10.11.101.99:9871'
  });

  axios.interceptors.request.use(function (config) {
    if (config.method === "post") {
      config.data = Qs.stringify(config.data);
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

  inject('api', axios);
}
