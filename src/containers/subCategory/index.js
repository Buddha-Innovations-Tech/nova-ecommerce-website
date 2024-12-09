// import React, { useEffect, useState } from "react";
// import {
//   Col,
//   Container,
//   Form,
//   Row,
//   Offcanvas,
//   CloseButton,
// } from "react-bootstrap";
// import { useParams, useLocation, useNavigate } from "react-router-dom";
// import ProductCard from "../../components/ProductCard";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   filteringStart,
//   filterProductsAsync,
//   getProductByCategoryAsync,
// } from "../../redux/productSlice";
// // import Pagination from '../../components/Pagination';
// import CategoryProductCard from "../../components/CategoryProductCard";
// import Pagination from "../../components/P";
// import CategorySkeleton from "../../components/Skeletons/CategorySkeleton";
// import CategoryProdSkeletons from "../../components/Skeletons/CategoryProdSkeletons";
// import NoItems from "../../components/NoItems";

// const SubCategory = () => {
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);


//   const dispatch = useDispatch();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { slug, subcategorySlug } = useParams();

//   const products = useSelector((state) => state.products.products);
//   const categories = useSelector((state) => state.categories.category);
//   const productLoading = useSelector((state) => state.products.loading);
//   const totalProducts = useSelector((state) => state.products.totalProducts);

//   const [filterError, setFilterError] = useState("");

//   const [cat_id, setCatId] = useState(null);
//   const [subData, setSubData] = useState(null);
//   const [sub2Data, setsub2Data] = useState(null);

//   const [sublData, setSubLData] = useState(null);


//   const [min, setMin] = useState(0);
//   const [max, setMax] = useState(0);
//   const [sortState, setSortState] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   const [postsPerPage] = useState(15);



//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   useEffect(() => {
//     if (loading !== null && !loading) {
//       setFilterSub([]);
//       let catId = null;
//       let subData = null;
//       let sub2Data = null;
//       if (location.state === null) {
//         const cat =
//           categories.length > 0 && categories.find((e) => e.slug === slug);
//         catId = cat._id;
//         setCatId(cat?._id);
//       } else {
//         setCatId(location.state?.cat_id);
//       }

//       if (location.state?.subData != null) {
//         subData = location.state.subData;
//         setSubData(location.state.subData);
//       }
//       if (location.state?.sub2Data != null) {
//         sub2Data = location.state.sub2Data;
//         setsub2Data(location.state.sub2Data);
//       }

//       if (location.state?.subData !== null) {
//         setFilterSub([{ ...location.state?.subData }]);
//       }

//       const data = {
//         sub: location.state?.subData ? [location.state?.subData] : [],
//         min,
//         max,
//         sortby: sortState,
//         id: location.state === null ? catId : location.state.cat_id,
//         sub2: sub2Data,
//         subfilter: [],
//       };
//       dispatch(getProductByCategoryAsync(data));
//     }
//   }, [dispatch, loading, location.state]);
  

//   const indexOfLastProduct = currentPage * postsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - postsPerPage;
//   const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   if (productLoading) return <CategorySkeleton />;

//   const handleSubCategory2Change = (event) => {
//     const value = event.target.value;
//     setSelectedSubCategory2((prevState) =>
//       prevState.includes(value)
//         ? prevState.filter((id) => id !== value)
//         : [...prevState, value]
//     );
//   };

//   const filterProduct = () => {
//     if (min > max) {
//       setFilterError("Min cannot be greater than Max");
//       return;
//     }

//     // Reset error if valid
//     setFilterError('');
    
//     const data = {
//       cat_id: categories.find((e) => e.slug === slug)?._id, // Pass category ID
//       subCategory2: selectedSubCategory2,
//       min,
//       max,
//       sortby: sortState,
//     };

//     dispatch(getProductByCategoryAsync(data)); // Fetch filtered products
//   };

