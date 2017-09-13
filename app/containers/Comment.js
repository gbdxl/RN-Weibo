/**
 *
 * Created by looper on 2017/9/13.
 */
import React from 'react';
import {
  View,
  Text,
  SectionList
} from 'react-native';
import WeiboItem from '../components/WeiboItem';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions/commentActions'
import Avatar from '../components/Avatar'

class Item extends React.PureComponent {
  render() {
    const { item } = this.props
    return (
      <View>
        <View style={{ flexDirection: 'row' }}>
          <Avatar url={item.user.profile_image_url}/>
          <Text>{item.user.name}</Text>
        </View>
        <Text>{item.text}</Text>
      </View>
    )
  }
}

class Comment extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return ({
      title: navigation.state.params.data.user.name
    })
  };

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.actions.getData(this.props.navigation.state.params.data.id);
  }

  render() {
    const { comments, refreshing, loading, error } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <SectionList
          keyExtractor={(item, index) => item.id}
          ListHeaderComponent={<WeiboItem item={this.props.navigation.state.params.data} onItemPress={() => {}}/>}
          renderItem={({ item }) => <Item item={item}/>}
          sections={[{ data: comments , title:''}]}
          renderSectionHeader={(section) => {<Text>哈哈哈</Text>}}
          stickySectionHeadersEnabled={true}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    comments: state.commentState.data,
    refreshing: state.commentState.refreshing,
    loading: state.commentState.loading,
    error: state.commentState.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)