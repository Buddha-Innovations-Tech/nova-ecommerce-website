import React from 'react';
import { Col, Row } from 'react-bootstrap';
import CarSkeletons from '../CarSkeleton';

const CategoryProdSkeletons = () => {
  const count = [1, 1, 1, 1];
  return (
    <Col md={9}>
      <Row>
        {count.map((m) => (
          <Col md={4}>
            <CarSkeletons height='15rem' margin='1rem'></CarSkeletons>
            <CarSkeletons height='2.9rem' margin='1rem'></CarSkeletons>
            <section className='flex-between'>
              <CarSkeletons
                height='1rem'
                width='3.5rem'
                margin='1rem'
              ></CarSkeletons>
              <CarSkeletons
                height='1rem'
                width='3.5rem'
                margin='1rem'
              ></CarSkeletons>
            </section>
          </Col>
        ))}{' '}
      </Row>
    </Col>
  );
};

export default CategoryProdSkeletons;
