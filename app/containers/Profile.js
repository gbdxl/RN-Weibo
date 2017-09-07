/**
 * Created by looper on 2017/8/28.
 */
import React from 'react'
import { View, Text } from 'react-native'
export default class Profile extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return ({
      title: '个人主页'
    })
  }

  render() {
    return (
      <Text>Profile</Text>
    )
  }
}