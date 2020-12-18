import http from '../../helpers/http';
import qs from 'querystring';

export default {
  getProfile: (token) => ({
    type: 'PROFILE',
    payload: http(token).get('/users'),
  }),
  changeProfile: (token, data) => ({
    type: 'CHANGE_PROFILE',
    payload: http(token).patch('/users', qs.stringify(data))
  }),
  changeProfile1: (token, data) => ({
    type: 'CHANGE_PROFILE',
    payload: http(token).patch('/users', data)
  }),
  myArticle: (token) => ({
    type: 'MY_ARTICLE',
    payload: http(token).get('/users/news')
  }),
  changePassword: (token, data) => ({
    type: 'CHANGE_PASSWORD',
    payload: http(token).patch('/users/changepassword', qs.stringify(data))
  }),
  logout: () => ({
    type: 'LOGOUT',
  }),
};