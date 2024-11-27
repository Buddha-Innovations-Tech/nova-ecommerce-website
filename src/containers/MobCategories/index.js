import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import LoaderComponent from '../../components/LoaderComponent';
import { getCategoriesAsync } from '../../redux/categorySlice';

const MobCategories = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.category);
  const loading = useSelector((state) => state.categories.loading);

  useEffect(() => {
    dispatch(getCategoriesAsync());
  }, [dispatch]);

  if (loading) return <LoaderComponent />;

  return (
    <div className='moreContainer'>
      <h6>All Categories</h6>{' '}
      <Accordion>
        {categories &&
          categories.map((cat, index) => {
            const data = {
              cat_id: cat._id,
              subData: null,
              sub2Data: null,
            };
            return (
              <Accordion.Item eventKey={`${index}`}>
                <Accordion.Header>
                  {' '}
                  <Link to={`/category/${cat.slug}`} state={data}>
                    {cat.name}
                  </Link>{' '}
                </Accordion.Header>
                {cat.subCategory.length > 0 ? (
                  <Accordion.Body>
                    {cat.subCategory.map((sub) => {
                      const data = {
                        cat_id: cat._id,
                        subData: { _id: sub._id, name: sub.name },
                        sub2Data: null,
                      };
                      return (
                        <>
                          <Link to={`/category/${cat.slug}`} state={data}>
                            <h3 className='subcatTitle'> {sub.name}</h3>
                          </Link>
                          <ul>
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
                                  <li>
                                    <Link
                                      to={`/category/${cat.slug}`}
                                      state={data}
                                    >
                                      {sub2.name}{' '}
                                    </Link>
                                  </li>
                                );
                              })}
                          </ul>
                        </>
                      );
                    })}
                  </Accordion.Body>
                ) : (
                  <span></span>
                )}
              </Accordion.Item>
            );
          })}
      </Accordion>
    </div>
  );
};

export default MobCategories;
