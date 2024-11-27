import { NavLink } from "react-bootstrap";

const Pagination = ({ postsPerPage, totalProducts, paginate, current }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProducts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    pageNumbers.length > 1 && (
      <nav>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={`page-item  ${current === number ? "active" : null} `}
            >
              <NavLink onClick={() => paginate(number)} className={`page-link`}>
                {number}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    )
  );
};

export default Pagination;
