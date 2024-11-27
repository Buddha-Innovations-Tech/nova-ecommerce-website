import axios from 'axios';
import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import LoaderComponent from '../../components/LoaderComponent';
import Message from '../../components/Message/Message';

const Index = () => {
  const [password, setPassword] = useState(null);
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(null);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const { token } = useParams();
  const submitHandler = async (e) => {
    setValidationError(null);
    if (
      !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(
        password
      )
    ) {
      setValidationError(true);
      return;
    }
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios.put(
        `/api/subscribers/reset-password/${token}`,
        {
          password,
        }
      );
      if (response.status === 200) {
        setSuccess(200);
      }
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setLoading(false);
  };
  if (loading) <LoaderComponent />;
  return (
    <Container>
      <Row className='justify-content-center'>
        <Col md={4}>
          <h1 className='mt-5'>Reset Password.</h1>
          <p>Enter your new password.</p>
          <div
            style={{
              display: 'flex',
              position: 'relative',
              alignItems: 'center',
            }}
          >
            <input
              type={show ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='p-1 me-2 w-100 mb-2'
            />
            <span
              style={{
                position: 'absolute',
                right: '10px',
              }}
              onClick={() => setShow(!show)}
            >
              <i className={show ? 'fa fa-eye-slash' : 'fa fa-eye'} />
            </span>
          </div>
          <button
            className='bton bton--sm bton--primary'
            onClick={submitHandler}
          >
            Submit
          </button>
          {success && (
            <div className='addedSuccess' success={true} setError={setSuccess}>
              Your password has been updated!
            </div>
          )}
          {error && (
            <div className='loginError' success={false} setError={setError}>
              {error.Message}
            </div>
          )}
          {validationError && (
            <div
              className='loginError'
              success={false}
              setError={setValidationError}
            >
              Password must contain a combination of numbers, small letters,
              capital letters and special characters.
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Index;
