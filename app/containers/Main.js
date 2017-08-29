/**
 * Created by looper on 2017/8/28.
 */
import React from 'react'
import { View, Text } from 'react-native'
export default class Main extends React.Component {

  static navigationOptions = (navigation) => {
    return ({
      title: '我的首页',
    })
  }

  render() {
    return (
      <Text>Main</Text>
    )
  }
}