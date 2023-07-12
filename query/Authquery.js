import firestore, {firebase} from '@react-native-firebase/firestore';

export const getUser = id => {
  return firebase.firestore().collection('users').doc(id).get();
};

export const checkExistingUser = uid => {
  return firebase.firestore().collection('users').where('uid', '==', uid).get();
};

export const addUsersToDb = (userData, uid) => {
  return firebase.firestore().collection('users').doc(uid).set(userData);
};

export const getAdditionalDetails = (additionalData,uid) => {
  return firebase
    .firestore()
    .collection('users')
    .doc(uid)
    .collection('additionalUserDetails')
    .doc('additionalUserDetails')
    .set(additionalData);
};
