import React from 'react';

interface TableCellProps {
  value: any;
}

const TableCell: React.FC<TableCellProps> = ({ value }) => {
  if (typeof value === 'boolean') {
    return <span>{value ? <img src={'/svg/green-mark.svg'}/> : <img src={'/svg/red-mark.svg'}/>}</span>;
  } else if (typeof value === 'string' && !isNaN(Date.parse(value))) {
    return <span>{new Date(value).toLocaleDateString()}</span>;
  } else if (typeof value === 'object' && value !== null) {
    return (
      <table className="min-w-full bg-gray-100">
        <tbody>
          {Object.entries(value).map(([key, subValue]) => (
            <tr key={key}>
              <td className="py-1 px-2 text-xs font-semibold">{key}</td>
              <td className="py-1 px-2">
                <TableCell value={subValue} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else {
    return <span>{value}</span>;
  }
};

export default TableCell;