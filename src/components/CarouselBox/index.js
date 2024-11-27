import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import axios from 'axios';
import CarSkeletons from '../Skeletons/CarSkeleton';

const CarouselBox = () => {
  const [carousels, setCarousels] = useState([]);
  const [cloading, setCLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const cProducts = await axios.get('/api/carousel/');

      setCarousels(cProducts.data.carousel);
      setCLoading(false);
    };
    if (cloading) {
      fetch();
    }
  }, [cloading]);

  if (cloading) return <CarSkeletons height='72vh' width='100%' />;

  return (
    <div>
      <Carousel interval={2000}>
        {carousels &&
          carousels.map((cp) => {
            return (
              <Carousel.Item key={cp._id}>
                <a href={cp.link} target='_blank' rel='noreferrer'>
                  <img
                    className='d-block w-100 carImage'
                    src={`${process.env.REACT_APP_IMAGE_PREFIX}${cp.image}`}
                    alt='First slide'
                  />
                </a>
              </Carousel.Item>
            );
          })}
      </Carousel>
    </div>
  );
};

export default CarouselBox;
