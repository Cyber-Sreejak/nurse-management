import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

import Button from '../../components/Button/Button';
import Input from '../../components/InputText/Input';
import './Login.css';

function Login() {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const [hasEmailError, setHasEmailError] = useState(false);
    const [hasPasswordError, setHasPasswordError] = useState(false);

    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

    const requiredInputField = "This field is required"

    const handleEmailInputChange = (event) => {
        setUserEmail(event.target.value);
        setHasEmailError(false)
        setEmailErrorMessage("")
    }

    const handlePasswordInputChange = (event) => {
        setUserPassword(event.target.value);
        setHasPasswordError(false)
        setPasswordErrorMessage("")
    }

    const handleLoginSubmit = async() => {
        let payload = {
            email: userEmail,
            password: userPassword
        }
        await axios.post("http://localhost:8000/auth/login", payload)
        .then(function (response) {
            console.log(response.data)
            localStorage.setItem("token", response.data.token)
            navigate("/")
        })
        .catch(function (error) {
            console.log(error);
        })
    }


    return (
        <div className='Login__page-wrapper'>
            <div className='Login__form'>
                <h2 className='text-center'>Nurse Management</h2>
                <Input 
                    labelText="Email" 
                    inputClass="LoginInput" 
                    hasIcon={true} 
                    placeholder="Enter your email" 
                    type="text" 
                    value={userEmail}
                    handleChange={handleEmailInputChange}
                    isInvalid={hasEmailError}
                    errorMessage={emailErrorMessage}
                />
                <Input 
                    labelText="Password" 
                    inputClass="LoginInput" 
                    hasIcon={true} 
                    placeholder="Enter your password" 
                    type="password"
                    value={userPassword}
                    handleChange={handlePasswordInputChange}
                    isInvalid={hasPasswordError}
                    errorMessage={passwordErrorMessage}
                />
                <div className='text-center'>
                    <Button buttonText="Login" handleClick={handleLoginSubmit} type="Primary" />
                </div>
                <div className='text-center'>
                    <p>Don't have an account? Click <Link to="/signup">here</Link> to create an account.</p>
                </div>
            </div>
        </div>
    )
}

export default Login