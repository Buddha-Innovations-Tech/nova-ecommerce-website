import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Modal, Row } from 'react-bootstrap';
import CleanHero from '../../assets/images/cleaning/cheanHero.png';
import CleaningCard from '../../components/CleaningCard';
import House from '../../assets/images/cleaning/housecleaning.png';
import Moving from '../../assets/images/cleaning/movingcleaning.png';
import DeepClean from '../../assets/images/cleaning/deepclean.png';
import Office from '../../assets/images/cleaning/officecleaning.png';
import Warehouse from '../../assets/images/cleaning/warehousecleaning.png';
import School from '../../assets/images/cleaning/schoolcleaning.png';
import WindowClean from '../../assets/images/cleaning/windowcleaning.png';
import Floor from '../../assets/images/cleaning/floorcleaning.png';
import Daily from '../../assets/images/cleaning/dailycleaning.png';
import Main from '../../assets/images/cleaning/maincleaning.png';
import Hygene from '../../assets/images/cleaning/hygeneceleangni.png';
import Hospatility from '../../assets/images/cleaning/hotel.png';
import axios from 'axios';

const CleaningFacility = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setSubmitSuccess(false);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  const [message, setMessage] = useState('');
  const [validationFail, setValidationFail] = useState(false);
  const [submitFailed, setSubmitFailed] = useState(false);

  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (submitSuccess) {
      setShow(true);
    }
  }, [submitSuccess]);

  return (
    <>
      <section className='cleanHero'>
        <Container>
          <Row className='justify-content-between'>
            <Col md={4}>
              <figure className='cleanHero-image'>
                <img src={CleanHero} alt='' />
              </figure>
            </Col>
            <Col md={7}>
              <section className='cleanHero-desc'>
                <h1 className='cleanHero-desc-title'>
                  We Are Professional Cleaing Services Company
                </h1>
                <p className='cleanHero-desc-para'>
                  We have a 5 years experience with cleaning please ask me for
                  references I offer “ fornøyd -garanti” if you’re not happy
                  with the result I will come back within 48 hours to finish and
                  make sure you’re satisfied with the job . ( if this is
                  something you offer ) the offer includes.-cleaning of floor-
                  closets ( inside and out ) oven ( inside and out ) - all
                  surfaces
                </p>
                <button
                  className='bton bton--md bton--primary mb-2'
                  onClick={handleShow}
                >
                  Contact Us
                </button>
              </section>
            </Col>
          </Row>
        </Container>
      </section>

      <Container>
        <section className='serviceHolder'>
          <h2>Our Services</h2>
          <Row>
            <CleaningCard image={House} title='House Cleaning' />
            <CleaningCard image={Moving} title='Moving-related Cleaning' />
            <CleaningCard image={DeepClean} title='Deepclean' />
            <CleaningCard image={Office} title='Office Cleaning' />
            <CleaningCard image={Warehouse} title='WareHouse Cleaning' />
            <CleaningCard image={School} title='School/College Cleaning' />
            <CleaningCard image={WindowClean} title='Window Cleaning' />
            <CleaningCard image={Floor} title='Floor Treatment' />
            <CleaningCard image={Daily} title='Daily Cleaing' />
            <CleaningCard image={Main} title='Main Cleaning' />
            <CleaningCard image={Hygene} title='Hygene Cleaning' />
            <CleaningCard image={Hospatility} title='Hospitality Cleaning' />
          </Row>
        </section>

        <section className='galleryHolder'>
          <h2>Photos</h2>

          <Row>
            <Col md={3}>
              <figure className='galleryHolder-image'>
                <img src={House} alt='' />
              </figure>
            </Col>
            <Col md={3}>
              <figure className='galleryHolder-image'>
                <img src={Moving} alt='' />
              </figure>
            </Col>
            <Col md={3}>
              <figure className='galleryHolder-image'>
                <img src={DeepClean} alt='' />
              </figure>
            </Col>
            <Col md={3}>
              <figure className='galleryHolder-image'>
                <img src={WindowClean} alt='' />
              </figure>
            </Col>
            <Col md={3}>
              <figure className='galleryHolder-image'>
                <img src={Hygene} alt='' />
              </figure>
            </Col>
            <Col md={3}>
              <figure className='galleryHolder-image'>
                <img src={Floor} alt='' />
              </figure>
            </Col>
          </Row>
        </section>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop='static'
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Cleaning Enquiry</Modal.Title>
          </Modal.Header>

          {submitSuccess ? (
            <>
              <Modal.Body>
                <section className='csu m-4'>
                  Your Enquiry has been successfully placed !
                </section>
              </Modal.Body>
              <Modal.Footer>
                <button
                  className='bton bton--md botn--primary'
                  onClick={() => handleClose()}
                >
                  okay
                </button>
              </Modal.Footer>
            </>
          ) : (
            <>
              <Modal.Body>
                <Form>
                  <Row>
                    <Col md={12}>
                      <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                          type='text'
                          onChange={(e) => setFullname(e.target.value)}
                        />
                        {nameError && (
                          <small style={{ color: 'red' }}>
                            Please Enter a valid name!
                          </small>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type='text'
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        {emailError && (
                          <small style={{ color: 'red' }}>
                            Please Enter a valid email!
                          </small>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type='text'
                          onChange={(e) => setPhone(e.target.value)}
                        />
                        {phoneError && (
                          <small style={{ color: 'red' }}>
                            Please Enter a valid phone!
                          </small>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group className='mb-3'>
                        <Form.Label>Message</Form.Label>
                        <Form.Control
                          as='textarea'
                          rows={3}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    {validationFail && (
                      <div className='addedFail'>All fields are required !</div>
                    )}{' '}
                    {submitFailed && (
                      <div className='addedFail'>
                        Something went wrong, Please try again later.
                      </div>
                    )}
                  </Row>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <button
                  className='bton bton--md bton--primary'
                  onClick={async (e) => {
                    e.preventDefault();
                    setEmailError(null);
                    setPhoneError(null);
                    setNameError(null);
                    if (
                      !fullname ||
                      fullname.trim() === '' ||
                      !/([a-zA-Zà-úÀ-Ú]{2,})+\s+([a-zA-Zà-úÀ-Ú\s]{2,})+$/.test(
                        fullname
                      )
                    ) {
                      setNameError(true);
                    }
                    if (
                      !email ||
                      email.trim() === '' ||
                      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(
                        email
                      )
                    ) {
                      setEmailError(true);
                    }
                    if (!phone || phone.trim() === '') {
                      setPhoneError(true);
                    }
                    if (!emailError && !phoneError && !nameError) {
                      const response = await axios.post(
                        '/api/notification/addenquiry',
                        {
                          fullname,
                          email,
                          phone,
                          message,
                        }
                      );
                      if (response.status === 201) {
                        setFullname('');
                        setEmail('');
                        setPhone('');
                        setMessage('');
                        setSubmitSuccess(true);
                      } else {
                        setSubmitFailed(true);
                        setTimeout(() => {
                          setSubmitFailed(false);
                        }, 5000);
                      }
                    }
                  }}
                >
                  Submit
                </button>
                <button
                  className='bton bton--md bton--ghost--danger'
                  onClick={() => handleClose()}
                >
                  cancel
                </button>
              </Modal.Footer>
            </>
          )}
        </Modal>
      </Container>
    </>
  );
};

export default CleaningFacility;
