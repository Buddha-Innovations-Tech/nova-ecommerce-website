import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';

const Return = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Container className='mt-4'>
        <h2>RETURN POLICY</h2>
        Thank you for shopping with us at Loraaj Professional We are committed
        to providing you with high-quality products and outstanding customer
        service. However, if you are not completely satisfied with your
        purchase, we have a comprehensive return policy to ensure your
        satisfaction. <br /> <br /> 14-Day Return Policy: You may return any
        purchased product within 14 days of delivery or pick-up, in accordance
        with Norwegian law. After 14 days, we are unable to offer you a refund
        or exchange.
        <br /> <br /> Conditions for Returns: To be eligible for a return, the
        product must be unused and in its original condition and packaging. A
        receipt or proof of purchase is also required.
        <br /> <br /> Exclusions: Certain products are excluded from our return
        policy. These include products that have been customized or
        made-to-order, perishable goods, and intimate or sanitary goods. <br />{' '}
        <br />
        Refunds: After we receive and verify your returned product meets our
        return policy conditions, we will issue a refund within 7-10 working
        days. The refund will be processed to the original payment method used
        for the purchase, and shipping costs are non-refundable.
        <br /> <br /> Exchanges: If you would like to exchange a product for a
        different size or color, please contact us first to ensure that the
        desired item is available. Shipping costs for exchanges will be covered
        by the customer.
        <br /> <br /> Shipping: The customer is responsible for shipping the
        product back to us for returns or exchanges. We recommend using a
        trackable shipping service and purchasing shipping insurance, as we
        cannot guarantee that we will receive your returned product.
        <br /> <br /> Damaged or Defective Items: If you receive a damaged or
        defective product, please contact us immediately, and we will guide you
        through the process of returning the item and receiving a refund or
        exchange. Please note that we reserve the right to refuse a return if it
        does not meet our return policy conditions.
        <br /> <br /> Thank you for choosing Loraaj for your shopping needs. If
        you have any questions or concerns about our return policy, please
        contact us, and we will be happy to assist you.
      </Container>
    </div>
  );
};

export default Return;
