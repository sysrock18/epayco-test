import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <nav className="navbar navbar-default navbar-custom">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link to="/" className="navbar-brand">ePayco Checkout</Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
