import React, { useState } from 'react';
import { useEffect } from 'react';
import { Col, Container, Row, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Guest from '../../assets/images/Successful purchase-rafiki.svg';
import Message from '../../components/Message/Message';
import Spinner from 'react-bootstrap/Spinner';
import {
  getSubscriberDetailsAsync,
  resetError,
  subscriberLoginAsync,
  subscriberRegisterAsync,
} from '../../redux/subscriberSlice';

const GuestLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPswLogin, setShowPswLogin] = useState(false);
  const [showPswReg, setShowPswReg] = useState(false);
  const [showPswReg1, setShowPswReg1] = useState(false);
  const [login, setLogin] = useState(true);
  const { user, isLoginError, message, isRegisterSuccess, isRegisterLoading } =
    useSelector((state) => state.subscribers);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [feildError, setFeildError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [serverError, setServerError] = useState(null);
  const [messageText, setErrorMessageText] = useState(null);
  const [registerEmail, setRegisterEmail] = useState(null);
  const [registerName, setRegisterName] = useState(null);
  const [registerPassword, setRegisterPassword] = useState(null);
  const [registerPassword1, setRegisterPassword1] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [passwordValidationError, setPasswordValidationError] = useState(null);

  const loading = useSelector((state) => state.subscribers.isLoading);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(resetError());
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (loginEmail === '' || loginPassword === '') {
      setFeildError(true);
      setErrorMessageText('The fields can not be empty!');
      return;
    } else if (!emailPattern.test(loginEmail)) {
      setErrorMessageText('Please Enter a valid email');
      setEmailError(true);
      return;
    } else {
      dispatch(
        subscriberLoginAsync({
          email: loginEmail,
          password: loginPassword,
          provider: 'local',
        })
      );
    }
  };

  const handleRegister = (e) => {
    resetError();
    setEmailError(null);
    setPasswordError(null);
    setErrorMessageText('');
    setFeildError(null);
    setServerError(null);
    setPasswordValidationError(null);
    e.preventDefault();
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (
      registerEmail === '' ||
      registerName === '' ||
      registerPassword === '' ||
      registerPassword1 === ''
    ) {
      setFeildError(true);
      setErrorMessageText('The fields can not be empty');
      return;
    } else if (!emailPattern.test(registerEmail)) {
      setErrorMessageText('Please Enter a valid email');
      setEmailError(true);
      return;
    } else if (
      !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(
        registerPassword
      )
    ) {
      setPasswordValidationError(true);
      setErrorMessageText(
        'Password must contain a combination of numbers, small letters, capital letters and special characters.'
      );
      return;
    } else if (registerPassword !== registerPassword1) {
      setErrorMessageText("Passwords don't match");
      setPasswordError(true);
      return;
    } else {
      dispatch(
        subscriberRegisterAsync({
          email: registerEmail,
          name: registerName,
          password: registerPassword,
          provider: 'local',
        })
      );
    }
  };
  const googleLogin = () => {
    window.open('https://backend.novaaitechnz.com/auth/google', '_self');
  };
  // const fbLogin = () => {
  //   window.open("https://backend.loraaj.com/auth/facebook", "_self");
  // };

  const appleLogin = () => {
    window.open('https://backend.loraaj.com/auth/apple', '_self');
  };

  useEffect(() => {
    if (user) {
      navigate('/');
      dispatch(getSubscriberDetailsAsync());
    }
  }, [user]);
  useEffect(() => {
    if (isLoginError) {
      setServerError(true);
      setErrorMessageText(message);
    }
  }, [isLoginError]);
  useEffect(() => {
    if (isRegisterSuccess) {
      setRegisterEmail('');
      setRegisterName('');
      setRegisterPassword('');
      setRegisterPassword1('');
    }
  }, [isRegisterSuccess]);
  return (
    <div>
      <section className='mt-5'>
        <section className='LoginTabs'>
          <button
            className={`${login ? '' : 'inactiveLogin'}`}
            onClick={(e) => {
              e.preventDefault();
              setLogin(true);
            }}
          >
            Login
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setLogin(false);
            }}
            className={`${login ? 'inactiveLogin' : ''}`}
          >
            Register
          </button>
        </section>
        <Container>
          <Row className='justify-content-center'>
            <Col md={6}>
              {login ? (
                <section className='normalLogin'>
                  <Form>
                    <Form.Group>
                      <Form.Label className='mt-3'>Email</Form.Label>
                      <Form.Control
                        type='email'
                        placeholder='Enter your email'
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className='mt-3'>Password</Form.Label>
                      <div
                        style={{
                          display: 'flex',
                          position: 'relative',
                          alignItems: 'center',
                        }}
                      >
                        <Form.Control
                          type={showPswLogin ? 'text' : 'password'}
                          placeholder='Password'
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                        />
                        <span
                          style={{
                            position: 'absolute',
                            right: '10px',
                          }}
                          onClick={() => setShowPswLogin(!showPswLogin)}
                        >
                          <i
                            className={
                              showPswLogin ? 'fa fa-eye-slash' : 'fa fa-eye'
                            }
                          />
                        </span>
                      </div>
                    </Form.Group>
                    {(feildError || emailError || serverError) && (
                      <div style={{ display: 'flex' }}>
                        <div
                          className='loginError'
                          success={false}
                          setError={
                            feildError
                              ? setFeildError
                              : emailError
                              ? setEmailError
                              : setServerError
                          }
                        >
                          {messageText} !!
                        </div>
                      </div>
                    )}
                    <button
                      className='bton bton--primary bton--full mt-4'
                      onClick={handleLogin}
                    >
                      {loading ? (
                        <span>
                          logging in <Spinner animation='grow' size='sm' />
                        </span>
                      ) : (
                        'Login'
                      )}
                    </button>
                    <Link to='/forgot-password'>
                      <button className='bton bton--nacked bton--sm'>
                        {' '}
                        Forgot Password ?
                      </button>
                    </Link>

                    <hr />
                    <div className='text-center'>OR</div>
                    <div className='socialLogin'>
                      <button
                        variant='primary'
                        onClick={(e) => {
                          e.preventDefault();
                          googleLogin();
                          // handleModalClose();
                        }}
                        className='bton bton--full me-3 mt-4 bton--google'
                      >
                        <i className='fa fa-google'></i> Login with Google
                      </button>
                    </div>

                    <section className='mt-4'>
                      <small>
                        Don't have an account ?{' '}
                        <button
                          className='bton bton--nacked'
                          onClick={(e) => {
                            e.preventDefault();
                            setLogin(!login);
                          }}
                        >
                          Sign up/Register
                        </button>
                      </small>
                    </section>
                    {/* <button
                      variant='primary'
                      onClick={(e) => {
                        e.preventDefault();
                        fbLogin();
                        // handleModalClose();
                      }}
                      className='bton bton--full me-3 bton--facebook'
                    >
                      Sign Up with Facebook
                    </button> */}
                  </Form>
                </section>
              ) : (
                <section className='normalLogin'>
                  <Form>
                    <Row>
                      <Col>
                        <Form.Group>
                          <Form.Label className='mt-3'>Full Name</Form.Label>
                          <Form.Control
                            type='text'
                            placeholder='Enter your name'
                            value={registerName}
                            onChange={(e) => setRegisterName(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      {/* <Col md={6}>
                        <Form.Group>
                          <Form.Label className='mt-3'>Phone Number</Form.Label>
                          <Form.Control
                            type='email'
                            placeholder='Enter your phone'
                            value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                          />
                        </Form.Group>
                      </Col> */}
                      <Col md={12}>
                        <Form.Group>
                          <Form.Label className='mt-3'>Email</Form.Label>
                          <Form.Control
                            type='email'
                            placeholder='Enter your email'
                            value={registerEmail}
                            onChange={(e) => setRegisterEmail(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Label className='mt-3'>Password</Form.Label>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              position: 'relative',
                            }}
                          >
                            <Form.Control
                              type={showPswReg ? 'text' : 'password'}
                              placeholder='Password'
                              value={registerPassword}
                              onChange={(e) =>
                                setRegisterPassword(e.target.value)
                              }
                            />
                            <span
                              style={{
                                position: 'absolute',
                                right: '10px',
                              }}
                              onClick={() => setShowPswReg(!showPswReg)}
                            >
                              <i
                                className={
                                  showPswReg ? 'fa fa-eye-slash' : 'fa fa-eye'
                                }
                              />
                            </span>
                          </div>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Label className='mt-3'>
                            Re-type Password
                          </Form.Label>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              position: 'relative',
                            }}
                          >
                            <Form.Control
                              type={showPswReg1 ? 'text' : 'password'}
                              placeholder='Password'
                              value={registerPassword1}
                              onChange={(e) =>
                                setRegisterPassword1(e.target.value)
                              }
                            />
                            <span
                              style={{
                                position: 'absolute',
                                right: '10px',
                              }}
                              onClick={() => setShowPswReg1(!showPswReg1)}
                            >
                              <i
                                className={
                                  showPswReg1 ? 'fa fa-eye-slash' : 'fa fa-eye'
                                }
                              />
                            </span>
                          </div>
                        </Form.Group>
                      </Col>
                    </Row>
                    {(feildError ||
                      passwordError ||
                      emailError ||
                      serverError ||
                      passwordValidationError) && (
                      <div style={{ display: 'flex' }}>
                        <div
                          className='loginError'
                          success={false}
                          setError={
                            feildError
                              ? setFeildError
                              : emailError
                              ? setEmailError
                              : passwordError
                              ? setPasswordError
                              : passwordValidationError
                              ? setPasswordValidationError
                              : setServerError
                          }
                        >
                          {messageText}
                        </div>
                      </div>
                    )}
                    {message && (
                      <div style={{ display: 'flex' }}>
                        <div className='loginError'>{message}</div>
                      </div>
                    )}
                    {isRegisterSuccess && (
                      <div style={{ display: 'flex' }}>
                        <div className='loginError'>
                          Please verify your email.
                        </div>
                      </div>
                    )}

                    <button
                      className='bton bton--primary bton--full mt-4'
                      onClick={handleRegister}
                    >
                      {isRegisterLoading ? (
                        <span>
                          Registering... <Spinner animation='grow' size='sm' />
                        </span>
                      ) : (
                        'Register'
                      )}
                    </button>
                    {isRegisterSuccess && (
                      <div className='addedSuccess' success={true}>
                        A verification link has been sent to your email. Please
                        verify before you continue.
                      </div>
                    )}
                    <hr />
                    {/* <div className='text-center'>OR</div>
                    <div className='socialLogin'>
                      <button
                        variant='primary'
                        onClick={(e) => {
                          e.preventDefault();
                          googleLogin();
                          // handleModalClose();
                        }}
                        className='bton bton--full me-3 mt-4 bton--google'
                      >
                        <i className='fa fa-google'></i> Sign Up with Google
                      </button>

                      <button
                        variant='primary'
                        onClick={(e) => {
                          e.preventDefault();
                          appleLogin();
                          // handleModalClose();
                        }}
                        className='bton bton--full me-3 mt-4 bton--apple'
                      >
                        <i className='fa fa-apple'></i> Sign Up With Apple
                      </button>
                    </div>
                    <section className='mt-5'>
                      <small>
                        Already have an account ?{' '}
                        <button
                          className='bton bton--nacked'
                          onClick={() => setLogin(!login)}
                        >
                          Login Now
                        </button>
                      </small>
                    </section> */}
                  </Form>
                </section>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default GuestLogin;
