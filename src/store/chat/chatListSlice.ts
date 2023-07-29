import {createSlice} from '@reduxjs/toolkit';

const ChatListSlice = createSlice({
  name: 'chatlist',
  initialState: {chatList:[],otherUserDetails:[]},
  reducers: {
    chatList(state, action) {
      state.chatList = action.payload.chatList;
    },
    otherUserDetails(state,action){
      state.otherUserDetails = action.payload.otherUserDetails
    }
  },
});

export const ChatListActions = ChatListSlice.actions;
export default ChatListSlice;