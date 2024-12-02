import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Form,
  Row,
  Offcanvas,
  CloseButton,
} from "react-bootstrap";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import {
  filteringStart,
  filterProductsAsync,
  getProductByCategoryAsync,
} from "../../redux/productSlice";
// import Pagination from '../../components/Pagination';
import CategoryProductCard from "../../components/CategoryProductCard";
import Pagination from "../../components/P";
import CategorySkeleton from "../../components/Skeletons/CategorySkeleton";
import CategoryProdSkeletons from "../../components/Skeletons/CategoryProdSkeletons";
import NoItems from "../../components/NoItems";

const Categories = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { slug } = useParams();

  const products = useSelector((state) => state.products.products);
  // const filtering = useSelector((state) => state.products.filtering);
  const categories = useSelector((state) => state.categories.category);
  const productLoading = useSelector((state) => state.products.loading);
  const loading = useSelector((state) => state.categories.loading);
  const totalProducts = useSelector((state) => state.products.totalProducts);

  const [filterError, setFilterError] = useState("");

  const [cat_id, setCatId] = useState(null);
  const [subData, setSubData] = useState(null);
  const [sub2Data, setsub2Data] = useState(null);

  const [sublData, setSubLData] = useState(null);

  const [filterSub, setFilterSub] = useState([]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [sortState, setSortState] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(15);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (loading !== null && !loading) {
      setFilterSub([]);
      let catId = null;
      let subData = null;
      let sub2Data = null;
      if (location.state === null) {
        const cat =
          categories.length > 0 && categories.find((e) => e.slug === slug);
        catId = cat._id;
        setCatId(cat?._id);
      } else {
        setCatId(location.state?.cat_id);
      }

      if (location.state?.subData != null) {
        subData = location.state.subData;
        setSubData(location.state.subData);
      }
      if (location.state?.sub2Data != null) {
        sub2Data = location.state.sub2Data;
        setsub2Data(location.state.sub2Data);
      }

      if (location.state?.subData !== null) {
        setFilterSub([{ ...location.state?.subData }]);
      }

      const data = {
        sub: location.state?.subData ? [location.state?.subData] : [],
        min,
        max,
        sortby: sortState,
        id: location.state === null ? catId : location.state.cat_id,
        sub2: sub2Data,
        subfilter: [],
      };
      dispatch(getProductByCategoryAsync(data));
    }
  }, [dispatch, loading, location.state]);

  const filterProduct = () => {
    if (min > max) {
      setFilterError("Min cannot be greater than Max");
      return;
    }
    setSubLData(null);
    const data = {
      sub: filterSub,
      min,
      max,
      sortby: sortState,
      id: cat_id,
      sub2: sub2Data,
      subfilter: [],
    };

    dispatch(getProductByCategoryAsync(data));
  };

  useEffect(() => {
    const data = {
      sub: filterSub,
      min,
      max,
      sortby: sortState,
      id: cat_id,
      sub2: sub2Data,
      subfilter: [],
    };
    if (sortState !== "") {
      dispatch(getProductByCategoryAsync(data));
    }
  }, [dispatch, sortState]);

  const indexOfLastProduct = currentPage * postsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - postsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading || cat_id === null) return <CategorySkeleton />;

  return (
    <div>
      <Container>
        <section className="mt-4">
          Home / {cat_id && categories.find((fc) => fc._id === cat_id)?.name}/
          {sublData !== null && <strong>{sublData.name}</strong>}
        </section>

        <section className="allproductInfo">
          <div className="text-muted itemsnumber">
            Showing {products ? products.length : 0} / {totalProducts} items
          </div>

          <Form.Select
            aria-label="Default select example"
            onChange={(e) => {
              setSortState(e.target.value);
            }}
          >
            <option value="remove">SortBy</option>
            <option value="lowToHigh">Price low to high</option>
            <option value="highToLow">Price high to low</option>
          </Form.Select>

          <button
            className="bton bton--ghost bton-md mobileFilter"
            onClick={() => handleShow()}
          >
            {" "}
            <i className="fa fa-filter "></i>filters
          </button>
          <Offcanvas show={show} onHide={handleClose} placement="bottom">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <section className="mobfilterHolder">
                <section className="mb-3">
                  {" "}
                  <button
                    className="bton bton--sm bton--primary m-0"
                    onClick={(e) => {
                      e.preventDefault();
                      filterProduct();
                      handleClose();
                    }}
                  >
                    {" "}
                    Apply{" "}
                  </button>
                  <button
                    className="bton bton--sm bton--stroke ms-4"
                    onClick={(e) => {
                      navigate(`/category/${slug}`, {
                        state: {
                          cat_id: cat_id,
                          subData: null,
                          sub2Data: null,
                        },
                      });
                      window.location.reload();

                      handleClose();
                    }}
                  >
                    Clear Filters
                  </button>
                </section>
                {sub2Data === null && (
                  <>
                    <h2 className="mobfilterHolder-title">Filters</h2>
                    <ul>
                      {cat_id &&
                        categories &&
                        categories
                          .find((fc) => fc._id.toString() === cat_id.toString())
                          ?.subCategory.map((sub) => {
                            return (
                              <li>
                                <Form.Group
                                  className="mb-3"
                                  controlId={`formBasicCheckbox-${sub._id}`}
                                >
                                  <Form.Check
                                    type="checkbox"
                                    label={sub.name}
                                    checked={
                                      filterSub.find((s) => s._id === sub._id)
                                        ? true
                                        : false
                                    }
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setFilterSub([...filterSub, sub]);
                                      } else {
                                        setFilterSub([
                                          ...filterSub.filter(
                                            (f) => f._id !== sub._id
                                          ),
                                        ]);
                                      }
                                    }}
                                  />
                                </Form.Group>
                              </li>
                            );
                          })}
                    </ul>
                    <hr />
                  </>
                )}
                {sub2Data !== null && (
                  <>
                    <section className="suprtSubFilter">
                      <div>
                        <span>Filter Applied for</span>
                      </div>
                      <section className="suprtSubFilter-item">
                        <div className="me-3">{sub2Data.name}</div>
                        <CloseButton
                          onClick={(e) => {
                            navigate(`/category/${slug}`, {
                              state: {
                                cat_id: cat_id,
                                subData: subData,
                                sub2Data: null,
                              },
                            });
                            window.location.reload();
                          }}
                        />
                      </section>
                    </section>
                  </>
                )}
                <section className="rangeHolder">
                  <section className="rangeHolder-title">
                    <h2>Price Range</h2>
                  </section>
                  {filterError !== "" && <p>{filterError}</p>}
                  <section className="rangeHolder-input">
                    <Form.Group
                      className="mb-3 me-3"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Min</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="$"
                        value={min}
                        onChange={(e) => setMin(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Max</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="$"
                        value={max}
                        onChange={(e) => setMax(e.target.value)}
                      />
                    </Form.Group>
                  </section>
                </section>
              </section>
            </Offcanvas.Body>
          </Offcanvas>
        </section>

        <section>
          <Row>
            <Col md={3}>
              <section className="filterHolder">
                {sub2Data === null && (
                  <>
                    <h2 className="filterHolder-title">Filters</h2>
                    <ul>
                      {cat_id &&
                        categories &&
                        categories
                          .find((fc) => fc._id.toString() === cat_id.toString())
                          ?.subCategory.map((sub) => {
                            return (
                              <li>
                                <Form.Group
                                  className="mb-3"
                                  controlId={`formBasicCheckbox-${sub._id}`}
                                >
                                  <Form.Check
                                    type="checkbox"
                                    label={sub.name}
                                    checked={
                                      filterSub.find((s) => s._id === sub._id)
                                        ? true
                                        : false
                                    }
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setFilterSub([...filterSub, sub]);
                                      } else {
                                        setFilterSub([
                                          ...filterSub.filter(
                                            (f) => f._id !== sub._id
                                          ),
                                        ]);
                                      }
                                    }}
                                  />
                                </Form.Group>
                              </li>
                            );
                          })}
                    </ul>
                    <hr />
                  </>
                )}
                {sub2Data !== null && (
                  <>
                    <section className="suprtSubFilter">
                      <div>
                        <span>Filter Applied for</span>
                      </div>
                      <section className="suprtSubFilter-item">
                        <div className="me-3">{sub2Data.name}</div>
                        <CloseButton
                          onClick={(e) => {
                            navigate(`/category/${slug}`, {
                              state: {
                                cat_id: cat_id,
                                subData: subData,
                                sub2Data: null,
                              },
                            });
                            window.location.reload();
                          }}
                        />
                      </section>
                    </section>
                  </>
                )}
                <section className="rangeHolder">
                  <section className="rangeHolder-title">
                    <h2>Price Range</h2>
                  </section>
                  {filterError !== "" && <p>{filterError}</p>}
                  <section className="rangeHolder-input">
                    <Form.Group
                      className="mb-3 me-3"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Min</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="$"
                        value={min}
                        min={0}
                        onChange={(e) => setMin(Math.abs(e.target.value))}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Max</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="$"
                        value={max}
                        onChange={(e) => setMax(Math.abs(e.target.value))}
                      />
                    </Form.Group>
                  </section>
                  <button
                    className="bton bton--sm bton--primary m-0"
                    onClick={(e) => {
                      e.preventDefault();
                      filterProduct();
                    }}
                  >
                    {" "}
                    Apply{" "}
                  </button>
                  <button
                    className="bton bton--sm bton--stroke ms-4"
                    onClick={(e) => {
                      navigate(`/category/${slug}`, {
                        state: {
                          cat_id: cat_id,
                          subData: null,
                          sub2Data: null,
                        },
                      });
                      window.location.reload();
                    }}
                  >
                    Clear Filters
                  </button>
                </section>
              </section>
            </Col>

            {!productLoading || cat_id !== null ? (
              <Col md={9}>
                <Row>
                  {products.length === 0 ? (
                    <NoItems />
                  ) : (
                    products && (
                      <CategoryProductCard
                        column={4}
                        products={currentProducts}
                        productLoading={productLoading}
                      />
                    )
                  )}
                </Row>
              </Col>
            ) : (
              <CategoryProdSkeletons />
            )}
          </Row>
        </section>
        <Pagination
          postsPerPage={postsPerPage}
          totalProducts={products.length}
          paginate={paginate}
          current={currentPage}
        />
      </Container>
    </div>
  );
};

export default Categories;