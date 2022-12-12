import React, { useState } from "react";

export default function CreateQuote() {
  const [quote, setQuote] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(quote);
  };
  return (
    <div className="container myStyles">
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
        >Add</button>
      </form>
    </div>
  );
}
