import http from '../../helpers/http'
import qs from 'querystring'

export default {
  getNews: (search='') => ({
    type: 'GET_NEWS',
    payload: http().get(`/public?search=${search}`),
  }),
  detail: (id) => ({
    type: 'DETAIL',
    payload: http().get(`/public/${id}`)
  }),
  newsByCategory: (id) => ({
    type: 'NEWS_CATEGORY',
    payload: http().get(`/public/category/${id}`)
  }),
  editNews: (token, id, data) => ({
    type: 'EDIT_NEWS',
    payload: http(token).patch(`/news/${id}`, qs.stringify(data))
  }),
  addNews: (token, data) => ({
    type: 'ADD_NEWS',
    payload: http(token).post('/news', qs.stringify(data))
  }),
};