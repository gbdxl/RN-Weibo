/**
 * Created by looper on 2017/8/28.
 */
import React from 'react';
import { View, Text, WebView } from 'react-native';
import * as API from '../network/api';
const client_id = 2477464456;
const redirect_uri = 'http://www.sina.com';
import { connect } from 'react-redux'
import { login }from '../actions/loginActions'
import { bindActionCreators } from 'redux'

class Login extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: '登录',
      headerLeft: null,
    }
  }

  constructor(props) {
    super(props)
  }

  render() {
    const uri = 'https://open.weibo.cn/oauth2/authorize?client_id=' + client_id + '&redirect_uri=' + redirect_uri + '&display=mobile'
    return (
      <WebView
        source={{ uri: uri, method: 'GET' }}
        style={{ flex: 1 }}
        onNavigationStateChange={(e) => {
          if (e.loading === true && e.url.indexOf('code=') !== -1) {
            const indexStart = e.url.indexOf('code=') + 5
            const code = e.url.substring(indexStart)
            this.props.login(code) // 获取授权
          }
        }}
        startInLoadingState={false}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: false,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: bindActionCreators(login, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)