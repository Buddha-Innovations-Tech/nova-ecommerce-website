import React from 'react';
import CarSkeletons from '../CarSkeleton';

const NavSkeletons = () => {
  return (
    <section>
      <section className='mb-2  container'>
        <CarSkeletons height='2rem' />
      </section>
      <section className='mb-2  container'>
        <CarSkeletons height='3rem' />
      </section>
      <section className='mb-1  '>
        <CarSkeletons height='3rem' />
      </section>
    </section>
  );
};

export default NavSkeletons;
