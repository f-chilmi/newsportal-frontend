import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView, TextInput, Modal, ActivityIndicator } from 'react-native'
import { Header, Button } from 'react-native-elements'
import { Form, Spinner, Label } from 'native-base'
import {connect} from 'react-redux'
import ImagePicker from 'react-native-image-picker'
import {APP_URL} from '@env'

import auth from '../redux/actions/auth'
import bookmark from '../redux/actions/bookmark'
import profile from '../redux/actions/profile'

class Profile extends Component {
  state = {
    modalProfile: false,
    modalPassword: false,
    modalImage: false,
    name: '',
    email: '',
    birth: '',
    picture: '',
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  }
  componentDidMount() {
    this.props.getProfile(this.props.auth.token)
  }
  componentDidUpdate() {
    if(this.props.profile.data !== undefined && Object.keys(this.props.profile.data).length>0){
      const { data } = this.props.profile
      if(this.state.name==''){
        this.setState({
          name: data.name,
          email: data.email,
          birth: data.birth
        })
      }
    }
  }
  getData = () => {
    this.props.getProfile(this.props.auth.token)
  }
  changeImage = () => {
    this.setState({modalImage: true})
  }
  changeImageOnly = () => {
    const options = {};
    ImagePicker.showImagePicker(options, (response) => {
      if (response.uri) {
        this.setState({picture: response})
      }
    })
  }
  openChangePassword = () => {
    this.setState({modalPassword: true})
  }
  changePassword = () => {
    this.setState({modalPassword: false})
    const data = {
      oldPassword: this.state.oldPassword,
      newPassword: this.state.newPassword,
      confirmNewPassword: this.state.confirmNewPassword,
    }
    this.props.changePassword(this.props.auth.token, data)
  }
  saveChangePersonalInfo = () => {
    this.setState({
      modalProfile: false,
      modalImage: false
    })
    const form = new FormData()
    form.append('picture', {
      uri: String('file://'.concat(this.state.picture.path)),
      type: this.state.picture.type,
      name: this.state.picture.fileName,
    })
    form.append('name', this.state.name)
    form.append('email', this.state.email)
    form.append('birth', this.state.birth)
    this.props.changeProfile1(this.props.auth.token, form)
  }
  edit = () => {
    const data = {
      name: this.state.name,
      email: this.state.email,
      birth: this.state.birth
    }
    this.props.changeProfile(this.props.auth.token, data)
    this.setState({modalProfile: false})
    this.getData()
  }
  logout = () => {
    this.props.logoutProfile()
    this.props.logoutBook()
    setTimeout(() => {
      this.props.logout()
    }, 300);
  }
  render() {
    const { name, email, birth } = this.state
    
    return (
      <View >
        <Header
          backgroundColor='black'
          centerComponent={{text:"Settings", style: { color:'#fff' } }}          
        />
        {this.props.profile.isLoading && (
          <Modal transparent visible>
            <View style={style.modalViewLoading}>
              <View style={style.alertBox}>
                <ActivityIndicator size="large" color="black" />
                <Text style={style.textAlert}>Loading . . .</Text>
              </View>
            </View>
          </Modal>
        )}
        {this.state.name == undefined && <Spinner />}
        {this.props.profile.data !== undefined && (
          <View style={style.parent}>
            <TouchableOpacity style={style.avaWrapper} onPress={this.changeImage}>
            {this.state.picture === '' ? (
              (this.props.profile.data.image === '' || this.props.profile.data.image == null ? (
                <Image style={style.ava} source={require('../assets/5fa3e598894a4.jpg')}/>
              ) : (
                <Image style={style.ava} source={{uri: `${APP_URL}/${this.props.profile.data.image}`}}/>
              ))
            ) : (
              <Image style={style.ava} source={this.state.picture}/>
            )}
            </TouchableOpacity>
            <View style={style.setting0}>
              <Text style={style.textSetting}>Personal information</Text>
              <TouchableOpacity onPress={()=>this.setState({modalProfile: true})}>
                <Text style={style.textGrey} >Change</Text>
              </TouchableOpacity>
            </View>
            <View>
              <View style={style.labelWrapper}>
                <Text style={style.label}>Full name</Text>
                <Text style={style.labelName}>{name}</Text>
              </View>
              <View style={style.labelWrapper}>
                <Text style={style.label}>Email</Text>
                <Text style={style.labelName}>{email}</Text>
              </View>
              <View style={style.labelWrapper}>
                <Text style={style.label}>Date of birth</Text>
                <Text style={style.labelName}>{birth}</Text>
              </View>
            </View>
            <TouchableOpacity style={style.setting} onPress={this.openChangePassword}>
              <Text style={style.textSetting} >Setting</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.setting} onPress={this.logout}>
              <Text style={style.textSetting}>Logout</Text>
            </TouchableOpacity>        

            <Modal transparent visible={this.state.modalImage}>
              <View style={style.modalView1}>
                <View style={style.avaWrapper}>
                  {this.state.picture == '' ? (
                    (this.props.profile.data.image == '' || this.props.profile.data.image == null ? (
                      <Image style={style.ava} source={require('../assets/5fa3e598894a4.jpg')}/>
                    ) : (
                      <Image style={style.ava} source={{uri: `${APP_URL}/${this.props.profile.data.image}`}}/>
                    ))
                  ) : (
                    <Image style={style.ava} source={this.state.picture}/>
                  )}
                </View>
                <View style={style.buttonWrapper2}>
                  <TouchableOpacity style={style.choosePhoto} onPress={this.changeImageOnly} >
                    <Text>Choose</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={style.choosePhoto} onPress={()=>this.setState({modalImage: false})}>
                    <Text>Cancel</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={style.choosePhoto1} onPress={(this.saveChangePersonalInfo)} >
                  <Text>Save</Text>
                </TouchableOpacity>
              </View>
            </Modal>

            <Modal transparent visible={this.state.modalProfile}>
              <KeyboardAvoidingView style={style.modalView}>
                <Form style={style.form}>
                  <Label style={style.label}>Full name</Label>
                  <TextInput 
                    style={style.input} 
                    value={name} 
                    onChangeText={(text) => this.setState({name: text})} 
                    placeholder="Input your fullname"
                  />
                  <Label style={style.label}>Email</Label>
                  <TextInput 
                    style={style.input}
                    value={email}
                    onChangeText={(text) => this.setState({email: text})} 
                    placeholder="Input your email"
                  />
                  <Label style={style.label}>Date of birth</Label>
                  <TextInput 
                    style={style.input}
                    value={birth} 
                    onChangeText={(text) => this.setState({birth: text})}
                    placeholder="Date format dd-mm-yyyy"
                  />
                </Form>
                <View style={style.buttonWrapper}>
                  <Button
                    title="Cancel"
                    type="outline"
                    buttonStyle={style.buttonOutline}
                    titleStyle={style.buttonTittle}
                    onPress={()=>this.setState({modalProfile: false})}
                  />
                  <Button
                    title="Save"
                    type="outline"
                    buttonStyle={style.buttonOutline}
                    titleStyle={style.buttonTittle}
                    onPress={this.edit}
                  />
                </View>
              </KeyboardAvoidingView>
            </Modal>

            <Modal transparent visible={this.state.modalPassword}>
              <KeyboardAvoidingView style={style.modalView}>
                <Form style={style.form}>
                  <TextInput 
                    style={style.input} 
                    placeholder="Current password" 
                    secureTextEntry
                    onChangeText={(text) => this.setState({oldPassword: text})}
                  />
                  <TextInput
                    style={style.input}
                    placeholder="New password"
                    secureTextEntry
                    onChangeText={(text) => this.setState({newPassword: text})}
                  />
                  <TextInput
                    style={style.input}
                    placeholder="Confirm new password"
                    secureTextEntry
                    onChangeText={(text) => this.setState({confirmNewPassword: text})}
                  />
                </Form>
                <View style={style.buttonWrapper}>
                  <Button
                    title="Cancel"
                    type="outline"
                    buttonStyle={style.buttonOutline}
                    titleStyle={style.buttonTittle}
                    onPress={()=>this.setState({modalPassword: false})}
                  />
                  <Button
                    title="Save"
                    type="outline"
                    buttonStyle={style.buttonOutline}
                    titleStyle={style.buttonTittle}
                    onPress={this.changePassword}
                  />
                </View>
              </KeyboardAvoidingView>
            </Modal>

          </View>
        )}
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

const mapDispatchToProps = {
  getProfile: profile.getProfile,
  changeProfile: profile.changeProfile,
  changeProfile1: profile.changeProfile1,
  logout: auth.logout,
  logoutBook: bookmark.logout,
  logoutProfile: profile.logout,
  changePassword: profile.changePassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const style = StyleSheet.create({
  avaWrapper: {
    height: 200,
    width: 200,
    alignSelf: 'center'
  },
  parent: {
    paddingTop: '2%'
  },
  ava: {
    height: '100%',
    width: '100%',
    borderRadius: 200
  },
  setting0: {
    flexDirection: 'row',
    height: 30,
    paddingHorizontal: '4%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#dcdcdc',
    marginTop: 15
  },
  labelWrapper: {
    height: 50,
    paddingHorizontal: '4%',
    paddingVertical: 5,
    justifyContent: 'space-between',
    marginVertical: 5
  },
  choosePhoto: {
    borderWidth: 1,
    borderRadius: 25,
    borderColor: 'black',
    width: '45%',
    marginVertical: 10,
    height: 40,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  },
  choosePhoto1: {
    borderWidth: 1,
    borderRadius: 25,
    borderColor: 'black',
    width: '90%',
    marginVertical: 10,
    height: 40,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  },
  label: {
    fontSize: 9,
    color: 'grey'
  },
  labelName: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  setting: {
    height: 30,
    paddingHorizontal: '4%',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#dcdcdc'
  },
  textSetting: {
    fontSize: 12
  },
  textGrey: {
    fontSize: 12,
    color: 'grey'
  },
  modalView: {
    marginTop: 50,
    flex: 1,
    justifyContent: 'center',
    paddingLeft: '3%',
    paddingRight: '3%',
    backgroundColor: '#dcdcdc'
  },
  modalView1: {
    marginTop: 50,
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingLeft: '3%',
    paddingRight: '3%',
    backgroundColor: '#dcdcdc'
  },
  form: {
    marginLeft: 0
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'black',
    fontSize: 12,
    marginBottom: 5
  },
  label: {
    fontSize: 10,
    color: 'grey'
  },
  buttonWrapper: {
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: 10
  },
  buttonWrapper2: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: 10
  },
  buttonOutline: {
    width: 90,
    height: 40,
    borderColor: 'black'
  },
  buttonTittle: {
    fontSize: 14,
    color: 'black'
  },
  modalViewLoading: {
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