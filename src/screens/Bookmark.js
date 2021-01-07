import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, Modal, ActivityIndicator } from 'react-native'
import HeaderComponent from '../components/HeaderComponent'
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment'
import {APP_URL} from '@env'

import bookmarkAct from '../redux/actions/bookmark'

const Bookmark = ({navigation}) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const bookmark = useSelector((state) => state.bookmark);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(bookmarkAct.get(auth.token));
  }, []);

  const getData = () => {
    dispatch(bookmarkAct.get(auth.token));
  }

  const goToDetail = (id) => {
    navigation.navigate('Detail', {id});
  }

  const deleteBookmark = (id) => {
    dispatch(bookmarkAct.delete(auth.token, id))
    getData()
  }

  const renderItem = ({item}) => (
    <View style={style.card}>
      <Image style={style.cardImage} source={{uri: `${APP_URL}/${item.News.image}`}} />
      <View style={style.rightSide}>
        <View style={style.upWrap}>
          {/* <Text style={style.category}>{item.Category.category}</Text> */}
          <TouchableOpacity style={style.titleWrap} onPress={()=>goToDetail(item.News.id)}>
            <Text style={style.titleNews}>{item.News.title}</Text>
          </TouchableOpacity>
        </View>
        <View style={style.downWrap}>
          <Text style={style.timeText}>{moment(item.News.createdAt).format('DD/MM/YY')}</Text>
          <TouchableOpacity style={style.editButton} onPress={() => deleteBookmark(item.id)}>
            <Text style={style.editText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return(
    <View style={style.parent}>
      <HeaderComponent/>
      {bookmark.isLoading && (
        <Modal transparent visible>
          <View style={style.modalViewLoading}>
            <View style={style.alertBox}>
              <ActivityIndicator size="large" color="black" />
              <Text style={style.textAlert}>Loading . . .</Text>
            </View>
          </View>
        </Modal>
      )}  
      {bookmark.data.length > 0 && (
        <FlatList
          data={bookmark.data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          refreshing={loading}
          onRefresh={getData}
        />
      )}
      {bookmark.data.length === 0 && <Text>Bookmark is empty</Text>}
    </View>
  )


}

export default Bookmark

const style = StyleSheet.create({
  parent: {
    flex: 1,
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
})
