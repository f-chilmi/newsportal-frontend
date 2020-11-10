import React, { Component } from 'react'
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { Header } from 'react-native-elements'
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class AddNews extends Component {
  state = {
    title: '',
    categoryId: '',
    picture: '',
    description: '',
  }
  handleChoosePhoto = () => {
    const options = {};
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log(response)
      if (response.uri) {
        this.setState({picture: response.uri, modalOpen: false});
      }
    })
  }
  render() {
    console.log(this.state)
    return (
      <View >
        <Header
          backgroundColor='black'
          centerComponent={{text:"Add new article", style: { color:'#fff' } }}          
        />
        <ScrollView style={style.parent}>
          <View style={style.inputWrapper}>
            <Text style={style.label}>Title</Text>
            <TextInput
              style={style.textInput}
              multiline={true}
              numberOfLines={2}
              onChangeText={(text) => this.setState({title: text})}
              value={this.state.title}
            />
          </View>
          <View style={style.inputWrapper}>
            <Text style={style.label}>Category</Text>
            <TextInput
              style={style.textInput}
              onChangeText={(text) => this.setState({categoryId: text})}
              value={this.state.categoryId}
            />
          </View>
          <View style={style.inputWrapper}>
            <Text style={style.label}>Picture</Text>
            {this.state.picture !== '' && (
              <Image source={{uri: this.state.picture}} style={{width: 100, height: 100}}/>
            )}
            {/* <Image source={{uri: picture.uri}} style={{width: 100, height: 100}}/> */}
            <TouchableOpacity style={style.choosePhoto} onPress={this.handleChoosePhoto}>
              <Text>Choose photo</Text>
            </TouchableOpacity>
          </View>
          <View style={style.inputWrapper}>
            <Text style={style.label}>Content</Text>
            <TextInput
              style={style.textInput}
              multiline={true}
              numberOfLines={8}
              onChangeText={(text) => this.setState({description: text})}
              value={this.state.description}
            />
          </View>
          <TouchableOpacity style={style.postArticle}>
            <Text>Post article</Text>
          </TouchableOpacity>
          <View style={{height: 90, backgroundColor: 'grey'}}></View>  
        </ScrollView>
      </View>
    )
  }
}

const style = StyleSheet.create({
  parent: {
    padding: '3%',
    backgroundColor: '#dcdcdc'
  },
  inputWrapper: {
    marginTop: 5,
    marginBottom: 5
  },
  label: {
    fontSize: 9,
    color: 'grey'
  },
  textInput: {
    fontSize: 12,
    backgroundColor: 'white'
  },
  choosePhoto: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'black',
    paddingLeft: '3%',
    width: '40%',
    marginVertical: 10
  },
  postArticle: {
    borderWidth: 2,
    borderRadius: 20,
    borderColor: 'black',
    paddingLeft: '3%',
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 35
  },
})
