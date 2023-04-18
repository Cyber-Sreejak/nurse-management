import React from 'react'
import { Link } from 'react-router-dom'
import Dropdown from '../Dropdown/Dropdown'

import './Header.css'

function Header() {
  return (
    <div className='Header'>
      <div className="container">
        <div className="Header__container">
          <Link className='Header__logo' to="/">
            <h1>Nurse Management</h1>
          </Link>
          <Dropdown dropdownClass="Header__Dropdown" dropdownTitle="user name">
            dropdown content
          </Dropdown>
        </div>
      </div>
    </div>
  )
}

export default Header