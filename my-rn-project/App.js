import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { creeateBottomTabNavigator } from '@react-navigaton/bottom-tabs';
import Login from './src/screens/Login'; //agregar login --> stack navigation dentro de HomeMenu creoooo!!
import Register from './src/screens/Register'; //agregar register --> stack navigation dentro de HomeMenu creoooo!! 
import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import NewPost from './src/screens/NewPost';
import Users from './src/screens/Users';

const Tab = creeateBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={ Home } />
        <Tab.Screen name="Profile" component={ Profile } />
        <Tab.Screen name="NewPost" component={ NewPost } />
        <Tab.Screen name="Users" component={ Users } />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
