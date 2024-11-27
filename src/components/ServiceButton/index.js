import { useEffect, useRef, useState } from 'react';
import ServiceCard from '../../components/ServiceCard';
// import service from '../../assets/img/service.png';

const ServiceButton = ({ services }) => {
  const [visible, setVisible] = useState(false);
  const [viewService, setViewService] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 400) {
      setVisible(true);
    } else if (scrolled <= 400) {
      setVisible(false);
    }
  };

  const viewServiceHandler = () => {
    setViewService((prev) => !prev);
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);

    return () => {
      window.removeEventListener('scroll', toggleVisible);
    };
  }, []);

  return (
    <div>
      {viewService && (
        <div>
          <div
            className='service--card__backdrop'
            onClick={viewServiceHandler}
          />
          <div className='service--card__modal'>
            <ServiceCard
              services={services}
              onLinkClick={viewServiceHandler}
              calledBy='ServiceButton'
            />
          </div>
        </div>
      )}
      <div
        className={visible ? 'service--button' : 'not-visible'}
        onClick={viewServiceHandler}
      >
        <svg
          width='18'
          height='22'
          viewBox='0 0 18 22'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M0.75 12.5L11.25 1.25L9 9.5H17.25L6.75 20.75L9 12.5H0.75Z'
            stroke='black'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
        <span>Services</span>
      </div>
    </div>
  );
};

export default ServiceButton;
