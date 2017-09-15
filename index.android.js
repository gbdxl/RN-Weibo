/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {store} from './app/store/index';
import {
  AppRegistry,
} from 'react-native';
import AppWithNavigationState from './app/AppNavigator';
import codePush from 'react-native-code-push';

export default class Weibo extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

Weibo = codePush(Weibo)

AppRegistry.registerComponent('Weibo', () => Weibo);
