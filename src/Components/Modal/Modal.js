import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import Modal from 'react-bootstrap/Modal';

import './Modal.scss';

function MyModal(props) {
  const { heading, onRequestClose, interupt } = props;

  const hide = () => {
    onRequestClose();
  };

  const renderButtons = () => {
    if (interupt && interupt.btns) {
      return interupt.btns.map(btn => {
        return (
          <button
            onClick={() => {
              props.processResult(btn.result);
            }}
          >
            {btn.label}
          </button>
        );
      });
    }
  };

  return (
    <Modal
      show={props.show}
      dialogClassName="modal-90w"
      onHide={() => false}
      centered
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header>
        <Modal.Title id="example-custom-modal-styling-title">
          {heading}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{interupt && interupt.copy}</p>
      </Modal.Body>
      <Modal.Footer>{renderButtons()}</Modal.Footer>
    </Modal>
  );
}

export default MyModal;
