import React from 'react';
import { Field, Form } from 'react-final-form';
import { required } from 'utils/validation';
import InputField from './InputField';

const ProductForm = ({ handleCancel, handleConfirm }) => {
  const onSubmitHandler = () => {};

  return (
    <Form onSubmit={onSubmitHandler}>
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
              onClick={handleConfirm}
              disabled={submitting || pristine}
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      )}
    </Form>
  );
};

export default ProductForm;
