import React from "react";
import "./Footer.css";
import ArweaveIcon from "./ArweaveIcon";
import GithubIcon from "./GithubIcon";

const Footer = () => {
  return (
    <div className="footer">

      <div className="container">
        <hr/>
        <div className="left">
          <p>Albatross Version: 0.1</p>
        </div>

        <div className="right">
          <ArweaveIcon/>
          <GithubIcon/>
        </div>
      </div>

    </div>
  );
};
export default Footer;
