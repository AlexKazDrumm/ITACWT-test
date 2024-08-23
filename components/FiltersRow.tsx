import React, { useState, useEffect } from 'react';
import RegularInput from './UI/RegularInput';
import RegularSelect from './UI/RegularSelect';
import Pagination from './Pagination';
import SortOrderButtons from './UI/SortOrderButtons';
import { extractHeaders } from '../utils';

interface FiltersRowProps {
  data: any[];
  onSearch: (query: string) => void;
  onSort: (sortBy: string, order: 'asc' | 'desc') => void;
  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;
  currentPage: number;
  setCurrentPage: (value: number) => void;
  children: React.ReactNode;
}

export default function FiltersRow({
  data,
  onSearch,
  onSort,
  itemsPerPage,
  setItemsPerPage,
  currentPage,
  setCurrentPage,
  children,
}: FiltersRowProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    setCurrentPage(1);
  }, [sortField, sortOrder, searchQuery]);

  const headers = extractHeaders(data);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div>
      <div className="filters-row mb-4 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 sm:space-x-4">
        <div className="w-full sm:w-[20%]">
          <RegularInput
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              onSearch(e.target.value);
            }}
            width="w-full"
          />
        </div>

        <div className="w-full flex flex-row items-center space-x-4 sm:w-[40%]">
          <div className="w-full">
            <RegularSelect
              value={sortField}
              onChange={(value) => {
                setSortField(value);
                onSort(value, sortOrder);
              }}
              options={[
                { label: 'Select an option', value: '' },
                ...headers.map((header) => ({
                  label: header.split('.').pop() || '',
                  value: header,
                })),
              ]}
              disableFirstOption={true}
              width="w-full"
            />
          </div>

          <SortOrderButtons
            sortOrder={sortOrder}
            onSortOrderChange={(order) => {
              setSortOrder(order);
              onSort(sortField, order);
            }}
          />
        </div>

        <div className="w-full sm:w-[10%]">
          <RegularSelect
            value={itemsPerPage.toString()}
            onChange={(value) => {
              const newValue = parseInt(value, 10);
              setItemsPerPage(newValue);
              setCurrentPage(1);
            }}
            options={[
              { label: '5', value: '5' },
              { label: '10', value: '10' },
              { label: '20', value: '20' },
              { label: '50', value: '50' },
            ]}
            disableFirstOption={false}
            width="w-full"
          />
        </div>
      </div>

      {React.cloneElement(children as React.ReactElement<any>, { data })}

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
}