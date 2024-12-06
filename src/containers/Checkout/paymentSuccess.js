import React from 'react';
import { Container } from 'react-bootstrap';

const PaymentSuccess = () => {
  return (
    <Container>
      <div className='orderSuccess'>
        <div className='orderSuccessContainer'>
          <div className='orderSuccessIcon'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M22 11.08V12a10 10 0 1 1-5.93-9.14'></path>
              <polyline points='22 4 12 14.01 9 11.01'></polyline>
            </svg>
          </div>
          <h1 className='orderSuccessTitle'>Order Successful!</h1>
          <p className='orderSuccessMessage'>
            Thank you for your purchase. Your order has been received and is now
            being processed.
          </p>
          <p className='orderSuccessEmailNotice'>
            A confirmation email has been sent to your registered email address.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default PaymentSuccess;
