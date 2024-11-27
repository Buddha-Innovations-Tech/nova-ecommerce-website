import React, { useEffect, useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import Bill from "../../components/Bill/index";
import paymentAcceptance from "../../assets/images/netsLogoColored.svg";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import {
  addOrderAsync,
  changeShippingDetails,
  getBuyNowCartUpdateDetailsAsync,
  getCartUpdateDetailsAsync,
  removeCart,
  resetQuickBuy,
} from "../../redux/cartSlice";
import axios from "axios";
import Choosepayment from "../../components/Choosepayment";
// import Message from '../../components/Message/Message';
import { BsCash } from "react-icons/bs";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const shippingPrice = location.state.shippingPrice;
  const storePickup = location.state.storePickup;
  const details = JSON.parse(localStorage.getItem("details"));

  const { user } = useSelector((state) => state.subscribers);
  const {
    shippingDetails: sDetails,
    billingDetails: bDetails,
    buyNowTotal,
    buyNowCartItems,
    buyNowGrandTotal,
    total,
    cartItems,
    ...cart
  } = useSelector((state) => state.cart);

  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleClose = () => {
    setShow(false);
    navigate("/");
  };

  useEffect(() => {
    if (!storePickup) {
      !details &&
        location.pathname.includes("buy-now") &&
        navigate("/shipping/buy-now");
      !details &&
        !location.pathname.includes("buy-now") &&
        navigate("/shipping");
    }
  }, [details, storePickup]);

  useEffect(() => {
    if (!storePickup && (!sDetails || !bDetails)) {
      dispatch(
        changeShippingDetails({
          shippingDetails: details?.details?.shippingDetails,
          billingDetails: details?.details?.billingAddress,
        })
      );
    }
  }, [dispatch, sDetails, bDetails, storePickup]);

  useEffect(() => {
    if (cart?.isOrderPlaceSuccess) {
      setShow(true);
      dispatch(removeCart());
    }
  }, [cart?.isOrderPlaceSuccess]);

  useEffect(() => {
    if (cart?.quickBuySuccess) {
      setShow(true);
      dispatch(resetQuickBuy());
    }
  }, [cart?.quickBuySuccess]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
  }, [success, dispatch]);

  const handleSubmit = async () => {
    dispatch(
      addOrderAsync({
        order: {
          details: {
            billingDetails: bDetails,
            shippingDetails: sDetails,
          },
          cart: !location.pathname.includes("buy-now")
            ? { cartItems, quickBuy: false }
            : {
                cartItems: buyNowCartItems,
                quickBuy: true,
              },
          shippingPrice: shippingPrice,
          storePickup: false,
        },
      })
    );
    setShow(!show);
  };

  useEffect(() => {
    if (!location.pathname.includes("buy-now") && cartItems.length) {
      dispatch(getCartUpdateDetailsAsync({ cart: { cartItems } }));
    }
  }, []);

  useEffect(() => {
    if (location.pathname.includes("buy-now") && buyNowCartItems?.length) {
      dispatch(
        getBuyNowCartUpdateDetailsAsync({
          buyNowCart: { buyNowCartItems },
        })
      );
    }
  }, []);

  return (
    <>
      <section className="shippingWrapper">
        <Container>
          <Row>
            {/* <Col md={7}>
              <section className="shippingForm ">
                <section className="mt-3">
                  <Row>
                    <section className="paymentMethod">
                      <img
                        src={paymentAcceptance}
                        alt=""
                        style={{ width: "10rem", marginTop: "1rem" }}
                      />
                      {<div id="checkout-container-div"></div>}
                    </section>
                  </Row>
                </section>
              </section>
            </Col> */}

            <Col>
              <Bill page="checkout" shippingPrice={shippingPrice} />
              <section className="checkoutFinal">
                <div className="checkoutFinal-method">
                  <b>Payment Method: </b> &nbsp;
                  <span>
                    <BsCash /> Cash ON delivery
                  </span>
                </div>
                <button
                  className="bton bton--lg bton--primary"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Confirm Order
                </button>
              </section>
            </Col>
          </Row>
        </Container>
      </section>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <section className="text-center">
            <div>
              <i
                className="fa  fa-angellist mb-3 "
                style={{ color: "green", fontSize: "3.5rem" }}
              ></i>
            </div>
            <strong>Your Order Has been Placed Sucessfully!!!</strong>
          </section>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="bton bton--full bton--primary"
            onClick={handleClose}
          >
            Okay
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Checkout;
