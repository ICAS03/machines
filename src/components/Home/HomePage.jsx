import React from "react";
import HeroSection from "./HeroSection";
import iphone from "../../assets/iphone-14-pro.webp";
import mac from "../../assets/mac_image2.png";
import FeaturedProducts from "./FeaturedProducts";

const HomePage = () => {
  return (
    <div>
      <HeroSection
        title="Buy Iphone 14"
        subtitle="Experience the magic with the touch of Iphone 14"
        link="/product/66098c443b0ea3ea3c405368"
        image={iphone}
      ></HeroSection>
      <FeaturedProducts></FeaturedProducts>
      <HeroSection
        title="Buy Macbook Air 1"
        subtitle="Experience the magic with the touch of Macbook Air"
        link="/product/66098c443b0ea3ea3c405368"
        image={mac}
      ></HeroSection>
    </div>
  );
};

export default HomePage;
