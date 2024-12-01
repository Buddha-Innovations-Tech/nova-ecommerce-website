
import { Col, Container,  Row } from "react-bootstrap";

function Salebanner(){
    return(
        <>
        <section className='saleBannerWrapper'>
        <Container>
            <Row className='saleBannerWrapper-image'>
                <Col  md={12}>
                <div className="saleBannerWrapper-text">
                <h3>
                Sale upto 45% today
                </h3>
                <h2>
                Best Deals Discount
                </h2>
                <button className="bton bton--md bton--primary">Buy Now</button>
                </div>
                </Col>
            </Row>
        </Container>
        </section>
        </>
    )
}

export default Salebanner;