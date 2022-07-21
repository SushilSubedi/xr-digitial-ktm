import React from 'react';

import PropTypes from 'prop-types';

import Modal from 'components/Modal/Modal';
import ProductForm from 'components/Form/ProductForm';

const AddProductModal = ({ isVisible, handleConfirm, handleCancel }) => {
  return (
    <Modal
      isVisible={isVisible}
      className="custom-modal"
      handleOverlayClick={handleCancel}
    >
      <div className="h-auto p-3">
        <h5 className="h-auto">Add new Product</h5>
        <p className="h-auto my-3">Add new Product by filling up below form.</p>
        <ProductForm
          handleCancel={handleCancel}
          handleConfirm={handleConfirm}
        />
      </div>
    </Modal>
  );
};

AddProductModal.defaultProps = {
  isVisible: false,
  handleConfirm: () => {},
};

AddProductModal.propTypes = {
  isVisible: PropTypes.bool,
  handleConfirm: PropTypes.func,
};

export default AddProductModal;
