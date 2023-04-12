import React from 'react';
import './Button.css';

function Button(props) {
    const {buttonText, buttonClass, handleClick, type} = props

    let buttonClassName = "Button"

    if(type){
        buttonClassName = buttonClassName + " " + `Button__${type}`
    }

    if(buttonClass){
        buttonClassName = buttonClassName + " " + buttonClass
    }
  return (
    <button className={buttonClassName} onClick={handleClick}>
        {buttonText}
    </button>
  )
}

export default Button