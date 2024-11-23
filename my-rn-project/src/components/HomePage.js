import React, { Component } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import NewPost from '../screens/NewPost';
import Users from '../screens/Users'
import { auth } from '../firebase/config'
import { Entypo, FontAwesome, FontAwesome6 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount(){
        auth.onAuthStateChanged((user) => { 
            if (!user) {
                this.props.navigation.navigate("Login")
            }
        })
    }

    render(){
<<<<<<< HEAD
      
=======
        return(
            <Tab.Navigator screenOptions={{tabBarShowLabel: false, headerShown: false }}>
                <Tab.Screen 
                    name = "Home"
                    component = {Home}
                    options = { {tabBarIcon: () => <Entypo name="home" size={24} color="black" />} }
                />
                <Tab.Screen 
                    name = "Profile"
                    component = {Profile}
                    options = { {tabBarIcon: () => <FontAwesome name="user" size={24} color="black" />} }
                />
                <Tab.Screen 
                    name = "NewPost"
                    component = {NewPost}
                    options = { {tabBarIcon: () => <FontAwesome6 name="newPost" size={24} color="black" />} }
                />
                <Tab.Screen 
                    name = "Users"
                    component = {Users}
                    options = { {tabBarIcon: () => <FontAwesome name="search" size={24} color="black" />} }
                />
            </Tab.Navigator>
        )
>>>>>>> bbc864738f4f9c2681148e832c4998adbaa97ac9
    }
}