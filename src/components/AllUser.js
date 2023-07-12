import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';

const AllUser = ({navigation}) => {
  const [users, setUsers] = useState([]);
  const chatList = useSelector(state => state?.chatlist.chatList);
  const userUid = useSelector(state => state.auth.userDetails.uid);


  useEffect(() => {
    // const subscriber = firestore()
    //   .collection('users')
    //   .onSnapshot(documentSnapshot => {
    //     let tempArray = [];
    //     documentSnapshot._docs.map(item => {
    //       const newUser = {
    //         uid: item._data.uid,
    //         displayName: item._data.displayName,
    //         photoURL: item._data.photoURL,
    //       };
    //       tempArray?.push(newUser);
    //     });
    //     setUsers([...tempArray]);
    //   });

    // // Stop listening for updates when no longer required
    // return () => subscriber();
  }, []);

  const createChat = async (otherId) => {
    const containsParticipant = chatList.find(item => item.participants.includes(otherId));

    if (containsParticipant) {
        // Do something if the participant is found
        const chatId = containsParticipant.chatId
        console.log(`The participants array contains ${otherId}.`,chatId);
        // navigation.navigate('Chat', {
        //     chatsId: chatId,
        //     otherId: otherId,
        //     myId: userUid,
        // });
    } else {
      console.log(`The participants array does not contain ${otherId}.`);
      // Do something if the participant is not found
    }
  };

  const renderTask = ({item}) => (
    <TouchableOpacity style={styles.list} onPress={()=>createChat(item.uid)}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          width: '70%',
        }}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: item.photoURL}}
            style={{height: '100%', width: '100%', borderRadius: 999}}
          />
        </View>
        <View style={{marginLeft: 8}}>
          <Text style={{color: '#000000', fontSize: 16}}>
            {item.displayName}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar animated={true} backgroundColor="#694fad" />
      <FlatList
        data={users}
        renderItem={renderTask}
        keyExtractor={item => String(item.uid)}
        contentContainerStyle={{flexGrow: 1}}
      />
    </SafeAreaView>
  );
};

export default AllUser;
const styles = StyleSheet.create({
  container: {
    // flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: '100%',
    backgroundColor: '#694fad',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  taskList: {
    flexGrow: 1,
  },
  list: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  imageContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 1,
    // backgroundColor: '#694fad',
  },
});
