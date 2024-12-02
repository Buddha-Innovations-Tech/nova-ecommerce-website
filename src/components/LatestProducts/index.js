import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import ProductCard from "../ProductCard";

const LatestProducts = () => {
  const [newArrival, setNewArrival] = useState([]);
  const [nLoading, setNLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const fProducts = await axios.get("/api/products/new");
      setNewArrival(fProducts.data);
      setNLoading(false);
    };
    if (nLoading) {
      fetch();
    }
  }, [nLoading]);

  return (
    <>
      <Container>
        <section className="layoutTitle">
          <h1>New Products</h1>
          <p>Explore just landed products in our store</p>
        </section>
        <section>
          <Row>
            {newArrival.slice(0, 8).map((c, i) => (
              <ProductCard column={3} key={i} fProduct={c} />
            ))}
          </Row>
        </section>
      </Container>
    </>
  );
};

export default LatestProducts;
