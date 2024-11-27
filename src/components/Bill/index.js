import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Index({ show, errors, setErrors, page, shippingPrice }) {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    cartItems,
    buyNowCartItems,
    total,
    discount,
    grandTotal,
    buyNowTotal,
    buyNowDiscount,
    buyNowGrandTotal,
    cartAddLoading,
  } = useSelector((state) => state.cart);
  const { currencyValue, currencyCode } = useSelector(
    (state) => state.products
  );
  const [valid, setValid] = useState(null);
  const validate = async () => {
    try {
      const { data } = await axios.post("/api/orders/check-stock", {
        orderItems: cartItems,
      });
      if (data) {
        const { responseArray } = data;
        if (responseArray.length < 1) {
          setErrors(responseArray);
          setValid(true);
        } else {
          setErrors(responseArray);
          setValid(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  const buyNowValidate = async () => {
    try {
      const { data } = await axios.post("/api/orders/check-stock", {
        orderItems: buyNowCartItems,
      });
      if (data) {
        const { responseArray } = data;
        if (responseArray.length < 1) {
          setErrors(responseArray);
          setValid(true);
        } else {
          setErrors(responseArray);
          setValid(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = async () => {
    setErrors([]);
    if (!location.pathname.includes("buy-now")) {
      // navigate('/shipping');
      await validate();
    }
    if (location.pathname.includes("buy-now")) {
      await buyNowValidate();
    }
    // !location.pathname.includes('buy-now')
    //               ? '/shipping'
    //               : '/shipping/buy-now'
  };

  // useEffect(() => {
  //   if (errors.invalid !== null && errors.invalid === false) {
  //     console.log('done ');
  //   }
  // }, [errors?.invalid]);
  useEffect(() => {
    if (valid === true) {
      !location.pathname.includes("buy-now")
        ? navigate("/shipping")
        : navigate("/shipping/buy-now");
    }
  }, [valid]);

  return !location.pathname.includes("buy-now") ? (
    <Fragment>
      <section className="billDetails">
        {" "}
        <h3 className="billDetails-title">Billing Details</h3>
        <section className="calc mt-3">
          <div className="calc-holder ">
            <div className="calc-holder-detail">Total M.R.P</div>
            <div className="calc-holder-number">
              {currencyCode}{" "}
              {Number(
                Number(total).toFixed(2) * Number(currencyValue).toFixed(2)
              ).toFixed(2)}
            </div>
          </div>

          <div className="calc-holder">
            <div className="calc-holder-detail">Discount</div>
            <div className="calc-holder-number">
              {currencyCode}{" "}
              {Number(
                Number(discount).toFixed(2) * Number(currencyValue).toFixed(2)
              ).toFixed(2)}
            </div>
          </div>
        </section>
        <div className="calc-holder mt-2">
          <div className="calc-holder-detail">
            <strong>GRAND-TOTAL</strong>
          </div>
          <div className="calc-holder-number ">
            <strong>
              {currencyCode}
              {page === "checkout"
                ? Number(
                    Number(grandTotal * currencyValue) +
                      Number(shippingPrice) * Number(currencyValue).toFixed(2)
                  ).toFixed(2)
                : (
                    Number(
                      Number(total).toFixed(2) *
                        Number(currencyValue).toFixed(2)
                    ).toFixed(2) -
                    Number(
                      Number(discount).toFixed(2) *
                        Number(currencyValue).toFixed(2)
                    ).toFixed(2)
                  ).toFixed(2)}
            </strong>
          </div>
        </div>
        {show ? (
          <section className="mt-3">
            <button
              onClick={handleSubmit}
              className="bton bton--full bton--primary"
            >
              Checkout
            </button>
          </section>
        ) : null}
      </section>
    </Fragment>
  ) : (
    <Fragment>
      <section className="billDetails">
        {" "}
        <h2 className="">Billing Details</h2>
        <section className="calc mt-3">
          <div className="calc-holder ">
            <div className="calc-holder-detail">Total M.R.P</div>
            <div className="calc-holder-number">
              {currencyCode} {buyNowTotal * Number(currencyValue)}
            </div>
          </div>
          <div className="calc-holder ">
            <div className="calc-holder-detail">Shipping cost</div>
            <div className="calc-holder-number">
              {/* {page === "checkout"
                ? (Number(shippingPrice) * Number(currencyValue)).toFixed(2)
                : "Will be calculated later"} */}
              {currencyCode}{" "}
              {page === "checkout"
                ? `${currencyCode} ${Number(Number(shippingPrice)).toFixed(2)} `
                : "Will be calculated later"}
            </div>
          </div>
          <div className="calc-holder">
            <div className="calc-holder-detail">Discount</div>
            <div className="calc-holder-number">
              {currencyCode}{" "}
              {(buyNowDiscount * Number(currencyValue)).toFixed(2)}
            </div>
          </div>
        </section>
        <div className="calc-holder mt-2">
          <div className="calc-holder-detail">
            <strong>GRAND-TOTAL</strong>
          </div>
          <div className="calc-holder-number ">
            <strong>
              {currencyCode}{" "}
              {page === "checkout"
                ? (
                    buyNowGrandTotal * Number(currencyValue) +
                    Number(shippingPrice) * Number(currencyValue)
                  ).toFixed(2)
                : (buyNowGrandTotal * Number(currencyValue)).toFixed(2)}{" "}
            </strong>
          </div>
        </div>
        {show ? (
          <section className="mt-3">
            <button
              onClick={handleSubmit}
              className="bton bton--full bton--primary"
            >
              Checkout
            </button>
          </section>
        ) : null}
      </section>
    </Fragment>
  );
}

export default Index;
