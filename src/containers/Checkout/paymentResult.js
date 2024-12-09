import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addOrderAsync, removeCart } from "../../redux/cartSlice";

const PaymentResult = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const hostedCheckoutId = searchParams.get("hostedCheckoutId");
  const [error, setError] = useState(null);
  const {
    shippingDetails: sDetails,
    billingDetails: bDetails,
    buyNowTotal,
    buyNowCartItems,
    buyNowGrandTotal,
    grandTotal,
    discount,
    total,
    cartItems,
    ...cart
  } = useSelector((state) => state.cart);

  const checkResultAndPlaceOrder = async () => {
    try {
      let details = JSON.parse(window.localStorage.getItem("details"));

      const response = await axios.get(
        `/api/payment/payment-result/${hostedCheckoutId}`
      );

      if (
        response &&
        response.data.body.createdPaymentOutput.paymentStatusCategory ===
          "SUCCESSFUL"
      ) {
        dispatch(
          addOrderAsync({
            order: {
              details: {
                billingDetails: details?.details?.billingAddress,
                shippingDetails: details?.details?.shippingDetails,
              },
              cart: { cartItems, quickBuy: false },
              shippingPrice: 0.0,
              storePickup: false,
              merchantReference:
                response.data.body.createdPaymentOutput.payment.paymentOutput
                  .references.merchantReference,
            },
          })
        );
      } else if (
        response &&
        response.data.body.status === "CANCELLED_BY_CONSUMER"
      ) {
        setError("Cancelled by consumer");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  useEffect(() => {
    if (cart?.isOrderPlaceSuccess) {
      dispatch(removeCart());
      window.location.href = `${window.location.origin}/payment-success`;
    }
  }, [cart?.isOrderPlaceSuccess]);

  useEffect(() => {
    if (hostedCheckoutId) {
      checkResultAndPlaceOrder();
    }
  }, [hostedCheckoutId]);

  return (
    <>
      <div>Payment Result: {error && <h2>{error}</h2>}</div>
    </>
  );
};

export default PaymentResult;
