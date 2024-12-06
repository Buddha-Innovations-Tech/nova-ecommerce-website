import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Form,
  Modal,
  Row,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import Bill from "../../components/Bill/index";
// import paymentAcceptance from '../../assets/images/payment.png';
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  addOrderAsync,
  changeShippingDetails,
  getBuyNowCartUpdateDetailsAsync,
  getCartUpdateDetailsAsync,
  removeCart,
  resetQuickBuy,
} from "../../redux/cartSlice";
import axios from "axios";
import { countryDetails } from "../../data";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { userDetails, user } = useSelector((state) => state.subscribers);
  const {
    buyNowTotal,
    buyNowCartItems,
    buyNowGrandTotal,
    total,
    cartItems,
    grandtotal,
    discount,
    buyNowDiscount,
    postalCodes,
    getPostalCodesError,
    getPostalCodesStatus,
    ...cart
  } = useSelector((state) => state.cart);
  const [checking, setChecking] = useState(null);
  const [show, setShow] = useState(false);
  const [shippingDetails, setShippingDetails] = useState(null);
  const [billingDetails, setBillingDetails] = useState(null);
  const [useDetailsInput, setUseDetailsInput] = useState(null);
  const [sameBillingAddress, setSameBillingAddress] = useState(null);
  const [fieldError, setFieldError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  const [billingPhoneError, setBillingPhoneError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [billingEmailError, setBillingEmailError] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [billingNameError, setBillingNameError] = useState(null);
  const [addressError, setAddressError] = useState(null);
  const [apartmentError, setApartmentError] = useState(null);
  const [billingApartmentError, setBillingApartmentError] = useState(null);
  const [billingAddressError, setBillingAddressError] = useState(null);
  const [postalCodeError, setPostalCodeError] = useState(null);
  const [billingPostalCodeError, setBillingPostalCodeError] = useState(null);
  const [stateError, setStateError] = useState(null);
  const [billingStateError, setBillingStateError] = useState(null);
  const [countryError, setCountryError] = useState(null);
  const [billingCountryError, setBillingCountryError] = useState(null);
  const [cityError, setCityError] = useState(null);
  const [billingCityError, setBillingCityError] = useState(null);
  const [sameInput, setSameInput] = useState(null);
  const [emptyError, setEmptyError] = useState(null);
  const [errors, setErrors] = useState([]);
  const [valid, setValid] = useState(null);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [storePickup, setStorePickup] = useState(false);

  const validateCart = async () => {
    try {
      const { data } = await axios.post("/api/orders/check-stock", {
        orderItems: cartItems,
      });

      if (data) {
        const { responseArray } = data;
        if (responseArray.length < 1) {
          setErrors(responseArray);
          setValid(true);
          return true;
        } else {
          setErrors(responseArray);
          setValid(false);
          return false;
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
          return true;
        } else {
          setErrors(responseArray);
          setValid(false);
          return false;
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setShow(false);
    navigate("/");
  };
  const handleShow = () => setShow(true);

  const handleShippingInput = (e) => {
    const { name, value } = e.target;
    setShippingDetails({ ...shippingDetails, [name]: value });
    if (sameBillingAddress) {
      setBillingDetails({ ...shippingDetails });
    }
  };
  const handleBillingInput = (e) => {
    const { name, value } = e.target;
    setBillingDetails({ ...billingDetails, [name]: value });
  };

  useEffect(() => {
    if (!sameBillingAddress) {
      resetBillingDetails();
    } else {
      setBillingDetails({ ...shippingDetails });
    }
  }, [sameBillingAddress]);

  const handleUseMyDetails = (e) => {
    if (!e.target.checked) {
      setUseDetailsInput(false);
    } else {
      setUseDetailsInput(true);
      if (userDetails) {
        setShippingDetails({
          name: userDetails.name,
          phone: userDetails.phone,
          email: userDetails.email,
          address: userDetails.address,
          apartmentNumber: userDetails.apartmentNumber,
          city: userDetails.city,
          // country: userDetails.country,
          country: countryDetails[0].ISOCode,
          postalCode: userDetails.postalCode,
        });
      } else {
        navigate("/login");
      }
    }
  };

  const resetShippingForm = () => {
    setShippingDetails({
      name: "",
      phone: "",
      email: "",
      address: "",
      apartmentNumber: "",
      city: "",
      country: countryDetails[0].ISOCode,
      postalCode: "",
    });
  };
  const resetBillingDetails = () => {
    setBillingDetails({
      name: "",
      phone: "",
      email: "",
      address: "",
      apartmentNumber: "",
      city: "",
      country: countryDetails[0].ISOCode,
      postalCode: "",
    });
  };

  useEffect(() => {
    if (!useDetailsInput) {
      resetShippingForm();
    }
  }, [useDetailsInput]);
  // useEffect(() => {
  //   if (cart?.isOrderPlaceSuccess) {
  //     setShow(true);
  //     dispatch(removeCart());
  //   }
  // }, [cart?.isOrderPlaceSuccess]);
  // useEffect(() => {
  //   if (cart?.quickBuySuccess) {
  //     setShow(true);
  //     dispatch(resetQuickBuy());
  //   }
  // }, [cart?.quickBuySuccess]);

  // useEffect(() => {
  //   console.log(shippingDetails);
  // }, [shippingDetails]);

  const resetErrors = () => {
    setPhoneError(null);
    setBillingPhoneError(null);
    setNameError(null);
    setBillingNameError(null);
    setEmailError(null);
    setBillingEmailError(null);
    setAddressError(null);
    setBillingAddressError(null);
    setBillingAddressError(null);
    setCityError(null);
    setBillingCityError(null);
    setStateError(null);
    setBillingStateError(null);
    setApartmentError(null);
    setCountryError(null);
    setBillingCountryError(null);
  };

  const submitHandler = async () => {
    resetErrors();

    // const isShippingFeasible = true;
    if (!storePickup) {
      if (!location.pathname.includes("buy-now")) {
        const isValid = await validateCart();
        if (isValid) {
          validate();
          setChecking(true);
        } else {
          navigate("/cart");
        }
      }
      if (location.pathname.includes("buy-now")) {
        const isValid = await buyNowValidate();
        if (isValid) {
          validate();
          setChecking(true);
        } else {
          navigate("/cart/buy-now");
        }
      }
    } else {
      !location.pathname.includes("buy-now")
        ? navigate("/checkout", {
            state: { shippingPrice: 0, storePickup: true },
          })
        : navigate("/checkout/buy-now", {
            state: { shippingPrice: 0, storePickup: true },
          });
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
  }, [user]);

  const checkFieilds = async () => {
    if (checking !== null && checking === true) {
      if (
        nameError !== null &&
        nameError === false &&
        billingNameError !== null &&
        billingNameError === false &&
        phoneError !== null &&
        phoneError === false &&
        billingPhoneError !== null &&
        billingPhoneError === false &&
        emailError !== null &&
        emailError === false &&
        billingEmailError !== null &&
        billingEmailError === false &&
        addressError !== null &&
        addressError === false &&
        billingAddressError !== null &&
        billingAddressError === false &&
        apartmentError !== null &&
        apartmentError === false &&
        billingApartmentError !== null &&
        billingApartmentError === false &&
        cityError !== null &&
        cityError === false &&
        billingCityError !== null &&
        billingCityError === false &&
        countryError !== null &&
        countryError === false &&
        billingCountryError !== null &&
        billingCountryError === false &&
        postalCodeError !== null &&
        postalCodeError === false &&
        billingPostalCodeError !== null &&
        billingPostalCodeError === false
      ) {
        setChecking(false);
        localStorage.setItem(
          "details",
          JSON.stringify({
            details: {
              billingAddress: sameBillingAddress
                ? { ...shippingDetails }
                : billingDetails,
              shippingDetails,
            },
          })
        );
        dispatch(changeShippingDetails(shippingDetails));
        // calculate();
        // !location.pathname.includes("buy-now")
        //   ? navigate("/checkout")
        //   : navigate("/checkout/buy-now");
        !location.pathname.includes("buy-now")
          ? navigate("/checkout", {
              state: { shippingPrice: shippingPrice, storePickup: false },
            })
          : navigate("/checkout/buy-now", {
              state: { shippingPrice: shippingPrice, storePickup: false },
            });
      } else {
      }
    }
    setChecking(null);
  };
  useEffect(() => {
    checkFieilds();
  }, [checking]);
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

  const validate = async () => {
    // Name validation
    if (
      !shippingDetails["name"] ||
      !shippingDetails["name"].trim() === "" ||
      !/([a-zA-Zà-úÀ-Ú]{2,})+\s+([a-zA-Zà-úÀ-Ú\s]{2,})+$/.test(
        shippingDetails["name"]
      )
    ) {
      setNameError((prev) => (prev = true));
    } else {
      setNameError((prev) => (prev = false));
    }
    if (
      (!sameBillingAddress && billingDetails["name"] === "") ||
      !billingDetails["name"]?.trim() === "" ||
      !/([a-zA-Zà-úÀ-Ú]{2,})+\s+([a-zA-Zà-úÀ-Ú\s]{2,})+$/.test(
        billingDetails["name"]
      )
    ) {
      setBillingNameError((prev) => (prev = true));
    } else {
      setBillingNameError((prev) => (prev = false));
    }
    // Phone validation
    if (!shippingDetails["phone"] || !shippingDetails["phone"].trim() === "") {
      setPhoneError((prev) => (prev = true));
    } else {
      setPhoneError((prev) => (prev = false));
    }
    if (
      (!sameBillingAddress && !billingDetails["phone"]) ||
      !billingDetails["phone"]?.trim() === ""
    ) {
      setBillingPhoneError((prev) => (prev = true));
    } else {
      setBillingPhoneError((prev) => (prev = false));
    }

    // Email Validation
    if (
      !shippingDetails["email"] ||
      !shippingDetails["email"].trim() === "" ||
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(
        shippingDetails["email"]
      )
    ) {
      setEmailError((prev) => (prev = true));
    } else {
      setEmailError((prev) => (prev = false));
    }
    if (
      (!sameBillingAddress && !billingDetails["email"]) ||
      !billingDetails["email"]?.trim() === "" ||
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(
        billingDetails["email"]
      )
    ) {
      setBillingEmailError((prev) => (prev = true));
    } else {
      setBillingEmailError((prev) => (prev = false));
    }
    // ADDRESS 1 Validation
    if (
      !shippingDetails["address"] ||
      !shippingDetails["address"].trim() === ""
    ) {
      setAddressError((prev) => (prev = true));
    } else {
      setAddressError((prev) => (prev = false));
    }
    if (
      (!sameBillingAddress && !billingDetails["address"]) ||
      !billingDetails["address"]?.trim() === ""
    ) {
      setBillingAddressError((prev) => (prev = true));
    } else {
      setBillingAddressError((prev) => (prev = false));
    }
    // ADDRESS 2 Validation
    if (
      !shippingDetails["apartmentNumber"] ||
      !shippingDetails["apartmentNumber"].trim() === ""
    ) {
      setApartmentError((prev) => (prev = true));
    } else {
      setApartmentError((prev) => (prev = false));
    }
    if (
      (!sameBillingAddress && !billingDetails["apartmentNumber"]) ||
      !billingDetails["apartmentNumber"]?.trim() === ""
    ) {
      setBillingApartmentError((prev) => (prev = true));
    } else {
      setBillingApartmentError((prev) => (prev = false));
    }
    // City Validation
    if (!shippingDetails["city"] || !shippingDetails["city"].trim() === "") {
      setCityError((prev) => (prev = true));
    } else {
      setCityError((prev) => (prev = false));
    }
    if (
      (!sameBillingAddress && !billingDetails["city"]) ||
      !billingDetails["city"]?.trim() === ""
    ) {
      setBillingCityError((prev) => (prev = true));
    } else {
      setBillingCityError((prev) => (prev = false));
    }
    // Country Validation
    if (
      !shippingDetails["country"] ||
      !shippingDetails["country"].trim() === ""
    ) {
      setCountryError((prev) => (prev = true));
    } else {
      setCountryError((prev) => (prev = false));
    }
    if (
      (!sameBillingAddress && !billingDetails["country"]) ||
      !billingDetails["country"]?.trim() === ""
    ) {
      setBillingCountryError((prev) => (prev = true));
    } else {
      setBillingCountryError((prev) => (prev = false));
    }
    // Postalcode Validation
    if (
      !shippingDetails["postalCode"] ||
      !shippingDetails["postalCode"].trim() === ""
    ) {
      setPostalCodeError((prev) => (prev = true));
    } else {
      setPostalCodeError((prev) => (prev = false));
    }
    if (
      (!sameBillingAddress && !billingDetails["postalCode"]) ||
      !billingDetails["postalCode"]?.trim() === ""
    ) {
      setBillingPostalCodeError((prev) => (prev = true));
    } else {
      setBillingPostalCodeError((prev) => (prev = false));
    }
    // City Validation
    if (!shippingDetails["city"] || !shippingDetails["city"].trim() === "") {
      setCityError((prev) => (prev = true));
    } else {
      setCityError((prev) => (prev = false));
    }
    if (
      (!sameBillingAddress && !billingDetails["city"]) ||
      !billingDetails["city"]?.trim() === ""
    ) {
      setBillingCityError((prev) => (prev = true));
    } else {
      setBillingCityError((prev) => (prev = false));
    }
  };

  return (
    <>
      <section className="shippingWrapper">
        <Container>
          <Row>
            <Col md={7}>
              <section className="shippingForm ">
                <section className="mt-3">
                  {!storePickup ? (
                    <section>
                      <Form>
                        <h2>Shipping Details</h2>
                        <Form.Group
                          className="mb-3 mt-4"
                          controlId="formBasicCheckbox"
                        >
                          <Form.Check
                            type="checkbox"
                            label="Use my Address Details"
                            onChange={handleUseMyDetails}
                          />
                        </Form.Group>
                        <Row>
                          <Col>
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail"
                            >
                              <Form.Label>Full Name</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Enter Full Name"
                                name="name"
                                value={shippingDetails?.name}
                                onChange={handleShippingInput}
                                className={nameError && "reqError"}
                              />
                            </Form.Group>
                            {nameError && (
                              <small style={{ color: "red" }}>
                                Invalid Name!
                              </small>
                            )}
                          </Col>
                          <Col>
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail"
                            >
                              <Form.Label>
                                Phone Number
                                <OverlayTrigger
                                  key="top"
                                  placement="top"
                                  overlay={
                                    <Tooltip id="tooltip-top">
                                      In case we needed to contact you
                                    </Tooltip>
                                  }
                                >
                                  <i className="fa  fa-info-circle ms-3 cpntr"></i>
                                </OverlayTrigger>
                              </Form.Label>
                              <Form.Control
                                type="text"
                                name="phone"
                                placeholder="Enter Phone Number"
                                value={shippingDetails?.phone}
                                className={phoneError && "reqError"}
                                onChange={handleShippingInput}
                              />
                            </Form.Group>
                            {phoneError && (
                              <small style={{ color: "red" }}>
                                Invalid Phone!
                              </small>
                            )}
                          </Col>
                          <Col md={12}>
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail"
                            >
                              <Form.Label>Email</Form.Label>
                              <Form.Control
                                type="email"
                                placeholder="Enter Email"
                                name="email"
                                value={shippingDetails?.email}
                                className={emailError && "reqError"}
                                onChange={handleShippingInput}
                              />
                            </Form.Group>
                            {emailError && (
                              <small style={{ color: "red" }}>
                                Invalid Email!
                              </small>
                            )}
                          </Col>
                          <Col md={12}>
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail"
                            >
                              <Form.Label>Address line 1</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Enter Address"
                                name="address"
                                value={shippingDetails?.address}
                                onChange={handleShippingInput}
                                className={addressError && "reqError"}
                              />
                            </Form.Group>
                            {addressError && (
                              <small style={{ color: "red" }}>
                                Invalid Address!
                              </small>
                            )}
                          </Col>
                          <Col md={12}>
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail"
                            >
                              <Form.Label>Address line 2 (optional)</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Apartment/Suit"
                                name="apartmentNumber"
                                value={shippingDetails?.apartmentNumber}
                                onChange={handleShippingInput}
                                className={apartmentError && "reqError"}
                              />
                            </Form.Group>
                            {apartmentError && (
                              <small style={{ color: "red" }}>
                                Invalid Apartment Number!
                              </small>
                            )}
                          </Col>

                          <Col md={6}>
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail"
                            >
                              <Form.Label>Postal Code</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder=" 0010 – 9990"
                                name="postalCode"
                                value={shippingDetails?.postalCode}
                                onChange={handleShippingInput}
                                className={postalCodeError && "reqError"}
                              />
                            </Form.Group>
                            {postalCodeError && (
                              <small style={{ color: "red" }}>
                                {postalCodeError}
                              </small>
                            )}
                          </Col>
                          <Col md={6}>
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail"
                            >
                              <Form.Label>City</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="your city"
                                name="city"
                                value={shippingDetails?.city}
                                onChange={handleShippingInput}
                                className={cityError && "reqError"}
                              />
                            </Form.Group>
                            {cityError && (
                              <small style={{ color: "red" }}>
                                Invalid city!
                              </small>
                            )}
                          </Col>
                        </Row>
                      </Form>

                      <hr />
                      <Row>
                        <section className="paymentMethod" key={1}>
                          <h2>Billing Address</h2>
                          <Form.Group className="mb-3 mt-4">
                            <Form.Check
                              type="radio"
                              label="Same as Shipping Address"
                              checked={sameBillingAddress}
                              onChange={() => {
                                setSameBillingAddress(true);
                              }}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3 ">
                            <Form.Check
                              onChange={() => {
                                setSameBillingAddress(false);
                              }}
                              type="radio"
                              label="Use Different Address"
                              checked={!sameBillingAddress}
                            />
                          </Form.Group>
                        </section>
                        {!sameBillingAddress && (
                          <Form>
                            <Row>
                              <Col>
                                <Form.Group
                                  className="mb-3"
                                  controlId="formBasicEmail"
                                >
                                  <Form.Label>Full Name</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter Full Name"
                                    name="name"
                                    value={billingDetails?.name}
                                    onChange={handleBillingInput}
                                    className={billingNameError && "reqError"}
                                  />
                                </Form.Group>
                                {billingNameError && (
                                  <small style={{ color: "red" }}>
                                    Invalid Name!
                                  </small>
                                )}
                              </Col>
                              <Col>
                                <Form.Group
                                  className="mb-3"
                                  controlId="formBasicEmail"
                                >
                                  <Form.Label>
                                    Phone Number
                                    <OverlayTrigger
                                      key="top"
                                      placement="top"
                                      overlay={
                                        <Tooltip id="tooltip-top">
                                          In case we needed to contact you
                                        </Tooltip>
                                      }
                                    >
                                      <i className="fa  fa-info-circle ms-3 cpntr"></i>
                                    </OverlayTrigger>
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    name="phone"
                                    placeholder="Enter Phone Number"
                                    value={billingDetails?.phone}
                                    onChange={handleBillingInput}
                                    className={billingPhoneError && "reqError"}
                                  />
                                </Form.Group>
                                {billingPhoneError && (
                                  <small style={{ color: "red" }}>
                                    Invalid Phone
                                  </small>
                                )}
                              </Col>
                              <Col md={12}>
                                <Form.Group
                                  className="mb-3"
                                  controlId="formBasicEmail"
                                >
                                  <Form.Label>Email</Form.Label>
                                  <Form.Control
                                    type="email"
                                    placeholder="Enter Email"
                                    name="email"
                                    value={billingDetails?.email}
                                    onChange={handleBillingInput}
                                    className={billingEmailError && "reqError"}
                                  />
                                </Form.Group>
                                {billingEmailError && (
                                  <small style={{ color: "red" }}>
                                    Invalid Email!
                                  </small>
                                )}
                              </Col>
                              <Col md={12}>
                                <Form.Group
                                  className="mb-3"
                                  controlId="formBasicEmail"
                                >
                                  <Form.Label>
                                    Street and House number
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter Address"
                                    name="address"
                                    value={billingDetails?.address}
                                    onChange={handleBillingInput}
                                    className={
                                      billingAddressError && "reqError"
                                    }
                                  />
                                </Form.Group>
                                {billingAddressError && (
                                  <small style={{ color: "red" }}>
                                    Invalid Address!
                                  </small>
                                )}
                              </Col>
                              <Col md={12}>
                                <Form.Group
                                  className="mb-3"
                                  controlId="formBasicEmail"
                                >
                                  <Form.Label>
                                    Apartment,Suit,etc (optional)
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Apartment/Suit"
                                    name="apartmentNumber"
                                    value={billingDetails?.apartmentNumber}
                                    onChange={handleBillingInput}
                                    className={
                                      billingApartmentError && "reqError"
                                    }
                                  />
                                </Form.Group>
                                {billingApartmentError && (
                                  <small style={{ color: "red" }}>
                                    Invalid Apartment!
                                  </small>
                                )}
                              </Col>
                              <Col md={6}>
                                <Form.Group
                                  className="mb-3"
                                  controlId="formBasicEmail"
                                >
                                  <Form.Label>Postal Code</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder=" 0010 – 9990"
                                    name="postalCode"
                                    value={billingDetails?.postalCode}
                                    onChange={handleBillingInput}
                                    className={
                                      billingPostalCodeError && "reqError"
                                    }
                                  />
                                </Form.Group>
                                {billingPostalCodeError && (
                                  <small style={{ color: "red" }}>
                                    Invalid Postal Code!
                                  </small>
                                )}
                              </Col>
                              <Col md={6}>
                                <Form.Group
                                  className="mb-3"
                                  controlId="formBasicEmail"
                                >
                                  <Form.Label>City</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="your city"
                                    name="city"
                                    value={billingDetails?.city}
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                          </Form>
                        )}
                      </Row>
                      <hr />
                    </section>
                  ) : null}
                  <Row>
                    {/* <section className='paymentMethod'>
                      <h2> Payment Method</h2>
                      <div className='text-muted'>
                        All transactions are secure and encrypted
                      </div>

                      <img
                        src={paymentAcceptance}
                        alt=''
                        style={{ width: '10rem', marginTop: '1rem' }}
                      />


                    </section> */}
                  </Row>
                  <button
                    className="bton bton--primary bton--lg"
                    onClick={submitHandler}
                  >
                    Proceed to Checkout
                  </button>
                </section>
              </section>
            </Col>

            <Col>
              <Bill />
            </Col>
          </Row>
        </Container>
      </section>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <section className="text-center">
            <div>
              <i
                className="fa  fa-angellist mb-3 "
                style={{ color: "green", fontSize: "3.5rem" }}
              ></i>
            </div>
            <strong>Your Order Has been Placed Sucessfully!!!</strong>
            <p className="mt-2">Please visit our store to get your order.</p>
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

export default Shipping;
