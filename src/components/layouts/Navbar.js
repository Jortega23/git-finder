import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = ({ icon, title})=> {
    return (
      <nav className='navbar bg-primary'>
        <h1>
          <i className={icon} /> {title}
        </h1>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/About'>About</Link>
          </li>
        </ul>
      </nav>
    )
}
Navbar.defaultProps = {
  title: 'Git-Finder',
  icon: 'fab fa-github'
};

export default Navbar
