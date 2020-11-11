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
  myArticle: (token) => ({
    type: 'MY_ARTICLE',
    payload: http(token).get('/users/news')
  })
};