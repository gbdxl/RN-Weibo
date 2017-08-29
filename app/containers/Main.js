/**
 * Created by looper on 2017/8/28.
 */
import React from 'react'
import { View, Text, TouchableHighlight, FlatList } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions/homeActions';

class WeiboItem extends React.PureComponent{
  render(){
    return(
      <View>

      </View>
    )
  }
}

class Main extends React.Component {

  static navigationOptions = (navigation) => {
    return ({
      title: '我的首页',
    })
  };

  componentDidMount() {
    this.props.actions.getLocalData();
  }

  renderItem = ({ item }) => {
    return (
      <View><Text>哈哈</Text></View>
    )
  }

  renderFooter = (loading) => {
    return (
      loading ?
        <View>
          <Text>正在加载...</Text>
        </View> : null
    )
  }

  render() {
    const { data, refreshing, loading, error, actions } = this.props;
    return (
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={data}
        refreshing={refreshing}
        renderItem={this.renderItem}
        onRefresh={actions.getData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={this.renderFooter(loading)}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    data: state.homeDataState.data,
    refreshing: state.homeDataState.refreshing,
    loading: state.homeDataState.loading,
    error: state.homeDataState.error,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);