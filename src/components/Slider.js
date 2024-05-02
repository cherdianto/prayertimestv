import React from 'react';
import { Carousel } from 'react-responsive-carousel';

const Slider = ({ photos }) => {
  return (
    <div className='mt-auto'>
      <Carousel autoPlay infiniteLoop showArrows={false} showThumbs={false}>
        {photos.map((photo, index) => (
          <div key={index}>
            <img
              src={photo}
              alt={`Mosque Photo ${index + 1}`}
              style={{ width: '100%', minHeight: '100%', objectFit: 'cover' }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
