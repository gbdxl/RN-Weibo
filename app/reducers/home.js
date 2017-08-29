/**
 * Created by looper on 2017/8/29.
 */
import * as Types from '../actions/ActionTypes'

const initialState = {
  data: [],
  refreshing: false,
  error: false,
  loading: false
};

export function homeDataState(state = initialState, action) {
  switch (action.type) {
    case Types.FETCH_HOME_DATA_REQUEST:
      return {
        ...state,
        refreshing: true,
        loading: false,
        error: false
      };
    case Types.FETCH_HOME_DATA_SUCCESS:
      return {
        ...state,
        refreshing: false,
        loading: false,
        error: false,
        data: action.data
      };
    case Types.FETCH_HOME_DATA_FAILURE:
      return {
        ...state,
        refreshing: false,
        loading: false,
        error: true
      };
    case Types.FETCH_HOME_MORE_DATA_REQUEST:
      return {
        ...state,
        refreshing: false,
        loading: true,
        error: false
      };
    case Types.FETCH_HOME_MORE_DATA_SUCCESS:
      return {
        ...state,
        refreshing: false,
        loading: false,
        error: false,
        data: state.data.concat(action.data)
      };
    case Types.FETCH_HOME_MORE_DATA_FAILURE:
      return {
        ...state,
        refreshing: false,
        loading: false,
        error: true
      };
    default:
      return state;
  }

}
