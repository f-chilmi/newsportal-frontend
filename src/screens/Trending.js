import React, { Component } from 'react'
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderComponent from '../components/HeaderComponent'

export default class Trending extends Component {
  render() {
    return (
      <View>
        <HeaderComponent/>
        <ScrollView style={style.parent}>
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
                  <TouchableOpacity><Icon name="bookmark" size={22} /></TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={style.card}>
              <Image style={style.cardImage} source={require('../assets/5fa3e598894a4.jpg')} />
              <View style={style.rightSide}>
                <View style={style.upWrap}>
                  <Text style={style.category}>Category</Text>
                  <TouchableOpacity style={style.titleWrap}>
                    <Text style={style.titleNews}>Resiko covid-19 pada pasien stroke, bisa sebabkan pembekuan darah otak</Text>
                  </TouchableOpacity>
                </View>
                <View style={style.downWrap}>
                  <Text style={style.timeText}>1 jam yang lalu</Text>
                  <TouchableOpacity><Icon name="bookmark" size={22} /></TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={style.card}>
              <Image style={style.cardImage} source={require('../assets/5fa3e598894a4.jpg')} />
              <View style={style.rightSide}>
                <View style={style.upWrap}>
                  <Text style={style.category}>Category</Text>
                  <TouchableOpacity style={style.titleWrap}>
                    <Text style={style.titleNews}>Resiko covid-19 pada pasien stroke, bisa sebabkan pembekuan darah otak</Text>
                  </TouchableOpacity>
                </View>
                <View style={style.downWrap}>
                  <Text style={style.timeText}>1 jam yang lalu</Text>
                  <TouchableOpacity><Icon name="bookmark" size={22} /></TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          
          <View style={{height: 90, backgroundColor: 'grey'}}></View>     
        </ScrollView>
      </View>
    )
  }
}

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
