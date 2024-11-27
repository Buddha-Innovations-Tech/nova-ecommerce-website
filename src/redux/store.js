import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./categorySlice.js";
import productsReducer from "./productSlice.js";
import cartReducer from "./cartSlice.js";
import subscriberReducer from "./subscriberSlice.js";
import reviewReducer from "./reviewSlice.js";

export default configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
    cart: cartReducer,
    subscribers: subscriberReducer,
    review: reviewReducer,
  },
});
