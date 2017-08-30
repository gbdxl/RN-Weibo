/**
 * Created by looper on 2017/8/29.
 */
import * as TYPES from './ActionTypes';
import HomeDao from '../dao/HomeDao'
import TokenDao from '../dao/TokenDao'
import * as API from '../network/api'

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

export function getLocalData() {
  return (dispatch) => {
    const homeDao = new HomeDao();
    homeDao.get().then(data => {
      if (data) {
        console.log(data);
        dispatch(fetchSuccess(data))
      } else {
        dispatch(getData())
      }
    }).catch(error => {
      dispatch(getData())
    })
  }
}

export function getData(since_id) {
  const tokenDao = new TokenDao();
  const homeDao = new HomeDao;
  const loadMore = !!since_id
  return (dispatch) => {
    dispatch(loadMore ? fetchMoreDataRequest() : fetchRequest())
    tokenDao.get().then(token => {
      if (token) {
        API.getTimeLine({ access_token: token })
          .then(data => {
            console.log(data);
            if (loadMore) {
              dispatch(fetchMoreDataSuccess(data.statuses))
            } else {
              dispatch(fetchSuccess(data.statuses))
              homeDao.save(data.statuses)
            }
          }).catch(error => {
          dispatch(loadMore ? fetchMoreDataFailure() : fetchFailure());
        })
      }
    })
  }
}