import React from 'react';

import PropTypes from 'prop-types';

import Modal from 'components/Modal/Modal';
import ProductForm from 'components/Form/ProductForm';

const EditProductModal = ({
  isVisible,
  handleConfirm,
  handleCancel,
  initialValues,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      className="custom-modal"
      handleOverlayClick={handleCancel}
    >
      <div className="h-auto p-3">
        <h5 className="h-auto">Edit Existing Product</h5>
        <p className="h-auto my-3">Update Product by filling up below form.</p>
        <ProductForm
          handleCancel={handleCancel}
          handleConfirm={handleConfirm}
          initialValues={initialValues}
          editForm
        />
      </div>
    </Modal>
  );
};

EditProductModal.defaultProps = {
  isVisible: false,
  handleConfirm: () => {},
};

EditProductModal.propTypes = {
  isVisible: PropTypes.bool,
  handleConfirm: PropTypes.func,
};

export default EditProductModal;
