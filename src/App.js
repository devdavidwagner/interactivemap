import './App.css';
import React,{useState} from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap} from 'react-leaflet';
import japanGeoJSON from './assets/geoJSON/japan.json';
import indonesiaGeoJSON from './assets/geoJSON/indonesia.json';
import chinaGeoJSON from './assets/geoJSON/china.json';
import usaGeoJSON from './assets/geoJSON/usa.json';
import southKoreaJSON from './assets/geoJSON/skorea.json';
const App = () => {
  //OBJECTS
  const [coordinates, setCoordinates] = useState([51.505, -0.09]);
  const [center, setCenter] = useState([51.505, -0.09]);
  const [selectedCountry, setSelectedCountry] = useState('Japan');

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

  const countryStyle = {
    fillColor: 'blue', // Default style
    weight: 2,
    opacity: 1,
    color: 'white',
    fillOpacity: 0.7
  };

  //FUNCTIONS
  const handleButtonClick = (latitude, longitude, country) => {
    console.log('Updating coordinates:', latitude, longitude);
    setCoordinates([ latitude, longitude ]);
    setCenter([ latitude, longitude ]);
    setSelectedCountry(country);
  };

  function ChangeMapView({ coords }) {
    const map = useMap();
    map.setView(coords, map.getZoom());
  
    return null;
  }


  //RENDERINGS 
  const renderHeader = () =>{
    return(
      <header>
        <h1>Interactive Map</h1>
      </header>
    );
  };

  const renderMenu = () => {
    return (
      <div>
        <h1>Largest Cities</h1>
        <button type="button" onClick={() => handleButtonClick(35.6762, 139.6503, countries.japan)}>
          Tokyo, Japan
        </button> 
        <button type="button" onClick={() => handleButtonClick(-6.2088, 106.8456, countries.indonesia)}>
          Jakarta, Indonesia
        </button> 
        <button type="button" onClick={() => handleButtonClick(31.2304, 121.4737, countries.china)}>
          Shanghai, China
        </button> 
        <button type="button" onClick={() => handleButtonClick(40.7128, -74.0060, countries.usa)}>
          New York City, USA
        </button> 
        <button type="button" onClick={() => handleButtonClick(37.5519, 126.9918, countries.skorea)}>
          Seoul, South Korea
        </button> 
      </div>
    );
  };

  const renderMap = () => { 
    return (
      <MapContainer id ="map" center={center} zoom={4}  worldCopyJump = {true}
      style={{height: '50vh', width:'100vh'}}>
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
      <p>Written in Javascript with React by David Wagner - 2023</p>
    </footer>
    );
  };

  return(
    <div id ="bossDiv">
      {renderHeader()}
      {renderMenu()}
      {renderMap()}
      {renderFooter()}
    </div>
  );

};

export default App;
