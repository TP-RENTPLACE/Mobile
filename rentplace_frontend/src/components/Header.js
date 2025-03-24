import React from "react";
import "./Header.css";

const Header = () => {
  return (
      <div className="upper_header">
        <div className="logo">
          <img src="./images/logo.png" alt="Rentplace Logo" />
        </div>
        <div className="profile">
          <img src="./images/profile.png" alt="Profile" />
        </div>
      </div>
  );
};

export default Header;
