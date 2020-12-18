import React, { Component } from 'react'
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Header, ListItem } from 'react-native-elements'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import HeaderComponent from '../components/HeaderComponent'

import newsAction from '../redux/actions/news';

const list = [
  {
    title: 'News',
    icon: 'newspaper-o'
  },
  {
    title: 'Tren',
    icon: 'line-chart'
  },
  {
    title: 'Food',
    icon: 'cutlery'
  },
  {
    title: 'Money',
    icon: 'usd'
  },
  {
    title: 'Bola',
    icon: 'futbol-o'
  },
  {
    title: 'Tekno',
    icon: 'laptop'
  },
  {
    title: 'Sains',
    icon: 'flask'
  },
  {
    title: 'Otomotif',
    icon: 'automobile'
  },
  {
    title: 'Lifestyle',
    icon: 'newspaper-o'
  },
  {
    title: 'Health',
    icon: 'newspaper-o'
  },
  {
    title: 'Properti',
    icon: 'building-o'
  },
  {
    title: 'Hype',
    icon: 'bullhorn'
  },
]

class Menu extends Component {
  goToTrending = (i) => {
    const index = i + 1
    // this.props.newsByCategory(index)
    this.props.navigation.navigate('Home', {index});
  }
  render() {
    return (
      <ScrollView>
        <HeaderComponent/>
        {
          list.map((item, index) => (
            <ListItem key={index} bottomDivider onPress={() => this.goToTrending(index)}>
              <Icon name={item.icon} size={20} />
              <ListItem.Content>
                <ListItem.Subtitle size={15} style={style.title}>{item.title}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          ))
        }
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => ({
  news: state.news,
});

const mapDispatchToProps = {
  getNews: newsAction.getNews,
  newsByCategory: newsAction.newsByCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

const style = StyleSheet.create({
  imageWrapper: {
    width: 160,
    height: 18
  },
  logoimage: {
    width: '90%',
    height: '100%'
  },
  title: {
    fontSize: 15
  },
})
