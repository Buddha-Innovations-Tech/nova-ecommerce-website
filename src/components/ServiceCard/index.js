import { useEffect } from 'react';

const ServiceCard = ({ services, onLinkClick, calledBy }) => {
  const scrollToService = (serviceName) => {
    const serviceRef = services.find(
      (service) => service.name === serviceName
    )?.ref;
    if (serviceRef) {
      serviceRef.current.style.scrollMargin =
        windowWidth < 768 ? '150px' : '148px';
      serviceRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  let windowWidth = 0;
  useEffect(() => {
    windowWidth = window.innerWidth;
  }, []);

  return (
    <div className='about--us__overview--card'>
      <h3>Services</h3>
      <ul className='about--us__overview--card_list'>
        {services?.map((item, index) => {
          return (
            <li
              key={index}
              onClick={() => {
                calledBy === 'ServiceButton' && onLinkClick();
                scrollToService(item.name);
              }}
              className='about--us__overview--card_list-item'
            >
              {item.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default ServiceCard;
