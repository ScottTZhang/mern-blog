import { configureStore, combineReducers } from '@reduxjs/toolkit'
import  userReducer from './user/userSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


const rootReducer = combineReducers({
  user: userReducer, // 'user' slice is managed by userReducer
})

const persistConfig = {
  key: 'root',
  storage,
  version: 1
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
// Create a Redux store using the rootReducer

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, //prevent error from redux-toolkit
    }), 
})

export const persistor = persistStore(store);