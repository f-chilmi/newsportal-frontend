import React, { Component } from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native';

const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();

import Home from './Home'
import Detail from './Detail'
import Trending from './Trending'
import Menu from './Menu'
import Profile from './Profile'
import MyArticle from './MyArticle'
import AddNews from './AddNews'

const HomeStack = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        // options=
        name="Detail"
        component={Detail}
      />
    </Stack.Navigator>
  )
}

const EditStack = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen 
        options={{headerShown: false}}
        name="MyArticle"
        component={MyArticle} />
      <Stack.Screen 
        options={{headerShown: false}}
        name="AddNews"
        component={AddNews} />
    </Stack.Navigator>
  )
}

const Trendingstack = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Trending"
        component={Trending}
      />
      <Stack.Screen
        // options=
        name="Detail"
        component={Detail}
      />
    </Stack.Navigator>
  )
}

const MenuStack = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Menu"
        component={Menu}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Trending"
        component={Trending}
      />
      <Stack.Screen
        // options=
        name="Detail"
        component={Detail}
      />
    </Stack.Navigator>
  )
}

const BookmarkStack = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Trending"
        component={Trending}
      />
      <Stack.Screen
        // options=
        name="Detail"
        component={Detail}
      />
    </Stack.Navigator>
  )
}

const ProfileStack = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Profile"
        component={Profile}
      />
      <Stack.Screen
        // options=
        name="Detail"
        component={Detail}
      />
    </Stack.Navigator>
  )
}

export default class Main extends Component {
  render() {
    return (
      <NavigationContainer>
        <BottomTabs.Navigator>
          <BottomTabs.Screen
            options={{
              tabBarIcon: ({size, color, focused}) => (
                <Icon name="home" size={20} color={color} />
              ),
            }}
            name="Home"
            component={HomeStack}
          />
          <BottomTabs.Screen
            options={{
              tabBarIcon: ({size, color, focused}) => (
                <Icon name="edit" size={20} color={color} />
              ),
            }}
            name="Write"
            component={EditStack}
          />
          <BottomTabs.Screen
            options={{
              tabBarIcon: ({size, color, focused}) => (
                <Icon name="folder" size={25} color="#900" />
              ),
            }}
            name="Menu"
            component={MenuStack}
          />
          <BottomTabs.Screen
            options={{
              tabBarIcon: ({size, color, focused}) => (
                <Icon name="bookmark" size={20} color={color} />
              ),
            }}
            name="Bookmark"
            component={BookmarkStack}
          />
          <BottomTabs.Screen
            options={{
              tabBarIcon: ({size, color, focused}) => (
                <Icon name="user" size={20} color={color} />
              ),
            }}
            name="Profile"
            component={ProfileStack}
          />
        </BottomTabs.Navigator>
      </NavigationContainer>
    )
  }
}
