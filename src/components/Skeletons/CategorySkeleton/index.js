import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import CarSkeletons from '../CarSkeleton';

const CategorySkeleton = () => {
  const count = [1, 1, 1, 1];
  return (
    <div>
      <Container>
        <CarSkeletons height='2rem' width='30%' margin=' 1rem' />
        <CarSkeletons height='2rem' width='30%' margin=' 1rem' />

        <Row>
          <Col md={3}>
            <CarSkeletons height='1rem' width='40%' margin=' 1rem' />
            <ul>
              <CarSkeletons height='1rem' width='60%' margin=' 1rem' />
              <CarSkeletons height='1rem' width='60%' margin=' 1rem' />
              <CarSkeletons height='1rem' width='60%' margin=' 1rem' />
            </ul>
            <CarSkeletons height='2rem' width='100%' margin=' 1rem' />
            <CarSkeletons height='2rem' width='100%' margin=' 1rem' />
            <CarSkeletons height='2rem' width='100%' margin=' 1rem' />
            <CarSkeletons height='2rem' width='100%' margin=' 1rem' />
            <section className='flex-between' style={{ width: '15rem' }}>
              <CarSkeletons height='2.5rem' width='9rem' margin='1rem' />
              <CarSkeletons height='2.5rem' width='9rem' margin='1rem' />
            </section>
          </Col>
          <Col>
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
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CategorySkeleton;
