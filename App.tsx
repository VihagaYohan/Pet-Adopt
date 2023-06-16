import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './app/views/screens/HomeScreen';
import DetailsScreen from './app/views/screens/DetailsScreen';
import DrawerNavigator from './app/views/navigators/DrawerNavigator'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
   <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name="HomeScreen" component={DrawerNavigator}/>
          <Stack.Screen name="DetailsScreen" component={DetailsScreen}/>
      </Stack.Navigator>
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
