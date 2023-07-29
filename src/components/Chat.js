import firestore, {firebase} from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Chat = ({route, navigation}) => {
  const {chatsId, otherId, myId} = route.params;
  console.log(chatsId, otherId, myId);

  const [chatId, setChatId] = useState(chatsId);
  const [customText, setCustomText] = useState('');
  const [messages, setMessages] = useState([]);

  const onChangeInputText = text => {
    setCustomText(text);
  };

  const getAdditionalDetails = () => {
    return firebase
      .firestore()
      .collection('chats')
      .doc(chatId)
      .collection('allMessage')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const msg = snapshot.docs.map(doc => ({
          _id: doc.data()._id,
          createdAt: !!doc.data()?.createdAt?.seconds
            ? doc.data()?.createdAt?.toDate()
            : new Date().getTime(),
          text: doc.data().text,
          user: doc.data().user,
        }));
        setMessages(msg);
      });
  };

  useEffect(() => {
    getAdditionalDetails();
  }, []);

  const msgHandler = async mymsg => {
    const chatRef = firebase.firestore().collection('chats');
    // create new chat
    if (chatId === undefined) {
      return await chatRef
        .add({
          lastMessage: mymsg.text,
          lastSent: firestore.FieldValue.serverTimestamp(),
          sentBy: myId,
          sentTo: otherId,
          participants: firestore.FieldValue.arrayUnion(otherId, myId),
        })
        .then(d => {
          console.log('d.id==>', d.id);
          setChatId(d.id);
          chatRef.doc(d.id).update({chatId:d.id})
          chatRef.doc(d.id).collection('allMessage').add(mymsg);
        });
    }
    // update in the existing chat
    const chatDoc = chatRef.doc(chatId);
    return await chatDoc
      .collection('allMessage')
      .add(mymsg)
      .then(_ => {
        chatDoc.update({
          lastMessage: mymsg.text,
          lastSent: firestore.FieldValue.serverTimestamp(),
          sentBy: myId,
          sentTo: otherId,
        });
      });
  };

  const onSend = messages => {
    const msg = {
      ...messages[0],
      sentBy: myId,
      sentTo: otherId,
      createdAt: firestore.FieldValue.serverTimestamp(),
      deliveredTo: [],
      seen: [],
    };
    console.log('msg', msg);
    let mymsg = {};

    mymsg = {...msg};
    console.log('mymsg=>', mymsg);
    msgHandler(mymsg)
      .then(() => {})
      .catch(err => {
        console.error(`Couldn't send msg: ${err}`);
      });
  };
  const handleBubbleColor = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#86b1f2',
            padding: '2%',
          },
          left: {
            marginLeft: '-10%',
            backgroundColor: '#e0ecff',
            padding: '2%',
          },
        }}
        textStyle={{right: {color: '#000'}, left: {color: '#000'}}}
      />
    );
  };

  const handleSend = props => {
    // if (!props.text.trim()) {
    //   // text box empty
    //   return (
    //     <View
    //       style={{
    //         flexDirection: 'row',
    //         borderWidth: 0,
    //       }}></View>
    //   );
    // }
    return (
      <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={()=>{}}>
      <MaterialCommunityIcons
          // type="font-awesome"
          name="paperclip"
          style={{
            top:7,
            marginRight: 10,
            transform: [{rotateY: '180deg'}],
          }}
          size={25}
          color='blue'
          tvParallaxProperties={undefined}
        />
      </TouchableOpacity>
      <Send {...props}>
        <MaterialCommunityIcons
          name="send-circle-outline"
          size={25}
          style={{
            bottom: 8,
            marginRight: '8%',
            borderColor: 'white',
            padding: 2,
          }}
          color={'#694fad'}
        />
      </Send>
      </View>
    );
  };

  // ***
  return (
    <View style={styles.mainContainer}>
      <GiftedChat
        messages={messages}
        onSend={messages => {
          onSend(messages);
        }}
        user={{
          _id: myId,
        }}
        textInputProps={{
          autoCorrect: true,
          color: '#000',
        }}
        text={customText}
        onInputTextChanged={onChangeInputText}
        placeholder={'Type message here...'}
        placeholderTextColor="#000"
        renderBubble={handleBubbleColor}
        alwaysShowSend 
        renderSend={handleSend}
        scrollToBottom
        showAvatarForEveryMessage
        // scrollToBottomComponent={scrollToBottomComponentButton}
        // renderCustomView={renderCustomView}
        // renderChatFooter={() => renderChatFooter(message)}
        // renderInputToolbar={customInputToolbar}
        // renderMessageVideo={renderMessageVideo}
        // renderSystemMessage={renderSystemMessage}
        // renderTicks={handleRenderTicks}
      />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fafafa',
    minHeight: '100%',
  },
});
