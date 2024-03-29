import React from "react";
import ReactModal from "react-modal";

const Modal = ({isOpen, children }) => {
  return (
    <ReactModal 
      isOpen={isOpen} 
      appElement={document.getElementById('modal')!} 
      style={{
        overlay: {display: "flex", alignItems: 'center', justifyContent: 'center'},
        content: { 
          width: '200px', 
          height: '100px', 
          backgroundColor: '#fffaff', 
          position: 'relative',  
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '12px' 
        }
      }}
    >
      {children}
    </ReactModal>
  )
}

export default Modal;