import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  addLoading: false,
  addError: "",
  reviewedData: [],
  toReviewData: [],

  fetchToReviewLoading: false,
  fetchToReviewError: "",

  fetchReviewHistoryLoading: false,
  fetchReviewHistoryError: "",
};

export const fetchToReviewAsync = createAsyncThunk(
  "review/fetchToReviewAsync",
  async (_, thunkApi) => {
    try {
      const { user } = thunkApi.getState().subscribers;
      const config = {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      };

      const response = await axios.get(`/api/reviews/user`, config);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response ? error.response.data : error
      );
    }
  }
);

export const fetchReviewHistoryAsync = createAsyncThunk(
  "review/fetchReviewHistoryAsync",
  async (_, thunkApi) => {
    try {
      const { user } = thunkApi.getState().subscribers;
      const config = {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      };

      const response = await axios.get(`/api/reviews/history`, config);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response ? error.response.data : error
      );
    }
  }
);

export const addReviewAsync = createAsyncThunk(
  "review/addReviewAsync",
  async ({ data, id }, thunkApi) => {
    try {
      const { user } = thunkApi.getState().subscribers;
      const config = {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      };

      const response = await axios.post(`/api/reviews/${id}`, data, config);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response ? error.response.data : error
      );
    }
  }
);

export const resubmitReviewAsync = createAsyncThunk(
  "review/resubmitReviewAsync",
  async ({ data, id }, thunkApi) => {
    try {
      const { user } = thunkApi.getState().subscribers;
      const config = {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      };

      const response = await axios.put(`/api/reviews/${id}`, data, config);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response ? error.response.data : error
      );
    }
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    // resetError: (state) => {
    //   state.isError = null;
    //   state.isLoginError = null;
    //   state.message = null;
    // },
  },
  extraReducers: (builder) => {
    builder
      //Fetch review
      .addCase(fetchToReviewAsync.pending, (state) => {
        state.fetchToReviewError = "";
        state.fetchToReviewLoading = true;
      })
      .addCase(fetchToReviewAsync.fulfilled, (state, action) => {
        state.toReviewData = action.payload;
        state.fetchToReviewLoading = false;
        state.fetchToReviewError = "";
      })
      .addCase(fetchToReviewAsync.rejected, (state, action) => {
        state.fetchToReviewLoading = false;
        state.fetchToReviewError = action.payload.message;
      })

      //Fetch review History
      .addCase(fetchReviewHistoryAsync.pending, (state) => {
        state.fetchReviewHistoryError = "";
        state.fetchReviewHistoryLoading = true;
      })
      .addCase(fetchReviewHistoryAsync.fulfilled, (state, action) => {
        state.reviewedData = action.payload;
        state.fetchReviewHistoryLoading = false;
        state.fetchReviewHistoryError = "";
      })
      .addCase(fetchReviewHistoryAsync.rejected, (state, action) => {
        state.fetchReviewHistoryLoading = false;
        state.fetchReviewHistoryError = action.payload.message;
      })

      // Add Review
      .addCase(addReviewAsync.pending, (state) => {
        state.addError = "";
        state.addLoading = true;
      })
      .addCase(addReviewAsync.fulfilled, (state, action) => {
        state.reviewedData = [action.payload, ...state.reviewedData];
        state.toReviewData = state.toReviewData.filter(
          (entry) => entry._id !== action.payload.product
        );
        state.addLoading = false;
        state.addError = "";
      })
      .addCase(addReviewAsync.rejected, (state, action) => {
        state.addLoading = false;
        state.addError = action.payload.message;
      })
      //Resubmit review
      .addCase(resubmitReviewAsync.fulfilled, (state, action) => {
        state.reviewedData = state.reviewedData.map((entry) =>
          entry._id === action.payload._id ? action.payload : entry
        );
      });
  },
});

// export const { resetError } = reviewSlice.actions;

export const getMyReviews = (state) => state.review.reviewedData;
export const getToReview = (state) => state.review.toReviewData;

export const getFetchToReviewLoading = (state) =>
  state.review.fetchToReviewLoading;
export const getFetchToReviewError = (state) => state.review.fetchToReviewError;

export const getFetchReviewHistoryLoading = (state) =>
  state.review.fetchReviewHistoryLoading;
export const getFetchReviewHistoryError = (state) =>
  state.review.fetchReviewHistoryError;

export const getAddReviewLoading = (state) => state.review.addLoading;
export const getAddReviewError = (state) => state.review.addError;

export default reviewSlice.reducer;
