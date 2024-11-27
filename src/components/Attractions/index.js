import { Container } from 'react-bootstrap';

import Paraben from '../../assets/images/paraben free.svg';
import Sulphate from '../../assets/images/sulphate free.svg';
import Silicon from '../../assets/images/silicon free.svg';
import Chemical from '../../assets/images/No harsh chemicals.svg';
import Fragnance from '../../assets/images/Mild fragrance.svg';

const AttractionData = [
  { name: 'Paraben Free', image: Paraben },
  { name: 'Sulphate Free', image: Sulphate },
  { name: 'Silicon Free', image: Silicon },
  { name: 'No Harsh Chemical', image: Chemical },
  { name: 'Mid Fragnance', image: Fragnance },
];

function Index() {
  return (
    <section className='attractionWrapper'>
      <Container>
        <ul className='atttractionsBox'>
          {AttractionData.map((item) => (
            <li className='atttractionsBox-item' key={item.name}>
              <figure>
                <img src={item.image} alt='' />
                <figcaption>{item.name}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export default Index;
