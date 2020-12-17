import React, {Component} from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {connect} from 'react-redux';
import {Formik} from 'formik';
import * as yup from 'yup';

import store from '../redux/store';
import auth from '../redux/actions/auth';

const formSchema = yup.object({
  name: yup.string().required('Name required'),
  email: yup
    .string()
    .email('Must be a valid your@mail.com')
    .required('Email required'),
  password: yup.string().min(8, 'Password length min 8').required('Password required'),
});

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
  };

  goToLogin = () => {
    this.props.navigation.navigate('Login');
  };

  signup = () => {
    const {name, email, password} = this.state;
    if (name && email && password) {
      const data = {name, email, password};
      // console.log(data);
      store.dispatch(auth.signup(data));
    } else {
      console.log('all field must be filled');
    }
  };

  render() {
    // console.log(this.state);
    return (
      <View style={style.parent}>
        {this.props.auth.isLoading &&
          this.props.auth.alertMsg === 'signup pending' && (
            <Modal transparent visible>
              <View style={style.modalView}>
                <View style={style.alertBox}>
                  <ActivityIndicator size="large" color="black" />
                  <Text style={style.textAlert}>Loading . . .</Text>
                </View>
              </View>
            </Modal>
          )}
        {this.props.auth.alertMsg === 'User created successfully' ? this.goToLogin() : null}
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
          }}
          validationSchema={formSchema}
          onSubmit={(values) => this.props.signup(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
        <View style={style.signupWrapper}>
          <Text style={style.signupText}>Sign up</Text>
        </View>
        <View style={style.parentContent}>
          <View style={style.inputWrapper}>
            <Text style={style.labelText}>Username</Text>
            <TextInput 
              name="name"
              placeholder="Input your name"
              placeholderTextColor="#858D96"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
          </View>
          <Text style={style.txtError}>
            {touched.name && errors.name}
          </Text>
          <View style={style.inputWrapper}>
            <Text style={style.labelText}>Email</Text>
            <TextInput
              name="email"
              placeholder="Input your email"
              placeholderTextColor="#858D96"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
          </View>
          <Text style={style.txtError}>
            {touched.email && errors.email}
          </Text>
          <View style={style.inputWrapper}>
            <Text style={style.labelText}>Password</Text>
            <TextInput
              name="password"
              placeholder="Input your password"
              placeholderTextColor="#858D96"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
          </View>
          <Text style={style.txtError}>
            {touched.password && errors.password}
          </Text>
        </View>
        <View style={style.textAlready}>
          <Text style={style.textAlready1}>Already have an account? </Text>
          <TouchableOpacity onPress={this.goToLogin}>
            <Text style={style.textLogin}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={style.btnWrapper}>
          <TouchableOpacity style={style.btn} onPress={() => handleSubmit()}>
            <Text style={style.textButton}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
        </>
        )}
        </Formik>
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
  txtError: {
    fontSize: 11,
    color: 'red',
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
  textLogin: {
    fontSize: 12,
    color: 'grey',
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
});

const mapStateToProps = (state) => ({auth: state.auth});

const mapDispatchToProps = {
  signup: auth.signup,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);