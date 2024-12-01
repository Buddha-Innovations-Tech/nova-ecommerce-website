import React, { Fragment, useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";

import ImageGallery from "react-image-gallery";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearProduct, getProductDetailAsync } from "../../redux/productSlice";
import ProductCard from "../../components/ProductCard";

import ItemSkeleton from "../../components/Skeletons/ItemSkeleton";

import LoaderComponent from "../../components/LoaderComponent";
import {
  addToCart,
  resetCart,
  addToQuickBuyLoading,
  addToQuickBuySuccess,
  resetCartAdd,
} from "../../redux/cartSlice";
import Attractions from "../../components/Attractions";
import ProductReview from "../../components/reviews";
import { FaWhatsapp } from "react-icons/fa";
import Table from 'react-bootstrap/Table';

function Index() {
  const [isOpen, setIsOpen] = useState(false);
  const [descTab, setDescTab] = useState("description");
  const toggle = () => setIsOpen(!isOpen);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const params = useParams();
  const product = useSelector((state) => state.products.product);
  const originalProduct = useSelector(
    (state) => state.products.originalProduct
  );
  const code = useSelector((state) => state.products.currencyCode);
  const loading = useSelector((state) => state.products.loading);
  const cartAdding = useSelector((state) => state.cart.cartAddSuccess);
  const [maxCount, setMaxCount] = useState(0);
  const [qty, setQty] = useState(1);

  const [outOfStock, setOutOfStock] = useState(false);
  const [outOfStockMsg, setoutOfStockMsg] = useState("");
  const [orderLimit, setOrderLimit] = useState(false);
  const [variants, setVariants] = useState("");

  useEffect(() => {
    if (product) {
      if (!variants) {
        setVariants(product.variants);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  useEffect(() => {
    product &&
      setMaxCount(
        product.stock > product.orderLimit ? product.orderLimit : product.stock
      );
  }, [product]);

  useEffect(() => {
    window.scroll(0, 0);
  }, [params]);

  useEffect(() => {
    return () => {
      dispatch(clearProduct());
    };
  }, []);

  useEffect(() => {
    dispatch(getProductDetailAsync({ slug: params.slug, params: {} }));
    setQty(1);
  }, [dispatch, params]);

  useEffect(() => {
    if (product) {
      if (product.orderLimit <= product.stock) {
        if (qty === product.orderLimit) {
          setOrderLimit(true);
        } else {
          setOrderLimit(false);
        }
      } else {
        if (qty === product.stock) {
          setOutOfStock(true);
        } else {
          setOutOfStock(false);
        }
      }
    }
  }, [qty, product]);

  useEffect(() => {
    if (outOfStockMsg) {
      setTimeout(() => {
        setoutOfStockMsg("");
      }, 2000);
    }
  }, [outOfStockMsg]);

  const handleVariant = ({ type, choice }) => {
    if (variants[type] !== choice) {
      dispatch(
        getProductDetailAsync({
          slug: params.slug,
          params: { ...variants, [type]: choice },
        })
      );
      setVariants((prev) => ({ ...prev, [type]: choice }));
      setQty(1);
      setoutOfStockMsg("");
    }
  };

  const [activeSize, setActiveSize] = useState(null);

  const handleButtonClick = (size) => {
    setActiveSize(size);
  };
  if (loading) return <ItemSkeleton />;

  return (
    <Fragment>
      {product && (
        <Container>
          <section className=" productWrapper mt-3">
            <Row>
              <Col lg={6}>
                <section className="imageHolder">
                  {product?.gallery.length > 0 ? (
                    <ImageGallery
                      items={product.gallery.map((g) => ({
                        original: `${process.env.REACT_APP_IMAGE_PREFIX}${g}`,
                        thumbnail: `${process.env.REACT_APP_IMAGE_PREFIX}${g}`,
                      }))}
                      showPlayButton={false}
                      thumbnailPosition="left"
                      showFullscreenButton={true}
                    />
                  ) : (
                    <img
                      className="singleImageProduct"
                      src={`${process.env.REACT_APP_IMAGE_PREFIX}${product.heroImage}`}
                      alt={product.name}
                    />
                  )}
                </section>
              </Col>
              <Col lg={5}>
                <section className="DetailsHolder">
                  <section className="DetailsHolder-header ">
                    <h1 className="DetailsHolder-header-title">
                      {product.name}
                    </h1>
                    {/* <div className='DetailsHolder-header-brand mb-3'>
                      <span className='brandKey'>Category: </span>{' '}
                      <span className='brandValue'>
                        {' '}
                        <strong>{product.category.name}</strong>{' '}
                      </span>
                    </div> */}
                  </section>

                  <Row>
                    <Col>
                      <section className="DetailsHolder-stock mt-3">
                        <span className="DetailsHolder-stock-price">
                          {code}
                          {product.sellingPrice -
                            Math.floor(product.sellingPrice) !==
                          0
                            ? product.sellingPrice.toFixed(2)
                            : product.sellingPrice}
                        </span>
                        {product.discount > 0 && (
                          <>
                            <span className="DetailsHolder-stock-cutprice ml-3">
                              {code}{" "}
                              {product.price - Math.floor(product.price) !== 0
                                ? product.price.toFixed(2)
                                : product.price}
                            </span>
                            {/* <span className='DetailsHolder-stock-discount ml-3 '>
                              {product.discount}% off
                            </span> */}
                          </>
                        )}
                        <div className="DetailsHolder-stock-vatInfo">
                          incl. of all tax
                        </div>
                      </section>

                      {product.options.length > 0 ? (
                        <div className="DetailsHolder-variants">
                          {product.options.map((entry) => (
                            <div
                              className="DetailsHolder-variants_item"
                              key={entry.name}
                            >
                              <span className="DetailsHolder-variants_item-name">
                                {entry.name}
                              </span>
                              <div className="btons-list">
                                {entry.values.map((choice) => (
                                  <button
                                    key={choice}
                                    type="button"
                                    className={`btons-list_item ${
                                      variants[entry.name] === choice
                                        ? "active"
                                        : ""
                                    }`}
                                    onClick={() =>
                                      handleVariant({
                                        type: entry.name,
                                        choice: choice,
                                      })
                                    }
                                  >
                                    {choice}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : null}
                      {product.stock > 0 && (
                        <>
                          <div
                            className={`${
                              product.stock > 0
                                ? "DetailsHolder-stock-stockInfo "
                                : "DetailsHolder-stock-stockInfoDanger "
                            }`}
                          >
                            {product.stock > 0 ? "IN STOCK" : "OUT OF STOCK"}
                          </div>
                          <section className="DetailsHolder-varient mt-3">
                            <div className="DetailsHolder-qty-name">
                              Varient
                              <div className="DetailsHolder-varient-buttons mt-3">
                                <button
                                  className={activeSize === "S" ? "active" : ""}
                                  onClick={() => handleButtonClick("S")}
                                >
                                  S
                                </button>
                                <button
                                  className={activeSize === "M" ? "active" : ""}
                                  onClick={() => handleButtonClick("M")}
                                >
                                  M
                                </button>
                                <button
                                  className={activeSize === "L" ? "active" : ""}
                                  onClick={() => handleButtonClick("L")}
                                >
                                  L
                                </button>
                                <button
                                  className={
                                    activeSize === "XL" ? "active" : ""
                                  }
                                  onClick={() => handleButtonClick("XL")}
                                >
                                  XL
                                </button>
                              </div>
                            </div>
                          </section>
                          <section className="DetailsHolder-qty mt-3">
                            <div className="DetailsHolder-qty-name">
                              Quantity
                            </div>

                            <div className="counterHolder">
                              <div
                                className="counterHolder-item"
                                onClick={() => {
                                  if (Number(qty) > 1) {
                                    setQty(qty - 1);
                                  }
                                }}
                              >
                                &minus;
                              </div>
                              <div className="counterHolder-item Qtynumber">
                                {qty}
                              </div>
                              <div
                                className="counterHolder-item"
                                onClick={() => {
                                  if (
                                    qty < product.stock &&
                                    qty < product.orderLimit
                                  ) {
                                    setQty(qty + 1);
                                  }
                                }}
                              >
                                &#43;
                              </div>
                              {orderLimit && (
                                <span className="cda mt-3 ms-3">
                                  Order limit reached !
                                </span>
                              )}
                              {outOfStock && (
                                <span className="cda mt-3 ms-3">
                                  Stock limit reached !
                                </span>
                              )}
                            </div>
                            {/* <section className='webQuantity'>
                              <Form.Group className='DetailsHolder-qty-select '>
                                <Form.Control
                                  type='number'
                                  onWheel={(e) => e.target.blur()}
                                  onChange={(e) => {
                                    if (
                                      Number(e.target.value) === product.stock
                                    ) {
                                      setOutOfStock(true);
                                    } else {
                                      setOutOfStock(false);
                                    }
                                    Number(e.target.value) <= product.stock &&
                                      Number(e.target.value) <=
                                        product.orderLimit &&
                                      setQty(Number(e.target.value));
                                  }}
                                  value={qty}
                                  min='1'
                                  max={
                                    Number(product.orderLimit) >=
                                    Number(product.stock)
                                      ? Number(product.orderLimit)
                                      : Number(product.stock)
                                  }
                                />
                              </Form.Group>
                            </section> */}

                            {/* <section className='mobQuantity'>
                              <Form.Group className='DetailsHolder-qty-select '>
                                <Form.Control
                                  type='number'
                                  onChange={(e) =>
                                    Number(e.target.value) <= product.stock &&
                                    Number(e.target.value) <=
                                      product.orderLimit &&
                                    setQty(Number(e.target.value))
                                  }
                                  value={qty}
                                  min='1'
                                  // onKeyDown={(e) => {
                                  //   e.preventDefault();
                                  //   return false;
                                  // }}
                                  // max={Number(product.orderLimit)}
                                />
                              </Form.Group>
                            </section> */}
                          </section>
                          <section className="DetailsHolder-cta mt-4 pb-4">
                            {/* <Link to='/cart'> */}

                            <button
                              disabled={product.stock < 1}
                              className="bton bton--md bton--ghost prodbuttons"
                              onClick={() => {
                                if (qty > 0) {
                                  dispatch(
                                    addToCart({
                                      product: {
                                        _id: originalProduct._id,
                                        name: originalProduct.name,
                                        slug: originalProduct.slug,
                                        stock: originalProduct.stock,
                                        orderLimit: originalProduct.orderLimit,
                                        heroImage: originalProduct.heroImage,
                                        price: originalProduct.price,
                                        discount: originalProduct.discount,
                                        sellingPrice:
                                          originalProduct.sellingPrice,
                                        variants: originalProduct.variants,
                                      },
                                      qty,
                                    })
                                  );
                                  setTimeout(() => {
                                    dispatch(resetCartAdd());
                                  }, 1000);
                                }
                              }}
                            >
                              <i className="fa  fa-shopping-cart"></i> Add to
                              cart
                            </button>
                            {/* className="bton bton--md bton--sec ms-0 ms-md-2 mt-2 mt-md-0 prodbuttons */}
                            {/* </Link> */}
                            <button
                            className="bton bton--md bton--primary prodbuttons"
                              onClick={() => {
                                if (qty > 0) {
                                  dispatch(addToQuickBuyLoading());
                                  dispatch(
                                    addToQuickBuySuccess({
                                      product: {
                                        _id: product._id,
                                        name: product.name,
                                        slug: product.slug,
                                        stock: product.stock,
                                        orderLimit: product.orderLimit,
                                        heroImage: product.heroImage,
                                        price: product.price,
                                        discount: product.discount,
                                        sellingPrice: product.sellingPrice,
                                        variants: product.variants,
                                      },
                                      qty,
                                    })
                                  );
                                  setTimeout(() => {
                                    dispatch(resetCartAdd());
                                  }, 1000);
                                  navigate("/cart/buy-now");
                                }
                              }}
                            >
                              <i className="fa fa-rocket"></i> Buy Now
                            </button>

                            {/* <div className="mt-3">
                              <div>Whattsapp:</div>
                              <button className="bton bton--md whattsappButton">
                                <FaWhatsapp /> <span>Order On Whatsapp</span>
                              </button>
                            </div> */}
                            {cartAdding && (
                              <div className="csu mt-3 addedSuccess">
                                Product Added Successfully !!
                              </div>
                            )}
                          </section>
                        </>
                      )}
                    </Col>

                    {/* <Col>
                      <section className='DetailsHolder-highlights '>
                        <h2>Product Hilights</h2>
                        <ul>
                          <li>6 month Installment available.</li>
                          <li>6 month Installment available.</li>
                          <li>6 month Installment available.</li>
                          <li>6 month Installment available.</li>
                        </ul>
                      </section>
                    </Col> */}
                  </Row>
                </section>
              </Col>
            </Row>
          </section>

          <div className="descriptionWrapper" style={{ marginTop: "3rem" }}>
            <div className="descriptionTab ">
              <button
                className={`${
                  descTab === "description" ? "activeDescTab" : ""
                }`}
                onClick={() => setDescTab("description")}
              >
                {" "}
                Description
              </button>
              <button
                className={`${descTab === "specs" ? "activeDescTab" : ""}`}
                onClick={() => setDescTab("specs")}
              >
                Specification
              </button>
            </div>
            <Row className="justify-content-start">
              {descTab === "description" && (
                <Col lg={8}>
                  <div className=" productInfoWrapper">
                    <section className="productDesc ">
                      <p
                        className="mt-3"
                        dangerouslySetInnerHTML={{
                          __html: product.description,
                        }}
                      />
                    </section>
                  </div>
                </Col>
              )}

              {descTab === "specs" && (
                <Col lg={8}>
                  <div className=" productTechInfo">
                    <section className="productTechDesc ">
                      {/* <ul className="mt-3">
                        {product.information &&
                          product.information.map((info) => {
                            return (
                              <li className="productTechDesc-box mt-2 ">
                                <div className="productTechDesc-box-key ">
                                  {info.informationKey}
                                </div>{" "}
                                <div className="productTechDesc-box ">
                                  {info.informationValue}
                                </div>
                              </li>
                            );
                          })}
                      </ul> */}
                    <Table  bordered className="border 0.4px solid #00000063" >
                    <tbody>
        <tr >
          <td>Color</td>
          <td>White, Pink, Black</td>
        </tr>
        <tr>
          <td>Size</td>
          <td>S, M, L, XL</td>
        </tr>
        </tbody>
                      </Table>
                    </section>
                  </div>
                </Col>
              )}
            </Row>
          </div>
          {/* <ProductReview id={product._id} /> */}
          {product.related.length > 0 && (
            <>
              <h1 className="text-center m-5">Related Products</h1>

              <Row className="justify-content-center">
                {product.related.map((rp) => (
                  <ProductCard column="3" fProduct={rp} /> 
                ))}
              </Row>
            </>
          )}

          <Attractions />
        </Container>
      )}
    </Fragment>
  );
}

export default Index;
