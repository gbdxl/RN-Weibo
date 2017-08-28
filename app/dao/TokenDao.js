/**
 * Created by looper on 2017/8/28.
 */
import { AsyncStorage } from 'react-native'
const ACCESS_TOKEN = '@ACCESS_TOKEN'

export default class TokenDao {
  save(token) {
    return new Promise((resolve, reject) => {
      AsyncStorage.setItem(ACCESS_TOKEN, token)
        .then(() => {
          resolve();
        })
        .catch(error => {
          reject(error);
        })
    })
  }

  clear(){
    return new Promise((resolve, reject) => {
      AsyncStorage.removeItem(ACCESS_TOKEN)
        .then(() => {
          resolve();
        })
        .catch(error => {
          reject(error);
        })
    })
  }
}