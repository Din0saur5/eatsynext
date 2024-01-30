"use client";
import React from "react";

import "./modal.css";

const Modal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-10">
        <div className="modal-container w-full max-w-lg mx-4 md:mx-0">
          {content}
        </div>
      </div>
    </>
  );
};

export default Modal;
