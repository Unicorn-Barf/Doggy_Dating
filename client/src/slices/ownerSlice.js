import { createSlice } from '@reduxjs/toolkit';

// Define the owner initial state
const initialState = {
   data: {}
};

// Use the createSlice function from RTK
// This will automatically create our action creators and reducers for us
const ownerSlice = createSlice({
   name: "owner",
   initialState,
   reducers: {
      storeOwner(state, action) {
         state.owner.data = action.payload;
      },
      starMe(state) {
         state.star = true;
      }
   },
});

// Action creators for use with dispatch in components
// i.e. dispatch(starMe())
export const { starMe, storeOwner } = ownerSlice.actions;

// you can write custom selectors
export const isOwnerStarred = (state) => state.owner.star;
export const getOwnerData = (state) => state.owner.data;
// The default export should be a slice's reducer object
export default ownerSlice.reducer;