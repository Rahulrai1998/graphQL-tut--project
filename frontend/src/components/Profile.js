import React from "react";

export default function Profile() {
  return (
    <div className="container myStyles">
      {/* <h5>Profile</h5> */}
      <div className="center-align">
        <img className="circle responsive-img" style={{border:"2px solid"}}src="https://robohash.org/man.png?size=200x200" alt="dp" />
        <h5  className="flow-text">Rahul Kumar</h5>
        <h6 >Email : rahulrocky@horny.mail</h6>
      </div>

      <h5 className="left-align">Quotes</h5>
      <blockquote className="left-align">
        <h6>If the code works don't touc it</h6>
        
      </blockquote>
      <blockquote className="left-align">
        <h6>If the code works don't touc it</h6>
        
      </blockquote>
    </div>
  );
}
