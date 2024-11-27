import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import LoaderComponent from '../LoaderComponent';
import ProductCard from '../ProductCard';
import ProductSkeletons from '../Skeletons/ProductsSkeletons';

const BestSelling = () => {
  const [featured, setFeatured] = useState([]);
  const [floading, setFLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const fProducts = await axios.get('/api/products/featured');
      setFeatured(fProducts.data);
      setFLoading(false);
    };
    if (floading) {
      fetch();
    }
  }, [floading]);

  if (floading) return <ProductSkeletons />;

  return (
    <>
      <Container>
        <section className='layoutTitle'>
          <h1>Best Selling Products</h1>
          <p>Explore Best sellling products in our store</p>
        </section>
        <section>
          <Row>
            {featured &&
              featured.map((fp) => {
                return <ProductCard key={fp._id} fProduct={fp} column={3} />;
              })}
          </Row>
        </section>
      </Container>
    </>
  );
};

export default BestSelling;
