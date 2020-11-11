import React, { Component } from 'react'
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import {Spinner} from 'native-base'
import {connect} from 'react-redux'
import {APP_URL} from '@env'

import HeaderComponent from '../components/HeaderComponent'
import profile from '../redux/actions/profile'

class MyArticle extends Component {
  state = {
    
  }
  componentDidMount() {
    this.props.myArticle(this.props.auth.token)
  }
  addNews = () => {
    this.props.navigation.navigate('AddNews')
  }
  editNews = (id) => {
    this.props.navigation.navigate('EditNews', {id})
  }
  render() {
    console.log(this.props)
    const { myArticle } = this.props.profile
    return (
      <View>
        <HeaderComponent />
        <View style={style.parent}>
          <TouchableOpacity style={style.buttonAdd} onPress={this.addNews}>
            <Text style={style.textAdd}>Add new article</Text>
          </TouchableOpacity>
          <ScrollView>
            {Object.keys(myArticle).length==0 && <Spinner />}
            {Object.keys(myArticle).length>0 && myArticle.map(item=>(
              <View style={style.wrapper} key={item.id.toString().concat(item.title)}>
                <View style={style.card}>
                  <Image style={style.cardImage} source={{uri: `${APP_URL}/${item.image}`}} />
                  <View style={style.rightSide}>
                    <View style={style.upWrap}>
                      <Text style={style.category}>{item.Category.category}</Text>
                      <TouchableOpacity style={style.titleWrap} onPress={this.goToDetail}>
                        <Text style={style.titleNews}>{item.title}</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={style.downWrap}>
                      <Text style={style.timeText}>{item.updatedAt}</Text>
                      <TouchableOpacity style={style.editButton} onPress={()=>this.editNews(item.id)}>
                        <Text style={style.editText}>Edit</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            )) } 
          </ScrollView>
          <View style={{height: 90, backgroundColor: 'white'}}></View>  
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
})

const mapDispatchToProps = {
  myArticle: profile.myArticle
};

export default connect(mapStateToProps, mapDispatchToProps)(MyArticle);

const style = StyleSheet.create({
  imageWrapper: {
    width: 160,
    height: 18
  },
  logoimage: {
    width: '90%',
    height: '100%'
  },
  parent: {
    padding: '3%'
  },
  buttonAdd: {
    width: '100%',
    height: 40,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  },
  textAdd: {
    fontSize: 14,
  },
  card: {
    height: 120,
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#dcdcdc'
  },
  cardImage: {
    width: 100,
    height: '100%',
    backgroundColor: 'grey'
  },
  rightSide: {
    marginLeft: 10,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  category: {
    fontSize: 8,
    color: 'grey'
  },
  titleWrap: {
    width: 220
  },
  titleNews: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  downWrap: {
    width: 220,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  timeText: {
    fontSize: 8,
    color: 'grey'
  },
  editButton: {
    width: '25%',
    height: 20,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginRight: 10
  },
  editText: {
    fontSize: 10
  },
})