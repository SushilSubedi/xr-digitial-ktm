import React from 'react';

import PropTypes from 'prop-types';

const EmptyContent = ({ show }) => {
  if (!show) return null;

  return (
    <div className="empty-content d-flex justify-content-center align-items-center">
      <p className="fw-bold fs-5">
        No Table Content. you might need to start your json server
      </p>
    </div>
  );
};

EmptyContent.defaultProps = {
  show: false,
};

EmptyContent.propTypes = {
  show: PropTypes.bool,
};

export default EmptyContent;
