import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ErrorImage from '../../assets/images/404.svg';

const ErrorPage = () => {
  return (
    <div>
      <Container className='text-center'>
        <Link to='/'>
          <figure>
            <img src={ErrorImage} alt='' className=' w-50' />
          </figure>
        </Link>
      </Container>
    </div>
  );
};

export default ErrorPage;
