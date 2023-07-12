import {AuthActions} from './AuthSlice';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {
  addUsersToDb,
  checkExistingUser,
  getAdditionalDetails,
} from '../../../query/Authquery';

export const GoogleSigning = () => {
  return async dispatch => {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential =  auth.GoogleAuthProvider.credential(idToken);
    await auth()
      .signInWithCredential(googleCredential)
      .then(userData => {
        let userDetails = {
          displayName: userData.user.displayName,
          email: userData.user.email,
          emailVerified: userData.user.emailVerified,
          isAnonymous: userData.user.isAnonymous,
          metadata: userData.user.metadata,
          photoURL: userData.user.photoURL,
          uid: userData.user.uid,
        };
        let additionalData = {
            isNewUser:userData.additionalUserInfo.isNewUser,
            phoneNumber:userData.user.phoneNumber
        }
        checkExistingUser(userData.user.uid).then(querySnapshot => {
          if (querySnapshot._docs[0] == undefined) {
            addUsersToDb(userDetails, userData.user.uid).then(() => {
              getAdditionalDetails(additionalData, userData.user.uid).then(
                (e) => {
                  dispatch(
                    AuthActions.userDetailSHandler({
                      userDetails: userDetails,
                    }),
                  );
                },
              );
            });
          } else {
            dispatch(
              AuthActions.userDetailSHandler({
                userDetails: userDetails,
              }),
            );
            console.log('user is already exist in db');
          }
        });
      });
  };
};
