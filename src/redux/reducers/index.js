import {combineReducers} from 'redux'

import auth from './auth'
import news from './news'
import profile from './profile'
import bookmark from './bookmark'

export default combineReducers({
  auth,
  news,
  profile,
  bookmark,
})