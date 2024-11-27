import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import CarSkeletons from '../CarSkeleton';

const ProductSkeletons = () => {
  const count = [1, 2, 3, 4];
  return (
    <section className='mt-5'>
      <Container>
        <section style={{ marginTop: '5rem', marginBottom: '3rem' }}>
          <CarSkeletons height='1.5rem' width='30rem' />
        </section>
        <Row>
          {count.map((m) => (
            <Col md={3} key={m}>
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
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default ProductSkeletons;
