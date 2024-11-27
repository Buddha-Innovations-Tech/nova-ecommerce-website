import React, { useEffect } from 'react';
import Ads from '../../components/Ads';
import BestSelling from '../../components/BestSelling';
import CarouselBox from '../../components/CarouselBox';
import LatestProducts from '../../components/LatestProducts';
import Testimonials from '../../components/Testimonials';
import Attractions from '../../components/Attractions';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <CarouselBox />
      <LatestProducts />
      <BestSelling />
      <Ads />
      {/* <About /> */}
      <Testimonials />
      <Attractions />
    </>
  );
};

export default Home;
