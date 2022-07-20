import ProductApi from 'apis/Product';
import { PRODUCT_TABLE_HEADER } from 'constants/tableHeader';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTable } from 'react-table';

const Table = () => {
  const [tableData, setTableData] = useState([]);

  const handleProductDelete = (selectedID) => {
    setTableData((previous) => previous.filter(({ id }) => id !== selectedID));
  };

  const updateTableData = (data) => {
    return data.map(
      ({
        id,
        product_name: productName,
        category_name: categoryName,
        description,
        created_at: createdAt,
        status,
      }) => {
        return {
          id,
          productName,
          categoryName,
          description,
          createdAt: createdAt.split('T')[0],
          status,
          action: (
            <button
              className="btn btn-danger p-2 h-auto"
              onClick={() => handleProductDelete(id)}
            >
              Delete
            </button>
          ),
        };
      }
    );
  };

  const fetchTableData = async () => {
    try {
      const response = await ProductApi.fetchProducts();

      setTableData(updateTableData(response.data));
    } catch (error) {
      alert('Please start your JSON server');
    }
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns: PRODUCT_TABLE_HEADER, data: tableData });

  return (
    <article className="container">
      <div className="table-header my-3 h-auto">
        <button className="btn btn-primary h-auto">Add New Product</button>
      </div>
      <table {...getTableProps()} className="table table-striped table-hover">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </article>
  );
};

export default Table;
