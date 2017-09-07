/**
 * Created by looper on 2017/8/30.
 */
import React, { PureComponent } from 'react'
import { StyleSheet, View, Image } from 'react-native'

export default class Avatar extends PureComponent {
  render() {
    const { url, type } = this.props
    return (
      <View>
        <Image style={styles.avatar} source={{ uri: url }} resizeMode='cover'/>
        <Image style={styles.icon} source={require('../../assets/images/ic_user_verified_celebrity.png')}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  icon: {
    position: 'absolute',
    width: 10,
    height: 10,
    right: 0,
    bottom: 0,
  }
});