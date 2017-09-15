/**
 * Created by looper on 2017/8/29.
 */
import * as TYPES from './ActionTypes';
import HomeDao from '../dao/HomeDao';
import TokenDao from '../dao/TokenDao';
import * as API from '../network/api';
import Toast from 'react-native-root-toast';

function fetchSuccess(json) {
  return {
    type: TYPES.FETCH_HOME_DATA_SUCCESS,
    data: json,
  }
}

function fetchFailure() {
  return {
    type: TYPES.FETCH_HOME_DATA_FAILURE
  };
}

function fetchRequest() {
  return {
    type: TYPES.FETCH_HOME_DATA_REQUEST
  };
}

function fetchMoreDataSuccess(json) {
  return {
    type: TYPES.FETCH_HOME_MORE_DATA_SUCCESS,
    data: json
  };
}

function fetchMoreDataRequest() {
  return {
    type: TYPES.FETCH_HOME_MORE_DATA_REQUEST
  };
}

function fetchMoreDataFailure() {
  return {
    type: TYPES.FETCH_HOME_MORE_DATA_FAILURE
  };
}

function fetchUserGroupSuccess(data) {
  return {
    type: TYPES.FETCH_USER_GROUP_SUCCESS,
    data
  }
}

function fetchUserGroupFailure() {
  return {
    type: TYPES.FETCH_USER_GROUP_FAILURE
  }
}

export function getUserGroup() {
  const tokenDao = new TokenDao();
  return (dispatch) => {
    tokenDao.get().then(token => {
      API.getUserGroup({ access_token: token }).then(data => {
        dispatch(fetchUserGroupSuccess(data))
      }).catch(error => {
        dispatch(fetchUserGroupFailure())
      })
    }).catch(error => {
      dispatch(fetchUserGroupFailure())
    })
  }
}

export function getLocalData() {
  return (dispatch) => {
    const homeDao = new HomeDao();
    homeDao.get().then(data => {
      if (data) {
        dispatch(fetchSuccess(data))
      } else {
        dispatch(getData())
      }
    }).catch(error => {
      dispatch(getData())
    })
  }
}

export function getData(max_id = 0) {
  const tokenDao = new TokenDao();
  const homeDao = new HomeDao;
  const loadMore = !!max_id
  return (dispatch) => {
    dispatch(loadMore ? fetchMoreDataRequest() : fetchRequest())
    tokenDao.get().then(token => {
      if (token) {
        API.getTimeLine({ access_token: token, max_id })
          .then(data => {
            if (loadMore) {
              dispatch(fetchMoreDataSuccess(data.statuses))
            } else {
              dispatch(fetchSuccess(data.statuses))
              homeDao.save(data.statuses)
            }
          }).catch(error => {
          if (error.code === 403) {
            Toast.show('接口限制，请稍后再试');
          }
          dispatch(loadMore ? fetchMoreDataFailure() : fetchFailure());
        })
      }
    })
  }
}