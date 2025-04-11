import { createSlice } from '@reduxjs/toolkit';

// Load the selected university from localStorage (if available)
const storedUniversity = localStorage.getItem('storedUniversity');

const universitySlice = createSlice({
  name: 'university',
  initialState: {
    selectedUniversity: storedUniversity ? JSON.parse(storedUniversity) : null,
  },
  reducers: {
    setSelectedUniversityId: (state, action) => {
      state.selectedUniversity = action.payload;
      localStorage.setItem('storedUniversity', JSON.stringify(action.payload)); // Save to localStorage
    },
    clearUniversity: (state) => {
      state.selectedUniversity = null;
      localStorage.removeItem('storedUniversity'); // Remove from localStorage
    },
  },
});

export const { setSelectedUniversityId, clearUniversity } = universitySlice.actions;
export default universitySlice.reducer;
