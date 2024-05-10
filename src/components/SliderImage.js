import React from 'react';

const SliderImage = (props) => {
  return (
    <img
      className="d-block w-100"
      src={props.imageurl}
      alt={props.text}
      style={{ maxHeight: '70vh', objectFit: 'cover' }} // Set max height and object fit
    />
  );
}

export default SliderImage;