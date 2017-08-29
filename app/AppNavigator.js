/**
 * Created by looper on 2017/8/28.
 */
import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator, NavigationActions } from 'react-navigation';

import Login from './containers/Login';
import AppDrawer  from './AppDrawer';
import TokenDao from './dao/TokenDao';
import * as ActionTypes from './actions/ActionTypes'

export const AppNavigator = StackNavigator({
  AppDrawer: { screen: AppDrawer },
  Login: { screen: Login },
});

class AppWithNavigationState extends React.Component {

  componentWillMount() {
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