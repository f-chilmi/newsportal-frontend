import React, { Component } from 'react'
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity, TextInput, Modal, ActivityIndicator } from 'react-native'
import { Header } from 'react-native-elements'
import { Spinner } from 'native-base'
import ImagePicker from 'react-native-image-picker'
import {connect} from 'react-redux'
import {APP_URL} from '@env'

import newsAction from '../redux/actions/news'
import profile from '../redux/actions/profile'

class AddNews extends Component {
  state = {
    title: '',
    categoryId: '',
    picture: {},
    image: '',
    description: '',
  }
  post = () => {
    const form = new FormData()
    form.append('picture', {
      uri: String('file://'.concat(this.state.image.path)) ,
      type: this.state.image.type,
      name: this.state.image.fileName,
    })
    form.append('title', this.state.title)
    form.append('category_id', this.state.categoryId)
    form.append('description', this.state.description)
    this.props.addNews(this.props.auth.token, form)
  }
  handleChoosePhoto = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 1000,
      maxHeight: 1000,
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.uri) {
        this.setState({image: response})
      }
    })
  }
  goToMyArticle = () => {
    this.props.navigation.navigate('Tabbed')
  }
  render() {
    return (
      <View >
        <Header
          backgroundColor='black'
          centerComponent={{text:"Add new article", style: { color:'#fff' } }}          
        />
        {this.props.news.isLoading && (
          <Modal transparent visible>
            <View style={style.modalView}>
              <View style={style.alertBox}>
                <ActivityIndicator size="large" color="black" />
                <Text style={style.textAlert}>Loading . . .</Text>
              </View>
            </View>
          </Modal>
        )}
        {this.props.news.alertMsg === 'add news success' ? this.goToMyArticle() : null}
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
              <Image source={this.state.image} style={{width: 100, height: 100}}/>
            )}
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
          <TouchableOpacity style={style.postArticle} onPress={this.post}>
            <Text>Post article</Text>
          </TouchableOpacity>
          <View style={{height: 90, backgroundColor: 'grey'}}></View>  
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  news: state.news,
  profile: state.profile,
})

const mapDispatchToProps = {
  addNews: newsAction.addNews,
  myArticle: profile.myArticle,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNews);

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
})
