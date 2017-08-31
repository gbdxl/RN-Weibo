/**
 * Created by looper on 2017/8/28.
 */
import {
  Platform,
  StatusBar
} from 'react-native'
// import { SET_USER } from '../actions/types'
// import { store } from '../reducers/index'
import Toast from 'react-native-root-toast'

let activityCount = 0

incrementActivityCount = () => {
  if (Platform.OS === 'android')
    return;  // 只在 ios 下生效
  activityCount++;
  StatusBar.setNetworkActivityIndicatorVisible(true);
};

decrementActivityCount = () => {
  if (Platform.OS === 'android')
    return;  // 只在 ios 下生效
  activityCount--;
  if (activityCount === 0) {
    StatusBar.setNetworkActivityIndicatorVisible(false)
  }
}

export class ApplicationError {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }
}

export const fetchApi = (path, params = {}, isPost = false) => {
  const APP_BACKEND = 'https://api.weibo.com'
  const query = Object.keys(params).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])).join('&')
  const url = APP_BACKEND + path + '?' + query
  const fetchOptions = {
    method: isPost ? 'POST' : 'GET',
  }

  incrementActivityCount()
  return fetch(url, fetchOptions)
    .then((response) => {
      const data = response.json()
      if (response.ok) {
        decrementActivityCount()
        return Promise.resolve(data)
      }
      switch (response.status) {
        case 400:
          return data.then((error) => {
            throw new ApplicationError(error.code, error.message)
          })
        case 401:
        // store.dispatch({ type: SET_USER, user: null })
        // throw new ApplicationError(response.status, '')
        case 403:
          throw new ApplicationError(response.status, '')
        default:
          throw new ApplicationError(response.status, response.text)
      }
    }).catch((e) => {
      e.url = url
      console.log(e)
      decrementActivityCount()
      if (e instanceof ApplicationError) {
        return Promise.reject(e)
      } else {
        Toast.show('网络不佳，请稍后尝试')
        return Promise.reject(new ApplicationError(-1, e.message))
      }
    })
}

export const getAccessToken = (params) => {
  return fetchApi('/oauth2/access_token', params, true);
}

export const getTimeLine = (params) => {
  return fetchApi('/2/statuses/home_timeline.json',params)
}