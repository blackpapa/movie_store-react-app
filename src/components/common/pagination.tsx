import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

interface Props {
  itemsCount: number,
  pageSize: number,
  currentPage: number,
  onPageChange: (page: number)=> void
}

const Pagination: React.FC<Props>=(props) => {
  const { itemsCount, pageSize, onPageChange, currentPage } = props;
  //[1, 2, 3]
  const page = Math.ceil(itemsCount / pageSize);
  if (page === 1) return null;

  const pages = _.range(1, page + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={currentPage === page ? "page-item active" : "page-item"}
          >
            <button onClick={() => onPageChange(page)} className="page-link">
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
