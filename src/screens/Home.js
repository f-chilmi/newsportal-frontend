import React, { Component } from 'react'
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import {Spinner} from 'native-base'
import {Header} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import {connect} from 'react-redux'
import logo from '../assets/logokompas.png'
import {APP_URL} from '@env'

import HeaderComponent from '../components/HeaderComponent'

import store from '../redux/store';
import newsAction from '../redux/actions/news';

class Home extends Component {
  componentDidMount() {
    if(!(this.props.news.configHome=='/public?search=')){
      store.dispatch(newsAction.getNews())
    }
  }
  // componentDidUpdate() {
  //   if(!(this.props.news.configHome=='/public?search=')){
  //     store.dispatch(newsAction.getNews())
  //   }
  // }
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
  render() {
    const {data} = this.props.news
    console.log(this.props)
    console.log(!(this.props.news.configHome=='/public?search='))
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
          <ScrollView style={style.parent}>
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
                      <Text style={style.timeText}>{item.updatedAt}</Text>
                      <TouchableOpacity><Icon name="bookmark" size={22} /></TouchableOpacity>
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
  news: state.news,
})

export default connect(mapStateToProps)(Home);

const style = StyleSheet.create({
  parent: {
    padding: '2%'
  },
  wrapper: {
    marginBottom: 10
  },
  imageWrapper: {
    width: 160,
    height: 18
  },
  logoimage: {
    width: '90%',
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