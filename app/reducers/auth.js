/**
 * Created by looper on 2017/8/28.
 */
import * as ActionTypes from '../actions/ActionTypes'

const initialAuthState = { isLoggedIn: false };

export function auth(state = initialAuthState, action) {
  switch (action.type) {
    case ActionTypes.SAVE_TOKEN:
      return { ...state, isLoggedIn: true, token: action.token };
    case ActionTypes.CLEAR_TOKEN:
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}