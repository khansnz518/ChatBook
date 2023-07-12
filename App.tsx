import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeStackNavigation from './src/Navigation/HomeStackNavigation';
import {Provider} from 'react-redux';
import  { persistor, store } from './src/store';
import auth from '@react-native-firebase/auth';
import AuthStack from './src/Navigation/AuthStack';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  GoogleSignin.configure({
    webClientId:
      '1009844142953-b16gvnkh0iar6rop89ri81i1urkdip8u.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  });

  //Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <NavigationContainer>
          {user ? <HomeStackNavigation /> : <AuthStack />}
        </NavigationContainer>
        </PersistGate>
    </Provider>
  );
};

export default App;
