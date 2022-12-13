import React from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  return (
    <nav>
      <div className="nav-wrapper teal lighten-2">
        <Link to="/" className="right brand-logo">
          Quotes
        </Link>

        <ul id="nav-mobile" className="left hide-on-med-and-down">
          {token ? 
            <>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/create">Create</Link>
              </li>
              <li>
                <button className="red btn" onClick={
                  ()=>{
                    localStorage.removeItem("token")
                    navigate("/login")
                  }
                }>Logout</button>
              </li>
            </>
          : 
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          }
          {/* <li>
            <Link to="/">Home</Link>
          </li> */}
        </ul>
      </div>
    </nav>
  );
}
