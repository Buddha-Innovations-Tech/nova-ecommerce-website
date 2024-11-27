import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ProductsSkeletons from '../../components/Skeletons/ProductsSkeletons';
import ProductCard from '../../components/ProductCard';
import { getProductsAsync } from '../../redux/productSlice';
import NoItems from '../../components/NoItems';

const SearchResults = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);

  useEffect(() => {
    if (location.state !== null) {
      dispatch(getProductsAsync(location.state));
    }
  }, [dispatch, location.state]);

  if (loading) return <ProductsSkeletons />;

  return (
    <>
      <Container>
        <section className='mt-5  text-muted'>
          search results for "{location.state}"
        </section>
        <section className='mt-5'>
          {products.length > 0 ? (
            <Row>
              {products.map((p) => {
                return <ProductCard column='3' fProduct={p} />;
              })}
            </Row>
          ) : (
            <NoItems />
          )}
        </section>
      </Container>
    </>
  );
};

export default SearchResults;
