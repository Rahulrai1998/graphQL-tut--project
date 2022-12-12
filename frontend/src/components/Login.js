import React, { useState } from "react";

const Login = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    //Used SPREAD OPPERATOR TO COPY THE CURRENT STATE DATA INTO THE NEW ONE
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // setting the key of the object
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <div className="container myStyles">
      <form onSubmit={(e) => handleSubmit(e)}>
        <h5>Login</h5>
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
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
