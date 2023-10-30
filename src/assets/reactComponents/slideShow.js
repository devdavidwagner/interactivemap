import React, { useState, useEffect } from 'react';
import tokyo1 from './compImages/tokyo1.webp';
import tokyo2 from './compImages/tokyo2.webp';
import tokyo3 from './compImages/tokyo3.webp';

function Slideshow() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  // Replace this function with your logic to generate images for a specific country
  const generateImages = () => {
    // Fetch or generate images for the given country and update the 'images' state.
    // For now, let's assume 'images' is an array of image URLs.
    const generatedImages = [
        tokyo1,
        tokyo2,
        tokyo3
    ];
    setImages(generatedImages);
  };

  const startSlideshow = () => {
    if (images.length > 0) {
      const id = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000); // Change the interval time as needed (e.g., 3000ms = 3 seconds)
      setIntervalId(id);
    }
  };

  const stopSlideshow = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  useEffect(() => {
    generateImages(); // Call generateImages with your country data
    startSlideshow();
  }, []);

  return (
      <div id="cityImages">
        {images.length > 0 && (
          <img
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            style={{ width: '100%', height:'100%' }}
          />
        )}
      </div>
  );
}

export default Slideshow;
