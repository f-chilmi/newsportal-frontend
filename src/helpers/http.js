import {default as axios} from 'axios';
import {APP_URL} from '@env';

const http = (token = null) => {
  return axios.create({
    baseURL: APP_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined
    },
  });
};

export default http;