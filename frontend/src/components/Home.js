import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { GET_ALL_QUOTES } from "../graphql/queries";

export default function Home() {
  const { loading, error, data } = useQuery(GET_ALL_QUOTES);
  if (loading) return <h1>Loading...</h1>;
  if (error) {
    console.log(error.message);
  }
  if(data.quotes.length == 0){
    <h1>No quotes</h1>
  }
  // useEffect(() => {
  //   fetch("http://localhost:4000", {
  //     method: "post",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       query: `
  //       query{
  //         quotes{
  //           name
  //           by{
  //             _id
  //             firstname
  //           }
  //         }
  //       }
  //       `,
  //       // variables:{

  //       // }
  //     }),
  //   })
  //     .then((res) => {
  //       // console.log(res);
  //       return res.json();
  //     })
  //     .then((data) => console.log(data));
  // }, []);

  return (
    <div className="container ">
      {data.quotes.map((quote) => {
        return (
          <>
            <blockquote className="left-align">
              <h6>{quote.name}</h6>
              <p className="right-align">~ {quote.by.firstname}</p>
            </blockquote>
          </>
        );
      })}
    </div>
  );
}
