import { Col, Container, Row } from 'react-bootstrap';
import Avatar from '../../assets/images/cleaning/cheanHero.png';
import {  BsStarFill} from "react-icons/bs";
import TestimonialsRating from './rating';

function Index() {
  return (
    <section className='testimonialWrapper'>
      <Container>
        <section className='layoutTitle mt-3'>
          <h1>Client Testimonials</h1>
          <p>Our clients love our work </p>
        </section>
        <Row>
          <Col md={4}>
            <div className='testimonialBox'>
              <div className='testiDesc'>
                <div className='testiDesc-quote'>
                  <TestimonialsRating Rate={4}/>
                  {/* <div className='testiDesc-quote-stars'>⭐⭐⭐⭐</div> */}

                  <p className='testiDesc-quote-text'>
                  "This product made my dog's coat shinier and boosted his energy like never before"
                  </p>
                </div>
                <div className='testiImage'>
                <img className='rectangle' alt='Rectangle' src={Avatar} />
              </div>
                <div className='testiDesc-person'>Cameron Williamson</div>
                <div className='testiDesc-designation'>President of Sales</div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Index;
