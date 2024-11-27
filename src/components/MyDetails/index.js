import React, { useState } from "react";
import { useEffect } from "react";
import { Col, Form, ListGroup, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  // deleteUserProfileAsync,
  getSubscriberDetailsAsync,
  logout,
  resetError,
  updateUserProfileAsync,
} from "../../redux/subscriberSlice";
import Message from "../Message/Message";
import { useNavigate } from "react-router-dom";
import { countryDetails } from "../../data";
const MyModal = ({
  show,
  setShow,
  passwordbox,
  setPasswordbox,
  handleClose,
}) => {
  const dispatch = useDispatch();
  const {
    isError,
    userDetails,
    message,
    updateSuccess,
    updateLoading,
    deleteSuccess,
    updatePasswordSuccess,
  } = useSelector((state) => state.subscribers);

  const [formData, setFormData] = useState({
    name: userDetails?.name,
    phone: userDetails?.phone,
    address: userDetails?.address,
    apartmentNumber: userDetails?.apartmentNumber,
    postalCode: userDetails?.postalCode,
    city: userDetails?.city,
    countryDetails: userDetails?.country,
  });
  useEffect(() => {
    setFormData({
      name: userDetails?.name,
      phone: userDetails?.phone,
      address: userDetails?.address,
      apartmentNumber: userDetails?.apartmentNumber,
      postalCode: userDetails?.postalCode,
      city: userDetails?.city,
      country: userDetails?.country,
    });
  }, []);
  const [passwordData, setPasswordData] = useState({
    previousPassword: "",
    newPassword: "",
    newPassword1: "",
  });
  const [phoneError, setPhoneError] = useState(null);
  const [previousPasswordError, setPreviousPasswordError] = useState(null);

  const [previousPassword, setPreviousPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [passwordValidationError, setPasswordValidationError] = useState(null);

  const [userCountry, setUserCountry] = useState(
    userDetails.currencyCode
      ? {
          Country: "Nepal",
          ISOCode: "NP",
          CurrencyCode: "Rs",
        }
      : { Country: "Nepal", ISOCode: "NP", CurrencyCode: "Rs" }
  );

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const passwordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (
      passwordbox &&
      !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(
        passwordData.newPassword
      )
    ) {
      setPasswordValidationError(true);
      return;
    } else {
      if (passwordbox) {
        dispatch(
          updateUserProfileAsync({
            ...formData,
            ...passwordData,
            countryDetails: userCountry,
            updatePassword: true,
          })
        );
      } else {
        dispatch(
          updateUserProfileAsync({ ...formData, countryDetails: userCountry })
        );
      }
    }
  };

  useEffect(() => {
    if (isError && message === "Old password does not match!") {
      setPreviousPasswordError(true);
    }
    if (isError && message === "Passwords do not match!") {
      setPasswordMatchError(true);
    }
  }, [isError]);
  useEffect(() => {
    if (updateSuccess) {
      dispatch(getSubscriberDetailsAsync());
      updatePasswordSuccess && dispatch(logout());
      handleClose();
    }
  }, [updateSuccess]);

  useEffect(() => {
    console.log(userCountry);
  }, [userCountry]);

  const handleCountryChange = (e) => {
    const selectedCurrencyCode = e.currentTarget.value;
    const countryD = countryDetails.find(
      (c) => c.CurrencyCode === selectedCurrencyCode
    );
    setUserCountry(countryD);
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        handleClose();
        setPasswordData({});
        setPasswordbox(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {passwordMatchError && (
          <Message success={false} setError={setPasswordMatchError}>
            {"Password does not match."}
          </Message>
        )}
        {previousPasswordError && (
          <Message success={false} setError={setPreviousPasswordError}>
            {"Previous Password does not match."}
          </Message>
        )}
        {passwordValidationError && (
          <Message success={false} setError={setPasswordValidationError}>
            {
              "Password must contain a combination of numbers, small letters, capital letters and special characters."
            }
          </Message>
        )}
        <Form>
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  placeholder="name"
                  name="name"
                  value={formData.name}
                  onChange={onChange}
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  placeholder="phone number"
                  value={formData.phone}
                  name="phone"
                  onChange={onChange}
                />
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  name="address"
                  placeholder="Street and House number"
                  value={formData.address}
                  onChange={onChange}
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  name="apartmentNumber"
                  placeholder="Apartment/Suit"
                  value={formData.apartmentNumber}
                  onChange={onChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  placeholder=" postal code"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={onChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  placeholder="city"
                  name="city"
                  value={formData.city}
                  onChange={onChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <button
            className="bton bton--sm bton--nacked"
            onClick={(e) => {
              e.preventDefault();
              setPasswordbox(!passwordbox);
            }}
          >
            change password
          </button>

          {passwordbox ? (
            <>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  value={passwordData.previousPassword}
                  name={"previousPassword"}
                  onChange={passwordChange}
                  placeholder=" Current Password"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder=" New Password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={passwordChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder=" Retype New Password"
                  name="newPassword1"
                  value={passwordData.newPassword1}
                  onChange={passwordChange}
                />
              </Form.Group>
            </>
          ) : null}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button className="bton bton--md bton--primary" onClick={submitHandler}>
          Update
        </button>
        <button
          className="bton bton--md bton--ghost--danger"
          onClick={handleClose}
        >
          Discard
        </button>
      </Modal.Footer>
    </Modal>
  );
};

const MyDetails = () => {
  const [show, setShow] = useState(false);
  const [showDel, setShowDel] = useState(false);
  const [passwordbox, setPasswordbox] = useState(false);
  const { userDetails, deleteSuccess } = useSelector(
    (state) => state.subscribers
  );
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [deleteEmailField, setDeleteEmailField] = useState(null);
  const [emailMatchFailed, setEmailMatchFailed] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const deleteAccount = (e) => {
    // if (userDetails?.email === deleteEmailField) {
    //   dispatch(deleteUserProfileAsync());
    // } else {
    //   setEmailMatchFailed(true);
    //   setTimeout(() => {
    //     setEmailMatchFailed(false);
    //   }, 3000);
    // }
  };

  useEffect(() => {
    if (deleteSuccess) {
      dispatch(logout);
      navigate("/login");
    }
  }, [deleteSuccess]);

  return (
    <>
      <section className="detailsWrapper">
        <h1>My Details</h1>
        <div className="text-end">
          <button
            className="bton bton--sm bton--nacked"
            onClick={() => setShow(true)}
          >
            edit
          </button>
        </div>
        <ListGroup>
          <ListGroup.Item>
            {" "}
            <strong>Name :</strong> {userDetails?.name}
          </ListGroup.Item>
          <ListGroup.Item>
            {" "}
            <strong>Country :</strong> Nepal
          </ListGroup.Item>
          <ListGroup.Item>
            {" "}
            <strong>Phone :</strong> {userDetails?.phone}
          </ListGroup.Item>
          <ListGroup.Item>
            {" "}
            <strong>Email :</strong> {userDetails?.email}
          </ListGroup.Item>
          <ListGroup.Item>
            {" "}
            <strong>Address :</strong> {userDetails?.address}
          </ListGroup.Item>
        </ListGroup>

        <h2 className="mt-4">Delete Account</h2>
        <section className="deleteHolder">
          {!showDel ? (
            <button
              onClick={() => setShowDel(!showDel)}
              className="bton bton--ghost--danger p-2"
            >
              Delete My Account
            </button>
          ) : (
            <section className="deleteHolder-box">
              <span
                className="deleteHolder-box-cross"
                onClick={() => setShowDel(!showDel)}
              >
                <i className="fa fa-close"></i>
              </span>
              <div className="deleteHolder-box-title">
                Are you sure want to delete your account ?
              </div>
              <p className="deleteHolder-box-desc">
                if you delete this account you will not be able to recover any
                histories and information. Please enter your email to confirm
                delete.
              </p>
              {/* <label>Enter your email to confirm delete</label> */}
              <input
                type="text"
                placeholder="Email"
                onChange={(e) => setDeleteEmailField(e.target.value)}
              />
              {emailMatchFailed && (
                <div className="deleteHolder-box-err">Email did not match</div>
              )}
              <button
                className="bton bton--primary bton--sm mt-3"
                onClick={(e) => {
                  e.preventDefault();
                  deleteAccount();
                }}
              >
                Delete my Account
              </button>
            </section>
          )}
        </section>
      </section>

      {userDetails && (
        <MyModal
          show={show}
          setShow={setShow}
          passwordbox={passwordbox}
          setPasswordbox={setPasswordbox}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

export default MyDetails;
