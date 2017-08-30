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

const TYPE_TEXT = 1;
const TYPE_IMAGE = 2;
const TYPE_RETWEETED_TEXT = 3;
const TYPE_RETWEETED_IMAGE = 4;
const { width, height } = Dimensions.get('window');
const MARGIN = 12;
const IMAGE_MARGIN = 5;

class TextItem extends PureComponent {
  render() {
    const { item, text } = this.props;
    const reg = /.*@.+\s/g.exec(text);
    return (
      <Text style={{ fontSize: 13 }}>

      </Text>
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
            style={[{ width: size, height: size, marginTop: IMAGE_MARGIN, resizeMode: 'cover' },]}
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
        <Text style={[styles.normalText, { margin: MARGIN }]}>
          <Text style={{ color: '#5777b5' }}>@{item.retweeted_status.user.name}</Text>
          <Text>:{item.retweeted_status.text}</Text>
        </Text>
      </View>
    )
  }
}


class RetweetedImageItem extends PureComponent {
  render() {
    const { item } = this.props;
    return (
      <View style={styles.retweetedContainer}>
        <Text style={[styles.normalText, { margin: MARGIN }]}>
          <Text>@{item.retweeted_status.user.name}:</Text>
          <Text>{item.retweeted_status.text}</Text>
        </Text>
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
    const reg = /@([\u4e00-\u9fa5A-Z0-9a-z(é|ë|ê|è|à|â|ä|á|ù|ü|û|ú|ì|ï|î|í)._-]+)/g.exec(item.text);
    console.log(reg);
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
        <View>
          <Text style={[styles.normalText, { marginHorizontal: MARGIN, marginBottom: MARGIN }]}>{item.text}</Text>
          {this.renderContent()}
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
    padding: MARGIN,
  },
  nameContainer: {
    justifyContent: 'space-between',
    marginLeft: MARGIN,
  },
  name: {
    fontSize: 13,
    color: 'black',
  },
  lightText: {
    fontSize: 11,
    color: '#888888'
  },
  normalText: {
    fontSize: 13,
    color: '#333333'
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: MARGIN,
  },
  retweetedContainer: {
    backgroundColor: '#f5f5f5'
  }
});