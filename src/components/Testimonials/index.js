import { Col, Container, Row } from 'react-bootstrap';
import Avatar from '../../assets/images/cleaning/cheanHero.png';
function Index() {
  return (
    <section className='testimonialWrapper'>
      <Container>
        <section className='layoutTitle mt-3'>
          <h1>Client Testimonials</h1>
          <p>Our clients love our work </p>
        </section>
        <Row>
          <Col md={6}>
            <div className='testimonialBox'>
              <div className='testiDesc'>
                <div className='testiDesc-quote'>
                  <div className='testiDesc-quote-stars'>⭐⭐⭐⭐</div>

                  <p className='testiDesc-quote-text'>
                    I love anything that I purchase from loraaj!
                  </p>
                </div>
                <div className='testiDesc-person'>Cameron Williamson</div>
                <div className='testiDesc-designation'>President of Sales</div>
              </div>
              <figure className='testiImage'>
                <img className='rectangle' alt='Rectangle' src={Avatar} />
              </figure>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Index;
