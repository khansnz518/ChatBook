import {View} from 'react-native';
import React from 'react';
import ChatList from '../components/chatList';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {ChatListActions} from '../store/chat/chatListSlice';
import {useDispatch, useSelector} from 'react-redux';

const ChatScreen = () => {
  const dispatch = useDispatch();
  const userUid = useSelector(state => state.auth.userDetails.uid);
   
  firestore()
  .collection('chats')
  .where('participants', 'array-contains', userUid)
  .onSnapshot(async querySnapshot => {
    console.log('querySnapshot', querySnapshot._docs)

    const fetchUserDetailsPromises = querySnapshot.docs.map(async item => {
      const chatList = {
        chatId: item.data().chatId,
        isOnline: item.data().isOnline,
        lastMessage: item.data().lastMessage,
        newMessages: item.data().newMessages,
        participants: item.data().participants,
        timestamp: item.data().timestamp,
        // lastSent:item.data().lastSent,
        uid: userUid,
      };

      const filterOtherUser = item.data().participants.filter(
        item => item !== userUid
      )[0];

      const userSnapshot = await firebase
        .firestore()
        .collection('users')
        .doc(filterOtherUser)
        .get();

      const otherUserDetails = {
        displayName: userSnapshot.data().displayName,
        photoURL: userSnapshot.data().photoURL,
        uid: userSnapshot.data().uid,
      };

      return {
        chatList,
        otherUserDetails,
      };
    });

    const results = await Promise.all(fetchUserDetailsPromises);

    const chatListArray = results.map(result => result.chatList);
    const otherUserDetailsArray = results.map(result => result.otherUserDetails);

    console.log('chatListArray', chatListArray);
    console.log('otherUserDetailsArray', otherUserDetailsArray);

    dispatch(ChatListActions.chatList({ chatList: chatListArray }));
    dispatch(ChatListActions.otherUserDetails({ otherUserDetails: otherUserDetailsArray }));
  });

  return (
    <View style={{flex: 1}}>
      <ChatList />
    </View>
  );
};

export default ChatScreen;
