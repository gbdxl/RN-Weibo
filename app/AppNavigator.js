/**
 * Created by looper on 2017/8/28.
 */
import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator, NavigationActions } from 'react-navigation';

import Login from './containers/Login';
import Comment from './containers/Comment';
import AppDrawer  from './AppDrawer';
import TokenDao from './dao/TokenDao';
import * as ActionTypes from './actions/ActionTypes'
import CodePush from 'react-native-code-push'
import Toast from 'react-native-root-toast'

export const AppNavigator = StackNavigator({
  AppDrawer: { screen: AppDrawer },
  Login: { screen: Login },
  Comment: { screen: Comment },
});

class AppWithNavigationState extends React.Component {

  componentWillMount() {
    CodePush.sync({
      updateDialog: {
        optionalIgnoreButtonLabel: '稍后',
        optionalInstallButtonLabel: '后台更新',
        optionalUpdateMessage: 'Weibo有新版本了，是否更新？',
        title: '更新提示'
      },
      installMode: CodePush.InstallMode.IMMEDIATE
    });
    const dao = new TokenDao();
    dao.get().then(token => {
      if (token) {
        this.props.dispatch({ type: ActionTypes.SAVE_TOKEN, token: token });
      } else {
        this.props.dispatch(NavigationActions.navigate({ routeName: 'Login' }));
        this.props.dispatch({ type: ActionTypes.CLEAR_TOKEN })
      }
    }).catch(error => {
      this.props.dispatch(NavigationActions.navigate({ routeName: 'Login' }));
      this.props.dispatch({ type: ActionTypes.CLEAR_TOKEN })
    })
  }

  render() {
    const { dispatch, nav } = this.props;
    return (
      <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })}/>
    )
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);

