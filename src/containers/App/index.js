import React from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';

//components

// import SideBar from '../../components/Sidebar';
import NavBar from '../../components/Navbar';
import Category from '../Category';

//pages

import Home from '../Home';
import Product from '../Product';
import Cart from '../Cart';
import Checkout from '../Checkout';
import Account from '../Account';
import CleaningFacility from '../CleaningFacility';
import SearchResults from '../SearchResults';
import Verify from '../Verify';
import ForgotPassword from '../ForgotPassword';
import ResetPassword from '../ResetPassword';

import axios from 'axios';
import More from '../More';
import Login from '../Login';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSubscriberDetailsAsync,
  logout,
  loggedOut,
  subscriberGoogleLoginAsync,
} from '../../redux/subscriberSlice';

import ErrorPage from '../Error404';
import MobCategories from '../MobCategories';
import Shipping from '../Shipping';
import Terms from '../Terms';
import Refund from '../Refund';
import Return from '../Return';
import Privacy from '../Privacy';
import About from '../About';
import AboutUs from '../AboutUs';
import DeliveryTerms from '../DeliveryTerms';
import Orders from '../Orders';
import Reviews from '../reviews';

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // axios.defaults.baseURL = "http://localhost:8010";
  axios.defaults.baseURL = 'https://backend.loraaj.com';
  // axios.defaults.baseURL = 'http://192.168.5.23:8008';

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const message = params.get('message');
    if (message) {
      localStorage.setItem('userInfo', message); // Outputs the response message
      navigate('/');
      window.location.reload();
    }
  }, [location.search]);

  const { user, isLoginError, loggedOut } = useSelector(
    (state) => state.subscribers
  );
  const getLoggedInUser = async () => {
    const { data } = await axios.get(
      'https://backend.looraj.com/api/google-user',
      {
        withCredentials: true,
      }
    );
    dispatch(
      subscriberGoogleLoginAsync({
        _id: data._id,
        name: data.name,
        email: data.email,
        provider: 'google',
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      })
    );
  };

  useEffect(() => {
    if (isLoginError) dispatch(logout());
  }, [isLoginError]);

  useEffect(() => {
    !user && getLoggedInUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <>
      <NavBar />

      <main>
        <section className='contentWrapper'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/category/:slug' element={<Category />} />
            <Route path='/product/:slug' element={<Product />} />
            <Route path='/verify/:id/:token' element={<Verify />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/forgot-password/:token' element={<ResetPassword />} />
            <Route path='/login' element={<Login />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/cart/buy-now' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/shipping' element={<Shipping />} />
            <Route path='/shipping/buy-now' element={<Shipping />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/checkout/buy-now' element={<Checkout />} />
            <Route path='/account' element={<Account />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/reviews' element={<Reviews />} />
            {/* <Route path='/cleaning' element={<CleaningFacility />} /> */}
            <Route path='/about' element={<AboutUs />} />
            <Route
              path='/delivery-terms-conditions'
              element={<DeliveryTerms />}
            />
            <Route path='/terms-conditions' element={<Terms />} />
            <Route path='/refund' element={<Refund />} />
            <Route path='/return' element={<Return />} />
            <Route path='/privacy' element={<Privacy />} />
            <Route path='/search' element={<SearchResults />} />
            <Route path='/mobcat' element={<MobCategories />} />
            <Route path='/more' element={<More />} />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </section>

        <a
          className='whattsapp'
          target='_blank'
          rel='noopener noreferrer'
          href='https://wa.me/4745534581'
        >
          <i className='fa fa-whatsapp'></i>
        </a>
      </main>
      <Footer />
    </>
  );
};

export default App;
