import React from 'react';

import PropTypes from 'prop-types';

import FormError from 'components/Form/FormError';
import InputLabel from 'components/Form/InputLabel';

const InputField = ({
  input: { name, onBlur, onChange, type, value, placeholder, ...input },
  meta: { touched, error, submitError },
  label,
}) => {
  const checkError = (error, submitError, touched) => {
    if ((error || submitError) && touched) {
      return 'error';
    } else if (value) {
      return 'active';
    }

    return '';
  };

  return (
    <>
      <>
        <InputLabel name={name} label={label} />
        <div className="position-relative mt-1">
          <div className="position-relative mt-1 w-100">
            <input
              {...input}
              name={name}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              type={type}
              className={`form-control w-100  ${checkError(
                error,
                submitError,
                touched
              )}`}
              id={name}
              aria-describedby={name}
              placeholder={placeholder}
            />
          </div>
          <FormError
            error={error}
            submitError={submitError}
            touched={touched}
          />
        </div>
      </>
    </>
  );
};

InputField.defaultProps = {
  label: '',
};

InputField.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    value: PropTypes.string,
    type: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
    warning: PropTypes.string,
    submitError: PropTypes.bool,
  }),
  label: PropTypes.string,
};

export default InputField;
