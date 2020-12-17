import React, { Component } from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

import logo from '../assets/logokompas.jpg'

export default class HeaderComponent extends Component {
  goToLogin = () => {
    this.props.navigation.navigate('Login');
  };
  search = () => {
    this.props.navigation.navigate('SearchBar')
  }
  render() {
    console.log(this.props)
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
      </View>
    )
  }
}

const style = StyleSheet.create({
  imageWrapper: {
    width: 200,
    height: 18
  },
  logoimage: {
    width: '100%',
    height: '100%'
  },
})