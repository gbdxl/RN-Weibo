/**
 * Created by looper on 2017/8/28.
 */
import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../AppNavigator';
import * as ActionTypes from '../actions/ActionTypes';

const firstAction = AppNavigator.router.getActionForPathAndParams('Main');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const secondAction = AppNavigator.router.getActionForPathAndParams('Login');
const initialNavState = AppNavigator.router.getStateForAction(
  secondAction,
  tempNavState
);

export function nav(state = initialNavState, action) {
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

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}