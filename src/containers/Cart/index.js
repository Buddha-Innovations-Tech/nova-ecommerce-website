import React, { Fragment } from 'react';
import { Col, Form, Row, Spinner } from 'react-bootstrap';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Bill from '../../components/Bill/index';
import {
  addToCartFromCartPage,
  deleteCartItem,
  removeFromCart,
  removeCart,
  addToQuickBuyLoading,
  addToQuickBuySuccess,
  quickBuyLoading,
  applyDiscountCodeQuickBuy,
  getPromoDetailsAsync,
  getCartUpdateDetailsAsync,
  getBuyNowCartUpdateDetailsAsync,
  resetQuickBuy,
  addToCart,
  removeFromBuyNowCart,
} from '../../redux/cartSlice';
import NoItems from '../../components/NoItems';
import { MdOutlineDelete } from 'react-icons/md';

const QuantityBox = ({ number, item }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [previousValue, setPreviousValue] = useState(number);
  const [qty, setQty] = useState(number);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onChange = (e) => {
    if (!location.pathname.includes('buy-now')) {
      if (Number(e.target.value) > previousValue) {
        if (Number(qty) < 1) {
          setQty(Number(e.target.value));
        }
        if (Number(qty) > 1 && qty <= item.product.orderLimit)
          setQty(Number(e.target.value));
        dispatch(
          addToCartFromCartPage({
            product: item.product,
            qty,
          })
        );
      } else if (Number(e.target.value) < previousValue) {
        dispatch(removeFromCart(item.product._id.toString()));
        setQty(Number(e.target.value));
      }
      setPreviousValue(Number(e.target.value));
    } else {
      if (Number(e.target.value) > previousValue) {
        setQty(Number(e.target.value));
        if (qty < item.product.stock || qty < item.product.orderLimit) {
          dispatch(addToQuickBuyLoading());
          dispatch(
            addToQuickBuySuccess({
              product: item.product,
              qty: item.qty + 1,
            })
          );
        }
      } else {
        if (Number(e.target.value > 0)) {
          setQty(Number(e.target.value));
          dispatch(addToQuickBuyLoading());
          dispatch(
            addToQuickBuySuccess({
              product: item.product,
              qty: item.qty - 1,
            })
          );
        }
      }
      setPreviousValue(Number(e.target.value));
    }
  };
  return (
    <Form.Group className='itemInfo-info-quantity '>
      <Form.Control type='number' onChange={onChange} value={qty} />
    </Form.Group>
  );
};

