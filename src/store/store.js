import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import challengesReducer from '../features/challenges/challengesSlice';

//check redux-persist library docs for cofiguration
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, challengesReducer);

//Create store with persisted reducer
export const store = configureStore({
  reducer: {
    challenges: persistedReducer, // Now challenges is a slice of the state
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore persist actions to prevent warnings
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store); 