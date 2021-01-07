import React, { Component } from 'react'
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity, RefreshControl, Modal, ActivityIndicator } from 'react-native'
import {connect} from 'react-redux'
import {APP_URL} from '@env'
import moment from 'moment'

import HeaderComponent from '../components/HeaderComponent'
import profile from '../redux/actions/profile'
import newsAction from '../redux/actions/news'

class MyArticle extends Component {
  state = {
    refreshing: false
  }
  componentDidMount() {
    this.props.myArticle(this.props.auth.token)
    this.props.getNews()
  }
  addNews = () => {
    this.props.navigation.navigate('AddNews')
  }
  editNews = (id) => {
    this.props.navigation.navigate('EditNews', {id})
  }
  onRefresh = () => {
    this.setState({refreshing: true});
    this.props.myArticle(this.props.auth.token)
    this.props.getNews()
    setTimeout(() => {
      this.setState({refreshing: false})
    }, 500);
  };
  render() {
    // console.log(this.props)
    const { myArticle } = this.props.profile
    const today = moment(new Date()).format('DD/MM/YY')
    return (
      <>
        <HeaderComponent />
        <View style={style.parent}>
          <TouchableOpacity style={style.buttonAdd} onPress={this.addNews}>
            <Text style={style.textAdd}>Add new article</Text>
          </TouchableOpacity>
          {this.props.profile.isLoading && (
            <Modal transparent visible>
              <View style={style.modalView}>
                <View style={style.alertBox}>
                  <ActivityIndicator size="large" color="black" />
                  <Text style={style.textAlert}>Loading . . .</Text>
                </View>
              </View>
            </Modal>
          )}
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />
            }>
            {Object.keys(myArticle).length==0 && (
              <Text>You have no article. Start writing!</Text>
            )}
            {Object.keys(myArticle).length>0 && myArticle.map(item=>(
              <View style={style.wrapper} key={item.id.toString().concat(item.title)}>
                <View style={style.card}>
                  <Image style={style.cardImage} source={{uri: `${APP_URL}/${item.image}`}} />
                  <View style={style.rightSide}>
                    <View style={style.upWrap}>
                      {/* <Text style={style.category}>{item.Category.category}</Text> */}
                      <TouchableOpacity style={style.titleWrap} onPress={this.goToDetail}>
                        <Text style={style.titleNews}>{item.title}</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={style.downWrap}>
                      {today===moment(item.createdAt).format('DD/MM/YY') ? (
                        <Text style={style.timeText}> {moment(item.updatedAt).format('HH:mm')}</Text>
                      ):(
                      <Text style={style.timeText}>{moment(item.updatedAt).format('DD/MM/YY')}</Text>
                      )}
                      <TouchableOpacity style={style.editButton} onPress={()=>this.editNews(item.id)}>
                        <Text style={style.editText}>Edit</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            )) } 
          </ScrollView> 
        </View>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  news: state.news,
})

const mapDispatchToProps = {
  myArticle: profile.myArticle,
  getNews: newsAction.getNews,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyArticle);

const style = StyleSheet.create({
  imageWrapper: {
    width: 160,
    height: 18
  },
  logoimage: {
    width: '90%',
    height: '100%'
  },
  parent: {
    padding: '3%',
    flex: 1,
  },
  buttonAdd: {
    width: '100%',
    height: 40,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  },
  textAdd: {
    fontSize: 14,
  },
  card: {
    height: 120,
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#dcdcdc'
  },
  cardImage: {
    width: 100,
    height: '100%',
    backgroundColor: 'grey'
  },
  rightSide: {
    marginLeft: 10,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  category: {
    fontSize: 8,
    color: 'grey'
  },
  titleWrap: {
    width: 220
  },
  titleNews: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  downWrap: {
    width: 220,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  timeText: {
    fontSize: 8,
    color: 'grey'
  },
  editButton: {
    width: '25%',
    height: 20,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginRight: 10
  },
  editText: {
    fontSize: 10
  },
  modalView: {
    backgroundColor: 'grey',
    opacity: 0.8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBox: {
    width: 200,
    height: 150,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textAlert: {
    color: 'black',
    marginTop: 20,
    textAlign: 'center',
  },
})