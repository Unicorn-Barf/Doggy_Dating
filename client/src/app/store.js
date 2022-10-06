import { configureStore, combineReducers } from '@reduxjs/toolkit';
import ownerReducer from '../slices/ownerSlice';
import dogReducer from '../slices/dogSlice';

// Combine all reducers into one
const rootReducer = combineReducers({
    owner: ownerReducer,
    dog: dogReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});