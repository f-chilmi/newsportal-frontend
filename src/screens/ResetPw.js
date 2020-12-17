import React, { Component } from 'react'
import { View, TextInput, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native'
import {connect} from 'react-redux'

import auth from '../redux/actions/auth';

class ResetPw extends Component {
  state = {
    newPassword: '',
    confirmNewPassword: '',
  }
  changePassword = () => {
    const data = { email: this.props.auth.email, ...this.state}
    console.log(data)
    this.props.forgotPassword(data)
  }
  componentDidUpdate() {
    if(this.props.auth.result !== undefined) {
      Alert.alert(this.props.auth.alertMsg)
    }
  }
  render() {
    return (
      <View style={style.parent}>
        <View style={style.contentWrapper}>
          <Text style={style.title}>Reset password</Text>
          <Text style={style.textnote}>Enter your new password to activate yur account</Text>
          <View style={style.inputWrapper}>
            <Text style={style.labelText}>New password</Text>
            <TextInput
              name="newPassword"
              onChangeText={(text) => this.setState({newPassword: text})}
            />
          </View>
          <View style={style.inputWrapper}>
            <Text style={style.labelText}>Confirm new password</Text>
            <TextInput
              name="confirmNewPassword"
              onChangeText={(text) => this.setState({confirmNewPassword: text})}
            />
          </View>
          <TouchableOpacity style={style.buttonSend} onPress={this.changePassword}>
            <Text style={style.textSend}>RESET PASSWORD</Text>
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
  forgotPassword: auth.forgotPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPw)

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
    marginBottom: '5%',
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