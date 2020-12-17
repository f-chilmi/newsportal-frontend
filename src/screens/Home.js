import React, { Component } from 'react'
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native'
import {Spinner} from 'native-base'
import {Header} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import {connect} from 'react-redux'
import logo from '../assets/logokompas.jpg'
import {APP_URL} from '@env'
import moment from 'moment'
import SplashScreen from 'react-native-splash-screen'

import newsAction from '../redux/actions/news';
import bookmark from '../redux/actions/bookmark';

class Home extends Component {
  state = {
    refreshing: false
  }
  componentDidMount() {
    SplashScreen.hide();
    if(!(this.props.news.configHome=='/public?search=')){
      this.props.getNews()
    }
  }
  
  goToDetail = (id) => {
    this.props.navigation.navigate('Detail', {id});
  }
  goToTrending = () => {
    this.props.navigation.navigate('Trending');
  }
  goToMenu = () => {
    this.props.navigation.navigate('Menu');
  }
  goToProfile = () => {
    this.props.navigation.navigate('Profile');
  }
  search = () => {
    this.props.navigation.navigate('SearchBar')
  }
  onRefresh = () => {
    this.setState({refreshing: true});
    this.props.getNews()
    setTimeout(() => {
      this.setState({refreshing: false})
    }, 500);
  };
  addBookmark = (id, category) => {
    const data = {
      category_id: category,
      news_id: id,
    }
    this.props.add(this.props.auth.token, data)
  }
  render() {
    const {data} = this.props.news
    const today = moment(new Date()).format('DD/MM/YY')
    // console.log(this.props)
    return (
      <View>
        <Header
          backgroundColor='black'
          centerComponent={<View style={style.imageWrapper}><Image style={style.logoimage} source={logo} /></View>}
          rightComponent={
            <TouchableOpacity onPress={this.search}>
              <Icon name="search" color='white' size={20} />
            </TouchableOpacity>
          }
        />
        {Object.keys(data).length==0 && <Spinner />}
        {Object.keys(data).length>0 && (
          <ScrollView 
            style={style.parent}
            refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }>
            <View style={style.wrapper}>
              <Text style={style.sorotan}>SOROTAN</Text>
              {data.rows.map(item=>(
                <View style={style.card} key={item.id.toString().concat(item.title)}>
                  <Image style={style.cardImage} source={{uri: `${APP_URL}/${item.image}`}} />
                  <View style={style.rightSide}>
                    <View style={style.upWrap}>
                      <Text style={style.category}>{item.Category.category}</Text>
                      <TouchableOpacity style={style.titleWrap} onPress={()=>this.goToDetail(item.id)}>
                        <Text style={style.titleNews}>{item.title}</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={style.downWrap}>
                      {today===moment(item.createdAt).format('DD/MM/YY') ? (
                        <Text style={style.timeText}> {moment(item.createdAt).format('HH:mm')}</Text>
                      ):(
                      <Text style={style.timeText}>{moment(item.createdAt).format('DD/MM/YY')}</Text>
                      )}
                      <TouchableOpacity onPress={()=>this.addBookmark(item.id, item.category_id)}>
                        <Icon name="bookmark" size={22} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>
              
            <View style={{height: 90, backgroundColor: 'transparent'}}></View>     
          </ScrollView>
        )}
        
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  news: state.news,
  bookmark: state.bookmark,
});

const mapDispatchToProps = {
  getNews: newsAction.getNews,
  add: bookmark.add,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const style = StyleSheet.create({
  parent: {
    padding: '2%'
  },
  wrapper: {
    marginBottom: 10
  },
  imageWrapper: {
    width: 200,
    height: 18
  },
  logoimage: {
    width: '100%',
    height: '100%'
  },
  sorotan: {
    borderBottomWidth: 3,
  },
  subcategory: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  card: {
    height: 120,
    width: '100%',
    // backgroundColor: 'yellow',
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
})