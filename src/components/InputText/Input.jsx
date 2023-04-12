import React from 'react';
import "./Input.css";

function Input(props) {
    const {inputClass, labelText, type, hasIcon, value, placeholder, handleChange, isInvalid, errorMessage} = props

    let inputClassName = "InputField"

    if(isInvalid || errorMessage) {
        inputClassName = inputClassName + " " + "InputField--error"
    }

    if(inputClass){
        inputClassName = inputClassName + " " + inputClass
    }

    return (
        <div className={`InputField__Wraper ${hasIcon ? 'InputField--Icon' : null}`}>
            <label className="InputField__Label">{labelText}</label>
            <input 
                className={`${inputClassName}`} 
                type={type} value={value}
                placeholder={placeholder} 
                onChange={handleChange}
            />
            {errorMessage ? (
                <div className='InputField__error'>
                    <p>{errorMessage}</p>
                </div>
            ): null}
            {isInvalid ? (
                <div className='InputField__error'>
                    <p>Your {labelText.toLowerCase()} is invalid</p>
                </div>
            ) : null}
        </div>
    )
}

export default Input