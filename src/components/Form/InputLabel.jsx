import React from 'react';

import PropTypes from 'prop-types';

const InputLabel = ({ name, label }) => {
  if (!label) return null;

  return (
    <label htmlFor={name} className="label ms-1">
      {label}
    </label>
  );
};

InputLabel.defaultProps = {
  name: '',
  label: '',
};

InputLabel.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
};

export default InputLabel;
