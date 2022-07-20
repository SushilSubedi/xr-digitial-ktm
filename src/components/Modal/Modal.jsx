import React from 'react';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';

const Modal = ({
  isVisible,
  overlayClass,
  className,
  children,
  handleOverlayClick,
  positionClassName,
}) => {
  if (!isVisible) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={`${overlayClass} vh-100 vw-100 position-fixed`}>
      <div
        onClick={handleOverlayClick}
        className="position-fixed top-0 start-0 vh-100 vw-100 "
      />
      <div
        className={`${positionClassName} position-absolute overflow-hidden card ${className} `}
      >
        {children}
      </div>
    </div>,
    document.getElementById('portal-modal')
  );
};

export default Modal;

Modal.defaultProps = {
  isVisible: false,
  overlayClass: 'overlay',
  className: 'custom-modal',
  positionClassName: 'top-50 start-50 translate-middle ',
  children: <></>,
  handleOverlayClick: () => {},
};

Modal.propTypes = {
  isVisible: PropTypes.bool,
  overlayClass: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  handleOverlayClick: PropTypes.func,
  positionClassName: PropTypes.string,
};
