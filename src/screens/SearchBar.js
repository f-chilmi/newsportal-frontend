import React, { Component } from 'react'
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity, Modal, ActivityIndicator } from 'react-native'
import { SearchBar as SearchComponent } from 'react-native-elements'
import { Spinner } from 'native-base'
import {APP_URL} from '@env'
import Icon from 'react-native-vector-icons/FontAwesome'

import {connect} from 'react-redux'
import news from '../redux/actions/news'

class SearchBar extends Component {
  state = {
    search: ''
  }
  updateSearch = () => {
    this.props.search(this.state.search)
  }
  goToDetail = (id) => {
    this.props.navigation.navigate('Detail', {id});
  }
  render() {
    console.log(this.state.search)
    const data = this.props.news.search
    return (
      <View style={{flex: 1, paddingTop: 20}}>
        <SearchComponent
          round
          placeholder="Search"
          onChangeText={(text)=>this.setState({search: text})}
          value={this.state.search}
          onSubmitEditing={this.updateSearch}
        />
        {this.props.news.isLoading && (
          <Modal transparent visible>
            <View style={style.modalView}>
              <View style={style.alertBox}>
                <ActivityIndicator size="large" color="black" />
                <Text style={style.textAlert}>Loading . . .</Text>
              </View>
            </View>
          </Modal>
        )}
        {data === 'undefined' && <Spinner />}
        {data !== undefined && (
          <ScrollView style={style.parent}>
            <View style={style.wrapper}>
              <Text style={style.sorotan}>SOROTAN</Text>
              {data.rows.map(item=>(
                <View style={style.card} key={item.id.toString().concat(item.title)}>
                  <Image style={style.cardImage} source={{uri: `${APP_URL}/${item.image}`}} />
                  <View style={style.rightSide}>
                    <View style={style.upWrap}>
                      <Text style={style.category}>{item.Category.category}</Text>
                      <TouchableOpacity style={style.titleWrap} onPress={this.search}>
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

const mapStateToProps = (state) => ({news: state.news});

const mapDispatchToProps = {
  search: news.search,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

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