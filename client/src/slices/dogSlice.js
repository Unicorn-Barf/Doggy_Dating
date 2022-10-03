import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   data: {
      _id: null,
   },
}

const dogSlice = createSlice({
   name: "dog",
   initialState,
   reducers: {
      storeDog(state, action) {
         state.dog.data = action.payload;
      }
   }
});

export const { storeDog } = dogSlice.actions;

// Custom Selectors
export const getDog = (state) => state.dog.data;
export const getDogId = (state) => state.dog.data._id;

export default dogSlice.reducer;