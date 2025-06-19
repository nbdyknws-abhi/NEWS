import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { FaMoon } from 'react-icons/fa';

export class Navbar extends Component {
  render() {
    return (
      <nav className="custom-navbar sticky-top">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <Link className="navbar-brand fw-bold" to="/">📰 NewsMonkey</Link>
          
          <div className="nav-links d-none d-lg-flex">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/business">Business</Link>
            <Link className="nav-link" to="/entertainment">Entertainment</Link>
            <Link className="nav-link" to="/general">General</Link>
            <Link className="nav-link" to="/health">Health</Link>
            <Link className="nav-link" to="/science">Science</Link>
            <Link className="nav-link" to="/sports">Sports</Link>
            <Link className="nav-link" to="/technology">Technology</Link>
          </div>

          <button onClick={this.props.toggleDarkMode} className="dark-toggle-btn">
            <FaMoon />
          </button>
        </div>
      </nav>
    );
  }
}

export default Navbar;
