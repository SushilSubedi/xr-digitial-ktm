import React from 'react';

import PropTypes from 'prop-types';

import Modal from 'components/Modal/Modal';

const DeleteProductModal = ({
  isVisible,
  productName,
  handleConfirm,
  handleCancel,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      className="custom-modal"
      handleOverlayClick={handleCancel}
    >
      <div className="h-auto p-3">
        <h5 className="h-auto">
          Are you sure you want to delete this product?
        </h5>
        <p className="h-auto my-3">
          You are about to remove <strong>{productName}</strong>. Please confirm
          it by clicking over "Yes, I am"
        </p>
        <div className="d-flex justify-content-between mt-4 mb-3 h-auto">
          <button
            className="btn btn-outline-secondary h-auto py-2 px-4"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary h-auto py-2 px-4"
            onClick={handleConfirm}
          >
            Yes, I am
          </button>
        </div>
      </div>
    </Modal>
  );
};

DeleteProductModal.defaultProps = {
  isVisible: false,
  handleConfirm: () => {},
};

DeleteProductModal.propTypes = {
  isVisible: PropTypes.bool,
  handleConfirm: PropTypes.func,
};

export default DeleteProductModal;
