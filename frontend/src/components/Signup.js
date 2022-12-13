import { useMutation } from "@apollo/client";
import React, { useState } from "react";
// import React from "react";
import { Link } from "react-router-dom";
import { SIGNUP_USER } from "../graphql/mutations";

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [signup , {loading , error , data}]=useMutation(SIGNUP_USER)
  if (loading) return <h1>Loading...</h1>;
  if (error) {
    console.log(error.message);
  }
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup({variables:{
      data:formData
    }})
    console.log(formData);
  };

  return (
    <div className="container myStyles">
    {
      error&& <div className="red card-panel">{error.message}</div>
    }
    {
      data && data.user && <div className="green card-panel">{data.user.firstname} is Signed up successfully!! Login now</div>
    }
      <form onSubmit={(e) => handleSubmit(e)}>
        <h5>Signup</h5>
        <input
          type="text"
          placeholder="Firstname"
          required
          name="firstname"
          // value={email}
          onChange={handleChange}
          className="inputStyles"
        />
        <input
          type="text"
          placeholder="Lastname"
          required
          name="lastname"
          // value={email}
          onChange={handleChange}
          className="inputStyles"
        />
        <input
          type="email"
          placeholder="email"
          required
          name="email"
          // value={email}
          onChange={handleChange}
          className="inputStyles"
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          required
          // value={password}
          onChange={handleChange}
          className="inputStyles"
        />
        <p><Link to="/login">Already have an account? Login</Link></p>
        <button
          class="waves-effect waves-light btn"
          style={{ margin: "1em" }}
          type="submit"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
