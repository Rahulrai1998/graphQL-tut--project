import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CREATE_QUOTES } from "../graphql/mutations";
import { GET_ALL_QUOTES } from "../graphql/queries";

export default function CreateQuote() {
  const [quote, setQuote] = useState("");
  // const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const [createQuote, { loading, error, data }] = useMutation(CREATE_QUOTES, {
    onCompleted(data) {
      navigate("/");
      console.log(data);
    },
    refetchQueries: [GET_ALL_QUOTES, "quotes"],
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
  if (error) {
    console.log(error.message);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(quote);
    createQuote({
      variables: {
        quote,
      },
    });
  };
  return (
    <div className="container myStyles">
      {error && <div className="red card-panel">{error.message}</div>}
      {data && data.user && (
        <div className="green card-panel">{data.output}</div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Quote"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
        />
        <button
          class="waves-effect waves-light btn"
          style={{ margin: "1em" }}
          type="submit"
        >
          Add
        </button>
      </form>
    </div>
  );
}
