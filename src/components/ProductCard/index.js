import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Col, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { addToCart, resetCart } from '../../redux/cartSlice';

function ProductCard({ column, fProduct }) {
  const dispatch = useDispatch();
  const { currencyValue, currencyCode } = useSelector(
    (state) => state.products
  );

  return (
    <>
      {fProduct && (
        <Col lg={column} md={4}>
          <Link to={`/product/${fProduct.slug}`}>
            <section className='productCard'>
              <figure className='productCard-image'>
                <img
                  src={`${process.env.REACT_APP_IMAGE_PREFIX}${fProduct.heroImage}`}
                  title={fProduct.name}
                />
              </figure>
              <h3 className='productCard-title' title={fProduct.name}>
                {fProduct.name}
              </h3>
              <div className='productCard-price'>
                <span className='priceValue'>
                  {' '}
                  {currencyCode}{' '}
                  {fProduct.sellingPrice * Number(currencyValue) -
                    Math.floor(
                      fProduct.sellingPrice * Number(currencyValue)
                    ) !==
                  0
                    ? (fProduct.sellingPrice * Number(currencyValue)).toFixed(2)
                    : fProduct.sellingPrice * Number(currencyValue)}{' '}
                </span>{' '}
                <span
                  className={`${fProduct.stock > 0 ? 'stockValue' : 'noStock'}`}
                >
                  {fProduct.stock > 0 ? 'IN STOCK' : 'OUT OF STOCK'}
                </span>
              </div>
              {fProduct.discount > 0 && (
                <span className='cardOff'>{fProduct.discount}%off</span>
              )}
            </section>
          </Link>
        </Col>
      )}
    </>
  );
}

export default ProductCard;
