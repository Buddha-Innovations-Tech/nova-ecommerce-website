import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Offcanvas } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductByCategoryAsync } from "../../redux/productSlice"; // Import action for fetching products
import CategoryProductCard from "../../components/CategoryProductCard";
import Pagination from "../../components/P";
import CategorySkeleton from "../../components/Skeletons/CategorySkeleton";
import NoItems from "../../components/NoItems";

const SubCategory = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug, subcategorySlug } = useParams();

  const products = useSelector((state) => state.products.products);
  const categories = useSelector((state) => state.categories.category);
  const productLoading = useSelector((state) => state.products.loading);
  const totalProducts = useSelector((state) => state.products.totalProducts);

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [sortState, setSortState] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(15);
  const [selectedSubCategory2, setSelectedSubCategory2] = useState([]);
  const [filterError, setFilterError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let subCategory2Data = [];
  const category = categories.find((cat) => cat.slug === slug);
  const subCategory = category?.subCategory.find((sub) => sub.slug === subcategorySlug);
  if (subCategory) {
    subCategory2Data = subCategory.subCategory2 || [];
  }

  useEffect(() => {
    if (category && subCategory) {
      const data = {
        cat_id: category._id,  // Use category ID
        subCategory2: selectedSubCategory2, // Filter by selected subcategory2
        min,
        max,
        sortby: sortState,
      };

      dispatch(getProductByCategoryAsync(data)); // Fetch filtered products
    }
  }, [slug, subcategorySlug, dispatch, min, max, sortState, selectedSubCategory2, categories]);

  const indexOfLastProduct = currentPage * postsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - postsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (productLoading) return <CategorySkeleton />;

  const handleSubCategory2Change = (event) => {
    const value = event.target.value;
    setSelectedSubCategory2((prevState) =>
      prevState.includes(value)
        ? prevState.filter((id) => id !== value)
        : [...prevState, value]
    );
  };

  const filterProduct = () => {
    if (min > max) {
      setFilterError("Min cannot be greater than Max");
      return;
    }

    // Reset error if valid
    setFilterError('');
    
    const data = {
      cat_id: categories.find((e) => e.slug === slug)?._id, // Pass category ID
      subCategory2: selectedSubCategory2,
      min,
      max,
      sortby: sortState,
    };

    dispatch(getProductByCategoryAsync(data)); // Fetch filtered products
  };

  return (
    <div>
      <Container>
        {/* Header with Breadcrumb Navigation */}
        <section className="mt-4">
          Home /
          <span
            onClick={() => navigate(`/category/${slug}`)}
            style={{ cursor: "pointer", textDecoration: "underline" }}
          >
            {slug} /
          </span>
          <strong>{subcategorySlug}</strong>
        </section>

        {/* Filter and Product List Section */}
        <section className="allproductInfo">
          <div className="text-muted itemsnumber">
            Showing {products.length} / {totalProducts} items
          </div>

          <Form.Select
            aria-label="Sort Products"
            onChange={(e) => setSortState(e.target.value)}
          >
            <option value="remove">SortBy</option>
            <option value="lowToHigh">Price low to high</option>
            <option value="highToLow">Price high to low</option>
          </Form.Select>

          <button
            className="bton bton--ghost bton-md mobileFilter"
            onClick={handleShow}
          >
            <i className="fa fa-filter"></i> filters
          </button>

          {/* Offcanvas Filter Modal */}
          <Offcanvas show={show} onHide={handleClose} placement="bottom">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {/* Filter Form */}
              <section className="mobfilterHolder">
                <section className="mb-3">
                  <button
                    className="bton bton--sm bton--primary m-0"
                    onClick={(e) => {
                      e.preventDefault();
                      filterProduct();
                      handleClose();
                    }}
                  >
                    Apply
                  </button>
                  <button
                    className="bton bton--sm bton--stroke ms-4"
                    onClick={(e) => {
                      navigate(`/category/${slug}`, { state: { subCategory2Data: null } });
                      handleClose();
                    }}
                  >
                    Clear Filters
                  </button>
                </section>

                {/* Subcategory2 Filters as Checkboxes */}
                <section className="subCategory2Filter">
                  <h2>Subcategory 2</h2>
                  {subCategory2Data?.map((subCat2) => (
                    <Form.Check
                      key={subCat2._id}
                      type="checkbox"
                      id={`subCategory2-${subCat2._id}`}
                      label={subCat2.name}
                      value={subCat2._id}
                      checked={selectedSubCategory2.includes(subCat2._id)}
                      onChange={handleSubCategory2Change}
                    />
                  ))}
                </section>

                {/* Price Range Filters */}
                <section className="rangeHolder">
                  <section className="rangeHolder-title">
                    <h2>Price Range</h2>
                  </section>
                  <section className="rangeHolder-input">
                    <Form.Group className="mb-3 me-3">
                      <Form.Label>Min</Form.Label>
                      <Form.Control
                        type="number"
                        value={min}
                        onChange={(e) => setMin(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Max</Form.Label>
                      <Form.Control
                        type="number"
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

        {/* Display Products */}
        <section>
          <Row>
            {products.length === 0 ? (
              <NoItems />
            ) : (
              <CategoryProductCard
                column={4}
                products={currentProducts}
                productLoading={productLoading}
              />
            )}
          </Row>

          {/* Pagination */}
          <Pagination
            postsPerPage={postsPerPage}
            totalProducts={products.length}
            paginate={paginate}
            current={currentPage}
          />
        </section>
      </Container>
    </div>
  );
};

export default SubCategory;
