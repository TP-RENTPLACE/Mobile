import React, { useEffect } from "react";
import "./Logo.css";

const Logo = ({onComplete}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
        onComplete();
    }, 2000);
    return () => clearTimeout(timer);
}, [onComplete]);
  return (
    
    <div className="loading-screen_logo">
      <img src="/icons/logo-white.svg" alt="Rentplace Logo" />
      <span className="logo-text">rentplace</span>
    </div>
  );
};

export default Logo;
