import React from "react";
import "./HeroSection.css";
import { Link } from "react-router-dom";

const HeroSection = ({ title, subtitle, link, image }) => {
  return (
    <section className="hero_section">
      <div className="align_center">
        <h2 className="hero_section_title">{title}</h2>
        <p className="hero_section_subtitle">{subtitle}</p>
        <Link to={link} className="hero_section_link">
          Buy Now
        </Link>
      </div>
      <div className="hero_section_image">
        <img src={image} alt="" className="hero_section_image"></img>
      </div>
    </section>
  );
};

export default HeroSection;
