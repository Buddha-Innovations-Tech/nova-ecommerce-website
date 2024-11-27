import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Col, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { addToCart, resetCart } from '../../redux/cartSlice';
import LoaderComponent from '../LoaderComponent';

function CategoryProductCard({ column, products, productLoading }) {
  const dispatch = useDispatch();
  const { currencyValue, currencyCode } = useSelector(
    (state) => state.products
  );

  if (productLoading) {
    return <LoaderComponent />;
  }
  return (
    <>
      {products &&
        products.map((pro, i) => {
          return (
            <Col md={column}>
              <Link to={`/product/${pro.slug}`}>
                <section className='productCard'>
                  <figure className='productCard-image'>
                    <img
                      src={`${process.env.REACT_APP_IMAGE_PREFIX}${
                        pro.heroImage === '' ? '/default.jpg' : pro.heroImage
                      }`}
                      alt={pro.name}
                    />
                  </figure>
                  <div className='productCard-title'>{pro.name}</div>
                  <div className='productCard-price'>
                    <span className='priceValue'>{currencyCode} {Number(pro.sellingPrice *Number(currencyValue)).toFixed(2)}  </span>{' '}
                    <span className='stockValue'>
                      {pro.stock > 0 ? 'IN STOCK' : 'OUT OF STOCK'}
                    </span>
                  </div>
                  {pro.discount > 0 && (
                    <span className='cardOff'>{pro.discount}%off</span>
                  )}
                </section>
              </Link>
            </Col>
          );
        })}
    </>
  );
}

export default CategoryProductCard;
