import React from 'react';

interface InputProps {
  placeholder?: string;
  value: string;
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  width?: string;
}

export default function RegularInput({ placeholder, value, name, onChange, width = 'w-full' }: InputProps) {
  return (
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${width} focus:border-blue-500 focus:ring-blue-500 focus:ring-1 focus:outline-none placeholder:text-gray-400 rounded-lg py-3 px-4 border-gray-300 disabled:bg-gray-200/40 border transition duration-150 ease-in-out`}
      style={{ height: '42px' }}
    />
  );
}