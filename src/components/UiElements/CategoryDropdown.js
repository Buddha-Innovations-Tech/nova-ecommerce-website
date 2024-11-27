import { useState } from 'react';
import { BiCategory } from 'react-icons/bi';
import { MdOutlineChevronRight } from 'react-icons/md';
import { Link } from 'react-router-dom';
function CategoryDropdown({ categories }) {
  const [catOpen, setCatOpen] = useState(false);
  const [subCatOpen, setSubCatOpen] = useState(false);

  const [hoverIndex, setHoverIndex] = useState(null);

  return (
    <section className='toggleWrapper'>
      <span onClick={() => setCatOpen(!catOpen)} className='categoryToggle'>
        {' '}
        <span className='categoryToggle-icon'>
          <BiCategory className='categoryIcon' />
        </span>
        <span className='categoryToggle-text'>Categories</span>
      </span>

      {catOpen && (
        <ul
          className='navCategories'
          onMouseLeave={() => {
            setCatOpen(!catOpen);
            setSubCatOpen(false);
          }}
        >
          {categories &&
            categories.map((cat, index) => {
              const data = {
                cat_id: cat._id,
                subData: null,
                sub2Data: null,
              };
              return (
                <li key={cat._id}>
                  <Link
                    to={`/category/${cat.slug}`}
                    state={data}
                    className='navitems'
                  >
                    <h2
                      className='navCategories-title '
                      onMouseEnter={() => {
                        setSubCatOpen(true);
                        setHoverIndex((prev) => (prev = index));
                      }}
                    >
                      {cat.name}
                      {cat.subCategory.length > 0 && <MdOutlineChevronRight />}
                    </h2>
                  </Link>
                  {hoverIndex === index &&
                    subCatOpen &&
                    cat.subCategory.length > 0 && (
                      <div
                        onMouseEnter={() => setSubCatOpen(true)}
                        onMouseLeave={() => setSubCatOpen(!subCatOpen)}
                        style={{ marginTop: `${index * 45}px` }}
                        className='navCategories-subCategoriesBox'
                      >
                        {' '}
                        {cat.subCategory &&
                          cat.subCategory.map((sub) => {
                            const data = {
                              cat_id: cat._id,
                              subData: { _id: sub._id, name: sub.name },
                              sub2Data: null,
                            };
                            return (
                              <div
                                className='navCategories-subCategoriesBox-subCatItems'
                                key={sub._id}
                              >
                                <Link to={`/category/${cat.slug}`} state={data}>
                                  {' '}
                                  <h3 className='subCatTitle'>{sub.name}</h3>
                                </Link>
                                <ul className='subCatItemBox'>
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
                                        <li
                                          className='subCatItemBox-item'
                                          key={sub2._id}
                                        >
                                          <Link
                                            to={`/category/${cat.slug}`}
                                            state={data}
                                          >
                                            <span>{sub2.name}</span>
                                          </Link>
                                        </li>
                                      );
                                    })}
                                </ul>
                              </div>
                            );
                          })}
                      </div>
                    )}
                </li>
              );
            })}
        </ul>
      )}
    </section>
  );
}

export default CategoryDropdown;
