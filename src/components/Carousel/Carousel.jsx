import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../Context";
import "./Carousel.css";

const Carousel = () => {
  const { banners } = useContext(Context);

  // const [banners, setBanners] = useState([]);
  const [bannerOrder, setBannerOrder] = useState(1);

  // useEffect(() => {
  //   fetch("http://localhost:3000/banners")
  //     .then((res) => res.json())
  //     .then((res) => setBanners(res))
  //     .catch((error) => console.log(error));
  // }, []);

  const handleNext = () => {
    let temp = (bannerOrder + 1) % banners.length;
    temp === 0 ? setBannerOrder(banners.length) : setBannerOrder(temp);
  };

  const handlePrev = () => {
    let temp = (bannerOrder - 1) % banners.length;
    temp === 0 ? setBannerOrder(banners.length) : setBannerOrder(temp);
  };

  const handleDotClick = (order) => {
    setBannerOrder(order);
  };

  return (
    <div className="carousel">
      <button className="carousel_prev" onClick={handlePrev}>
        PREV
      </button>
      <div className="carousel_banners">
        {banners.map((banner) => (
          <img
            className={`carousel_banner ${
              banner.order === bannerOrder ? "banner_visible" : "banner_hidden"
            }`}
            key={banner.id}
            src={banner.bannerImageUrl}
            alt={banner.bannerImageAlt}
          />
        ))}
      </div>

      <div className="carousel_order">
        {banners.map((banner) => (
          <div
            className="carousel_dot"
            key={banner.id}
            onClick={() => handleDotClick(banner.order)}
          ></div>
        ))}
      </div>
      <button className="carousel_next" onClick={handleNext}>
        NEXT
      </button>
    </div>
  );
};

export default Carousel;
