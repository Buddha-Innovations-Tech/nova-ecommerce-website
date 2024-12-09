import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const cart = JSON.parse(localStorage.getItem("cart"));
const buy_now = JSON.parse(localStorage.getItem("buy_now"));
const details = JSON.parse(localStorage.getItem("details"));

export const getCartUpdateDetailsAsync = createAsyncThunk(
  "cart/getUpdatedCart",
  async ({ cart }, thunkApi) => {
    let currencyCode = JSON.parse(localStorage.getItem("currencyValue"))[
      "currencyCode"
    ];

    try {
      const response = await axios.post("/api/orders/cart", {
        cartItems: cart["cartItems"],
        currencyCode: currencyCode,
      });
      if (response.status === 200) {
        return response.data;
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

export const getBuyNowCartUpdateDetailsAsync = createAsyncThunk(
  "cart/getUpdatedBuyCart",
  async ({ buyNowCart }, thunkApi) => {
    try {
      const response = await axios.post("/api/orders/cart/buy-now", buyNowCart);
      if (response.status === 200) {
        return response.data;
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

export const addOrderAsync = createAsyncThunk(
  "order/addOrderAsync",
  async ({ order }, thunkApi) => {
    // console.log({ order });
    // try {
    //   const { user } = thunkApi.getState().subscribers;
    //   const config = {
    //     headers: {
    //       Authorization: `Bearer ${user.accessToken}`,
    //     },
    //   };
    //   const API_URL = '/api/orders';
    //   const response = await axios.post(
    //     `${API_URL}`,
    //     {
    //       subscriberId: user._id,
    //       orderItems: order.cart.cartItems.map((item) => {
    //         return {
    //           productId: item.product._id,
    //           productName: item.product.name,
    //           productSellingPrice: item.sellingPrice,
    //           productPrice: item.product.price,
    //           productImage: item.product.heroImage,
    //           productDiscount: item.product.discount,
    //           quantity: item.qty,
    //         };
    //       }),
    //       paymentType: 'CASH',
    //       subTotal: order.cart.total,
    //       tax: order.cart.tax,
    //       shippingDetails: order.details.shippingDetails,
    //       discount: order.cart.discount,
    //       grandTotal: order.cart.grandTotal,
    //       billingDetails: order.details.billingDetails,
    //     },
    //     config
    //   );

    //   if (response?.status === 201) {
    //     const {
    //       cart: { quickBuy },
    //     } = order;
    //     const success = true;
    //     return { success, quickBuy };
    //   }
    // } catch (error) {
    //   const message =
    //     (error.response &&
    //       error.response.data &&
    //       error.response.data.message) ||
    //     error.message ||
    //     error.toString();
    //   return thunkApi.rejectWithValue(message);
    // }
    try {
      const { user } = thunkApi.getState().subscribers;
      const { shippingDetails, billingDetails } = order.details;
      const config = {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      };

      const API_URL = "/api/orders";
      const response = await axios.post(
        `${API_URL}`,
        {
          subscriberId: user._id,
          orderItems: order.cart.cartItems,
          merchantReference: order.merchantReference,
          paymentType: "CASH",
          shippingDetails,
          billingDetails,
          shippingPrice: order.shippingPrice,
          storePickup: order.storePickup,
        },
        config
      );

      if (response?.status === 201) {
        const {
          cart: { quickBuy },
        } = order;
        const success = true;
        return { success, quickBuy };
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

export const getPromoDetailsAsync = createAsyncThunk(
  "order/getPromoDetailsAsync",
  async (data, thunkApi) => {
    try {
      const response = await axios.get(`/api/promo/${data.code}`);
      if (response.status === 200) {
        return response.data;
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

export const getShippingDetails = createAsyncThunk(
  "order/getShippingDetails",
  async (data, thunkApi) => {
    try {
      const response = await axios.post("/api/orders/shippingDetails", data);
      if (response.status === 200) {
        return response.data;
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

const initialState = {
  cartItems: cart ? cart.cartItems : [],
  buyNowCartItems: buy_now ? buy_now.cartItems : [],
  total: cart ? Number(cart.total) : 0,
  grandTotal: cart && cart.grandTotal ? Number(cart.grandTotal) : 0,
  buyNowTotal: buy_now ? Number(buy_now.total) : 0,
  buyNowGrandTotal:
    buy_now && buy_now.grandTotal ? Number(buy_now.grandTotal) : 0,
  billingDetails: details?.billingAddress,
  shippingDetails: details?.shippingDetails,
  cartDetails: null,
  discount: cart ? Number(cart.discount) : 0,
  buyNowDiscount: buy_now ? Number(buy_now.discount) : 0,
  cartError: null,
  buyNowCartError: null,
  cartLoading: null,
  cartMessage: null,
  buyNowCartMessage: null,
  cartAddSuccess: null,
  cartRemoveSuccess: null,
  cartClearSuccess: null,
  isOrderPlaceLoading: false,
  isOrderPlaceSuccess: false,
  quickBuyLoading: null,
  quickBuySuccess: null,
  quickBuyItem: null,
  cartAddLoading: null,
  quickBuyItemTotal: 0,
  quickBuyItemGrandTotal: 0,
  quickBuySuccess: null,
  quickBuyCoupon: { code: "", price: 0 },
  quickBuyCouponSuccess: null,
  coupon: cart && cart.coupon ? cart.coupon : { code: "", price: 0 },
  couponAppliedSuccess: cart && cart.coupon ? true : null,
  getCouponLoading: null,
  getCouponSuccess: null,
  getCouponError: null,
  couponDetails: null,
  couponErrorMessage: null,
  getCartLoading: null,
  getCartSuccess: null,
  getBuyNowCartLoading: null,
  getBuyNowCartSuccess: null,
  postalCodeMessage: "",
  getPostalCodesStatus: "idle",
  getPostalCodesError: null,
  getShippingDetailsStatus: "idle",
  getShippingDetailsError: null,
};

const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addToQuickBuyLoading: (state) => {
      state.quickBuyLoading = true;
      state.quickBuyAddSuccess = false;
    },
    addToQuickBuySuccess: (state, action) => {
      state.buyNowCartError = false;
      state.buyNowCartMessage = false;
      state.quickBuyLoading = false;
      state.quickBuyItem = action.payload;
      state.buyNowCartItems = [action.payload].map((item) => {
        if (
          item.qty > item.product.stock ||
          item.qty > item.product.orderLimit
        ) {
          state.buyNowCartError = true;
          state.buyNowCartMessage =
            item.qty > item.product.stock
              ? `${action.payload.product.name} out of stock!`
              : `Order Limit Reached for ${action.payload.product.name}!`;
          return { ...item, qty: item.qty - 1 };
        } else {
          state.quickBuyAddSuccess = true;
          state.buyNowCartMessage = `${action.payload.product.name} added successfully!`;
          return { ...item, qty: item.qty };
        }
      });

      state.quickBuyAddSuccess = true;
      state.buyNowTotal =
        state.quickBuyItem.product.price * state.quickBuyItem.qty;
      state.buyNowDiscount =
        (state.quickBuyItem.product.discount / 100) *
        state.quickBuyItem.product.price *
        state.quickBuyItem.qty;
      state.buyNowGrandTotal = state.buyNowTotal - state.buyNowDiscount;

      state.buyNowTotal = state.buyNowTotal.toFixed(2);
      state.buyNowGrandTotal = state.buyNowGrandTotal.toFixed(2);
      state.buyNowDiscount = state.buyNowDiscount.toFixed(2);

      localStorage.setItem(
        "buy_now",
        JSON.stringify({
          cartItems: [action.payload],
          discount: state.buyNowDiscount,
          grandTotal: state.buyNowGrandTotal,
          total: state.buyNowTotal,
        })
      );
    },
    changeShippingDetails: (state, action) => {
      state.shippingDetails = action.payload.shippingDetails;
      state.billingDetails = action.payload.billingDetails;
    },
    removeCart: (state) => {
      state.cartItems = [];
      state.total = 0;
      state.grandTotal = 0;
      state.cartDetails = null;
      state.cartError = null;
      state.cartLoading = null;
      state.cartMessage = null;
      state.cartAddSuccess = null;
      state.cartRemoveSuccess = null;
      state.cartClearSuccess = null;
      state.isOrderPlaceLoading = false;
      state.isOrderPlaceSuccess = false;
      state.coupon = { code: "", price: 0 };
      state.shippingPrice = null;
      state.couponAppliedSuccess = null;
      localStorage.removeItem("cart");
      localStorage.removeItem("details");
    },
    resetCart: (state) => {
      state.cartLoading = null;
      state.cartError = null;
      state.cartAddSuccess = null;
      state.cartMessage = null;
      state.cartClearSuccess = null;
      state.isOrderPlaceSuccess = null;
    },
    resetCartAdd: (state) => {
      state.cartAddSuccess = null;
    },
    addToCart: (state, action) => {
      state.cartError = null;
      state.cartMessage = null;
      const itemIndex = state.cartItems.findIndex((i) => {
        return (
          i.product._id.toString() === action.payload.product._id.toString()
        );
      });
      if (itemIndex === -1) {
        state.cartAddSuccess = true;
        state.cartMessage = `${action.payload.product.name} added successfully!`;
        state.cartItems = [action.payload, ...state.cartItems];
      } else {
        state.cartItems = state.cartItems.map((item, idx) => {
          if (idx === itemIndex) {
            if (
              item.qty + action.payload.qty > item.product.stock ||
              item.qty + action.payload.qty > item.product.orderLimit
            ) {
              state.cartError = true;
              state.cartMessage =
                item.qty + action.payload.qty > item.product.stock
                  ? `${action.payload.product.name} out of stock!`
                  : `Order Limit Reached for ${action.payload.product.name}!`;
              return item;
            } else {
              state.cartAddSuccess = true;
              state.cartMessage = `${action.payload.product.name} added successfully!`;
              return { ...item, qty: item.qty + action.payload.qty };
            }
          } else {
            return item;
          }
        });
      }
      const total = state.cartItems?.reduce((acc, curr) => {
        return acc + curr.qty * curr.product.price;
      }, 0);
      state.total = total.toFixed(2);
      const discount = state.cartItems?.reduce((acc, curr) => {
        return (
          acc + (curr.product.discount / 100) * curr.product.price * curr.qty
        );
      }, 0);
      state.discount = discount.toFixed(2);
      const gTotal = total - state.discount;
      state.grandTotal = gTotal.toFixed(2);
      if (localStorage.getItem("cart")) {
        localStorage.removeItem("cart");
        localStorage.setItem(
          "cart",
          JSON.stringify({
            total,
            cartItems: state.cartItems,
            discount: state.discount,
            grandTotal: gTotal,
          })
        );
      } else {
        localStorage.setItem(
          "cart",
          JSON.stringify({
            total,
            cartItems: state.cartItems,
            discount: state.discount,
            grandTotal: gTotal,
          })
        );
      }
      state.total = Number(state.total).toFixed(2);
      state.grandTotal = Number(state.grandTotal).toFixed(2);
      state.discount = Number(state.discount).toFixed(2);
    },
    addToCartFromCartPage: (state, action) => {
      state.cartError = null;
      state.cartMessage = null;
      const itemIndex = state.cartItems.findIndex((i) => {
        return (
          i.product._id.toString() === action.payload.product._id.toString()
        );
      });
      if (itemIndex === -1) {
        state.cartAddSuccess = true;
        state.cartMessage = `${action.payload.product.name} added successfully!`;
        state.cartItems = [action.payload, ...state.cartItems];
      } else {
        state.cartItems = state.cartItems.map((item, idx) => {
          if (idx === itemIndex) {
            if (
              action.payload.qty > item.product.stock ||
              action.payload.qty > item.product.orderLimit
            ) {
              state.cartError = true;
              state.cartMessage = `${action.payload.product.name} out of stock!`;
              return item;
            } else {
              state.cartAddSuccess = true;
              state.cartMessage = `${action.payload.product.name} added successfully!`;
              return { ...item, qty: action.payload.qty };
            }
          } else {
            return item;
          }
        });
      }
      const total = state.cartItems?.reduce((acc, curr) => {
        return acc + curr.qty * curr.product.price;
      }, 0);
      state.total = total.toFixed(2);
      const discount = state.cartItems?.reduce((acc, curr) => {
        return (
          acc + (curr.product.discount / 100) * curr.product.price * curr.qty
        );
      }, 0);
      state.discount = discount.toFixed(2);
      const gTotal = total - state.discount;
      state.grandTotal = gTotal.toFixed(2);
      if (localStorage.getItem("cart")) {
        localStorage.removeItem("cart");
        localStorage.setItem(
          "cart",
          JSON.stringify({
            total,
            cartItems: state.cartItems,
            discount: state.discount,
            grandTotal: gTotal,
          })
        );
      } else {
        localStorage.setItem(
          "cart",
          JSON.stringify({
            total,
            cartItems: state.cartItems,
            discount: state.discount,
            grandTotal: gTotal,
          })
        );
      }
      state.total = Number(state.total).toFixed(2);
      state.grandTotal = Number(state.grandTotal).toFixed(2);
      state.discount = Number(state.discount).toFixed(2);
    },
    removeFromCart: (state, action) => {
      state.cartError = null;
      state.cartMessage = null;
      const itemIndex = state.cartItems.findIndex((i) => {
        return i.product._id.toString() === action.payload;
      });
      state.cartItems = state.cartItems.map((item, idx) => {
        if (idx === itemIndex) {
          if (item.qty !== 1) {
            return { ...item, qty: item.qty - 1 };
          }
        } else {
          return item;
        }
      });
      const total = state.cartItems?.reduce((acc, curr) => {
        return acc + curr.qty * curr.product.price;
      }, 0);
      state.total = total;
      const discount = state.cartItems?.reduce((acc, curr) => {
        return (
          acc + (curr.product.discount / 100) * curr.product.price * curr.qty
        );
      }, 0);
      state.discount = discount;
      const gTotal = total - state.discount;
      state.grandTotal = gTotal;
      if (localStorage.getItem("cart")) {
        localStorage.removeItem("cart");
        localStorage.setItem(
          "cart",
          JSON.stringify({
            total,
            cartItems: state.cartItems,
            discount: state.discount,
            grandTotal: gTotal,
          })
        );
      } else {
        localStorage.setItem(
          "cart",
          JSON.stringify({
            total,
            cartItems: state.cartItems,
            discount: state.discount,
            grandTotal: gTotal,
          })
        );
      }
      state.total = Math.round(state.total).toFixed(2);
      state.grandTotal = Math.round(state.grandTotal).toFixed(2);
      state.discount = Math.round(state.discount).toFixed(2);
    },
    removeFromBuyNowCart: (state, action) => {
      state.buyNowCartError = null;
      state.buyNowCartMessage = null;
      const itemIndex = state.buyNowCartItems.findIndex((i) => {
        return i.product._id.toString() === action.payload;
      });
      state.buyNowCartItems = state.buyNowCartItems.map((item, idx) => {
        if (idx === itemIndex) {
          if (item.qty !== 1) {
            return { ...item, qty: item.qty - 1 };
          }
        } else {
          return item;
        }
      });
      state.buyNowTotal =
        state.quickBuyItem.product.price * state.quickBuyItem.qty;
      state.buyNowDiscount =
        (state.quickBuyItem.product.discount / 100) *
        state.quickBuyItem.product.price *
        state.quickBuyItem.qty;
      state.buyNowGrandTotal = state.buyNowTotal - state.buyNowDiscount;

      state.buyNowTotal = state.buyNowTotal.toFixed(2);
      state.buyNowGrandTotal = state.buyNowGrandTotal.toFixed(2);
      state.buyNowDiscount = state.buyNowDiscount.toFixed(2);

      localStorage.setItem(
        "buy_now",
        JSON.stringify({
          cartItems: [action.payload],
          discount: state.buyNowDiscount,
          grandTotal: state.buyNowGrandTotal,
          total: state.buyNowTotal,
        })
      );
    },
    deleteCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.product._id.toString() !== action.payload
      );
      const total = state.cartItems?.reduce((acc, curr) => {
        return acc + curr.qty * curr.product.price;
      }, 0);

      state.total = total;
      const discount = state.cartItems?.reduce((acc, curr) => {
        return acc + (curr.product.discount / 100) * curr.product.price;
      }, 0);
      state.discount = discount;
      const gTotal = total - state.discount;
      if (localStorage.getItem("cart")) {
        localStorage.removeItem("cart");
        localStorage.setItem(
          "cart",
          JSON.stringify({
            total,
            cartItems: state.cartItems,
            discount: state.discount,
            grandTotal: gTotal,
          })
        );
      } else {
        localStorage.setItem(
          "cart",
          JSON.stringify({
            total,
            cartItems: state.cartItems,
            discount: state.discount,
            grandTotal: gTotal,
          })
        );
      }
      state.total = Number(state.total).toFixed(2);
      state.grandTotal = Number(state.grandTotal).toFixed(2);
    },
    applyDiscountCodeQuickBuy: (state, action) => {
      const total = state.quickBuyItemTotal;
      state.quickBuyCoupon.price =
        action.payload.coupon1 === "ARJUN50" && (50 / 100) * total;
      state.quickBuyCoupon.code = action.payload.coupon1;
      state.quickBuyItemGrandTotal = total - state.quickBuyCoupon.price;
      state.quickBuyCouponSuccess = true;
      if (localStorage.getItem("buy_now")) {
        localStorage.removeItem("buy_now");
        localStorage.setItem(
          "buy_now",
          JSON.stringify({
            total,
            coupon: {
              code: action.payload.coupon1,
              price: state.coupon.price,
            },
            grandTotal: state.grandTotal,
            cartItems: state.buyNowCartItems,
          })
        );
      } else {
        localStorage.setItem(
          "buy_now",
          JSON.stringify({
            total,
            grandTotal: state.grandTotal,
            coupon: action.payload.coupon1,
            cartItems: state.buyNowCartItems,
          })
        );
      }
    },
    applyDiscountCode: (state, action) => {
      const total = state.buyNowCartItems?.reduce((acc, curr) => {
        return acc + curr.qty * curr.product.sellingPrice;
      }, 0);
      state.buyNowTotal = total;
      state.coupon.price =
        action.payload.coupon1 === "ARJUN50" && (50 / 100) * total;
      state.coupon.code = action.payload.coupon1;
      state.buyNowGrandTotal = total - state.coupon.price;
      state.couponAppliedSuccess = true;
      if (localStorage.getItem("cart")) {
        localStorage.removeItem("cart");
        localStorage.setItem(
          "cart",
          JSON.stringify({
            total: state.buyNowTotal,
            coupon: {
              code: action.payload.coupon1,
              price: state.coupon.price,
            },
            grandTotal: state.buyNowGrandTotal,
            cartItems: state.cartItems,
          })
        );
      } else {
        localStorage.setItem(
          "cart",
          JSON.stringify({
            total: state.buyNowTotal,
            grandTotal: state.buyNowGrandTotal,
            coupon: action.payload.coupon1,
            cartItems: state.cartItems,
          })
        );
      }
      state.total = Number(state.total).toFixed(2);
      state.grandTotal = Number(state.grandTotal).toFixed(2);
    },
    applyShippingPrice: (state, action) => {
      state.shippingPrice = 100;
      state.shippingAppliedSuccess = true;
    },
    clearCart: (state) => {
      localStorage.removeItem("cart");
      state.cartItems = [];
      state.cartClearSuccess = true;
    },
    resetQuickBuy: (state) => {
      state.quickBuyItem = null;
      state.buyNowCartItems = [];
      state.quickBuyCoupon = { code: "", price: 0 };
      state.quickBuyItemTotal = 0;
      state.quickBuyItemGrandTotal = 0;
      state.quickBuyCouponSuccess = null;
      state.quickBuyAddSuccess = null;
      state.quickBuySuccess = null;
      state.quickBuyLoading = null;
      localStorage.removeItem("buy_now");
    },
  },
  extraReducers: {
    [addOrderAsync.pending]: (state, action) => {
      state.isOrderPlaceLoading = true;
      state.quickBuySuccess = false;
      state.isOrderPlaceSuccess = false;
    },
    [addOrderAsync.fulfilled]: (state, action) => {
      const { quickBuy } = action.payload;
      state.isOrderPlaceLoading = false;
      state.quickBuySuccess = quickBuy ? true : false;
      state.isOrderPlaceSuccess = quickBuy ? false : true;
    },
    [addOrderAsync.rejected]: (state, action) => {
      state.isOrderPlaceLoading = false;
      state.isOrderPlaceSuccess = false;
      state.message = action.payload;
      state.isError = true;
    },
    [getPromoDetailsAsync.pending]: (state, action) => {
      state.getCouponLoading = true;
    },
    [getPromoDetailsAsync.fulfilled]: (state, action) => {
      state.getCouponLoading = false;
      state.getCouponSuccess = true;
      state.couponDetails = action.payload;
    },
    [getPromoDetailsAsync.rejected]: (state, action) => {
      state.getCouponLoading = false;
      state.couponDetails = null;
      state.getCouponError = action.payload;
    },
    [getCartUpdateDetailsAsync.pending]: (state, action) => {
      state.getCartLoading = true;
      state.cartAddLoading = true;
    },
    [getCartUpdateDetailsAsync.fulfilled]: (state, action) => {
      localStorage.removeItem("cart");
      state.getCartLoading = false;
      state.cartItems = action.payload.cartItems;
      state.total = action.payload.total;
      state.discount = action.payload.discount;
      state.grandTotal = action.payload.grandTotal;
      state.cartAddLoading = null;
      localStorage.setItem(
        "cart",
        JSON.stringify({
          total: state.total,
          cartItems: state.cartItems,
          discount: state.discount,
          grandTotal: state.grandTotal,
          shippingPrice: state.shippingPrice,
        })
      );
      state.getCartSuccess = true;
    },
    [getCartUpdateDetailsAsync.rejected]: (state, action) => {
      state.getCartLoading = false;
      state.cart = null;
      state.getCartSuccess = false;
    },
    [getBuyNowCartUpdateDetailsAsync.pending]: (state, action) => {
      state.getBuyNowCartLoading = true;
    },
    [getBuyNowCartUpdateDetailsAsync.fulfilled]: (state, action) => {
      state.getBuyNowCartLoading = false;
      state.buyNowCartItems = action.payload.cartItems;
      state.buyNowTotal = action.payload.total;
      state.buyNowDiscount = action.payload.discount;
      state.buyNowGrandTotal = action.payload.grandTotal;
      localStorage.setItem(
        "buy_now",
        JSON.stringify({
          total: state.buyNowTotal,
          grandTotal: state.buyNowGrandTotal,
          discount: state.buyNowDiscount,
          cartItems: state.buyNowCartItems,
        })
      );
      state.getBuyNowCartSuccess = true;
    },

    [getBuyNowCartUpdateDetailsAsync.rejected]: (state, action) => {
      state.getBuyNowCartLoading = false;
      state.cart = null;
      state.getBuyNowCartSuccess = false;
    },
    [getShippingDetails.pending]: (state, action) => {
      state.getShippingDetailsStatus = "loading";
    },
    [getShippingDetails.fulfilled]: (state, action) => {
      state.getShippingDetailsStatus = "success";
    },
    [getShippingDetails.rejected]: (state, action) => {
      state.getShippingDetailsStatus = "failed";
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  removeCart,
  resetCart,
  deleteCartItem,
  applyDiscountCode,
  applyShippingPrice,
  addToQuickBuyLoading,
  addToQuickBuySuccess,
  applyDiscountCodeQuickBuy,
  resetCartAdd,
  resetQuickBuy,
  changeShippingDetails,
  addToCartFromCartPage,
  removeFromBuyNowCart,
  shippingPrice,
} = cartSlice.actions;
export default cartSlice.reducer;
