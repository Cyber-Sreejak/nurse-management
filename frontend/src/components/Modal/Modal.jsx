import React from 'react'

import "./Modal.css"

function Modal(props) {
    const { children, handleModalToggle } = props;
    return (
      <div className='Modal'>
          <div className='Modal__header'>
            <span onClick={handleModalToggle}>close</span>
          </div>
          <div className="Modal__content">
              {children}
          </div>
      </div>
    )
}

export default Modal