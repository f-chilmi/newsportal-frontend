import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';

import store from '../redux/store';
import auth from '../redux/actions/auth';

class Login extends Component {
  state = {
    email: '',
    password: '',
    alertMsg: ''
  };

  doLogin = () => {
    const {email, password} = this.state;
    const data = {email, password};
    store.dispatch(auth.login(data));
  };

  showAlert = () => {
    const {alertMsg} = this.props.auth;
    if (alertMsg !== this.state.alertMsg) {
      this.setState({alertMsg});
      Alert.alert(alertMsg);
    }
  }

  componentDidUpdate() {
    this.showAlert()
  }

  render() {
    // console.log(this.props)
    return (
      <View style={style.parent}>
        <View style={style.signupWrapper}>
          <Text style={style.signupText}>Login</Text>
        </View>
        <View style={style.parentContent}>
          <View style={style.inputWrapper}>
            <Text style={style.labelText}>Email</Text>
            <TextInput
              name="email"
              onChangeText={(text) => this.setState({email: text})}
            />
          </View>
          <View style={style.inputWrapper}>
            <Text style={style.labelText}>Password</Text>
            <TextInput
              name="password"
              onChangeText={(text) => this.setState({password: text})}
              secureTextEntry={true}
            />
          </View>
        </View>
        <TouchableOpacity style={style.textAlready}>
          <Text style={style.textAlready1}>Forgot password? </Text>
        </TouchableOpacity>
        <View style={style.btnWrapper}>
          <TouchableOpacity style={style.btn} onPress={this.doLogin}>
            <Text style={style.textButton}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const style = StyleSheet.create({
  parent: {
    backgroundColor: '#E5E5E5',
    flex: 1,
  },
  signupWrapper: {
    marginLeft: '5%',
    marginVertical: 30,
  },
  parentContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputWrapper: {
    backgroundColor: 'white',
    width: '90%',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  labelText: {
    fontSize: 12,
    color: 'grey',
  },
  signupText: {
    fontWeight: 'bold',
    fontSize: 26,
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  textAlready: {
    marginLeft: '5%',
    width: '90%',
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  textAlready1: {
    fontSize: 12,
  },
  btnWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  btn: {
    width: '90%',
    height: 40,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  },
  textButton: {
    color: 'black',
    fontWeight: 'bold',
  },
});

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  login: auth.login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);