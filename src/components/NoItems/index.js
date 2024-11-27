import React from 'react';
import NoItem from '../../assets/images/No data-cuate.svg';

const NoItems = () => {
  return (
    <div>
      <figure className='text-center'>
        <h2 className='text-muted'>no items found</h2>
        <img src={NoItem} alt='' style={{ width: '50%' }} />
      </figure>
    </div>
  );
};

export default NoItems;
