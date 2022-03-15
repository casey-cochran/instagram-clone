import React, { useState } from 'react';
import LoginForm from './LoginForm';
import Modal from 'react-modal';

function LoginFormModal() {

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  };
  function closeModal() {
    setIsOpen(false);
  };

  return (
    <>
    <button onClick={openModal}>Login</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <LoginForm />
      </Modal>
    </>
  );
}

export default LoginFormModal;
