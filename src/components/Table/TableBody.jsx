import React from "react";

import PropTypes from "prop-types";

const TableBody = ({
  getTableBodyProps,
  rows,
  prepareRow,
  tableRowClassName,
  tableRowCellClassName,
  rowData,
}) => (
  <tbody {...getTableBodyProps()}>
    {
      // Loop over the table rows
      rows.map((row) => {
        // Prepare the row for display
        prepareRow(row);

        return (
          // Apply the row props
          <tr {...row.getRowProps()} className={tableRowClassName(row)}>
            {
              // Loop over the rows cells
              row.cells.map((cell) => (
                <td
                  {...cell.getCellProps()}
                  className={tableRowCellClassName(cell)}
                >
                  {rowData(cell)}
                </td>
              ))
            }
          </tr>
        );
      })
    }
  </tbody>
);

TableBody.defaultProps = {
  getTableBodyProps: () => {},
  prepareRow: () => {},
  tableRowClassName: () => "table-row",
  tableRowCellClassName: () => {},
  rowData: (cell) => cell.render("Cell"),
  rows: [],
};

TableBody.propTypes = {
  getTableBodyProps: PropTypes.func,
  prepareRow: PropTypes.func,
  tableRowClassName: PropTypes.func,
  tableRowCellClassName: PropTypes.func,
  rowData: PropTypes.func,
  rows: PropTypes.array,
};

export default TableBody;
