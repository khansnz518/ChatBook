import {firebase} from '@react-native-firebase/firestore';

export const chatListener = (ourId, handler, isUserChat) => {
  return firebase
    .firestore()
    .collection('chats')
    .where('participants', 'array-contains', ourId)
    .onSnapshot(querySnap => {
      if (!!querySnap) handler(ourId, querySnap.docChanges(), isUserChat);
    });
};

export const getNewMessagesForChat = (chatId, minLastSent) => {
  if (minLastSent === null) {
    return firebase
      .firestore()
      .collection('chats')
      .doc(chatId)
      .collection('allMessage')
      .orderBy('createdAt', 'desc')
      .limit(100)
      .get();
  }
  return firebase
    .firestore()
    .collection('chats')
    .doc(chatId)
    .collection('allMessage')
    .where('createdAt', '>=', new Date(minLastSent))
    .get();
};
