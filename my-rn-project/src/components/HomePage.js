import React, { Component } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import NewPost from '../screens/NewPost';
import Users from '../screens/Users'
import { auth } from '../firebase/config'
import { Entypo, FontAwesome, AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default class HomePage extends Component {

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (!user) {
                this.props.navigation.navigate("Login")
            }
        })
    }

    render() {
        return (
            <Tab.Navigator screenOptions={{ tabBarShowLabel: false, headerShown: false }}>
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{ tabBarIcon: () => <Entypo name="home" size={24} color="black" /> }}
                />
                <Tab.Screen
                    name="Profile"
                    component={Profile}
                    options={{ tabBarIcon: () => <FontAwesome name="user" size={24} color="black" /> }}
                />
                <Tab.Screen
                    name="NewPost"
                    component={NewPost}
                    options={{ tabBarIcon: () => <AntDesign name="plussquare" size={24} color="black" /> }}
                />
                <Tab.Screen
                    name="Users"
                    component={Users}
                    options={{ tabBarIcon: () => <FontAwesome name="search" size={24} color="black" /> }}
                />
            </Tab.Navigator>
        )
    }
}