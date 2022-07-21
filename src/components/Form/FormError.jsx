import React from 'react';

import PropTypes from 'prop-types';

const FormError = ({ error, submitError, touched }) => {
  if ((error || submitError) && touched) {
    return (
      <span className="error-message fw-bold ms-1">{error || submitError}</span>
    );
  }

  return null;
};

FormError.defaultProps = {
  error: null,
  submitError: null,
  className: '',
};

FormError.propTypes = {
  touched: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
  submitError: PropTypes.bool,
};

export default FormError;
