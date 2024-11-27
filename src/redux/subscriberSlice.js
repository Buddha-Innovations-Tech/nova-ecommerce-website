import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { useCookies } from 'react-cookie';
import axios from "axios";

export const subscriberLoginAsync = createAsyncThunk(
  "subscribers/subscriberLoginAsync",
  async ({ email, password, provider }, thunkApi) => {
    try {
      const response = await axios.post("/api/subscribers/login", {
        email,
        password,
      });
      const user = response?.data;
      return { user };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);
export const getSubscriberDetailsAsync = createAsyncThunk(
  "subscribers/getSubscriberDetailsAsync",
  async (_, thunkApi) => {
    try {
      const { user } = thunkApi.getState().subscribers;
      const config = {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      };
      const { data } = await axios.get("/api/subscribers/profile", config);
      const subscriber = data;
      return subscriber;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);
export const getSubscriberOrdersAsync = createAsyncThunk(
  "subscribers/getSubscriberOrdersAsync",
  async (_, thunkApi) => {
    try {
      const { user } = thunkApi.getState().subscribers;
      const config = {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      };
      const { data } = await axios.get("/api/subscribers/orders", config);
      const orders = data;
      return orders;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);
export const subscriberRegisterAsync = createAsyncThunk(
  "subscribers/subscriberRegisterAsync",
  async ({ email, name, password, provider }, thunkApi) => {
    try {
      const response = await axios.post("/api/subscribers", {
        email,
        name,
        password,
        provider,
      });
      // response?.data &&
      //   localStorage.setItem('user', JSON.stringify(response.data));
      // const user = response?.data;
      const success = response?.data?.status === "success" && true;
      return { success };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const addToWishListAsync = createAsyncThunk(
  "subscribers/addToWishListAsync",
  async (id, thunkApi) => {
    try {
      const { user } = thunkApi.getState().subscribers;
      const config = {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      };
      const response = await axios.put(
        `/api/products/wishlist`,
        { productId: id },
        config
      );
      if (response.status === 201) {
        return { added: true };
      }
      if (response.status === 200) {
        return { added: false };
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const removeFromWishListAsync = createAsyncThunk(
  "subscribers/removeFromWishListAsync",
  async (id, thunkApi) => {
    try {
      const { user } = thunkApi.getState().subscribers;
      const config = {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      };
      const response = await axios.put(
        `/api/products/wishlist`,
        { productId: id },
        config
      );
      if (response.status === 200) {
        return { removed: true };
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const updateUserProfileAsync = createAsyncThunk(
  "subscribers/updateUserProfileAsync",
  async (data, thunkApi) => {
    console.log(data);
    const { accessToken: token, _id } = thunkApi.getState().subscribers.user;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.put(`/api/subscribers/${_id}`, data, config);
      if (response.status === 200) {
        return { success: true, updatePassword: data.updatePassword };
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);
const user = JSON.parse(localStorage.getItem("userInfo"));
const initialState = {
  isLoading: null,
  isDetailsLoading: null,
  isOrderLoading: null,
  modalShow: null,
  loginSuccess: null,
  isLoginError: null,
  isRegisterSuccess: null,
  isRegisterLoading: null,
  isRegisterError: null,
  message: null,
  user: user ? user : null,
  userDetails: null,
  orders: null,
  wishListSuccess: null,
  removeFromWishList: null,
  updateSuccess: null,
  updateLoading: null,
  updatePasswordSuccess: null,
  deleteSuccess: null,
  deleteLoading: null,
};
const subscriberSlice = createSlice({
  name: "Subscriber",
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.modalShow = action.payload === "show" ? true : null;
    },
    subscriberGuestLogin: (state) => {
      state.user = {
        type: "guest",
      };
    },
    logout: (state) => {
      state.isLoading = false;
      state.logoutSuccess = true;
      state.user = null;
      state.isLoginError = null;
      state.message = null;
      state.isError = null;
      state.userDetails = null;
      state.loginSuccess = null;
      localStorage.removeItem("user");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("currencyValue");
      //  axios.post('/api/logout');
      // await axios.post('/api/logout');
    },
    subscriberGoogleLoginAsync: (state, action) => {
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      state.isLoading = false;
      state.user = action.payload;
      state.loginSuccess = true;
    },
    resetError: (state) => {
      state.isError = null;
      state.isLoginError = null;
      state.message = null;
    },
  },
  extraReducers: {
    [subscriberLoginAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [subscriberLoginAsync.fulfilled]: (state, action) => {
      localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
      state.isLoading = false;
      state.user = action.payload.user;
      state.loginSuccess = true;
    },
    [subscriberLoginAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.isLoginError = true;
      state.loginSuccess = null;
      state.message = action.payload;
      state.user = null;
    },
    [subscriberRegisterAsync.pending]: (state, action) => {
      state.isRegisterLoading = true;
    },
    [subscriberRegisterAsync.fulfilled]: (state, action) => {
      state.isRegisterLoading = false;
      state.isRegisterSuccess = action.payload.success;
    },
    [subscriberRegisterAsync.rejected]: (state, action) => {
      state.isRegisterLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.user = null;
    },
    [getSubscriberDetailsAsync.pending]: (state, action) => {
      state.isDetailsLoading = true;
    },
    [getSubscriberDetailsAsync.fulfilled]: (state, action) => {
      state.isDetailsLoading = false;
      state.userDetails = action.payload.user;
    },
    [getSubscriberDetailsAsync.rejected]: (state, action) => {
      state.isDetailsLoading = false;
      state.isError = true;
      state.isLoginError = true;
      state.message = action.payload;
      state.userDetails = null;
    },
    [getSubscriberOrdersAsync.pending]: (state, action) => {
      state.isOrderLoading = true;
    },
    [getSubscriberOrdersAsync.fulfilled]: (state, action) => {
      state.isOrderLoading = false;
      state.orders = action.payload.orders;
    },
    [getSubscriberOrdersAsync.rejected]: (state, action) => {
      state.isOrderLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.orders = null;
    },

    [addToWishListAsync.pending]: (state, action) => {
      state.wishListSuccess = false;
    },
    [addToWishListAsync.fulfilled]: (state, action) => {
      state.wishListSuccess = action.payload.added;
    },
    [addToWishListAsync.rejected]: (state, action) => {
      state.isError = true;
      state.message = action.payload;
      state.wishListSuccess = null;
    },
    [removeFromWishListAsync.pending]: (state, action) => {
      state.removeFromWishList = false;
    },
    [removeFromWishListAsync.fulfilled]: (state, action) => {
      state.removeFromWishList = action.payload.removed;
    },
    [removeFromWishListAsync.rejected]: (state, action) => {
      state.isError = true;
      state.message = action.payload;
      state.removeFromWishList = null;
    },
    [updateUserProfileAsync.pending]: (state, action) => {
      state.updateLoading = true;
      state.updateSuccess = false;
    },
    [updateUserProfileAsync.fulfilled]: (state, action) => {
      state.updateLoading = false;
      state.updatePasswordSuccess = action.payload.updatePassword;
      state.updateSuccess = true;
    },
    [updateUserProfileAsync.rejected]: (state, action) => {
      state.isError = true;
      state.message = action.payload;
    },

    // [deleteUserProfileAsync.pending]: (state, action) => {
    //   state.deleteLoading = true;
    //   state.deleteSuccess = false;
    // },
    // [deleteUserProfileAsync.fulfilled]: (state, action) => {
    //   state.deleteLoading = false;
    //   state.deleteSuccess = true;
    // },
    // [deleteUserProfileAsync.rejected]: (state, action) => {
    //   state.isError = true;
    //   state.message = action.payload;
    // },
  },
});

export const {
  showModal,
  logout,
  subscriberGuestLogin,
  subscriberGoogleLoginAsync,
  resetError,
} = subscriberSlice.actions;
export default subscriberSlice.reducer;
