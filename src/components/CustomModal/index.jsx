import { Modal } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

function CustomModal({ isVisible, style, children, ...props }) {
  return (
    <Modal
      open={isVisible}
      style={{ backgroundColor: "rgba(0,0,0,0.5)", ...style }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {React.cloneElement(children, {
        ...props,
      })}
    </Modal>
  );
}

CustomModal.prototype = {
  isVisible: PropTypes.bool,
  style: PropTypes.object,
  children: PropTypes.elementType,
};

// /**
//  * @params {boolean} isVisible
//  * @param {object} style
//  */

export default CustomModal;
