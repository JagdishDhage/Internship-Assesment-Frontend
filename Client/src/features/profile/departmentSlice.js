import { createSlice } from '@reduxjs/toolkit';

// Load the selected department from localStorage (if available)
const storedDepartment = localStorage.getItem('selectedDepartment');

const departmentSlice = createSlice({
  name: 'department',
  initialState: {
    selectedDepartment: storedDepartment ? JSON.parse(storedDepartment) : null,
  },
  reducers: {
    setSelectedDepartmentId: (state, action) => {
      state.selectedDepartment = action.payload;
      localStorage.setItem('selectedDepartment', JSON.stringify(action.payload)); // Save to localStorage
    },
    clearDepartment: (state) => {
      state.selectedDepartment = null;
      localStorage.removeItem('selectedDepartment'); // Remove from localStorage
    },
  },
});

export const { setSelectedDepartmentId, clearDepartment } = departmentSlice.actions;
export default departmentSlice.reducer;
