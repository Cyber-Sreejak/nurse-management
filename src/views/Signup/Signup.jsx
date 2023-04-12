import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Input from '../../components/InputText/Input';
import './Signup.css';

function Signup() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [hasEmailError, setHasEmailError] = useState(false);
  const [hasPasswordError, setHasPasswordError] = useState(false);

  const handleEmailInputChange = (event) => {
      setUserEmail(event.target.value);
      setHasEmailError(false)
  }

  const handlePasswordInputChange = (event) => {
      setUserPassword(event.target.value);
      setHasPasswordError(false)
  }

  const handleSignupSubmit = (event) => {
      let payload = {userEmail, userPassword}
      event.preventDefault()
      console.log(payload, "payload")
  }


  return (
      <div className='Signup__page-wrapper'>
          <div className='Signup__form'>
              <h2 className='text-center'>Nurse Management</h2>
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