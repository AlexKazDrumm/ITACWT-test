import React from 'react';

interface SortOrderButtonsProps {
  sortOrder: 'asc' | 'desc';
  onSortOrderChange: (order: 'asc' | 'desc') => void;
}

export default function SortOrderButtons({ sortOrder, onSortOrderChange }: SortOrderButtonsProps) {
  return (
    <div className="flex">
      <button
        onClick={() => onSortOrderChange('asc')}
        className={`mr-2 ${sortOrder === 'asc' ? 'font-bold text-blue-500' : ''}`}
      >
        ↑
      </button>
      <button
        onClick={() => onSortOrderChange('desc')}
        className={`${sortOrder === 'desc' ? 'font-bold text-blue-500' : ''}`}
      >
        ↓
      </button>
    </div>
  );
}