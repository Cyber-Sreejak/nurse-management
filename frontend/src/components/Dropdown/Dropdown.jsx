import React, { useState } from 'react';
import './Dropdown.css';

function Dropdown(props) {
    const {dropdownTitle, children, dropdownClass} = props;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    let dropdownClassname = "Dropdown";

    if(dropdownClass){
        dropdownClassname = dropdownClassname + " " + dropdownClass
    }

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }

    const handleDropdownClose = () => {
        setIsDropdownOpen(false)
    }

  return (
    <div className={dropdownClassname} onBlur={handleDropdownClose} tabIndex="1">
        <div className='Dropdown__title' onClick={handleDropdownToggle}>
            {dropdownTitle}
        </div>
        {isDropdownOpen ? (
            <div className="Dropdown__content">
                {children}
            </div>
        ) : null}
    </div>
  )
}

export default Dropdown