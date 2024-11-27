import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getSubscriberDetailsAsync, logout } from "../../redux/subscriberSlice";

const More = () => {
  const [login, setLogin] = useState(true);
  const navigate = useNavigate();
  const { user, userInfo, isError, message } = useSelector(
    (state) => state.subscribers
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userInfo) {
      if (isError && message === "Not authorize, token failed") {
        dispatch(logout());
      }
      dispatch(getSubscriberDetailsAsync());
    }
  }, [user]);

  return (
    <div>
      <section className="moreContainer">
        <ul>
          <h6>USER</h6>
          <li className="moreContainer-items">
            {user ? (
              <section>
                <Link to="/account">
                  <div>
                    <i className="fa fa-user-circle-o"></i> My Account
                  </div>
                  <small>{user.name}</small>
                </Link>
              </section>
            ) : (
              <Link to="/login">
                <i className="fa  fa-sign-in"></i> Login
              </Link>
            )}
          </li>
          <h6 className="mt-3">POLICIES</h6>
          <li className="moreContainer-items">
            <Link to="/cleaning">Cleaning Facilities</Link>{" "}
          </li>
          <li className="moreContainer-items">
            <Link to="/terms-conditions">Terms & Conditions</Link>{" "}
          </li>
          <li className="moreContainer-items">
            <Link to="/privacy">Privacy Policy</Link>{" "}
          </li>
          <li className="moreContainer-items">
            <Link to="/return">Return Policy</Link>{" "}
          </li>
          <li className="moreContainer-items">
            <Link to="/refund">Refund Policy</Link>{" "}
          </li>
          <li className="moreContainer-items">
            <Link to="/delivery-terms-conditions">
              Delivery Terms and Condition
            </Link>{" "}
          </li>

          <h6 className="mt-3">ABOUT</h6>
          <li className="moreContainer-items">
            <Link to="/about">About Us</Link>{" "}
          </li>

          {user && (
            <li
              onClick={(e) => {
                e.preventDefault();
                dispatch(logout());
                navigate("/");
              }}
            >
              Logout
            </li>
          )}

          <li className="mt-5"></li>
        </ul>
      </section>
      counterHolder
    </div>
  );
};

export default More;
