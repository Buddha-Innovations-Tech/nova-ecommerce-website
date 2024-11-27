import React from 'react';
import Nets from '../../assets/images/netsLogoColored.svg';
import Vipps from '../../assets/images/vipps.png';

const Choosepayment = () => {
  return (
    <section className='choosePaymentWrapper'>
      <div className='choosePaymentWrapper-title'>Choose payment methods</div>
      <div className='text-muted'>
        All transactions are secure and encrypted
      </div>
      <ul className='choosePaymentWrapper-list'>
        <li className='choosePaymentWrapper-list-items activeMethod'>
          <img src={Nets} alt='' />
        </li>
        <li className='choosePaymentWrapper-list-items'>
          <img src={Vipps} alt='' />
        </li>
      </ul>
    </section>
  );
};

export default Choosepayment;
