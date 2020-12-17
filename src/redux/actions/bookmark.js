import http from '../../helpers/http'
import qs from 'querystring'

export default {
  add: (token, data) => ({
    type: 'ADD_BOOKMARK',
    payload: http(token).post('/bookmarks', qs.stringify(data))
  }),
  get: (token) => ({
    type: 'GET_BOOKMARK',
    payload: http(token).get('/bookmarks')
  }),
  delete: (token, id) => ({
    type: 'DELETE_BOOKMARK',
    payload: http(token).delete(`/bookmarks/${id}`)
  })
};