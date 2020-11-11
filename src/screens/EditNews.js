import React, { Component } from 'react'
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { Header } from 'react-native-elements'
import { Spinner } from 'native-base'
import ImagePicker from 'react-native-image-picker'
import {connect} from 'react-redux'
import {APP_URL} from '@env'

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
          categoryId: String(detail.Category.id),
          picture: detail.image,
          description: detail.description,
          id: this.props.route.params.id
        })
      }
    }
  }
  post = () => {
    const { title, categoryId, picture, description, id } = this.state
    const data = { title, categoryId, picture, description }
    this.props.editNews(this.props.auth.token, id, data)
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
    const { title, categoryId, picture, description, id } = this.state
    return (
      <View >
        <Header
          backgroundColor='black'
          centerComponent={{text:"Edit article", style: { color:'#fff' } }}          
        />
        {id == undefined && <Spinner />}
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
                {picture !== '' && (
                  <Image source={{uri: `${APP_URL}/${picture}`}} style={{width: '100%', height: '100%'}}/>
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
            <TouchableOpacity style={style.postArticle} onPress={this.post}>
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
  editNews: newsAction.editNews
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
})
