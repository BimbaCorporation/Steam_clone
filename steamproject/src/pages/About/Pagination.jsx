import React from 'react';

const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
  return (
    <div className="pagination">
      {Array.from({ length: totalPages }).map((_, index) => (
        <a
          key={index}
          className={currentPage === index + 1 ? "active-page" : ""}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </a>
      ))}
    </div>
  );
};

export default Pagination;
