import React, { Component } from 'react'
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity, TextInput, Modal, ActivityIndicator } from 'react-native'
import { Header } from 'react-native-elements'
import { Spinner } from 'native-base'
import ImagePicker from 'react-native-image-picker'
import {connect} from 'react-redux'
import {APP_URL} from '@env'
import qs from 'querystring';

import newsAction from '../redux/actions/news'

class EditNews extends Component {
  state = {
    title: '',
    categoryId: '',
    picture: '',
    description: '',
    id: ''
  }
  componentDidMount() {
    const {id} = this.props.route.params
    this.props.detail(id)
  }
  componentDidUpdate() {
    if(Object.keys(this.props.news.detail).length>0 && this.props.news.detail.id===this.props.route.params.id){
      const { detail } = this.props.news
      if(this.state.id=='' || this.state.id!==this.props.route.params.id){
        this.setState({
          title: detail.title,
          // categoryId: String(detail.Category.id),
          picture: detail.image,
          description: detail.description,
          id: this.props.route.params.id
        })
      }
    }
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
    this.props.editNews1(this.props.auth.token, this.state.id, form)
  }
  edit = () => {
    const data = {
      title: this.state.title,
      categoryId: this.state.categoryId,
      description: this.state.description,
    }
    this.props.editNews1(this.props.auth.token, this.state.id, qs.stringify(data))
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
    // console.log(this.state)
    const { title, categoryId, picture, description, id } = this.state
    return (
      <View >
        <Header
          backgroundColor='black'
          centerComponent={{text:"Edit article", style: { color:'#fff' } }}          
        />
        {id == undefined && <Spinner />}
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
        {this.props.news.alertMsg === 'edit success' ? this.goToMyArticle() : null}
        {id !== undefined && id == this.props.route.params.id && (
          <ScrollView style={style.parent}>
            <View style={style.inputWrapper}>
              <Text style={style.label}>Title</Text>
              <TextInput
                style={style.textInput}
                multiline={true}
                numberOfLines={2}
                onChangeText={(text) => this.setState({title: text})}
                value={title}
              />
            </View>
            <View style={style.inputWrapper}>
              <Text style={style.label}>Category</Text>
              <TextInput
                style={style.textInput}
                onChangeText={(text) => this.setState({categoryId: text})}
                value={categoryId}
              />
            </View>
            <View style={style.inputWrapper}>
              <Text style={style.label}>Picture</Text>
              <View style={{width: '100%', height: 200}}>
                {this.props.news.detail.image !== null && (
                  <Image 
                    source={{uri: `${APP_URL}/${this.props.news.detail.image}`}}
                    style={{width: '100%', height: '100%'}}
                  />
                )}
                {picture !== '' && (
                  <Image source={this.state.image} style={{width: '100%', height: '100%'}}/>
                )}
              </View>
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
                value={description}
              />
            </View>
            <TouchableOpacity 
              style={style.postArticle} 
              onPress={this.state.picture === this.props.news.detail.image 
              ? this.edit 
              : this.post}>
              <Text>Post article</Text>
            </TouchableOpacity>
            <View style={{height: 90, backgroundColor: 'grey'}}></View>  
          </ScrollView>
        )}
        
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  news: state.news
})

const mapDispatchToProps = {
  detail: newsAction.detail,
  editNews: newsAction.editNews,
  editNews1: newsAction.editNews1,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditNews);

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
