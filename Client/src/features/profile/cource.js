import { createSlice } from '@reduxjs/toolkit';

const courseSlice = createSlice({
  name: 'selectedCourse',
  initialState: { courseId: null },
  reducers: {
    setSelectedCourseId: (state, action) => {
      state.courseId = action.payload;
    },
  },
});

export const { setSelectedCourseId } = courseSlice.actions;
export default courseSlice.reducer;
