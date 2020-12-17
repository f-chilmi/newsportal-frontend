import React, { Component } from 'react'
import { View, TextInput, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import {connect} from 'react-redux'

import auth from '../redux/actions/auth'

class ForgotPw extends Component {
  state = {
    email: ''
  }
  resetPw = () => {
    this.props.saveEmail(this.state.email)
    this.props.navigation.navigate('ResetPw')
  }
  render() {
    return (
      <View style={style.parent}>
        <View style={style.contentWrapper}>
          <Text style={style.title}>Forgot password</Text>
          <Text style={style.textnote}>Please enter your address. You will receive a link to create a new password via email.</Text>
          <View style={style.inputWrapper}>
            <Text style={style.labelText}>Email</Text>
            <TextInput
              name="email"
              onChangeText={(text) => this.setState({email: text})}
            />
          </View>
          <TouchableOpacity style={style.buttonSend} onPress={this.resetPw}>
            <Text style={style.textSend}>SEND</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  saveEmail: auth.saveEmail,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPw)

const style = StyleSheet.create({
  parent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingTop: '20%',
    backgroundColor: '#E5E5E5',
  },
  contentWrapper: {
    height: '100%',
    width: '100%'
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: '18%'
  },
  textnote: {
    fontSize: 11,
    marginBottom: '10%'
  },
  labelText: {
    fontSize: 11,
    color: 'grey'
  },
  inputWrapper: {
    backgroundColor: 'white',
    marginBottom: '8%',
    paddingHorizontal: 10,
  },
  buttonSend: {
    width: '100%',
    borderRadius: 40,
    borderWidth: 1.5,
    borderColor: 'black',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  },
  textSend: {
    fontWeight: 'bold',
    // fontSize: 
  },
})