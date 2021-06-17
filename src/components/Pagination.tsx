import React from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    handleNextPage: (page: number) => void;
    handlePrevPage: (page: number) => void;
}
const Pagination = ({ currentPage, totalPages, handleNextPage, handlePrevPage }: PaginationProps) => {
    return (
        <div className="pagination-button-wrapper">
            <button
                className="pagination-button"
                onClick={() => handlePrevPage(currentPage)}
                disabled={currentPage === 1}
            >
                &larr;
            </button>

            <span className="pagination-page-info">
                Page {currentPage} of {totalPages}
            </span>

            <button
                className="pagination-button"
                onClick={() => handleNextPage(currentPage)}
                disabled={currentPage === totalPages}
            >&rarr;</button>
        </div>
    );
};

export default Pagination;
