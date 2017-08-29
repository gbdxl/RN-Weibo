/**
 * Created by looper on 2017/8/29.
 */
const HOME_DATA = '@RandomData';

import { AsyncStorage } from 'react-native';

export default class RandomDao {

  save(data) {
    try {
      AsyncStorage.setItem(HOME_DATA, JSON.stringify(data));
    } catch (error) {

    }
  }

  get() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(HOME_DATA, (error, result) => {
        if (!error) {
          const json = JSON.parse(result);
          if (json) {
            resolve(json);
          } else {
            reject(null);
          }
        } else reject(null);
      });
    });
  }

}