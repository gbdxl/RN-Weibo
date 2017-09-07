/**
 * Created by looper on 2017/8/30.
 */
import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import connect from 'redux';
import Avatar from './Avatar';
import { formartWeiboTime } from '../util/TimeUtil';
import ParsedText from 'react-native-parsed-text'
import Icon from 'react-native-vector-icons/FontAwesome'

const TYPE_TEXT = 1;
const TYPE_IMAGE = 2;
const TYPE_RETWEETED_TEXT = 3;
const TYPE_RETWEETED_IMAGE = 4;
const { width, height } = Dimensions.get('window');
const MARGIN = 12;
const IMAGE_MARGIN = 5;

const AT_REG = /@[\u4e00-\u9fa5a-zA-Z0-9_-]{2,30}/i;
const TOPIC_REG = /#[^#]+#/i;
const URL_REG = /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/i;

class TextItem extends PureComponent {
  handleUserPress = () => {

  }

  handleTopicPress = () => {

  }

  handleUrlPress = () => {

  }

  render() {
    const { item, text } = this.props;
    return (
      <ParsedText
        style={[styles.textContainer,{ lineHeight: 20}]}
        parse={
          [
            { pattern: AT_REG, style: styles.clickText, onPress: this.handleUserPress },
            { pattern: TOPIC_REG, style: styles.clickText, onPress: this.handleTopicPress },
            { pattern: URL_REG, style: styles.clickText, onPress: this.handleUrlPress },
          ]
        }
      >{text}
      </ParsedText>
    )
  }
}

class ImageItem extends PureComponent {
  render() {
    const { item, urls } = this.props;
    const size = (width - 2 * MARGIN - 2 * IMAGE_MARGIN) / 3;
    const images = urls.map((v, i) => {
      return (
        <TouchableOpacity
          key={i}
          style={i === 1 || i === 7 || i === 4 ? { marginHorizontal: IMAGE_MARGIN } : {}}
          onPress={() => {}}
        >
          <Image
            style={{ width: size, height: size, marginTop: IMAGE_MARGIN, resizeMode: 'cover' }}
            source={{ uri: v.thumbnail_pic }}
          />
        </TouchableOpacity>
      )
    })
    return (
      <View style={styles.imageContainer}>
        {images}
      </View>
    )
  }
}


class RetweetedTextItem extends PureComponent {
  render() {
    const { item } = this.props;
    return (
      <View style={styles.retweetedContainer}>
        <TextItem item={item} text={'@' + item.retweeted_status.user.name + ':' + item.retweeted_status.text}/>
        <View style={styles.retweetedCommentBar}>
          <Text style={styles.lightText}>转发 {item.retweeted_status.reposts_count}</Text>
          <Text style={[styles.lightText, { marginLeft: 10 }]}>评论 {item.retweeted_status.comments_count}</Text>
          <Text style={[styles.lightText, { marginLeft: 10 }]}>赞 {item.retweeted_status.attitudes_count}</Text>
        </View>
      </View>
    )
  }
}


class RetweetedImageItem extends PureComponent {
  render() {
    const { item } = this.props;
    return (
      <View style={styles.retweetedContainer}>
        <TextItem item={item} text={'@' + item.retweeted_status.user.name + ':' + item.retweeted_status.text}/>
        <ImageItem item={item} urls={item.retweeted_status.pic_urls}/>
      </View>
    )
  }
}

export default class WeiboItem extends PureComponent {

  renderContent = () => {
    const { item } = this.props;
    if (item.retweeted_status) {
      if (item.retweeted_status.pic_urls.length > 0) {
        return <RetweetedImageItem item={item}/>
      } else {
        return <RetweetedTextItem item={item}/>
      }
    } else {
      if (item.pic_urls) {
        return <ImageItem item={item} urls={item.pic_urls}/>
      }
    }
  }

  render() {
    const { item } = this.props;
    const source = item.source.replace(/.*>(.*)<.*/g, '$1')
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Avatar url={item.user.profile_image_url}/>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{item.user.name}</Text>
            <Text style={[styles.lightText, { marginTop: 3 }]}>
              <Text>{formartWeiboTime(item.created_at)}
              </Text>
              {source && <Text> 来自 {source}</Text>}
            </Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <TextItem item={item} text={item.text}/>
          {this.renderContent()}
          {
            !item.retweeted_status && <View style={{ height: 0.5, marginHorizontal: 20, backgroundColor: '#e5e5e5' } }/>
          }
        </View>
        <View style={styles.bottomBar}>
          <View style={styles.functionsItem}>
            <Icon name='thumbs-up' size={15} color='#888888'/>
            <Text style={[styles.lightText, { marginLeft: 5, fontSize: 13 }]}>{item.attitudes_count}</Text>
          </View>
          <View style={styles.functionsItem}>
            <Icon name='retweet' size={15} color='#888888'/>
            <Text style={[styles.lightText, { marginLeft: 5, fontSize: 13 }]}>{item.reposts_count}</Text>
          </View>
          <View style={styles.functionsItem}>
            <Icon name='comments' size={15} color='#888888'/>
            <Text style={[styles.lightText, { marginLeft: 5, fontSize: 13 }]}>{item.comments_count}</Text>
          </View>
          <View style={styles.functionsItem}>
            <Icon name='share-alt' size={15} color='#888888'/>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  topContainer: {
    flexDirection: 'row',
    marginHorizontal: MARGIN,
    marginTop: MARGIN,
  },
  nameContainer: {
    justifyContent: 'space-around',
    marginLeft: MARGIN,
  },
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
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: MARGIN,
    marginBottom: MARGIN,
  },
  textContainer: {
    flex: 1,
    margin: MARGIN,
    fontSize: 15,
  },
  retweetedContainer: {
    backgroundColor: '#f5f5f5',
  },
  clickText: {
    color: '#5777b5',
  },
  retweetedCommentBar: {
    flexDirection: 'row',
    marginHorizontal: MARGIN,
    marginBottom: MARGIN,
  },
  bottomBar: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  functionsItem: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});