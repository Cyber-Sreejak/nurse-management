import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { Link } from 'react-router-dom'
import Dropdown from '../Dropdown/Dropdown'

import './Header.css'

function Header() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("")

  const getLoggedInUserInfo = () => {
    setUserName(jwt_decode(localStorage.getItem("token")).fullName)
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login")
  }

  useEffect(() => {
    getLoggedInUserInfo()
  }, [])
  

  return (
    <div className='Header'>
      <div className="container">
        <div className="Header__container">
          <Link className='Header__logo' to="/">
            <h1>Nurse Management</h1>
          </Link>
          <Dropdown dropdownClass="Header__Dropdown" dropdownTitle={userName}>
            <span onClick={handleLogout}>Logout</span>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}

export default Header