/**
 * Created by looper on 2017/8/28.
 */
const initialAuthState = { isLoggedIn: false };
import * as ActionTypes from '../actions/ActionTypes'

export function auth(state = initialAuthState, action) {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return { ...state, isLoggedIn: true };
    case ActionTypes.LOGE_OUT:
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}