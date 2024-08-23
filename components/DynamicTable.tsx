import React, { useState } from 'react';
import TableCell from './UI/TableCell';
import EditRowModal from './Modals/EditRowModal';
import DropdownMenuButton from './UI/DropdownMenuButton';
import { extractHeaders } from '../utils';

interface DynamicTableProps {
  data: any[];
  onSave: (updatedItem: any, index: number) => void;
  type: string;
}

export default function DynamicTable({ data, onSave, type }: DynamicTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!data || data.length === 0) return <div>No data to display</div>;

  const headers = extractHeaders(data);

  headers.push('Actions');

  const handleEditClick = (item: any, index: number) => {
    setSelectedItem(item);
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  const handleSave = (updatedItem: any) => {
    if (selectedIndex !== null) {
      onSave(updatedItem, selectedIndex);
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <table className="min-w-full bg-white rounded-md overflow-x-auto">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th 
                key={header} 
                className={`py-2 px-4 bg-[#fafbfc] text-left text-xs font-semibold text-start text-darkblue px-6 py-4 font-bold font-inter text-[17px] truncate ${index === 0 ? 'rounded-tl-lg' : ''} ${index === headers.length - 1 ? 'rounded-tr-lg' : ''}`}
              >
                {header === 'Actions' ? '' : header.split('.').pop()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {headers.slice(0, -1).map((header) => {
                const keys = header.split('.');
                const value = keys.reduce((obj, key) => obj?.[key], item);
                return (
                  <td key={header} className="py-2 px-4 border-t border-gray-200">
                    <TableCell value={value} />
                  </td>
                );
              })}
              <td className="py-2 px-4 border-t border-gray-200 text-right">
                <DropdownMenuButton
                  options={[
                    {
                      label: 'Edit',
                      onClick: () => handleEditClick(item, index),
                    },
                  ]}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && selectedItem && (
        <EditRowModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          data={selectedItem}
          type={type}
        />
      )}
    </>
  );
}