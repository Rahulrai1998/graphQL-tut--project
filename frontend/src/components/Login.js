import React from "react";

const Login = () => {
  return (
    <div
      className="container"
      style={{
        width: "25%",
        marginTop: "10%",
        padding: "2em",
        boxShadow: "1px 2px 9px rgba(0,0,0,0.1)",
      }}
    >
      <form>
      <h5>Login</h5>
        <input type="email" placeholder="email" required />
        <input type="password" placeholder="password" required />
        <a class="waves-effect waves-light btn" style={{margin:"1em"}}>button</a>
      </form>
    </div>
  );
};

export default Login;
