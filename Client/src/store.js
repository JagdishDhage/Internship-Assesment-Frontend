import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './features/profile/profileSlice';
import departmentReducer from './features/profile/departmentSlice'; // Import department slice
import courseReducer from './features/profile/cource'

const store = configureStore({
  reducer: {
    profile: profileReducer,
    department: departmentReducer, // Add department reducer
    selectedCourse: courseReducer,
  },
});

export default store;
