import React, {useState, useEffect} from 'react'
import jwt_decode from "jwt-decode";
import { Link } from 'react-router-dom'
import Dropdown from '../Dropdown/Dropdown'

import './Header.css'

function Header() {

  const [userName, setUserName] = useState("")

  const getLoggedInUserInfo = () => {
    setUserName(jwt_decode(localStorage.getItem("token")).fullName)
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
            dropdown content
          </Dropdown>
        </div>
      </div>
    </div>
  )
}

export default Header