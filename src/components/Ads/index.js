import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import ProductCard from '../ProductCard';

import axios from 'axios';
import LoaderComponent from '../LoaderComponent/index';
import CarSkeletons from '../Skeletons/CarSkeleton';
import ProductSkeletons from '../Skeletons/ProductsSkeletons';

const Ads = () => {
  const [campaign, setCampaign] = useState([]);
  const [cloading, setCLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const cProducts = await axios.get('/api/campaign/');
      setCampaign(cProducts.data);

      setCLoading(false);
    };
    if (cloading) {
      fetch();
    }
  }, [cloading]);

  if (cloading)
    return (
      <div>
        <CarSkeletons height='20rem' />
        <ProductSkeletons />
      </div>
    );
  return (
    <>
      {campaign &&
        campaign.map((cpd, i) => {
          return (
            <Container>
              <section className='adsWrapper'>
                <section className='adsWrapper-title'>
                  <h1> {cpd.title}</h1>
                </section>
                <section className='adsWrapper-image'>
                  <figure>
                    <a href={cpd.link} target='_blank' rel='noreferrer'>
                      <img
                        src={`${process.env.REACT_APP_IMAGE_PREFIX}${cpd.image}`}
                        alt=''
                      />
                    </a>
                  </figure>
                </section>

                <section className='adsWrapper-products'>
                  <Row>
                    {cpd.products &&
                      cpd.products.map((cp) => (
                        <ProductCard fProduct={cp} column={3} />
                      ))}
                  </Row>
                </section>
              </section>
            </Container>
          );
        })}
    </>
  );
};

export default Ads;
