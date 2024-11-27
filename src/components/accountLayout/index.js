import React, { useEffect } from 'react';
import { MdOutlineReviews } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { getSubscriberDetailsAsync, logout } from '../../redux/subscriberSlice';
import { Col, Container, Row } from 'react-bootstrap';

const AccountLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, userInfo, isError, message } = useSelector(
    (state) => state.subscribers
  );

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      if (!userInfo) {
        if (isError && message === 'Not authorize, token failed') {
          dispatch(logout());
        }
        dispatch(getSubscriberDetailsAsync());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Container>
      <section className='accountWrapper'>
        <Row>
          <Col lg={3} md={12}>
            <ul className='accountTabHolder'>
              <li className='accountTabHolder-items'>
                <NavLink to='/account'>
                  <i className='fa fa-user-o me-3'></i> Account Details
                </NavLink>
              </li>
              <li className='accountTabHolder-items'>
                <NavLink to='/orders'>
                  <i className='fa  fa-sticky-note-o me-3'></i> My Orders
                </NavLink>
              </li>
              {/* <li className='accountTabHolder-items'>
                <NavLink to='/reviews'>
                  <MdOutlineReviews className='review-icon me-3' /> My Reviews
                </NavLink>
              </li> */}
              <li
                className='accountTabHolder-items'
                onClick={async () => {
                  try {
                    dispatch(logout());
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                <span className='acc-lgout'>
                  <i className='fa   fa-sliders me-3'></i> Log Out
                </span>
              </li>
            </ul>
          </Col>

          <Col lg={9} md={12}>
            {children}
          </Col>
        </Row>
      </section>
    </Container>
  );
};

export default AccountLayout;
