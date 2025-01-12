import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Initial state that will be persisted
  nextId: 1, // Add a counter for generating unique IDs
};

const challengesSlice = createSlice({
  name: 'challenges',
  initialState,
  reducers: {
    addChallenge: (state, action) => {
      // Add completedDays field and unique ID when creating a new challenge
      state.items.push({
        ...action.payload,
        id: state.nextId.toString(), // Convert to string for consistency
        completedDays: 0
      });
      state.nextId += 1; // Increment the ID counter
    },
    updateChallengeProgress: (state, action) => {
      const { challengeId, completedDays } = action.payload;
      const challenge = state.items.find(item => item.id === challengeId);
      if (challenge) {
        challenge.completedDays = completedDays;
      }
    },
    deleteChallenge: (state, action) => {
      const challengeId = action.payload;
      // Find the index of the challenge to delete
      const index = state.items.findIndex(item => item.id === challengeId);
      if (index !== -1) {
        // Remove only the challenge at the found index
        state.items.splice(index, 1);
      }
    }
  },
});

export const { addChallenge, updateChallengeProgress, deleteChallenge } = challengesSlice.actions;
export default challengesSlice.reducer;