import React, { Component } from 'react'
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import logo from '../assets/logokompas.jpg'

export default class Splash extends Component {
  render() {
    return (
      <View style={style.parent}>
        <View style={style.imageWrapper}>
          <Image style={style.logoimage} source={logo} />
        </View>
      </View>
    )
  }
}

const style = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageWrapper: {
    width: '100%',
    height: 40
  },
  logoimage: {
    width: '100%',
    height: '100%'
  },
})
