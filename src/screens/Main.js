import React, { Component } from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native';

const Stack = createStackNavigator();

import Home from './Home'
import Detail from './Detail'
import Trending from './Trending'
import Menu from './Menu'
import Profile from './Profile'

export default class Main extends Component {
  render() {
    return (
      <NavigationContainer>
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
          <Stack.Screen
            options={{headerShown: false}}
            name="Trending"
            component={Trending}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Menu"
            component={Menu}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Profile"
            component={Profile}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
