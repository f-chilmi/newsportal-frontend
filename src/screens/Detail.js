import React, { Component } from 'react'
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import {Spinner} from 'native-base'
import {connect} from 'react-redux'
import store from '../redux/store'
import {APP_URL} from '@env'
import newsAction from '../redux/actions/news'

class Detail extends Component {
  componentDidMount() {
    const {id} = this.props.route.params;
    store.dispatch(newsAction.detail(id))
  }
  // componentDidUpdate() {
  //   if(Object.keys(this.props.news.detail).length>0) {
  //     store.dispatch(newsAction.newsByCategory(this.props.news.detail.category_id))
  //   }
  // }
  render() {
    console.log(this.props)
    const { detail } = this.props.news
    return (
      <View>
        <ScrollView>
          {Object.keys(detail).length==0 && <Spinner />}
          {Object.keys(detail).length>0 && (
            <View>
              <Image style={style.image} source={{uri: `${APP_URL}/${detail.image}`}} />
              <View style={style.contentWrapper}>
                <Text style={style.title}>{detail.title}</Text>
                <Text style={style.author}>{detail.User.name}</Text>
                <Text style={style.writtenDate}>{detail.updatedAt}</Text>
                <Text style={style.content}>{detail.description}</Text>

                {/* <View style={style.subcategoryWrapper}>
                  <Text style={style.subcategory}>TERKAIT</Text>
                  <Text style={style.titleSub}>Resiko covid-19 pada pasien stroke, bisa sebabkan pembekuan darah otak </Text>
                  <Text style={style.titleSub}>Resiko covid-19 pada pasien stroke, bisa sebabkan pembekuan darah otak </Text>
                  <Text style={style.titleSub}>Resiko covid-19 pada pasien stroke, bisa sebabkan pembekuan darah otak </Text>
                  <Text style={style.titleSub}>Resiko covid-19 pada pasien stroke, bisa sebabkan pembekuan darah otak </Text>
                  <Text style={style.titleSub}>Resiko covid-19 pada pasien stroke, bisa sebabkan pembekuan darah otak </Text>
                </View> */}

              </View>
            </View>
          )}
          

            
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  news: state.news,
});

export default connect(mapStateToProps)(Detail);

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