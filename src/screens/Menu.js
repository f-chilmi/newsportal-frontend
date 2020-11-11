import React, { Component } from 'react'
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Header, ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import HeaderComponent from '../components/HeaderComponent'

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

import logo from '../assets/logokompas.png'

export default class Menu extends Component {
  goToTrending = () => {
    this.props.navigation.navigate('Trending');
  }
  render() {
    return (
      <ScrollView>
        <HeaderComponent/>
        {
          list.map((item, i) => (
            <ListItem key={i} bottomDivider onPress={this.goToTrending}>
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
