import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Input from '../../components/InputText/Input';
import './Signup.css';

function Signup() {
    const navigate = useNavigate();
    const [userFullname, setUserFullname] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const [hasFullnameError, setHasFullnameError] = useState(false);
    const [hasEmailError, setHasEmailError] = useState(false);
    const [hasPasswordError, setHasPasswordError] = useState(false);

    const [signupErrorMessage, setSignupErrorMessage] = useState("")

    const handleFullnameInputChange = (event) => {
        setUserFullname(event.target.value);
        setHasFullnameError(false)
    }

    const handleEmailInputChange = (event) => {
        setUserEmail(event.target.value);
        setHasEmailError(false)
    }

    const handlePasswordInputChange = (event) => {
        setUserPassword(event.target.value);
        setHasPasswordError(false)
    }

    const handleSignupSubmit = async() => {
        let payload = {
            fullName: userFullname,
            password: userPassword,
            email: userEmail
        }
        await axios.post("http://localhost:8000/auth/signup", payload)
        .then(function (response) {
            console.log(response.data)
            navigate("/login")
        })
        .catch(function (error) {
            setSignupErrorMessage(error.response.data.message)
            console.log(error.response.data);

        })
    }


    return (
        <div className='Signup__page-wrapper'>
            <div className='Signup__form'>
                    <h2 className='text-center'>Nurse Management</h2>
                    <Input
                        labelText="Full name" 
                        inputClass="SignupInput" 
                        hasIcon={true} 
                        placeholder="Enter your full name" 
                        type="text" 
                        value={userFullname}
                        handleChange={handleFullnameInputChange}
                        isInvalid={hasFullnameError}
                    />
                    <Input
                        labelText="Email" 
                        inputClass="SignupInput" 
                        hasIcon={true} 
                        placeholder="Enter your email" 
                        type="text" 
                        value={userEmail}
                        handleChange={handleEmailInputChange}
                        isInvalid={hasEmailError}
                    />
                    <Input 
                        labelText="Password" 
                        inputClass="SignupInput" 
                        hasIcon={true} 
                        placeholder="Enter your password" 
                        type="password"
                        value={userPassword}
                        handleChange={handlePasswordInputChange}
                        isInvalid={hasPasswordError}
                    />
                    <div className='text-center'>
                        {signupErrorMessage ? (<p>{signupErrorMessage}</p>) : null}
                        <Button buttonText="Signup" handleClick={handleSignupSubmit} type="Primary" />
                    </div>
                    <div className='text-center'>
                        <p>Already have an account? Click <Link to="/login">here</Link> to login.</p>
                    </div>
            </div>
        </div>
    )
}

export default Signup