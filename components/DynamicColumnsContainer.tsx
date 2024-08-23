import React, { ReactNode } from 'react';

interface DynamicColumnsContainerProps {
  children: ReactNode;
  numColumns?: number;
}

const DynamicColumnsContainer: React.FC<DynamicColumnsContainerProps> = ({ children, numColumns = 2 }) => {
  const columns = React.Children.toArray(children).reduce(
    (acc, child, index) => {
      acc[index % numColumns].push(child);
      return acc;
    },
    Array.from({ length: numColumns }, () => [])
  );

  return (
    <div className="flex gap-5 w-full flex-wrap lg:flex-nowrap">
      {columns.map((column, idx) => (
        <div key={idx} className="flex flex-col gap-5 flex-1">
          {column}
        </div>
      ))}
    </div>
  );
};

export default DynamicColumnsContainer;