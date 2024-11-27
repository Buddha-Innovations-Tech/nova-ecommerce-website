import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AboutImage from '../../assets/images/image.png';

const About = () => {
  return (
    <div>
      <Container>
        <Row className='justify-content-between mt-4'>
          <Col md={5}>
            <section className='aboutInfo'>
              <h1 className='aboutInfo-title'>About Us</h1>
              <p className='aboutInfo-desc'>
                Proudly Share Here With Our Best Selling Products Of Our
                Company, Which Have Gained Huge Appreciation & Confidence Of Our
                Consumers To Use Our Herbal Cosmetics Products Regularly For A
                Longer Period.
              </p>
            </section>
          </Col>

          <Col md={6}>
            <figure className='aboutImage'>
              <img src={AboutImage} alt='' />
            </figure>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
