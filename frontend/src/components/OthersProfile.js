import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { MY_PROFILE, OTHERS_PROFILE } from "../graphql/queries";

export default function OthersProfile() {
  const { userId } = useParams();
  console.log(userId);
  const { loading, error, data } = useQuery(OTHERS_PROFILE, {
    variables: {
      // userId:userId
      // Since , in above line key-value are same , hence we simply write the name
      user_id: userId,
    },
  });
  console.log(data);
  //   const navigate = useNavigate();
  //   if (!localStorage.getItem("token")) {
  //     navigate("/login");
  //   }

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
          src={`https://robohash.org/${data.user.firstname}.png?size=200x200`}
          alt="dp"
        />
        <h5 className="flow-text">{data.user.firstname}</h5>
        <h6>{data.user.email}</h6>
      </div>

      <h5 className="left-align">Quotes</h5>
      {data.user.quotes.map((q) => {
        return (
          <blockquote className="left-align">
            <h6>{q.name}</h6>
          </blockquote>
        );
      })}
    </div>
  );
}
