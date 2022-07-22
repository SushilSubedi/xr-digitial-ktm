import React from 'react';

import PropTypes from 'prop-types';

const NoSearchContent = ({ show }) => {
  if (!show) return null;

  return (
    <div className="empty-content d-flex justify-content-center align-items-center">
      <p className="fw-bold fs-5">
        There is no product for which you are searching for
      </p>
    </div>
  );
};

NoSearchContent.defaultProps = {
  show: false,
};

NoSearchContent.propTypes = {
  show: PropTypes.bool,
};

export default NoSearchContent;
