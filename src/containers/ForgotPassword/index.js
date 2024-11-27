import axios from 'axios';
import React, { useState } from 'react';
import Message from '../../components/Message/Message';
import Loader from '../../components/LoaderComponent';
import { Col, Container, Row } from 'react-bootstrap';

const Index = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      if (
        email.trim() !== '' &&
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)
      ) {
        const response = await axios.post('/api/subscribers/forgot-password', {
          email,
        });
        if (response.status === 200) {
          setSuccess(200);
        }
      } else {
        setMessage(true);
      }
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setLoading(false);
  };
  if (loading) <Loader />;
  return (
    <Container>
      <Row className='justify-content-center'>
        <Col md={4}>
          <h1 className='mt-5'>Forgot Password?</h1>
          <p>
            Enter your email. You will receive a link to reset your password
          </p>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='p-1 me-2 w-100 mb-2'
          />
          <button
            className='bton bton--sm bton--primary'
            onClick={submitHandler}
          >
            Submit
          </button>
          {success && (
            <div
              className='addedSuccess mt-3'
              success={true}
              setError={setSuccess}
            >
              A password reset token has been sent in the email
            </div>
          )}

          {message && (
            <div className='loginError'>Please enter your email address</div>
          )}

          {error && (
            <div className='loginError' success={false} setError={setError}>
              {error.Message}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Index;
