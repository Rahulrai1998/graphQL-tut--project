import { useQuery } from "@apollo/client";
import React from "react";
import { useNavigate } from "react-router-dom";
import { MY_PROFILE } from "../graphql/queries";

export default function Profile() {
  const { loading, error, data } = useQuery(MY_PROFILE);
  const navigate = useNavigate();
  if (!localStorage.getItem("token")) {
    navigate("/login");
  }

  if (loading) return <h1>Loading...</h1>;
  if (error) {
    console.log(error.message);
  }

  return (
    <div className="container myStyles">
      {/* <h5>Profile</h5> */}
      <div className="center-align">
        <img
          className="circle responsive-img"
          style={{ border: "2px solid" }}
          src={`https://robohash.org/${data.myProfile.firstname}.png?size=200x200`}
          alt="dp"
        />
        <h5 className="flow-text">{data.myProfile.firstname}</h5>
        <h6>{data.myProfile.email}</h6>
      </div>

      <h5 className="left-align">Quotes</h5>
      {data.myProfile.quotes.map((q) => {
        return (
          <blockquote className="left-align">
            <h6>{q.name}</h6>
          </blockquote>
        );
      })}
    </div>
  );
}
