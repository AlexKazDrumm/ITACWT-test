import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="pagination mt-4 flex justify-center">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`py-2 px-4 border rounded mx-1 ${currentPage === page ? 'bg-blue-500 text-white' : ''}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}