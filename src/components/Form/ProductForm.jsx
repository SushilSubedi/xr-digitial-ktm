import React from 'react';
import { Field, Form } from 'react-final-form';
import PropTypes from 'prop-types';

import { required } from 'utils/validation';
import InputField from './InputField';

const ProductForm = ({
  handleCancel,
  handleConfirm,
  initialValues,
  editForm,
}) => {
  const onSubmitHandler = (product) => {
    if (!editForm) {
      product.created_at = new Date().toISOString();
    }
    handleConfirm(product);
  };

  const updatedText = editForm ? 'Update' : 'Save';

  return (
    <Form onSubmit={onSubmitHandler} initialValues={initialValues}>
      {({ handleSubmit, submitting, submitError, pristine }) => (
        <form
          className="w-100 needs-validation form-control border-0"
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <Field
              name="product_name"
              label="Name"
              component={InputField}
              placeholder="product name"
              validate={required()}
            />
          </div>
          <div className="mb-3">
            <Field
              name="category_name"
              label="Category"
              component={InputField}
              placeholder="category"
              validate={required()}
            />
          </div>
          <div className="mb-3">
            <Field
              name="created_by"
              label="Created by"
              component={InputField}
              placeholder="Created By"
              validate={required()}
            />
          </div>
          <div className="mb-3">
            <Field
              name="description"
              label="Description"
              component={InputField}
              placeholder="description"
              validate={required()}
            />
          </div>
          <div className="mb-3">
            <Field
              name="status"
              label="Status"
              component={InputField}
              placeholder="Status"
              validate={required()}
            />
          </div>
          {submitError && <p className="error">{submitError}</p>}
          <div className="d-flex justify-content-between mt-4 mb-3 h-auto">
            <button
              className="btn btn-outline-secondary h-auto py-2 px-4"
              onClick={handleCancel}
              type="button"
            >
              Cancel
            </button>
            <button
              className="btn btn-primary h-auto py-2 px-4"
              disabled={submitting || pristine}
              type="submit"
            >
              {updatedText}
            </button>
          </div>
        </form>
      )}
    </Form>
  );
};

ProductForm.defaultProps = {
  handleCancel: () => {},
  handleConfirm: () => {},
  initialValues: null,
  editForm: false,
};

ProductForm.propTypes = {
  handleCancel: PropTypes.func,
  handleConfirm: PropTypes.func,
  initialValues: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.shape([]),
  ]),
  editForm: PropTypes.bool,
};

export default ProductForm;
