import { Container } from 'react-bootstrap';
import { BsBoxSeam } from "react-icons/bs";
import { BsCreditCardFill } from "react-icons/bs";
import { PiKeyReturnBold } from "react-icons/pi";
import { MdOutlineSupportAgent } from "react-icons/md";
import Paraben from '../../assets/images/paraben free.svg';
import Sulphate from '../../assets/images/sulphate free.svg';
import Silicon from '../../assets/images/silicon free.svg';
import Chemical from '../../assets/images/No harsh chemicals.svg';
import Fragnance from '../../assets/images/Mild fragrance.svg';


const AttractionData = [
  { name: 'Shipping Feature', icon: <BsBoxSeam className='iconWrapper-icon' /> },
  { name: 'Flexible Payment', icon: <BsCreditCardFill className='iconWrapper-icon' /> },
  { name: '14 days return', icon: <PiKeyReturnBold className='iconWrapper-icon' /> },
  { name: 'Premium Support', icon: <MdOutlineSupportAgent className='iconWrapper-icon' /> },
  
];

function Index() {
  return (
    <section className='attractionWrapper'>
      <Container>
        <ul className='atttractionsBox'>
          {AttractionData.map((item) => (
            <li className='atttractionsBox-item' key={item.name}>
              <figure>
              <figcaption>{item.name}</figcaption>
                <div className='iconWrapper'>{item.icon}</div>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export default Index;
