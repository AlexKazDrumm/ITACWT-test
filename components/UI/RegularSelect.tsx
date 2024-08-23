import React, { useState, useEffect, useRef } from 'react';

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  disableFirstOption?: boolean;
  width?: string;
}

export default function RegularSelect({ value, onChange, options, disableFirstOption = false, width = 'w-full' }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isFirstOptionDisabled = disableFirstOption && value !== options[0].value;

  return (
    <div className={`relative ${width}`} ref={selectRef}>
      <div
        onClick={handleToggle}
        className={`cursor-pointer bg-white border border-gray-300 rounded-lg py-3 px-4 flex justify-between items-center focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150 ease-in-out ${isOpen ? 'ring-1 ring-blue-500 border-blue-500' : ''}`}
        style={{ height: '42px' }}
      >
        <span>{options.find(option => option.value === value)?.label || 'Select an option'}</span>
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}></path>
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto custom-scrollbar">
          {options.map((option, index) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white ${
                option.value === value ? 'bg-blue-500 text-white' : 'text-gray-700'
              } ${isFirstOptionDisabled && index === 0 ? 'pointer-events-none text-gray-300' : ''}`}
              style={{ borderBottom: index < options.length - 1 ? '1px solid #e0e0e0' : 'none' }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}