import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch profile data
export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:3000/user/current', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        return thunkAPI.rejectWithValue('Failed to fetch profile');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.toString());
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    image: null,
    username: '',
    university: '',
    loading: false,
    error: null,
  },
  reducers: {
    updateProfileImage: (state, action) => {
      state.image = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.image = action.payload.image;
        state.username = action.payload.username;
        state.university = action.payload.university;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateProfileImage } = profileSlice.actions;
export default profileSlice.reducer;
