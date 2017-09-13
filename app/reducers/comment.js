/**
 * Created by looper on 2017/9/13.
 */
import * as Types from '../actions/ActionTypes'

const initialState = {
  data: [],
  refreshing: false,
  error: false,
  loading: false,
};

export function commentState(state = initialState, action) {
  switch (action.type) {
    case Types.FETCH_COMMENT_DATA_REQUEST:
      return {
        ...state,
        refreshing: true,
        loading: false,
      };
    case Types.FETCH_COMMENT_DATA_SUCCESS:
      return {
        ...state,
        refreshing: false,
        loading: false,
        data: action.data
      };
    case Types.FETCH_COMMENT_DATA_FAILURE:
      return {
        ...state,
        refreshing: false,
        loading: false,
        error: true
      };
    case Types.FETCH_COMMENT_MORE_DATA_REQUEST:
      return {
        ...state,
        refreshing: false,
        loading: true,
      };
    case Types.FETCH_COMMENT_MORE_DATA_SUCCESS:
      action.data.shift();//删除重复元素
      return {
        ...state,
        refreshing: false,
        loading: false,
        data: state.data.concat(action.data)
      };
    case Types.FETCH_COMMENT_MORE_DATA_FAILURE:
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
