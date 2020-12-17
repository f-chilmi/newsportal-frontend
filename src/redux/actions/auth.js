import http from '../../helpers/http';
import qs from 'querystring';

export default {
  login: (data) => ({
    type: 'AUTH_USER',
    payload: http().post('/auth/login', qs.stringify(data)),
  }),
  signup: (data) => ({
    type: 'SIGNUP',
    payload: http().post('/auth/register', qs.stringify(data)),
  }),
  logout: () => ({
    type: 'LOGOUT',
  }),
  saveEmail: (email) => ({
    type: 'SAVE_EMAIL',
    payload: email
  }),
  forgotPassword: (data) => ({
    type: 'FORGOT_PASSWORD',
    payload: http().patch('/auth/forgotpassword', qs.stringify(data))
  })
};