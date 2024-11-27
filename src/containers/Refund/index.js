import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';

const Refund = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Container className='mt-3'>
        <h2>REFUND POLICY</h2>
        <p>
          Within 14 days following the transaction, returns are permitted under
          our return policy. We are unable to give a refund or exchange if your
          transaction was made more than 14 days ago. <br /> <br /> The product
          must be unused, undamaged, and in the exact packaging you received it
          in order to be eligible for a return. You must also give us a receipt
          or other evidence of purchase.
          <br /> <br /> We will send you an email once we have received and
          examined your returned item to let you know whether your refund was
          approved or denied. The refund will be processed and refunded to your
          credit card or original mode of payment within a predetermined number
          of days if your return is accepted.
          <br /> <br /> Please check your bank account and get in touch with
          your credit card company if you haven't received your refund yet.
          Please email us at loraajpersonalcare@gmail.com if you still have not
          received your refund.
          <br /> <br /> Please email us at loraajpersonalcare@gmail.com.comto
          arrange for the return of your item. The cost of returning the goods
          to us will be on you, and shipping charges are not refundable. The
          cost of return postage will be subtracted from your refund if you get
          one.
        </p>
      </Container>
    </div>
  );
};

export default Refund;