//   return (
//     <div>
//       <Container>
//         {/* Header with Breadcrumb Navigation */}
//         <section className="mt-4">
//           Home /
//           <span
//             onClick={() => navigate(`/category/${slug}`)}
//             style={{ cursor: "pointer", textDecoration: "underline" }}
//           >
//             {slug} /
//           </span>
//           <strong>{subcategorySlug}</strong>
//         </section>

//         {/* Filter and Product List Section */}
//         <section className="allproductInfo">
//           <div className="text-muted itemsnumber">
//             Showing {products.length} / {totalProducts} items
//           </div>

//           <Form.Select
//             aria-label="Sort Products"
//             onChange={(e) => setSortState(e.target.value)}
//           >
//             <option value="remove">SortBy</option>
//             <option value="lowToHigh">Price low to high</option>
//             <option value="highToLow">Price high to low</option>
//           </Form.Select>

//           <button
//             className="bton bton--ghost bton-md mobileFilter"
//             onClick={handleShow}
//           >
//             <i className="fa fa-filter"></i> filters
//           </button>

//           {/* Offcanvas Filter Modal */}
//           <Offcanvas show={show} onHide={handleClose} placement="bottom">
//             <Offcanvas.Header closeButton>
//               <Offcanvas.Title></Offcanvas.Title>
//             </Offcanvas.Header>
//             <Offcanvas.Body>
//               {/* Filter Form */}
//               <section className="mobfilterHolder">
//                 <section className="mb-3">
//                   <button
//                     className="bton bton--sm bton--primary m-0"
//                     onClick={(e) => {
//                       e.preventDefault();
//                       filterProduct();
//                       handleClose();
//                     }}
//                   >
//                     Apply
//                   </button>
//                   <button
//                     className="bton bton--sm bton--stroke ms-4"
//                     onClick={(e) => {
//                       navigate(`/category/${slug}`, { state: { subCategory2Data: null } });
//                       handleClose();
//                     }}
//                   >
//                     Clear Filters
//                   </button>
//                 </section>

//                 {/* Subcategory2 Filters as Checkboxes */}
//                 <section className="subCategory2Filter">
//                   <h2>Subcategory 2</h2>
//                   {subCategory2Data?.map((subCat2) => (
//                     <Form.Check
//                       key={subCat2._id}
//                       type="checkbox"
//                       id={`subCategory2-${subCat2._id}`}
//                       label={subCat2.name}
//                       value={subCat2._id}
//                       checked={selectedSubCategory2.includes(subCat2._id)}
//                       onChange={handleSubCategory2Change}
//                     />
//                   ))}
//                 </section>

//                 {/* Price Range Filters */}
//                 <section className="rangeHolder">
//                   <section className="rangeHolder-title">
//                     <h2>Price Range</h2>
//                   </section>
//                   <section className="rangeHolder-input">
//                     <Form.Group className="mb-3 me-3">
//                       <Form.Label>Min</Form.Label>
//                       <Form.Control
//                         type="number"
//                         value={min}
//                         onChange={(e) => setMin(e.target.value)}
//                       />
//                     </Form.Group>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Max</Form.Label>
//                       <Form.Control
//                         type="number"
//                         value={max}
//                         onChange={(e) => setMax(e.target.value)}
//                       />
//                     </Form.Group>
//                   </section>
//                 </section>
//               </section>
//             </Offcanvas.Body>
//           </Offcanvas>
//         </section>

//         {/* Display Products */}
//         <section>
//           <Row>
//             {products.length === 0 ? (
//               <NoItems />
//             ) : (
//               <CategoryProductCard
//                 column={4}
//                 products={currentProducts}
//                 productLoading={productLoading}
//               />
//             )}
//           </Row>

//           {/* Pagination */}
//           <Pagination
//             postsPerPage={postsPerPage}
//             totalProducts={products.length}
//             paginate={paginate}
//             current={currentPage}
//           />
//         </section>
//       </Container>
//     </div>
//   );
// };

// export default SubCategory;
