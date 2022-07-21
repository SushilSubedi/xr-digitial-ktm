import React from "react";

import PropTypes from "prop-types";

const Table = ({ children, getTableProps, className }) => (
  <table {...getTableProps()} className={`table table-borderless ${className}`}>
    {children}
  </table>
);

Table.defaultProps = {
  getTableProps: () => {},
  children: <></>,
  className: "min-table px-3",
};

Table.propTypes = {
  getTableProps: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Table;
