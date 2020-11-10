import http from '../../helpers/http';
// import qs from 'querystring';

export default {
  getNews: () => ({
    type: 'GET_NEWS',
    payload: http().get('/public'),
  }),
};