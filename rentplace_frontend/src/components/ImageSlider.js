import React from 'react';
import "./ImageSlider.css"

const ImageSlider = ({ images }) => {
  return (
    <div className="image-slider">
      <img src="./images/property1.png" alt="" srcset="" />
      {/* {images.map((image, index) => (
        <img key={index} src={image} alt={`property-${index}`} />
      ))} */}
    </div>
  );
};

export default ImageSlider;