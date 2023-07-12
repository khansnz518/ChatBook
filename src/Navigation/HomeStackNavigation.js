import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabBarnavigation from './TabBarnavigation';
import Chat from '../components/Chat';
import AllUser from '../components/AllUser';
const Stack = createNativeStackNavigator();

const HomeStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="tab" component={TabBarnavigation} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: {backgroundColor: '#694fad'},
          headerTintColor: 'white',
        }}
        name="Chat"
        component={Chat}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: {backgroundColor: '#694fad'},
          headerTintColor: 'white',
        }}
        name="Users"
        component={AllUser}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigation;
