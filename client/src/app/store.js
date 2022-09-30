import { configureStore, combineReducers } from '@reduxjs/toolkit';
import ownerReducer from '../slices/ownerSlice';

// Combine all reducers into one
const rootReducer = combineReducers({
    owner: ownerReducer,
  });

export const store = configureStore({
  reducer: rootReducer,
});