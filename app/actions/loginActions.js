/**
 * Created by looper on 2017/8/28.
 */
import * as API from '../network/api'
import * as Types from './ActionTypes'
import {getData} from './homeActions'

import TokenDao from '../dao/TokenDao'
const client_id = 2477464456;
const client_secret = '9c009c7632c50138afc285e09a33cdf5';
const redirect_uri = 'http://www.sina.com';

export function login(code) {
  return (dispatch) => API.getAccessToken({
    grant_type: 'authorization_code',
    code,
    client_id,
    client_secret,
    redirect_uri,
  }).then(data => {
    const dao = new TokenDao();
    dao.save(data.access_token).then(
      () => {
        dispatch({ type: Types.LOGIN });
        dispatch({ type: Types.SAVE_TOKEN, token: data.access_token });
        getData();
      }
    ).catch(error => {
      dispatch({ type: Types.LOGE_ERROR });
      dispatch({ type: Types.CLEAR_TOKEN });
    });
  }).catch(error => {});
}