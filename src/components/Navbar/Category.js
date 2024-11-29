import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap'; 
import { FaChevronDown } from 'react-icons/fa'; 

function Category() {
  const categories = [
    {
      _id: '1',
      name: 'Looraj',
      slug: 'looraj',
      subCategory: [
        {
          _id: '1-1',
          name: 'Skin Care',
          subCategory2: [
            { _id: '1-1-1', name: 'Subcategory 2-1' },
            { _id: '1-1-2', name: 'Subcategory 2-2' },
          ],
        },
        {
          _id: '1-2',
          name: 'Color and Cosmetic',
          subCategory2: [
            { _id: '1-2-1', name: 'Subcategory 2-1' },
            { _id: '1-2-2', name: 'Subcategory 2-2' },
          ],
        },
      ],
    },
    {
      _id: '2',
      name: 'Juice',
      slug: 'juice',
      subCategory: [
        {
          _id: '2-1',
          name: 'Subcategory 2-1',
          subCategory2: [
            { _id: '2-1-1', name: 'Subcategory 2-1' },
            { _id: '2-1-2', name: 'Subcategory 2-2' },
          ],
        },
      ],
    },
    {
        _id: '3',
        name: 'Infinia',
        slug: 'infinia',
        subCategory: [
          {
            _id: '2-1',
            name: 'Subcategory 2-1',
            subCategory2: [
              { _id: '2-1-1', name: 'Subcategory 2-1' },
              { _id: '2-1-2', name: 'Subcategory 2-2' },
            ],
          },
        ],
      },
  ];

  return (
    <>
      <section>
        <nav className='navbarBox'>
          <Container>
            <ul className='menu p-0 m-0'>
              {categories.map((cat) => {
                const data = {
                  cat_id: cat._id,
                  subData: null,
                  sub2Data: null,
                };
                return (
                  <li className='menu--items' key={cat._id}>
                    <Link
                      to={`/category/${cat.slug}`}
                      state={data}
                      className='navitems'
                    >
                      {cat.name}{' '}
                    </Link>
                    {cat.subCategory.length > 0 && (
                      <FaChevronDown className="chevron-icon" />
                    )}
                    {cat.subCategory.length > 0 && (
                      <section className='sub--menu'>
                        {cat.subCategory.map((sub) => {
                          const data = {
                            cat_id: cat._id,
                            subData: { _id: sub._id, name: sub.name },
                            sub2Data: null,
                          };
                          return (
                            <section className='subcatWrapper' key={sub._id}>
                              <div className='subcatWrapper--title'>
                                <Link
                                  to={`/category/${cat.slug}`}
                                  state={data}
                                >
                                  {sub.name}
                                </Link>
                              </div>
                              <ul className='subcatWrapper--itemholder'>
                                {sub.subCategory2.map((sub2) => {
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
                                    <li
                                      className='subcatWrapper--itemholder__items'
                                      key={sub2._id}
                                    >
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
                );
              })}
            </ul>
          </Container>
        </nav>
      </section>
    </>
  );
}

export default Category;
