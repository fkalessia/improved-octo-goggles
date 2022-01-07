import React from 'react'
import './navbar.css'
function Navbar() {
  return (
    <header>
      <nav className="navbar navbar-expand-md  fixed-top navbar-custom ">
        <div className="container-fluid">
          <a className="navbar-brand " href="/">
            Earthquake Tracker
          </a>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
