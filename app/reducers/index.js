/**
 * Created by looper on 2017/8/28.
 */

import { combineReducers } from 'redux';
import { auth } from './auth'
import { nav } from './nav'
import { homeDataState } from './home'
export default combineReducers({
  auth, nav, homeDataState
});