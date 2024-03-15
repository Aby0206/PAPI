import React from 'react';
import Pagination from '@mui/material/Pagination';
import { StyledPagination } from "./styledComponents";

interface PaginationCompProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationComp: React.FC<PaginationCompProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevClick = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextClick = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <StyledPagination>
      <button 
        className='navigate-button'
        onClick={handlePrevClick}
        disabled={currentPage === 1}
        data-testid="prev-Btn"
      >
        Prev 
      </button>
      <Pagination 
        hideNextButton
        hidePrevButton
        count={totalPages}
        page={currentPage}
        onChange={(_, page) => onPageChange(page)}
        variant="outlined"
        shape="rounded"
        boundaryCount={1}
        data-testid="current-page"
        siblingCount={0} 
        sx={{
          '.Mui-selected': {
            backgroundColor: "#4ABD95 !important",
            color: '#FFFFFF',
          },
        }}
      />
      <button
        className='navigate-button'
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
        data-testid="next-Btn"
      >
        Next
      </button>
    </StyledPagination>
  );
}

export default PaginationComp;
