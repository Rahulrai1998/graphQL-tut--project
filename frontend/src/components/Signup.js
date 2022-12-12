import React, { useState } from "react";
// import React from "react";

const Signup = () => {
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="container myStyles">
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
