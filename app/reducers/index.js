/**
 * Created by looper on 2017/8/28.
 */

import { combineReducers } from 'redux';
import { auth } from './auth'
import { nav } from './nav'
import { homeDataState } from './home'
import { commentState } from './comment'
export default combineReducers({
  auth, nav, homeDataState, commentState,
});