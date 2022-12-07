import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   currentDogIndex: 0,
   currentDog: {
      _id: null,
   },
   dogArray: [],
}

const dogSlice = createSlice({
   name: "dog",
   initialState,
   reducers: {
      storeCurrentDogIndex(state, action) {
         state.currentDogIndex = action.payload;
      },
      storeCurrentDog(state, action) {
         state.currentDog = action.payload;
      },
      storeDogs(state, action) {
         state.dogArray = [...action.payload];
      }
   }
});

export const { storeDogs, storeCurrentDog, storeCurrentDogIndex } = dogSlice.actions;

// Custom Selectors
export const getDog = (state) => state.dog.currentDog;
export const getDogId = (state) => state.dog.currentDog._id;
export const getDogArr = (state) => state.dog.dogArray;
export const getDogIndex = (state) => state.dog.currentDogIndex;

export default dogSlice.reducer;