import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login'; 
import Register from './src/screens/Register'; 
import HomePage from './src/components/HomePage'


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Register" component = { Register } />
        <Stack.Screen name="HomePage" component = { HomePage } options = {{headerShown: false}} />
        <Stack.Screen name="Login" component = { Login } />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
