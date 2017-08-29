/**
 * Created by looper on 2017/8/28.
 */
import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../AppNavigator';
import * as ActionTypes from '../actions/ActionTypes';

export function nav(state, action) {
  let nextState;
  switch (action.type) {
    case ActionTypes.LOGIN:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.back(),
        state
      );
      break;
    case ActionTypes.LOGE_OUT:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Login' }),
        state
      );
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  return nextState || state;
}