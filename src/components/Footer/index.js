import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import paymentAcceptance from '../../assets/images/netsLogoColored.svg';
import VisaMaster from '../../assets/images/mastercard-visa.jpg';
import tiktokIcon from '../../assets/images/tiktok.svg';
import American from '../../assets/images/americanExp.png';
import Vipps from '../../assets/images/vipps.png';
// import loorajWhite from '../../assets/images/looraj_white.svg';
import loorajWhite from '../../assets/images/logo.png';
import { RiFacebookCircleLine } from 'react-icons/ri';
import { FaInstagram } from 'react-icons/fa';
import { AiOutlineYoutube } from 'react-icons/ai';
import { PiTiktokLogo } from 'react-icons/pi';
import { IoChevronForwardSharp } from "react-icons/io5";
import payment from '../../assets/images/payment.jpg';


const Footer = () => {
  return (
    <>
      <div className='movfooter'></div>
      <section role='Footer'>
        <Container>
          <Row className='justify-content-between'>
            <Col lg={3} md={6}>
              <section className='foooterInfo'>
                <header className='Links-title'>
                  <img src={loorajWhite} alt='' />
                </header>
                <p>
                  Proudly Share Here With Our Best Selling Products Of Our
                  Company, Which Have Gained Huge Appreciation & Confidence Of
                  Our Consumers To Use Our Herbal Cosmetics Products Regularly
                  For A Longer Period.
                </p>
              </section>
            </Col>
            <Col lg={3} md={6}>
              <section className='Links'>
                <header className='Links-title'>
                  <h4>Links</h4>
                </header>

                <ul className='Links-box'>
                  <li className='Links-box-item'>
                    <Link to='/about'> <IoChevronForwardSharp /> About Us</Link>
                  </li>
                  <li className='Links-box-item'>
                    <Link to='/terms-conditions'> <IoChevronForwardSharp /> Terms & Conditions</Link>
                  </li>
                  <li className='Links-box-item'>
                    <Link to='/privacy'> <IoChevronForwardSharp /> Privacy Policy</Link>
                  </li>
                  <li className='Links-box-item'>
                    <Link to='/return'> <IoChevronForwardSharp /> Return Policy</Link>
                  </li>
                  <li className='Links-box-item'>
                    <Link to='/delivery-terms-conditions'>
                    <IoChevronForwardSharp /> Delivery Terms and Condition
                    </Link>
                  </li>
                </ul>
              </section>
            </Col>
            <Col lg={3} md={6}>
              <section className='contact'>
                <header className='contact-title'>
                  <h4>Customer Support</h4>
                </header>

                <ul className='contact-box'>
                  <li className='contact-box-item'>
                    <div className='iconHolder'>
                      <i className='fa fa-map-marker'></i>
                    </div>
                    <div className='addHolder'>
                      <div className='addHolder-key'>
                        <strong>Location</strong>{' '}
                      </div>
                      <div className='addHolder-value '>Butwal Nepal</div>
                    </div>
                  </li>
                  <li className='contact-box-item'>
                    <div className='iconHolder'>
                      <i className='fa fa-phone'></i>
                    </div>
                    <div className='addHolder'>
                      <div className='addHolder-key'>
                        <strong>Phone</strong>
                      </div>
                      <div className='addHolder-value '>+977 985-7030826</div>
                    </div>
                  </li>

                  <li className='contact-box-item'>
                    <div className='iconHolder'>
                      <i className='fa fa-envelope'></i>
                    </div>
                    <div className='addHolder'>
                      <div className='addHolder-key'>
                        <strong>Email</strong>{' '}
                      </div>
                      <div className='addHolder-value '>
                        <a href='mailto:loraajpersonalcare@gmail.com'>
                          <span style={{ color: 'white' }}>
                            technova@gmail.com
                          </span>
                        </a>
                      </div>
                    </div>
                  </li>
                </ul>
              </section>
            </Col>
            <Col lg={3} md={6}>
              <section className='socialMedia'>
                <header className='socialMedia-title'>
                  <h4>Social Media</h4>
                </header>

                <section className='socialWrapper'>
                  <a
                    href={'https://www.facebook.com/himmat.gaire.5'}
                    target='_blank'
                    rel='noreferrer noopener'
                  >
                    <RiFacebookCircleLine className='socialWrapper-icons' />
                  </a>

                  <a
                    href={'https://www.instagram.com/loraajnepal/'}
                    target='_blank'
                    rel='noreferrer noopener'
                  >
                    <FaInstagram className='socialWrapper-icons' />{' '}
                  </a>

                  <a
                    href={'https://www.youtube.com/@loraajprofessional3131'}
                    target='_blank'
                    rel='noreferrer noopener'
                  >
                    <AiOutlineYoutube className='socialWrapper-icons' />
                  </a>
                  <a
                    href={'https://www.tiktok.com/@loraajpersonalcare'}
                    target='_blank'
                    rel='noreferrer noopener'
                  >
                    <PiTiktokLogo className='socialWrapper-icons' />
                  </a>
                </section>

                <header className='socialMedia-title mt-4'>
                  <h4>We Accept</h4>
                </header>
                <div className='payment-accept' >
                <img src={payment}/>
                </div>
                {/* <ol>
                  <li> <img src={American}/> </li>
                  <li> <img src={VisaMaster}/> </li>
                </ol> */}
              </section>
            </Col>
          </Row>

          <hr />
          <section className='copyright'>
            Nova Ecommerce &copy; {new Date().getFullYear()} All Rights
            Reserved
          </section>
        </Container>
      </section>
    </>
  );
};

export default Footer;
