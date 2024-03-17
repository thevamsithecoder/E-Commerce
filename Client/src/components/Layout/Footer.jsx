import React from "react";
import { Link } from "react-router-dom";
import "./../../styles/Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <h5 className="text-center">© Copyright 2024 made with ❤️ by vamsi</h5>
      <p className="text-center mt-3">
        <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|
        <Link to="/policy">Privacy Policy</Link>
      </p>
    </div>
  );
};

export default Footer;
