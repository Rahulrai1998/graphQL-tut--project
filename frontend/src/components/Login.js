import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_USER } from "../graphql/mutations";

const Login = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const [loginUser, { loading, error, data }] = useMutation(LOGIN_USER, {
    onCompleted(data) {
      localStorage.setItem("token", data.userToken.token);
      navigate("/");
    },
  });
  if (loading) {
    return (
      <div className="preloader-wrapper small active">
        <div className="spinner-layer spinner-green-only">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div>
          <div className="gap-patch">
            <div className="circle"></div>
          </div>
          <div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
    );
  }
  // if (data) {
  //   localStorage.setItem("token", data.userToken.token);
  //   navigate("/");
  // }

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
    loginUser({
      variables: {
        userCred: formData,
      },
    });
    // navigate("/");
  };
  return (
    <div className="container myStyles">
      {error && <div className="red card-panel">{error.message}</div>}
      {data && data.user && (
        <div className="green card-panel">
          {data.user.firstname} is Signed up successfully!! Login now
        </div>
      )}

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
        <p>
          <Link to="/signup">Don't have an account ? New user</Link>
        </p>
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
