import { createSlice } from '@reduxjs/toolkit';
import Auth from '../utils/auth';

// Define the owner initial state
const initialState = {
   data: {},
   loggedIn: Auth.loggedIn(),
};

// Use the createSlice function from RTK
// This will automatically create our action creators and reducers for us
const ownerSlice = createSlice({
   name: "owner",
   initialState,
   reducers: {
      storeOwner(state, action) {
         state.data = action.payload;
      },
      toggleLoggedIn(state, action) {
         if (action.payload) {
            state.loggedIn = true;
         } else {
            state.loggedIn = false;
         }
      }
   },
});

// Action creators for use with dispatch in components
// i.e. dispatch(starMe())
export const { storeOwner, toggleLoggedIn } = ownerSlice.actions;

// you can write custom selectors
export const getOwnerData = (state) => state.owner.data;
export const isLoggedIn = (state) => state.owner.loggedIn;
// The default export should be a slice's reducer object
export default ownerSlice.reducer;