import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   currentDog: {
      _id: null,
   },
   dogArray: [],
}

const dogSlice = createSlice({
   name: "dog",
   initialState,
   reducers: {
      storeCurrentDog(state, action) {
         state.currentDog = action.payload;
      },
      storeDogs(state, action) {
         state.dogArray = [...action.payload];
      }
   }
});

export const { storeDogs, storeCurrentDog } = dogSlice.actions;

// Custom Selectors
export const getDog = (state) => state.dog.currentDog;
export const getDogId = (state) => state.dog.currentDog._id;
export const getDogArr = (state) => state.dog.dogArray;

export default dogSlice.reducer;