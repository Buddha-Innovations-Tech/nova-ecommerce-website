import { Col, Container, Row } from 'react-bootstrap';
import Avatar from '../../assets/images/cleaning/cheanHero.png';
import {  BsStarFill} from "react-icons/bs";
import TestimonialsRating from './rating';

function Index() {


  const Testimonials =[
    {
      description : <>  "This product made my dog's coat shinier and boosted his energy like never before"</>,
    image:Avatar,
    rate : 5,
    name:"Cameron Williamson",
    post:"President of Sales"
    },
    {
      description : <>  "This product made my dog's coat shinier and boosted his energy like never before"</>,
    image:Avatar,
    rate : 4,
    name:"Cameron Williamson",
    post:"President of Sales"
    },
    {
      description : <>  "This product made my dog's coat shinier and boosted his energy like never before"</>,
    image:Avatar,
    rate : 2,
    name:"Cameron Williamson",
    post:"President of Sales"
    }
  ]


  return (
    <section className='testimonialWrapper'>
      <Container>
        <section className='layoutTitle mt-3'>
          <h1>Happy Clients</h1>
          <p>See how we help the customers  </p>
        </section>
        <Row>
          {Testimonials.map((item,index) => (
               <Col md={4} key={index}>
               <div className='testimonialBox'>
                 <div className='testiDesc'>
                   <div className='testiDesc-quote'>
                     <TestimonialsRating Rate={item.rate}/>
                     {/* <div className='testiDesc-quote-stars'>⭐⭐⭐⭐</div> */}
   
                     <p className='testiDesc-quote-text'>
                     {item.description}
                     </p>
                   </div>
                   <div className='testiImage'>
                   <img className='rectangle' alt='Rectangle' src={item.image} />
                 </div>
                   <div className='testiDesc-person'>{item.name}</div>
                   <div className='testiDesc-designation'>{item.post}</div>
                 </div>
               </div>
             </Col>
          ))}
       
        </Row>
      </Container>
    </section>
  );
}

export default Index;
