import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { creeateBottomTabNavigator } from '@react-navigaton/bottom-tabs';

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
