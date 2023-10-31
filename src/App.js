import './App.css';
import SlideShow from './assets/reactComponents/slideShow'; // Import the Slideshow component
import React,{useState, useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap} from 'react-leaflet';
import japanGeoJSON from './assets/geoJSON/japan.json';
import indonesiaGeoJSON from './assets/geoJSON/indonesia.json';
import chinaGeoJSON from './assets/geoJSON/china.json';
import usaGeoJSON from './assets/geoJSON/usa.json';
import southKoreaJSON from './assets/geoJSON/skorea.json';


const App = () => {
  //OBJECTS
  const [coordinates, setCoordinates] = useState([35.6762, 139.6503]);
  const [center, setCenter] = useState([35.6762, 139.6503]);


  const countries = {
    japan: {
      name: 'JAP',
      geojson: japanGeoJSON
    },
    indonesia: {
      name: 'IND',
      geojson: indonesiaGeoJSON
    },
    china: {
      name: 'CHN',
      geojson: chinaGeoJSON
    },
    usa: {
      name: 'USA',
      geojson: usaGeoJSON
    },
    skorea: {
      name: 'SKO',
      geojson: southKoreaJSON
    },
  };

  const [selectedCountry, setSelectedCountry] = useState(countries.japan);

  const countryStyle = {
    fillColor: 'blue', // Default style
    weight: 2,
    opacity: 1,
    color: 'white',
    fillOpacity: 0.7
  };

  
  useEffect(() => {
    console.log('app.js Selected Country changed:',  selectedCountry.name);
  }, [selectedCountry]); // This effect will run whenever selectedCountry changes


  //FUNCTIONS
  const handleButtonClick = (latitude, longitude, country) => {
    console.log('Updating coordinates:', latitude, longitude);
    setCoordinates([ latitude, longitude ]);
    setCenter([ latitude, longitude ]);
    setSelectedCountry(country);
    generateImages(country);
  };

  function generateImages(country){
    
  }


  function ChangeMapView({ coords }) {
    const map = useMap();
    map.setView(coords, map.getZoom());
  
    return null;
  }


  const renderMenu = () => {
    return (
      <div id = "menu">
        <h1>Largest Cities</h1>
        <button type="button" className = "btn" onClick={() => handleButtonClick(35.6762, 139.6503, countries.japan)}>
          Tokyo, Japan
        </button> 
        <button type="button" className = "btn" onClick={() => handleButtonClick(-6.2088, 106.8456, countries.indonesia)}>
          Jakarta, Indonesia
        </button> 
        <button type="button" className = "btn" onClick={() => handleButtonClick(31.2304, 121.4737, countries.china)}>
          Shanghai, China
        </button> 
        <button type="button" className = "btn" onClick={() => handleButtonClick(40.7128, -74.0060, countries.usa)}>
          New York City, USA
        </button> 
        <button type="button" className = "btn" onClick={() => handleButtonClick(37.5519, 126.9918, countries.skorea)}>
          Seoul, South Korea
        </button> 
      </div>
    );
  };

  const renderMap = () => { 

    const isMobile = window.innerWidth <= 768;
    return (
      <MapContainer id ="map" center={center} zoom={4}  worldCopyJump = {true}
      style={{ width: isMobile ? '45vh' : '90vh', height: isMobile ? '30vh' : '45vh' }}>
        <TileLayer
          continuousWorld={true} // Enables wrap-around effect
          noWrap={false} // Allows the map to repeat horizontally
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'/>
        <ChangeMapView coords={center} />
        <Marker position={coordinates}>
          <Popup>
            A marker indicating a location near London.
          </Popup>
        </Marker>
        <GeoJSON
            key={selectedCountry.name}
            data={selectedCountry.geojson}
            style={() => ({
              ...countryStyle,
              fillColor: 'blue'// Update fill color based on selection
            })}
          />

      </MapContainer>
    );
  };

  

  const renderFooter = () => {
    return (
      <footer>
      <p>         
          Written with React/Javascript (maps via OpenStreetMap) by David Wagner - 2023 <br />
          <br />
          <a href="https://github.com/devdavidwagner/interactivemap">
            <img src="./images/GitHub-Mark.png" alt="GitHub" width="20" height="20" style={{ verticalAlign: 'middle' }} /> Github Repository
          </a>
          <a href="https://www.linkedin.com/in/david-karl-wagner/">
            <img src="./images/LinkedIn-Mark.PNG" alt="LinkedIn" width="20" height="20" style={{ verticalAlign: 'middle', paddingLeft: '25px' }} /> My LinkedIn
          </a>
    </p>
  </footer>
    );
  };

  return(
    <div id ="bossDiv">
      {renderMenu()}
      <SlideShow selectedCountry = {selectedCountry.name}/>
      {renderMap()}
      {renderFooter()}
    </div>
   
  );

};

export default App;
