import React, { Component } from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native';

import {connect} from 'react-redux';

const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();

import HeaderComponent from '../components/HeaderComponent'
import SearchBar from './SearchBar'
import Home from './Home1'
import Detail from './Detail'
import Trending from './Trending'
import Menu from './Menu'
import Profile from './Profile'
import MyArticle from './MyArticle'
import AddNews from './AddNews'
import EditNews from './EditNews'
import Login from './Login'
import Register from './Register'
import Splash from './Splash'
import Landing from './Landing'
import ForgotPw from './ForgotPw'
import ResetPw from './ResetPw'
import Bookmark from './Bookmark'

// const SearchBarStack = () => {
//   return(
//     <Stack.Navigator>
//       <Stack.Screen
//         options={{headerShown: false}}
//         name="SearchBar"
//         component={SearchBar}
//       />
//     </Stack.Navigator>
//   )
// }

const Tabbed = () => {
  return(
    <BottomTabs.Navigator>
      <BottomTabs.Screen
        options={{
          tabBarIcon: ({size, color, focused}) => (
            <Icon name="home" size={20} color={color} />
          ),
        }}
        name="Home"
        component={Home}
      />
      <BottomTabs.Screen
        options={{
          tabBarIcon: ({size, color, focused}) => (
            <Icon name="edit" size={20} color={color} />
          ),
        }}
        name="Write"
        component={MyArticle}
      />
      <BottomTabs.Screen
        options={{
          tabBarIcon: ({size, color, focused}) => (
            <Icon name="folder" size={25} color="black" />
          ),
        }}
        name="Menu"
        component={Menu}
      />
      <BottomTabs.Screen
        options={{
          tabBarIcon: ({size, color, focused}) => (
            <Icon name="bookmark" size={20} color={color} />
          ),
        }}
        name="Bookmark"
        component={Bookmark}
      />
      <BottomTabs.Screen
        options={{
          tabBarIcon: ({size, color, focused}) => (
            <Icon name="user" size={20} color={color} />
          ),
        }}
        name="Profile"
        component={Profile}
      />
    </BottomTabs.Navigator>
  )
}

const HomeStack = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="SearchBar"
        component={SearchBar}
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
      <Stack.Screen 
        options={{headerShown: false}}
        name="EditNews"
        component={EditNews} />
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
        name="Bookmark"
        component={Bookmark}
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

class Main extends Component {
  render() {
    // console.log(this.props)
    return (
      <NavigationContainer>
        {this.props.auth.isLogin ? (
          <Stack.Navigator>
            <Stack.Screen
              options={{headerShown: false}}
              name="Tabbed"
              component={Tabbed}
            />
            <Stack.Screen
              name="Detail"
              component={Detail}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="SearchBar"
              component={SearchBar}
            />
            <Stack.Screen 
              options={{headerShown: false}}
              name="AddNews"
              component={AddNews} 
            />
              <Stack.Screen 
              options={{headerShown: false}}
              name="EditNews"
              component={EditNews} 
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="Trending"
              component={Trending}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            {/* <Stack.Screen
              options={{headerShown: false}}
              name="Splash"
              component={Splash}
            /> */}
            <Stack.Screen
              options={{headerShown: false}}
              name="Landing"
              component={Landing}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="Register"
              component={Register}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="Login"
              component={Login}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="ForgotPw"
              component={ForgotPw}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="ResetPw"
              component={ResetPw}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="HeaderComponent"
              component={HeaderComponent}
            />
            <Stack.Screen
              // options=
              name="SearchBar"
              component={SearchBar}
            />
          </Stack.Navigator>
        )}
        
      </NavigationContainer>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Main);