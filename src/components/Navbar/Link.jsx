import React from "react";
import "./Link.css";
import { NavLink } from "react-router-dom";

const Link = ({ title, link, sidebar }) => {
  return (
    <NavLink
      to={link}
      className={sidebar ? "align_center sidebar_link" : "align_center"}
    >
      {title}
    </NavLink>
  );
};

export default Link;
