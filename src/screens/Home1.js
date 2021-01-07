import React, { useEffect, useState } from 'react'
import { View, FlatList, Text, Image, StyleSheet, TouchableOpacity, RefreshControl, Modal, ActivityIndicator } from 'react-native'
import {Spinner} from 'native-base'
import {Header} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import {connect} from 'react-redux'
import logo from '../assets/logokompas.jpg'
import {APP_URL} from '@env'
import moment from 'moment'
import SplashScreen from 'react-native-splash-screen'
import {useSelector, useDispatch} from 'react-redux';

import newsAction from '../redux/actions/news';
import bookmarkAct from '../redux/actions/bookmark';

const Home1 = ({navigation, route}) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const news = useSelector((state) => state.news);
  const bookmark = useSelector((state) => state.bookmark);
  const [refreshing, setRefresh] = useState(false);

  useEffect(() => {
    SplashScreen.hide();
    dispatch(newsAction.getNews());
    if (route.params !== undefined) {
      console.log('params !== undefined')
      dispatch(newsAction.newsByCategory(route.params.index))
    }
  }, []);

  const goToDetail = (id) => {
    navigation.navigate('Detail', {id});
  }

  const getData = () => {
    dispatch(newsAction.getNews());
  }

  const search = () => {
    navigation.navigate('SearchBar')
  }

  const addBookmark = (id, category) => {
    const data = {
      category_id: category,
      news_id: id,
    }
    dispatch(bookmarkAct.add(auth.token, data));
    setTimeout(() => {
      dispatch(bookmarkAct.get(auth.token));
    }, 500);
  }

  const nextPage = () => {
    if (news.info.nextLink) {
      dispatch(newsAction.getNews(news.info.nextLink));
    }
  };

  const prevPage = () => {
    if (news.info.prevLink) {
      dispatch(newsAction.getNews(news.info.prevLink));
    }
  };

  const { data } = news

  const today = moment(new Date()).format('DD/MM/YY')
  
  const render = ({item}) => (
    <View style={style.card} key={item.id.toString().concat(item.title)}>
      <Image style={style.cardImage} source={{uri: `${APP_URL}/${item.image}`}} />
      <View style={style.rightSide}>
        <View style={style.upWrap}>
          {console.log(item)}
          {/* <Text style={style.category}>{item.Category.category}</Text> */}
          <TouchableOpacity style={style.titleWrap} onPress={()=>goToDetail(item.id)}>
            <Text style={style.titleNews}>{item.title}</Text>
          </TouchableOpacity>
        </View>
        <View style={style.downWrap}>
          {today===moment(item.createdAt).format('DD/MM/YY') ? (
            <Text style={style.timeText}> {moment(item.createdAt).format('HH:mm')}</Text>
          ):(
          <Text style={style.timeText}>{moment(item.createdAt).format('DD/MM/YY')}</Text>
          )}
          <TouchableOpacity onPress={()=>addBookmark(item.id, item.category_id)}>
            <Icon name="bookmark" size={22} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )

  return (
    <View style={style.parent0}>
      <Header
        backgroundColor='black'
        centerComponent={<View style={style.imageWrapper}><Image style={style.logoimage} source={logo} /></View>}
        rightComponent={
          <TouchableOpacity onPress={search}>
            <Icon name="search" color='white' size={20} />
          </TouchableOpacity>
        }
      />
      {bookmark.isLoading && bookmark.alertMsg === 'add loading' && (
        <Modal transparent visible>
          <View style={style.modalViewLoading}>
            <View style={style.alertBox}>
              <ActivityIndicator size="large" color="black" />
              <Text style={style.textAlert}>Loading . . .</Text>
            </View>
          </View>
        </Modal>
      )}
      {news.isLoading && (
        <Modal transparent visible>
          <View style={style.modalViewLoading}>
            <View style={style.alertBox}>
              <ActivityIndicator size="large" color="black" />
              <Text style={style.textAlert}>Loading . . .</Text>
            </View>
          </View>
        </Modal>
      )}   
      {Object.keys(data).length==0 && <Spinner />}
      {Object.keys(data).length>0 && (
        <FlatList
          data={data}
          renderItem={render}
          keyExtractor={(item) => item.id}
          refreshing={refreshing}
          onRefresh={getData}
          // onEndReached={nextPage}
          // onEndReachedThreshold={0.5}
        />
      )}
      <View style={style.nextWrapper}>
        <TouchableOpacity style={style.editButton} onPress={prevPage}>
          <Text style={style.editText}>Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.editButton} onPress={nextPage}>
          <Text style={style.editText}>Next</Text>
        </TouchableOpacity>
      </View>

      </View>
  )
}

export default Home1

const style = StyleSheet.create({
  parent0: {
    flex: 1,
  },
  parent: {
    padding: '2%',
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
  modalViewLoading: {
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
  nextWrapper: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  },
})