import React from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav>
      <div className="nav-wrapper teal lighten-2">
        <Link to="/" className="right brand-logo">
          U Quote
        </Link>
        <ul id="nav-mobile" className="left hide-on-med-and-down">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/create">Create</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
