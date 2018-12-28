import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav>
      <div className="nav-wrapper">
        <Link to={"/"} class="brand-logo">
          Kamakura Travel
        </Link>
        <ul>
          <li>ssss</li>
          <li>aaa</li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
