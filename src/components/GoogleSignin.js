import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import React from 'react';
import {useDispatch} from 'react-redux';
import { GoogleSigning } from '../store/auth/AuthAction';

const GoogleSignins = () => {
  const dispatch = useDispatch();

  const signIn = async () => {
    dispatch(GoogleSigning());
  };

  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={signIn}
      disabled={false}
    />
  );
};

export default GoogleSignins;
