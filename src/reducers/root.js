import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import notification from './notification';
import { getEndPoint } from '../config/config';

export default combineReducers({
  auth,
  user,
  notification,
  getEndPoint
})
