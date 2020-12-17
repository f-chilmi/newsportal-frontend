import React, { Component } from 'react'
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import logo from '../assets/logokompas.jpg'
import SplashScreen from 'react-native-splash-screen'

export default class Splash extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  goToLogin = () => {
    this.props.navigation.navigate('Login')
  }
  goToRegister = () => {
    this.props.navigation.navigate('Register')
  }
  render() {
    return (
      <View style={style.parent}>
        <View style={style.contentWrapper}>
          <View style={style.imageWrapper}>
            <Image style={style.logoimage} source={logo} />
          </View>
          <View style={style.buttonWrapper}>
            <TouchableOpacity style={style.buttonLogin} onPress={this.goToLogin}>
              <Text style={style.textButtonLogin}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.buttonLogin} onPress={this.goToRegister}>
              <Text style={style.textButtonLogin}>SIGNUP</Text>
            </TouchableOpacity>
          </View>
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
  contentWrapper: {
    height: '50%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
    // backgroundColor: 'white'
  },
  imageWrapper: {
    width: '100%',
    height: 40
  },
  logoimage: {
    width: '100%',
    height: '100%'
  },
  buttonWrapper: {
    width: '87%',
    alignItems: 'center',
    marginTop: 20
  },
  buttonLogin: {
    width: '100%',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'white',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  },
  textButtonLogin: {
    color: 'white',
    fontWeight: 'bold'
  },
})
