import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import CarSkeletons from '../CarSkeleton';

const ItemSkeleton = () => {
  return (
    <div className='mt-3 p-4'>
      <Container>
        <Row>
          <Col md={5}>
            <CarSkeletons height='25rem' />

            <Row>
              <Col md={4}>
                <CarSkeletons height='5rem' width='6rem' margin='1rem' />
              </Col>
              <Col md={4}>
                <CarSkeletons height='5rem' width='6rem' margin='1rem' />
              </Col>
              <Col md={4}>
                <CarSkeletons height='5rem' width='6rem' margin='1rem' />
              </Col>
            </Row>
          </Col>
          <Col md={7}>
            <CarSkeletons height='3rem' width='100%' margin='1rem' />
            <CarSkeletons height='1rem' width='50%' margin='1rem' />
            <hr />
            <CarSkeletons height='3rem' width='50%' margin='2rem 1rem' />
            <CarSkeletons height='2rem' width='50%' margin=' 1rem' />
            <CarSkeletons height='2rem' width='50%' margin='2rem 1rem' />

            <section className='flex-between' style={{ width: '20rem' }}>
              <CarSkeletons height='2.5rem' width='9rem' margin='1rem' />
              <CarSkeletons height='2.5rem' width='9rem' margin='1rem' />
            </section>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ItemSkeleton;
