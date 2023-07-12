import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import ChatList from '../components/chatList';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {ChatListActions} from '../store/chat/chatListSlice';
import {useDispatch, useSelector} from 'react-redux';

const ChatScreen = () => {
  const dispatch = useDispatch();
  const userUid = useSelector(state => state.auth.userDetails.uid);

  // useEffect(() => {
    firestore()
      .collection('chats')
      // .where('participants', 'array-contains', userUid)
      .get()
      .then(e=>e._docs.map((item)=>{
        console.log('dtata=>',item)
      })).catch(e=>e)
      // .onSnapshot(querySnapshot => {
      //   let tempArray = [];
      //   console.log('querySnapshot',querySnapshot?._docs);
      //   querySnapshot._docs.map(item => {
      //     // console.log('querySnapshot123=>', item);

      //     const chatList = {
      //       chatId: item._data.chatId,
      //       isOnline: item._data.isOnline,
      //       lastMessage: item._data.lastMessage,
      //       newMessages: item._data.newMessages,
      //       participants: item._data.participants,
      //       timestamp: item._data.timestamp,
      //       uid: userUid,
      //     };
      //     const filterotherUser = item._data.participants.filter(
      //       item => item !== userUid,
      //     )[0];
      //     firebase
      //       .firestore()
      //       .collection('users')
      //       .doc(filterotherUser)
      //       .onSnapshot(querySnapshot => {
      //         const otherUserDetails = {
      //           displayName: querySnapshot._data.displayName,
      //           photoURL: querySnapshot._data.photoURL,
      //           uid: querySnapshot._data.uid,
      //         };
      //         dispatch(
      //           ChatListActions.otherUserDetails({
      //             otherUserDetails: otherUserDetails,
      //           }),
      //         );
      //       });
      //     tempArray?.push(chatList);
      //   });
      //   dispatch(
      //     ChatListActions.chatList({
      //       chatList: tempArray,
      //     }),
      //   );
      // });

    // Stop listening for updates when no longer required
    // return () => subscriber();
  // }, []);
  return (
    <View style={{flex: 1}}>
      <ChatList />
    </View>
  );
};

export default ChatScreen;
