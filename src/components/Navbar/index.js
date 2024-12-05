import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import BrandImage from '../../assets/images/logo.png';
import Cart from '../../assets/icons/shopping-cart.png';
import Chevrone from '../../assets/icons/chevron.svg';
import { getCategoriesAsync } from '../../redux/categorySlice';
import NavSkeletons from '../Skeletons/NavSkeletons';
import { CiLogin } from 'react-icons/ci';
import { FaRegUser } from 'react-icons/fa6';
import { BsCart2 } from 'react-icons/bs';

import CategoryDropdown from '../UiElements/CategoryDropdown';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.category);
  const loading = useSelector((state) => state.categories.loading);
  const { user } = useSelector((state) => state.subscribers);
  const { cartItems } = useSelector((state) => state.cart);
  const [searchKey, setSearchKey] = useState('');

  useEffect(() => {
    if (user) {
      // If user is logged in, fetch user details
      // dispatch(getSubscriberDetailsAsync());
    }
  }, [user]);

  useEffect(() => {
    dispatch(getCategoriesAsync()); // Fetch categories
  }, [dispatch]);

  if (loading) return <NavSkeletons />;

  return (
    <>
      <section className='navMainWrapper'>
        <Container>
          <nav className='navWrapper'>
            <figure className='navWrapper-brand'>
              <Link to='/'>
                <img src={BrandImage} alt='Brand Logo' />
              </Link>
            </figure>
            <CategoryDropdown categories={categories} />
            <section>
              <Link to='/about'>
                <span className='navWrapper-about'>ABOUT US</span>
              </Link>
            </section>
            <section className='navWrapper-search'>
              <input
                type='search'
                name='search'
                value={searchKey}
                onKeyUp={(e) =>
                  e.key === 'Enter' && navigate('/search', { state: searchKey })
                }
                onChange={(e) => setSearchKey(e.target.value)}
                placeholder='Search here ...'
              />
              <button
                className='bton bton--sm bton--primary mobSearchBton'
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/search', { state: searchKey });
                }}
              >
                <span className='mobsearch'>Search</span>
              </button>
            </section>
            <section className='navWrapper-carts'>
              {user ? (
                <span className='navWrapper-carts-login'>
                  <Link to='/account'>
                    <span className='me-1'>
                      <FaRegUser />
                    </span>
                    <span>My Account</span>
                  </Link>
                </span>
              ) : (
                <span className='navWrapper-carts-login'>
                  <Link to='/login'>
                    <span className='me-1'>
                      <CiLogin />
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

        <section>
          <nav className='navbarBox'>
            <Container>
              <ul className='menu p-0 m-0'>
                {categories &&
                  categories.map((cat) => {
                    const categoryData = {
                      cat_id: cat._id,
                      subData: null,
                      sub2Data: null,
                    };

                    return (
                      <li className='menu--items' key={cat._id}>
                        <Link
                          to={`/category/${cat.slug}`}
                          state={categoryData}
                          className='navitems'
                        >
                          {cat.name}{' '}
                        </Link>
                        {cat.subCategory.length > 0 && (
                          <img src={Chevrone} alt='Chevron' />
                        )}
                        {cat.subCategory.length > 0 && (
                          <section className='sub--menu'>
                            {cat.subCategory.map((sub) => {
                              const subData = {
                                cat_id: cat._id,
                                subData: {
                                  _id: sub._id,
                                  name: sub.name,
                                  slug: sub.slug,
                                },
                                sub2Data: null,
                              };

                              return (
                                <section
                                  className='subcatWrapper'
                                  key={sub._id}
                                >
                                  <div className='subcatWrapper--title'>
                                    <Link
                                      to={`/category/${cat.slug}/${sub.slug}`}
                                      state={subData}
                                    >
                                      {sub.name}
                                    </Link>
                                  </div>
                                  {sub.subCategory2 && (
                                    <ul className='subcatWrapper--itemholder'>
                                      {sub.subCategory2.map((sub2) => {
                                        const sub2Data = {
                                          cat_id: cat._id,
                                          subData: {
                                            _id: sub._id,
                                            name: sub.name,
                                            slug: sub.slug,
                                          },
                                          sub2Data: {
                                            _id: sub2._id,
                                            name: sub2.name,
                                            slug: sub2.slug,
                                          },
                                        };
                                        return (
                                          <li
                                            className='subcatWrapper--itemholder__items'
                                            key={sub2._id}
                                          >
                                            {sub2.name}
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  )}
                                </section>
                              );
                            })}
                          </section>
                        )}
                      </li>
                    );
                  })}
              </ul>
            </Container>
          </nav>
        </section>
      </section>

      {/* Mobile Navbar */}
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
                <i className='fa fa-shopping-cart'></i>
                <div className='mobileNavbar-items-name'>Cart</div>
                {cartItems?.length > 0 && (
                  <div className='cartMobCount'>{cartItems.length}</div>
                )}
              </section>
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
                <i className='fa fa-gear'></i>
                <div className='mobileNavbar-items-name'>More</div>
              </section>
            </NavLink>
          </section>
        </section>
      </section>
    </>
  );
};

export default Navbar;
