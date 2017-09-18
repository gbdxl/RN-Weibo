/**
 *
 * Created by looper on 2017/9/13.
 */
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput
} from 'react-native';
import WeiboItem from '../components/WeiboItem';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions/commentActions'
import Avatar from '../components/Avatar'
import { formartWeiboTime } from '../util/TimeUtil';
import ParsedText from 'react-native-parsed-text';

const AT_REG = /@[\u4e00-\u9fa5a-zA-Z0-9_-]{2,30}/i;
const TOPIC_REG = /#[^#]+#/i;
const URL_REG = /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/i;

class Item extends React.PureComponent {
  render() {
    const { item } = this.props
    return (
      <View style={{ backgroundColor: 'white', padding: 10 }}>
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <Avatar url={item.user.profile_image_url} size={30}/>
          <View style={{ justifyContent: 'space-around', marginLeft: 10 }}>
            <Text style={styles.name}>{item.user.name}</Text>
            <Text style={styles.lightText}>{formartWeiboTime(item.created_at)}</Text>
          </View>
        </View>
        <ParsedText
          style={styles.normalText}
          parse={
            [
              { pattern: AT_REG, style: styles.clickText, onPress: this.handleUserPress },
              { pattern: TOPIC_REG, style: styles.clickText, onPress: this.handleTopicPress },
              { pattern: URL_REG, style: styles.clickText, onPress: this.handleUrlPress },
            ]
          }
        >{item.text}
        </ParsedText>
        <View
          style={{ height: 0.5, backgroundColor: '#e5e5e5', marginHorizontal: 10, marginTop: 5 }}/>
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
    this.state = {
      modalVisible: false
    }
  }

  componentDidMount() {
    this.props.actions.getData(this.props.navigation.state.params.data.id);
  }

  loadMore = () => {
    const { comments, refreshing, loading, error, actions, end } = this.props;
    if (!refreshing && !loading && !end)
      actions.getData(this.props.navigation.state.params.data.id, comments[comments.length - 1].id)
  }

  renderFooter = () => {
    const { loading, error, end } = this.props;
    let content;
    if (loading) {
      content = '加载中...';
    } else if (error) {
      content = '出错了';
    } else if (end) {
      content = '没有更多了';
    }
    return (
      <View style={{ height: 50, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.lightText}>{content}</Text>
      </View>
    )
  }

  render() {
    const { comments, refreshing, loading, error, actions, } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          contentContainerStyle={{ paddingBottom: 50 }}
          keyExtractor={(item, index) => item.id}
          ListHeaderComponent={<WeiboItem item={this.props.navigation.state.params.data}/>}
          ListFooterComponent={this.renderFooter}
          renderItem={({ item }) => <Item item={item}/>}
          data={comments}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.5}
        />
        <TouchableOpacity onPress={() => this.setState({ modalVisible: true })}>
          <View style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 50,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 5,
            backgroundColor: 'white'
          }}>
            <View
              style={{ position: 'absolute', height: 0.5, backgroundColor: '#e5e5e5', bottom: 50, left: 0, right: 0 }}/>
            <Avatar url={this.props.navigation.state.params.data.user.profile_image_url} size={40}/>
            <Text style={[styles.normalText, { marginLeft: 10 }]}>添加评论...</Text>
          </View>
        </TouchableOpacity>
        <Modal
          animationType={'slide'}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setState({ modalVisible: false })}
        >
          <View style={styles.modalStyle}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => this.setState({ modalVisible: false })}
            />
            <View style={{ height: 100, padding: 10, backgroundColor: 'white' }}>
              <TextInput
                style={[styles.normalText, { flex: 1 }]}
                placeholder={'添加评论...'}
                returnKeyType={'send'}
                onSubmitEditing={() => console.log('提交')}
              />
              <View style={{ backgroundColor: 'black', height: 30 }}/>
            </View>
          </View>
        </Modal>
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

const styles = StyleSheet.create({
  name: {
    fontSize: 15,
    color: 'black',
  },
  lightText: {
    fontSize: 11,
    color: '#888888'
  },
  normalText: {
    fontSize: 15,
    color: '#333333'
  },
  clickText: {
    color: '#5777b5',
  },
  modalStyle: {
    flex: 1,
    backgroundColor: '#11111180',
    justifyContent: 'flex-end',
  },
})