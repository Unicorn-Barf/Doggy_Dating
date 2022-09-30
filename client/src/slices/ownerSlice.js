import { createSlice } from '@reduxjs/toolkit';

// Define the owner initial state
const initialState = {
    me: {},
    dogs: [],
};

// Use the createSlice function from RTK
// This will automatically create our action creators and reducers for us
const ownerSlice = createSlice({
    name: "owner",
    initialState,
    reducers: {
        starMe(state) {
            state.star = true;
        }
    },
});

// Action creators for use with dispatch in components
// i.e. dispatch(starMe())
export const { starMe } = ownerSlice.actions;

// you can write custom selectors
export const isOwnerStarred = (state) => state.owner.star;

// The default export should be a slice's reducer object
export default ownerSlice.reducer;