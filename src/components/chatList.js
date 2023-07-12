import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const ChatList = () => {
  const navigation = useNavigation();
  const chatList = useSelector(state => state?.chatlist.chatList);
  const otherUserDetails = useSelector(
    state => state?.chatlist?.otherUserDetails,
  );

  const renderTask = ({item}) => (
    <TouchableOpacity
      style={styles.list}
      onPress={() => {
        navigation.navigate('Chat', {
          chatsId: item.chatId,
          otherId: otherUserDetails.uid,
          myId: item.uid,
        });
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          width: '70%',
        }}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: otherUserDetails.photoURL}}
            style={{height: '100%', width: '100%', borderRadius: 999}}
          />
        </View>
        <View style={{marginLeft: 8}}>
          <Text style={{color:'#000000' ,fontSize:16}}>{otherUserDetails.displayName}</Text>
          <Text style={{color:'#000000' }} numberOfLines={1}>{item.lastMessage}</Text>
        </View>
      </View>
      <View style={{justifyContent:"center"}}>
        <Text>{item.lastSent}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>Messages</Text>
      </View>

      <FlatList
        data={chatList}
        renderItem={renderTask}
        keyExtractor={item => String(item.chatId)}
        contentContainerStyle={styles.taskList}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Users')} style={styles.fab}>
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>
    </>
  );
};

export default ChatList;
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
  fab: { 
    position: 'absolute', 
    width: 56, 
    height: 56, 
    alignItems: 'center', 
    justifyContent: 'center', 
    right: 20, 
    bottom: 20, 
    backgroundColor: '#694fad', 
    borderRadius: 30, 
    elevation: 8 
    }, 
    fabIcon: { 
      fontSize: 40, 
      color: 'white' 
    }
});
