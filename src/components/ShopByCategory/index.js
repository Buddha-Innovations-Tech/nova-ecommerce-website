import { Container, Row, Col } from "react-bootstrap";
import img1 from "../../assets/images/nail.jpg";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesAsync } from '../../redux/categorySlice';

function ShopByCategory() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.category);
  const loading = useSelector((state) => state.categories.loading);

  useEffect(() => {
    dispatch(getCategoriesAsync());
  }, [dispatch]);

  const [visibleIndex, setVisibleIndex] = useState(0);

  const next = () => {
    setVisibleIndex((prevIndex) => (prevIndex + 1) % categories.length);
  };

  const prev = () => {
    setVisibleIndex((prevIndex) => (prevIndex - 1 + categories.length) % categories.length);
  };

 
  const loopedItems = [
    ...categories.slice(visibleIndex),
    ...categories.slice(0, visibleIndex),
  ];
  const itemsToShow = loopedItems.slice(0, 4);

  return (
    <div className="shopByCatrgoryWrapper">
      <Container>
        <section className="layoutTitle">
          <h1>Explore by Category</h1>
          <p>Browse products organized by category for easier shopping.</p>
        </section>
      </Container>
      <section className="productCarousel">
        <div>
          <IoChevronBackOutline onClick={prev} className="icon" />
        </div>
        <Container>
          <Row>
            {loading ? (
              <div>Loading...</div> 
            ) : (
              categories && categories.length > 0 && itemsToShow.map((cat) => (
                cat.subCategory.length > 0 && cat.subCategory.map((sub) => (
                  <Col md={3} sm={6} key={sub._id}>
                    <div className="categoryProduct">
                      <Link to={`/category/${cat.slug}`} state={{ cat_id: cat._id, subData: { _id: sub._id, name: sub.name } }}>
                      <img  src={img1} />
                        <p>{sub.name}</p>
                      </Link>
                    </div>
                  </Col>
                ))
              ))
            )}
          </Row>
        </Container>
        <div>
          <IoChevronForwardOutline onClick={next} className="icon" />
        </div>
      </section>
    </div>
  );
}

export default ShopByCategory;
