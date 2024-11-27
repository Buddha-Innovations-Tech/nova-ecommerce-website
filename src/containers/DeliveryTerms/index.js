import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';

const DeliveryTerms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Container className='mt-5'>
        <h2 className='mt-3'>
          POLICY ON INTERNATIONAL AND DOMESTIC SHIPPING AND DELIVERY
        </h2>

        <p>
          Thank you for choosing to shop with Loraaj We strive to provide you
          with an easy and hassle-free shopping experience, including efficient
          shipping and delivery services.
        </p>

        <h3>DOMESTIC SHIPPING</h3>
        <p>
          We offer shipping within Norway for all orders. Our standard shipping
          time is 3-5 working days from the date of dispatch. The cost of
          shipping will be calculated and displayed during the checkout process.
        </p>
        {/* <h3>INTERNATIONAL SHIPPING</h3>
        <p>
          We also offer international shipping to select countries. The shipping
          cost and time will vary depending on the destination country and the
          weight of the order. The shipping cost will be calculated and
          displayed during the checkout process.
          <br /> <br />
          Please note that international shipments may be subject to additional
          customs and duty fees, which are the responsibility of the customer.
          We are not responsible for any delays or fees caused by customs
          clearance.
        </p> */}
        <h3>DELIVERY</h3>
        <p>
          We aim to dispatch all orders within two working days of receiving
          them. Once your order has been dispatched, we will send you a
          confirmation email with the tracking information. You can use the
          tracking information to check the status of your order and estimated
          delivery time.
          <br /> <br /> Please note that delivery times may vary depending on
          the Please note that delivery times may vary depending on the shipping
          destination and any unforeseen circumstances that may affect the
          delivery schedule.
        </p>
        <h3>RETURNING ITEMS</h3>
        <p>
          If you need to return an item, please refer to our Return Policy for
          instructions on how to do so. The cost of returning the item will be
          the responsibility of the customer. We recommend using a trackable
          shipping service and purchasing shipping insurance, as we cannot
          guarantee that we will receive your returned product.
          <br /> <br /> If you receive a damaged or defective item, please
          contact us If you receive a damaged or defective item, please contact
          us immediately, and we will guide you through the process of returning
          the item and receiving a refund or exchange.
          <br /> <br /> Thank you for shopping with us at
          Sunrisemultitradelink.com. If Thank you for shopping with us at
          Sunrisemultitradelink.com. If you have any questions or concerns about
          our shipping and delivery policy, please do not hesitate to contact
          us, and we will be happy to assist you.
        </p>
        <h3></h3>
        <p></p>
      </Container>
    </div>
  );
};

export default DeliveryTerms;
