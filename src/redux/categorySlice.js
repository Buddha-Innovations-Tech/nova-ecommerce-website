import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCategoriesAsync = createAsyncThunk(
  'category/getCategriesAsync',
  async () => {
    const response = await axios.get('/api/categories/web');
    if (response.status === 200) {
      const categories = response.data.categories;
      return { categories };
    }
  }
);
const categorySlice = createSlice({
  name: 'category',
  initialState: {
    category: [],
    loading: null,
  },
  extraReducers: {
    [getCategoriesAsync.pending]: (state, action) => {
      state.loading = true;
    },
    [getCategoriesAsync.fulfilled]: (state, action) => {
      state.category = action.payload.categories;
      state.loading = false;
    },
  },
});

export default categorySlice.reducer;
