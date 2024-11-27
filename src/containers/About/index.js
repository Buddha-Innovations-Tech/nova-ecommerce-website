import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AboutClean from '../../assets/images/cleaning/Aboutclean.png';

const About = () => {
  return (
    <div>
      <Container>
        <section className='homeCleanWrapper'>
          <Row>
            <Col md={6}>
              <h1 className='homeCleanWrapper-title'>
                Sunrise cleaning facility
              </h1>
              <p className='homeCleanWrapper-box'>
                We have 5 years of experience in the cleaning industry, and we
                are happy to provide references upon request. We offer a
                "fornøyd-garanti," which means we guarantee your satisfaction
                with our services. If you're not completely satisfied with the
                job we do, we will return within 48 hours to finish and ensure
                that you are happy with the result. Our range of services
                includes house cleaning, deep cleaning, office and workplace
                cleaning, standard cleaning, warehouse cleaning, school and
                college cleaning, window cleaning, floor treatment, main
                cleaning, daily cleaning, hygiene article supply, and
                hotel/restaurant cleaning facilities. Let us take care of your
                cleaning needs and experience the difference that our expertise
                and commitment to quality can make.
              </p>
              <Link to='/cleaning'>
                <button className='bton bton--md bton--primary mb-2'>
                  View Services
                </button>
              </Link>
              {/* <ul className='homeCleanWrapper-box'>
                <li>house cleaning </li>
                <li>Moving-related cleaning </li>
                <li>Deep clean </li>
                <li>Office and workplace cleaning </li>
                <li>Standard cleaning </li>
                <li>Warehouse cleaning </li>
                <li>School / college cleaning </li>
                <li>Window cleaning </li>
                <li>Floor treatment </li>
                <li>Main cleaning </li>
                <li>Daily cleaning </li>
                <li>Hygiene articles </li>
                <li>Hotel/restaurants cleaning </li>
              </ul> */}
            </Col>
            <Col md={6}>
              <figure className='homeCleanWrapper-image'>
                <img src={AboutClean} alt='' />
              </figure>
            </Col>
          </Row>
        </section>
      </Container>
    </div>
  );
};

export default About;
