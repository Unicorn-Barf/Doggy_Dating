import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   dog: {
      _id: null,
   },
}

const dogSlice = createSlice({
   name: "dog",
   initialState,
   reducers: {
      storeDog(state, action) {
         state.dog = action.payload;
      }
   }
});

export const { storeDog } = dogSlice.actions;

// Custom Selectors
export const getDog = (state) => state.dog;
export const getDogId = (state) => state.dog._id;

export default dogSlice.reducer;