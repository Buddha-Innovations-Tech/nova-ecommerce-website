import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductsAsync = createAsyncThunk(
  "product/getProductsAsync",
  async (keyword) => {
    const response = await axios.get(
      `/api/products/website?keyword=${keyword}`
    );

    if (response.status === 200) {
      const products = response.data.products;
      return { products };
    }
  }
);

export const getProductDetailAsync = createAsyncThunk(
  "product/getProductDetailAsync",
  async (data) => {
    const response = await axios.get(`/api/products/${data.slug}/slug`, {
      params: data.params,
    });
    if (response.status === 200) {
      const product = response.data;
      return { product };
    }
  }
);

export const getProductByCategoryAsync = createAsyncThunk(
  "product/getProductByCategoryAsync",
  async (data) => {
    const response = await axios.post(
      `/api/products/category/${data.id}`,
      data
    );
    if (response.status === 200) {
      const products = response.data.products;
      const count = response.data.count;
      return { products, count };
    }
  }
);

export const getCurrencyValueAsync = createAsyncThunk(
  "product/getCurrencyValueAsync",
  async (data) => {
    const response = await axios.post(`api/multiCurrency`, data);
    localStorage.setItem(
      "currencyValue",
      JSON.stringify({
        value: response.data.value,
        currencyCode: response.data.code,
        countryCode: data.countryCode,
      })
    );
    if (response.status === 200) {
      return response.data;
    }
  }
);

// export const filterProductsAsync = createAsyncThunk(
//   'product/filterProductsAsync',
//   async (data, state) => {
//     return { data };
//   }
// );

const currencyValue = JSON.parse(localStorage.getItem("currencyValue"));

const productSlice = createSlice({
  name: "product",
  initialState: {
    currencyValue: 1,
    currencyCode: "Rs",
    getCurrencyValueAsyncStatus: "idle",
    products: [],
    totalProducts: 0,
    originalProduct: null,
    product: null,
    loading: false,
    filtering: false,
  },
  reducers: {
    filteringStart: (state) => {
      state.filtering = true;
    },
    filteringEnd: (state) => {
      state.filtering = false;
    },
    clearProduct: (state) => {
      state.product = null;
      state.originalProduct = null;
    },
  },
  extraReducers: {
    [getProductDetailAsync.pending]: (state, action) => {
      state.loading = true;
    },
    [getProductDetailAsync.fulfilled]: (state, action) => {
      state.originalProduct = action.payload.product;
      state.product = {
        ...state.originalProduct,
        price: state.originalProduct.price * Number(state.currencyValue),
        sellingPrice:
          state.originalProduct.sellingPrice * Number(state.currencyValue),
      };

      state.loading = false;
    },
    [getProductByCategoryAsync.pending]: (state, action) => {
      state.loading = true;
    },
    [getProductByCategoryAsync.fulfilled]: (state, action) => {
      state.products = action.payload.products;
      state.loading = false;
      state.filtering = false;
      state.totalProducts = action.payload.count;
    },
    [getProductsAsync.pending]: (state, action) => {
      state.loading = true;
    },
    [getProductsAsync.fulfilled]: (state, action) => {
      state.products = action.payload.products;
      state.loading = false;
    },
    [getCurrencyValueAsync.pending]: (state, action) => {
      state.getCurrencyValueAsyncStatus = "loading";
    },
    [getCurrencyValueAsync.fulfilled]: (state, action) => {
      state.currencyValue = action.payload.value;
      state.currencyCode = action.payload.code;
      const prod = state.originalProduct;
      if (state.product) {
        state.product = {
          ...prod,
          price: prod.price * Number(state.currencyValue),
          sellingPrice: prod.sellingPrice * Number(state.currencyValue),
        };
      }
      state.getCurrencyValueAsyncStatus = "success";
    },
  },
});

export const { filteringStart, filteringEnd, clearProduct } =
  productSlice.actions;

export default productSlice.reducer;
