import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Initial state that will be persisted
};

const challengesSlice = createSlice({
  name: 'challenges',
  initialState,
  reducers: {
    addChallenge: (state, action) => {
      state.items.push(action.payload);
    },
  },
});

export const { addChallenge } = challengesSlice.actions;
export default challengesSlice.reducer; 