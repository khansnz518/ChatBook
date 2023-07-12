import {createSlice} from '@reduxjs/toolkit';

const AuthSlice = createSlice({
  name: 'auth',
  initialState: {userDetails: {}},
  reducers: {
    userDetailSHandler(state, action) {
      state.userDetails = action.payload.userDetails;
    },
  },
});

export const AuthActions = AuthSlice.actions;
export default AuthSlice;
