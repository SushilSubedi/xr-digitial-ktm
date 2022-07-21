import React from 'react';

import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const TableHeader = ({
  headerGroups,
  disableSortByHeader,
  className,
  columnClassName,
}) => {
  const sortIcon = (checkSort, isSorted, isSortedDesc) => {
    if (!checkSort || disableSortByHeader) return '';

    return (
      <span className="position-relative">
        <FontAwesomeIcon
          icon={faSortDown}
          className={`mx-2 position-absolute sort-down-icon ${
            isSorted && !isSortedDesc ? 'disabled' : ''
          }`}
        />
        <FontAwesomeIcon
          icon={faSortUp}
          className={`mx-2 sort-up-icon ${
            !isSorted || isSortedDesc ? 'disabled' : ''
          }`}
        />
      </span>
    );
  };

  const columnClasses =
    columnClassName + disableSortByHeader
      ? `disable-sort ${columnClassName}`
      : '';

  return (
    <thead className="border-0 table-header py-2">
      {
        // Loop over the header rows
        headerGroups.map((headerGroup) => (
          // Apply the header row props
          <tr {...headerGroup.getHeaderGroupProps()} className={className}>
            {
              // Loop over the headers in each row
              headerGroup.headers.map((column) => (
                // Apply the header cell props
                <th
                  {...column.getHeaderProps(
                    column.getSortByToggleProps?.({ title: undefined })
                  )}
                  className={`header-cell  align-middle ${columnClasses}`}
                >
                  {
                    // Render the header
                    column.render('Header')
                  }
                  {sortIcon(
                    column.canSort,
                    column.isSorted,
                    column.isSortedDesc
                  )}
                </th>
              ))
            }
          </tr>
        ))
      }
    </thead>
  );
};

TableHeader.defaultProps = {
  headerGroups: [],
  className: '',
  columnClassName: 'fw-bold',
  disableSortByHeader: false,
};

TableHeader.propTypes = {
  headerGroups: PropTypes.array,
  className: PropTypes.string,
  columnClassName: PropTypes.string,
  disableSortByHeader: PropTypes.bool,
};

export default TableHeader;
