import React, { Component } from 'react'
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import logo from '../assets/logokompas.png'

export default class MyArticle extends Component {
  addNews = () => {
    this.props.navigation.navigate('AddNews')
  }
  render() {
    return (
      <View>
        <Header
          backgroundColor='black'
          centerComponent={<View style={style.imageWrapper}><Image style={style.logoimage} source={logo} /></View>}
          rightComponent={
            <TouchableOpacity>
              <Icon name="search" color='white' size={20} />
            </TouchableOpacity>
          }
        />
        <View style={style.parent}>
          <TouchableOpacity style={style.buttonAdd} onPress={this.addNews}>
            <Text style={style.textAdd}>Add new article</Text>
          </TouchableOpacity>
          <ScrollView>
            <View style={style.wrapper}>
              <View style={style.card}>
                <Image style={style.cardImage} source={require('../assets/5fa3e598894a4.jpg')} />
                <View style={style.rightSide}>
                  <View style={style.upWrap}>
                    <Text style={style.category}>Category</Text>
                    <TouchableOpacity style={style.titleWrap} onPress={this.goToDetail}>
                      <Text style={style.titleNews}>Resiko covid-19 pada pasien stroke, bisa sebabkan pembekuan darah otak</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={style.downWrap}>
                    <Text style={style.timeText}>1 jam yang lalu</Text>
                    <TouchableOpacity style={style.editButton}>
                      <Text style={style.editText}>Edit</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}

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
    padding: '3%'
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
    marginRight: 10
  },
  editText: {
    fontSize: 11
  },
})