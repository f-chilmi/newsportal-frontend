import React, { Component } from 'react'
import { View, Modal, Text, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView, TextInput } from 'react-native'
import { Header, Button } from 'react-native-elements'
import { Form, Spinner, Label } from 'native-base'
import {connect} from 'react-redux'
import ImagePicker from 'react-native-image-picker'
import {APP_URL} from '@env'

import profile from '../redux/actions/profile'

class Profile extends Component {
  state = {
    modalProfile: false,
    modalPassword: false,
    modalImage: false,
    name: '',
    email: '',
    birth: '',
    picture: ''
  }
  componentDidMount() {
    this.props.getProfile(this.props.auth.token)
  }
  componentDidUpdate() {
    if(Object.keys(this.props.profile.data).length>0){
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
  changeImage = () => {
    this.setState({modalImage: true})
  }
  changeImageOnly = () => {
    const options = {};
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log(response)
      if (response.uri) {
        this.setState({picture: response, modalOpen: false});
      }
    })
  }
  // changePersonalInfo = () => {
  //   this.setState({modalProfile: true})
  // }
  changePassword = () => {
    this.setState({modalPassword: true})
  }
  saveChangePersonalInfo = () => {
    this.setState({modalProfile: false})
    const data = {
      name: this.state.name,
      email: this.state.email,
      birth: this.state.birth,
      picture: this.state.picture
    }
    this.props.changeProfile(this.props.auth.token, data)
  }
  render() {
    const { name, email, birth } = this.state
    return (
      <View >
        <Header
          backgroundColor='black'
          centerComponent={{text:"Settings", style: { color:'#fff' } }}          
        />
        {this.state.name == undefined && <Spinner />}
        {this.state.name !== undefined && (
          <View style={style.parent}>
            <TouchableOpacity style={style.avaWrapper} onPress={this.changeImage}>
            {this.state.picture == '' ? (
              (this.props.profile.data.image == '' ? (
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
            <TouchableOpacity style={style.setting}>
              <Text style={style.textSetting} onPress={this.changePassword}>Setting</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.setting}>
              <Text style={style.textSetting}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}

        <Modal transparent visible={this.state.modalImage}>
          <View style={style.modalView1}>
            <View style={style.avaWrapper}>
              {this.state.picture == '' ? (
                (this.props.profile.data.image == '' ? (
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
              <TextInput style={style.input} value={name} onChangeText={(text) => this.setState({name: text})} />
              <Label style={style.label}>Email</Label>
              <TextInput style={style.input} value={email} onChangeText={(text) => this.setState({email: text})} />
              <Label style={style.label}>Date of birth</Label>
              <TextInput style={style.input} value={birth} onChangeText={(text) => this.setState({birth: text})} />
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
                onPress={this.saveChangePersonalInfo}
              />
            </View>
          </KeyboardAvoidingView>
        </Modal>

        <Modal transparent visible={this.state.modalPassword}>
          <KeyboardAvoidingView style={style.modalView}>
            <Form style={style.form}>
              <TextInput style={style.input} placeholder="Current password" secureTextEntry={true} />
              <TextInput style={style.input} placeholder="New password" secureTextEntry={true}/>
              <TextInput style={style.input} placeholder="Confirm new password" secureTextEntry={true} />
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
                onPress={()=>this.setState({modalPassword: false})}
              />
            </View>
          </KeyboardAvoidingView>
        </Modal>

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
})