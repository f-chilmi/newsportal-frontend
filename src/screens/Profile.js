import React, { Component } from 'react'
import { View, Modal, Text, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView, TextInput } from 'react-native'
import { Header, Button } from 'react-native-elements'
import { Form, Item, Label } from 'native-base'

export default class Profile extends Component {
  state = {
    modalProfile: false,
    modalPassword: false,
    modalImage: false
  }
  changeImage = () => {
    this.setState({modalImage: true})
  }
  changePersonalInfo = () => {
    this.setState({modalProfile: true})
  }
  changePassword = () => {
    this.setState({modalPassword: true})
  }
  render() {
    return (
      <View >
        <Header
          backgroundColor='black'
          centerComponent={{text:"Settings", style: { color:'#fff' } }}          
        />
        <View style={style.parent}>
          <TouchableOpacity style={style.avaWrapper} onPress={this.changeImage}>
            <Image style={style.ava} source={require('../assets/5fa3e598894a4.jpg')}/>
          </TouchableOpacity>
          <View style={style.setting0}>
            <Text style={style.textSetting}>Personal information</Text>
            <TouchableOpacity onPress={this.changePersonalInfo}><Text style={style.textGrey} >Change</Text></TouchableOpacity>
          </View>
          <View>
            <View style={style.labelWrapper}>
              <Text style={style.label}>Full name</Text>
              <Text style={style.labelName}>Matilda Brown</Text>
            </View>
            <View style={style.labelWrapper}>
              <Text style={style.label}>Email</Text>
              <Text style={style.labelName}>matilda@mail.com</Text>
            </View>
            <View style={style.labelWrapper}>
              <Text style={style.label}>Date of birth</Text>
              <Text style={style.labelName}>1990-01-01</Text>
            </View>
          </View>
          <TouchableOpacity style={style.setting}>
            <Text style={style.textSetting} onPress={this.changePassword}>Setting</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.setting}>
            <Text style={style.textSetting}>Logout</Text>
          </TouchableOpacity>
        </View>

        <Modal transparent visible={this.state.modalProfile}>
          <KeyboardAvoidingView style={style.modalView}>
            <Form style={style.form}>
              <Label style={style.label}>Full name</Label>
              <TextInput style={style.input} />
              <Label style={style.label}>Email</Label>
              <TextInput style={style.input} />
              <Label style={style.label}>Date of birth</Label>
              <TextInput style={style.input} />
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
                onPress={()=>this.setState({modalProfile: false})}
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