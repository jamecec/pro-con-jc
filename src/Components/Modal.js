import React from 'react';
import ReactDOM from 'react-dom';

const MODAL_STYLE = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#a7a6a4',
  padding: '50px',
  zIndex: 1000
}
const OVERLAY_STYLE = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
}
const BUTTON_STYLE = {
  display: 'flex',
  justifyContent: 'flex-end'
}

export default function Modal({open, children, onClose, onSubmit, deleteItem}){
  if (!open) return null
  const deleteButton = !deleteItem ? (<div/>) : (<button onClick={deleteItem}>Delete Argument</button>);
  return ReactDOM.createPortal(
    <>
    <div style = {OVERLAY_STYLE} />
    <div style={MODAL_STYLE}>
    {children}
    <div style={BUTTON_STYLE}>
    <button onClick={onSubmit}>Save</button>
    {deleteButton}
    <button onClick={onClose}>Cancel</button>
    </div>
    </div>
    </>,
    document.getElementById('portal')
  )
}
 //reference: https://www.youtube.com/watch?v=LyLa7dU5tp8&t=15s