function Index() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);

  const {
    cartItems,
    buyNowCartItems,
    total,
    quickBuyItem,
    quickBuyItemTotal,
    quickBuyCouponSuccess,
    quickBuyItemGrandTotal,
    quickBuyCoupon,
    quickBuySuccess,
    buyNowTotal,
    cartAddLoading,
    quickBuyLoading,
    getBuyNowCartLoading,
    buyNowGrandTotal,
    cartError,
    cartMessage,
    buyNowCartError,
    buyNowCartMessage,
  } = useSelector((state) => state.cart);
  const { currencyValue, currencyCode } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    if (!location.pathname.includes('buy-now') && cartItems.length) {
      dispatch(getCartUpdateDetailsAsync({ cart: { cartItems } }));
      setErrors([]);
    }
  }, [total]);
  useEffect(() => {
    if (location.pathname.includes('buy-now') && buyNowCartItems?.length) {
      dispatch(
        getBuyNowCartUpdateDetailsAsync({
          buyNowCart: { buyNowCartItems },
        })
      );
      setErrors([]);
    }
  }, [buyNowTotal]);

  const variantInfo = (variant) => {
    const variantKeys = Object.keys(variant);

    if (variantKeys.length === 1) {
      return (
        <div>
          <small>{variantKeys[0]}</small>
          <small>: </small>
          <small>{[variant[variantKeys[0]]]}</small>
        </div>
      );
    }
    return (
      <div>
        <div>
          <span>{variantKeys[0]}</span>
          <span>: </span>
          <span>{[variant[variantKeys[0]]]}</span>
        </div>
        <div>
          <span>{variantKeys[1]}</span>
          <span>: </span>
          <span>{[variant[variantKeys[1]]]}</span>
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      {!location.pathname.includes('buy-now') ? (
        <section>
          <div className='container checkoutWrapper'>
            {!cartItems.length ? (
              <NoItems />
            ) : (
              <Row>
                <Col lg={8} md={12}>
                  <section className='cartItem'>
                    <section className='flex-between'>
                      <div>
                        <h3 className=''>Your Cart</h3>{' '}
                        <small>{cartItems?.length} items in your cart</small>
                      </div>
                      <button
                        className='bton bton--nacked bton--sm'
                        onClick={() => dispatch(removeCart())}
                      >
                        clear cart
                      </button>
                    </section>
                    <section className='cartItem-title pb-2'>
                      <div className='container p-0'>
                        <div className='row mt-3'>
                          <div className='col-6'>PRODUCTS</div>
                          <div className='col-2'>QUANTITY</div>
                          <div className='col-2'>UNIT COST</div>
                          <div className='col-2'>SUB-TOTAL</div>
                        </div>
                      </div>
                    </section>
                    {/* .................  */}
                    {cartAddLoading ? (
                      <>
                        {cartItems?.map((item) => (
                          <section key={item._id} className='cartItem-items '>
                            <div className='container p-0'>
                              <div className='row mt-3'>
                                <div className='col-md-6 col-sm-12'>
                                  <section className='itemInfo'>
                                    <figure className='itemInfo-image'>
                                      <img
                                        src={`${process.env.REACT_APP_IMAGE_PREFIX}${item.product.heroImage}`}
                                        alt={item.product.name}
                                      />
                                    </figure>
                                    <section className='itemInfo-info'>
                                      <Link
                                        to={`/product/${item.product.slug}`}
                                      >
                                        <h2 className='itemInfo-info-title'>
                                          {item.product.name}
                                        </h2>
                                      </Link>
                                      <div className='itemInfo-info-brand '>
                                        {item.product.variants
                                          ? variantInfo(item.product.variants)
                                          : null}
                                      </div>

                                      <div
                                        className='itemInfo-info-remove mt-2'
                                        onClick={() =>
                                          dispatch(
                                            deleteCartItem(
                                              item.product._id.toString()
                                            )
                                          )
                                        }
                                      >
                                        <MdOutlineDelete /> Remove
                                      </div>
                                      <div>
                                        {
                                          errors.find((i) => {
                                            return (
                                              i.product_id === item.product._id
                                            );
                                          })?.message
                                        }
                                      </div>
                                    </section>
                                  </section>
                                </div>

                                <div className='col-md-2 col-4'>
                                  {/* <Counter />
                                  <QuantityBox
                                    id={item.product._id}
                                    number={item.qty}
                                    item={item}
                                    loading={cartAddLoading}
                                  /> */}

                                  <div className='counterHolder'>
                                    <div
                                      className='counterHolder-item'
                                      onClick={() => {
                                        dispatch(
                                          removeFromCart(item.product._id)
                                        );
                                      }}
                                    >
                                      -
                                    </div>

                                    <div className='counterHolder-item Qtynumber'>
                                      {item.qty}
                                    </div>
                                    <div
                                      className='counterHolder-item'
                                      onClick={() => {
                                        dispatch(
                                          addToCart({
                                            product: item.product,
                                            qty: 1,
                                          })
                                        );
                                      }}
                                    >
                                      +
                                    </div>
                                  </div>
                                </div>
                                <div className='col-md-2 col-4'>
                                  <div className='cartItem-items-unit '>
                                    {currencyCode}{' '}
                                    {Number(
                                      Number(item.product.price) *
                                        Number(currencyValue)
                                    ).toFixed(2)}
                                  </div>{' '}
                                </div>
                                <div className='col-md-2 col-4'>
                                  <div className='cartItem-items-sub'>
                                    {currencyCode}{' '}
                                    {Number(
                                      item.product.price *
                                        item.qty *
                                        Number(currencyValue)
                                    ).toFixed(2)}{' '}
                                  </div>{' '}
                                </div>
                              </div>
                            </div>
                          </section>
                        ))}
                      </>
                    ) : (
                      <div className='overlayLoader'>
                        <span className='overlayLoader-item'>
                          <Spinner animation='border' variant='light' />{' '}
                          <span>Loading</span>
                        </span>
                      </div>
                    )}

                    {/* .............////// */}
                  </section>
                  {!location.pathname.includes('buy-now') && cartError && (
                    <p className='loginError'>{cartMessage}</p>
                  )}
                </Col>
                <Col lg={4} md={12}>
                  <Bill show={true} errors={errors} setErrors={setErrors} />
                </Col>
              </Row>
            )}

            <Link to='/'>
              <section className='continue mt-3'>
                {' '}
                <i className='fa  fa-chevron-left'></i> continue shopping
              </section>
            </Link>
          </div>
        </section>
      ) : (
        <section>
          {buyNowCartItems?.length > 0 ? (
            <div className='container checkoutWrapper'>
              <Row>
                <Col lg={8} md={12}>
                  <section className='cartItem'>
                    <section className='flex-between'>
                      <div>
                        <h2 className=''>Buy now Cart</h2>{' '}
                      </div>
                      <button className='bton bton--nacked bton--sm'>
                        clear cart
                      </button>
                    </section>
                    <section className='cartItem-title pb-2'>
                      <div className='container p-0'>
                        <div className='row mt-3'>
                          <div className='col-6'>PRODUCT</div>
                          <div className='col-2'>QUANTITY</div>
                          <div className='col-2'>UNIT COST</div>
                          <div className='col-2'>SUB-TOTAL</div>
                        </div>
                      </div>
                    </section>
                    {/* .................  */}
                    {getBuyNowCartLoading ? (
                      <div className='overlayLoader'>
                        <span className='overlayLoader-item'>
                          <Spinner animation='border' variant='light' />{' '}
                          <span>Loading</span>
                        </span>
                      </div>
                    ) : (
                      <section className='cartItem-items '>
                        <div className='container p-0'>
                          <div className='row mt-3'>
                            <div className='col-6'>
                              <section className='itemInfo'>
                                <figure className='itemInfo-image'>
                                  <img
                                    src={`${process.env.REACT_APP_IMAGE_PREFIX}${buyNowCartItems[0]?.product.heroImage}`}
                                    alt=''
                                  />
                                </figure>
                                <section className='itemInfo-info'>
                                  <Link
                                    to={`/product/${buyNowCartItems[0]?.product.slug}`}
                                  >
                                    <h2 className='itemInfo-info-title'>
                                      {buyNowCartItems[0]?.product.name}
                                    </h2>
                                  </Link>
                                  <div className='itemInfo-info-brand '>
                                    {buyNowCartItems[0]?.product.variants
                                      ? variantInfo(
                                          buyNowCartItems[0]?.product.variants
                                        )
                                      : null}
                                  </div>

                                  <div
                                    className='itemInfo-info-remove mt-2'
                                    onClick={() => {
                                      dispatch(resetQuickBuy());
                                    }}
                                  >
                                    <MdOutlineDelete />
                                    Remove
                                  </div>
                                  {errors && errors[0]?.message}
                                </section>
                              </section>
                            </div>
                            {/* <div className='col-2'>
                              <QuantityBox
                                id={buyNowCartItems[0]?.product._id}
                                number={buyNowCartItems[0]?.qty}
                                item={buyNowCartItems[0]}
                              />
                            </div> */}
                            <div className='col-md-2 col-4'>
                              {/* <Counter />
                                  <QuantityBox
                                    id={item.product._id}
                                    number={item.qty}
                                    item={item}
                                    loading={cartAddLoading}
                                  /> */}
                              <div className='counterHolder'>
                                {buyNowCartItems[0].qty > 1 && (
                                  <div
                                    className='counterHolder-item'
                                    onClick={() => {
                                      dispatch(
                                        removeFromBuyNowCart(
                                          buyNowCartItems[0]?.product._id
                                        )
                                      );
                                    }}
                                  >
                                    -
                                  </div>
                                )}
                                <div className='counterHolder-item Qtynumber'>
                                  {buyNowCartItems[0].qty}
                                </div>
                                <div
                                  className='counterHolder-item'
                                  onClick={() => {
                                    dispatch(addToQuickBuyLoading());
                                    // if (
                                    //   buyNowCartItems[0].qty + 1 <=
                                    //     buyNowCartItems[0]?.product.stock ||
                                    //   buyNowCartItems[0].qty + 1 <=
                                    //     buyNowCartItems[0]?.product.orderLimit
                                    // )
                                    dispatch(
                                      addToQuickBuySuccess({
                                        product: buyNowCartItems[0]?.product,
                                        qty: buyNowCartItems[0]?.qty + 1,
                                      })
                                    );
                                  }}
                                >
                                  +
                                </div>
                              </div>
                            </div>
                            <div className='col-2'>
                              <div className='cartItem-items-unit '>
                                {currencyCode}{' '}
                                {buyNowCartItems[0]?.product.price *
                                  Number(currencyValue)}
                              </div>{' '}
                            </div>
                            <div className='col-2'>
                              <div className='cartItem-items-sub'>
                                {currencyCode}{' '}
                                {buyNowCartItems[0]?.product.price *
                                  buyNowCartItems[0]?.qty *
                                  Number(currencyValue)}{' '}
                              </div>{' '}
                            </div>
                          </div>
                        </div>
                      </section>
                    )}
                    {/* .............////// */}
                    {location.pathname.includes('buy-now') &&
                      buyNowCartError && (
                        <p className='loginError'>{buyNowCartMessage}</p>
                      )}
                  </section>
                </Col>
                <Col lg={4} md={12}>
                  <Bill show={true} errors={errors} setErrors={setErrors} />
                </Col>
              </Row>

              <section className='continue mt-3'>
                {' '}
                <Link to='/'>
                  <i className='fa  fa-chevron-left'></i> Continue shopping
                </Link>
              </section>
            </div>
          ) : (
            <div>
              <section className='continue mt-3'>
                {' '}
                <NoItems />
                <Link to='/'>
                  <i className='fa  fa-chevron-left'></i> continue shopping
                </Link>
              </section>
            </div>
          )}
        </section>
      )}
    </Fragment>
  );
}

export default Index;
