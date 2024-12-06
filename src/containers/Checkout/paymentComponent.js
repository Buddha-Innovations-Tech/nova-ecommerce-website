import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsCash } from "react-icons/bs";

const PaymentComponent = ({ grandTotal }) => {
  const [res, setRes] = useState(null);
  const [proceedPayment, setProceedPayment] = useState(false);

  useEffect(() => {
    if (res && res.paymentUrl) {
      window.location.href = res.paymentUrl;
    }
  }, [res]);

  const submitForm = async () => {
    try {
      if (!proceedPayment) {
        setProceedPayment(true);
        const response = await axios.post("/api/payment", {
          amount: grandTotal * 100,
        });
        const data = response.data;
        setRes(data);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      setProceedPayment(false);
    }
  };

  return (
    <section className="checkoutFinal">
      <button
        className="bton bton--lg bton--primary"
        onClick={() => {
          submitForm();
        }}
      >
        {proceedPayment ? "Proceeding to Payment" : "Confirm Order"}
      </button>
    </section>
  );
};

export default PaymentComponent;
