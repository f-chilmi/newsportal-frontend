import React, { Component } from 'react'
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import {Spinner} from 'native-base'
import {connect} from 'react-redux'
import {APP_URL} from '@env'
import moment from 'moment'
import newsAction from '../redux/actions/news'

class Detail extends Component {
  componentDidMount() {
    const {id} = this.props.route.params;
    this.props.detail(id)
  }
  render() {
    // console.log(this.props)
    const { detail } = this.props.news
    return (
      <View>
        <ScrollView>
          {Object.keys(detail).length==0 && <Spinner />}
          {Object.keys(detail).length>0 && (
            <View>
              <Image style={style.image} source={{uri: `${APP_URL}/${detail.image}`}} />
              {console.log(`${APP_URL}/${detail.image}`)}
              <View style={style.contentWrapper}>
                <Text style={style.title}>{detail.title}</Text>
                <Text style={style.author}>{detail.User === null ? 'New user' : detail.User.name}</Text>
                <Text style={style.writtenDate}>{moment(detail.updatedAt).format('DD/MM/YY hh:mm')}</Text>
                <Text style={style.content}>{detail.description}</Text>
              </View>
            </View>
          )}  
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  news: state.news,
});

const mapDispatchToProps = {
  getNews: newsAction.getNews,
  detail: newsAction.detail,
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);

const style = StyleSheet.create({
  image: {
    height: 240,
    width: '100%'
  },
  contentWrapper: {
    padding: '3%'
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold'
  },
  author: {
    fontSize: 10  
  },
  writtenDate: {
    fontSize: 9,
    borderBottomWidth: 3,
    borderColor: '#dcdcdc'
  },
  content: {
    fontSize: 13,
    marginTop: 15
  },
  subcategoryWrapper: {
    marginTop: 10
  },
  subcategory: {
    fontSize: 13
  },
  titleSub: {
    fontSize: 13,
    color: '#2f4f4f',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#a9a9a9'
  },
})