import React, { useState, useEffect } from 'react';
import tokyo1 from './compImages/tokyo1.webp';
import tokyo2 from './compImages/tokyo2.webp';
import tokyo3 from './compImages/tokyo3.webp';
import jakarta1 from './compImages/jakarta1.webp';
import jakarta2 from './compImages/jakarta2.webp';
import jakarta3 from './compImages/jakarta3.webp';
import shanghai1 from './compImages/shanghai1.webp';
import shanghai2 from './compImages/shanghai2.webp';
import shanghai3 from './compImages/shanghai3.webp';
import nyc1 from './compImages/nyc1.webp';
import nyc2 from './compImages/nyc2.webp';
import nyc3 from './compImages/nyc3.webp';
import seoul1 from './compImages/seoul1.webp';
import seoul2 from './compImages/seoul2.webp';
import seoul3 from './compImages/seoul3.webp';

function Slideshow(selectedCountry) {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const imagesJakarta = [jakarta1, jakarta2, jakarta3];
  const imagesTokyo = [tokyo1, tokyo2, tokyo3];
  const imageShanghai = [shanghai1, shanghai2, shanghai3];
  const imagesNYC = [nyc1, nyc2, nyc3];
  const imagesSeoul = [seoul1, seoul2, seoul3];

  //default
  const generateImages = () => {
    setImages(imagesTokyo);
  };

  useEffect(() => {
    generateImages();
  }, []);

  useEffect(() => {
    console.log('slideshow.js Selected Country changed:', selectedCountry.selectedCountry);
    if(selectedCountry.selectedCountry == "IND"){
      setImages(imagesJakarta);
    }
    else if(selectedCountry.selectedCountry == "JPN"){
      setImages(imagesTokyo);
    }
    else if(selectedCountry.selectedCountry == "CHN"){
      setImages(imageShanghai);
    }
    else if(selectedCountry.selectedCountry == "USA"){
      setImages(imagesNYC);
    }
    else if(selectedCountry.selectedCountry == "SKO"){
      setImages(imagesSeoul);
    }
  }, [selectedCountry]); // This effect will run whenever selectedCountry changes


  useEffect(() => {
    if (images.length > 0) {
      const intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 1500);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [images]);

  return (
    <div id="cityImages">
      {images.length > 0 && (
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          style={{ width: '100%', height: '100%' }}
        />
      )}
    </div>
  );
}

export default Slideshow;
