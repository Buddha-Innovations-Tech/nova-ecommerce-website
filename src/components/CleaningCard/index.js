import React from 'react';
import { Col } from 'react-bootstrap';

function CleaningCard({ image, title }) {
  return (
    <Col lg={2} md={3} sm={6}>
      <section className='cleaningCard'>
        <figure className='cleaningCard-image'>
          <img src={image} alt='' />
          <figcaption>{title}</figcaption>
        </figure>
      </section>
    </Col>
  );
}

export default CleaningCard;
