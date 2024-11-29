import React, { useEffect, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux/es/exports';

import BrandImage from '../../assets/images/Sunrise.png';
import Account from '../../assets/icons/profile.png';
import Cart from '../../assets/icons/shopping-cart.png';
import Chevrone from '../../assets/icons/chevron.svg';
import { getCategoriesAsync } from '../../redux/categorySlice';
import NavSkeletons from '../Skeletons/NavSkeletons';
import { getSubscriberDetailsAsync } from '../../redux/subscriberSlice';
import { getCurrencyValueAsync } from '../../redux/productSlice';
import { countryDetails } from '../../data';
import CategoryDropdown from '../UiElements/CategoryDropdown';

import { CiLogin } from 'react-icons/ci';
import { FaRegUser } from 'react-icons/fa6';
import { BsCart2 } from 'react-icons/bs';
import { BiUserCircle } from "react-icons/bi";


const Navbar = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.category);
  const loading = useSelector((state) => state.categories.loading);
  const { user, userDetails } = useSelector((state) => state.subscribers);
  const { cartItems } = useSelector((state) => state.cart);

  const [searchKey, setSearchKey] = useState('');
  useEffect(() => {
    if (user) {
      dispatch(getSubscriberDetailsAsync());
    }
  }, [user]);

  useEffect(() => {
    dispatch(getCategoriesAsync());
  }, []);

  if (loading) return <NavSkeletons />;

  return (
    <>
      {/* <Container>
        <section className='topnavInfo'>
          <div className='topnavInfo-right'>
            {userDetails && (
              <div className='topnavInfo-right_user'>{`Welcome ${userDetails?.name}`}</div>
            )}
          </div>
        </section>
      </Container> */}
      <section className='navMainWrapper'>
        <Container>
          <nav className='navWrapper'>
            <figure className='navWrapper-brand'>
              <Link to='/'>
                <img src={BrandImage} alt='' />
              </Link>
            </figure>
            <CategoryDropdown categories={categories} />
            <section > <Link to='/about'> <span className='navWrapper-about'>  About Us </span></Link></section>
            <section className='navWrapper-search'>
              <input
                type='search'
                name='search'
                value={searchKey}
                onKeyUp={(e) =>
                  e.key === 'Enter' && navigate('/search', { state: searchKey })
                }
                id=''
                onChange={(e) => setSearchKey(e.target.value)}
                placeholder='search here ...'
              />
              <button
                className='bton bton--sm bton--primary  mobSearchBton'
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/search', { state: searchKey });
                }}
              >
                <span className='mobsearch'>search</span>
              </button>
            </section>
            <section className='navWrapper-carts'>
          
              {user ? (
                <span className='navWrapper-carts-login'>
                  <Link to='/account'>
                    <span className=' me-1'>
                      <FaRegUser />{' '}
                    </span>
                    <span>My Account</span>
                  </Link>
                </span>
              ) : (
                <span className='navWrapper-carts-login'>
                  <Link to='/login'>
                    <span className=' me-1'>
                      <CiLogin />
                      {/* <FaRegUser /> */}
                      {/* <BiUserCircle /> */}
                    </span>
                    <span>LOGIN</span>
                  </Link>
                </span>
              )}
                <span className='myCart'>
                <Link to='/cart'>
                  <BsCart2 />
                  &nbsp;
                  <div className='cartCount'>{cartItems?.length}</div>
                </Link>
              </span>
            </section>
          </nav>
        </Container>
        {/* <section>
          <nav className='navbarBox'>
            <Container>
              <ul className='menu p-0 m-0'>
                {categories &&
                  categories.map((cat) => {
                    const data = {
                      cat_id: cat._id,
                      subData: null,
                      sub2Data: null,
                    };
                    return (
                      <>
                        <li className='menu--items'>
                          <Link
                            to={`/category/${cat.slug}`}
                            state={data}
                            className='navitems'
                          >
                            {cat.name}{' '}
                          </Link>
                          {cat.subCategory.length > 0 && (
                            <img src={Chevrone} alt='' />
                          )}
                          {cat.subCategory.length > 0 && (
                            <section className='sub--menu'>
                              {cat.subCategory &&
                                cat.subCategory.map((sub) => {
                                  const data = {
                                    cat_id: cat._id,
                                    subData: { _id: sub._id, name: sub.name },
                                    sub2Data: null,
                                  };
                                  return (
                                    <section className='subcatWrapper'>
                                      <div className='subcatWrapper--title'>
                                        <Link
                                          to={`/category/${cat.slug}`}
                                          state={data}
                                        >
                                          {sub.name}
                                        </Link>
                                      </div>
                                      <ul className='subcatWrapper--itemholder'>
                                        {sub.subCategory2 &&
                                          sub.subCategory2.map((sub2) => {
                                            const data = {
                                              cat_id: cat._id,
                                              subData: {
                                                _id: sub._id,
                                                name: sub.name,
                                              },
                                              sub2Data: {
                                                _id: sub2._id,
                                                name: sub2.name,
                                              },
                                            };
                                            return (
                                              <li className='subcatWrapper--itemholder__items'>
                                                <Link
                                                  to={`/category/${cat.slug}`}
                                                  state={data}
                                                >
                                                  {sub2.name}
                                                </Link>
                                              </li>
                                            );
                                          })}
                                      </ul>
                                    </section>
                                  );
                                })}
                            </section>
                          )}
                        </li>
                      </>
                    );
                  })}
                <li className='menu--items'>
                  <Link className='navitems' to={`/cleaning`}>
                    Cleaning Facilities
                  </Link>
                </li>
              </ul>
            </Container>
          </nav>
        </section> */}
      </section>

      <section className='mobileWrapper'>
        <section className='mobileNavbar'>
          <section>
            <NavLink
              className={(navData) =>
                navData.isActive ? 'mobActiveTab' : 'notActive'
              }
              to='/'
            >
              <section className='mobileNavbar-items'>
                <i className='fa fa-home'></i>
                <div className='mobileNavbar-items-name'>Home</div>
              </section>
            </NavLink>
          </section>
          <section>
            <NavLink
              className={(navData) =>
                navData.isActive ? 'mobActiveTab' : 'notActive'
              }
              to='/mobcat'
            >
              <section className='mobileNavbar-items'>
                <i className='fa fa-sliders'></i>
                <div className='mobileNavbar-items-name'>Categories</div>
              </section>
            </NavLink>
          </section>
          <section>
            <NavLink
              className={(navData) =>
                navData.isActive ? 'mobActiveTab' : 'notActive'
              }
              to='/cart'
            >
              <section className='mobileNavbar-items'>
                <i
                  className='fa  fa-shopping-cart
'
                ></i>
                <div className='mobileNavbar-items-name'>Cart</div>
                {cartItems?.length > 0 && (
                  <div className='cartMobCount'>{cartItems.length}</div>
                )}
              </section>{' '}
            </NavLink>
          </section>
          <section>
            <NavLink
              className={(navData) =>
                navData.isActive ? 'mobActiveTab' : 'notActive'
              }
              to='/more'
            >
              <section className='mobileNavbar-items'>
                <i
                  className='fa  fa-gear
'
                ></i>
                <div className='mobileNavbar-items-name'>More</div>
              </section>{' '}
            </NavLink>
          </section>
        </section>
      </section>
    </>
  );
};

export default Navbar;
