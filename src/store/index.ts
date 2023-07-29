// import {configureStore} from '@reduxjs/toolkit';
// import AuthSlice from './auth/AuthSlice';
// import ChatListSlice from './chat/chatListSlice';

// const store = configureStore({
//   reducer: {
//     auth: AuthSlice.reducer,
//     chatlist: ChatListSlice.reducer,
//   },
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });
// export default store;
//
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import AuthSlice from './auth/AuthSlice';
import ChatListSlice from './chat/chatListSlice';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  auth: AuthSlice.reducer,
  chatlist: ChatListSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
