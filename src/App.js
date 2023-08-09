import './App.css';
import React,{useState} from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON} from 'react-leaflet';
import japanGeoJSON from './assets/geoJSON/japan.json';
const App = () => {
  const [geoJSONData, setGeoJSONData] = useState(null);
  const [coordinates, setCoordinates] = useState([51.505, -0.09]);

  let geoStyle;
  const handleButtonClick = (latitude, longitude, country) => {
    console.log('Updating coordinates:', latitude, longitude);
    setCoordinates([ latitude, longitude ]);
    setStyle(country);
  };

  const setStyle = (country) => {
    if(country == "JAP"){
      setGeoJSONData(japanGeoJSON);
      geoStyle = "blue";
      console.log(geoJSONData);
    }
  }

  const renderMenu = () => {
    return (
      <div>
        <h1>Largest Cities</h1>
        <button type="button" onClick={() => handleButtonClick(35.6762, 139.6503, "JAP")}>
          Tokyo, Japan
        </button> 
        <button type="button" onClick={() => handleButtonClick(6.2088, 106.8456, "IDN")}>
          Jakarta, Indonesia
        </button> 
        <button type="button" onClick={() => handleButtonClick(31.2304, 121.4737, "CHN")}>
          Shanghai, China
        </button> 
        <button type="button" onClick={() => handleButtonClick(40.7128, -74.0060, "USA")}>
          New York City, USA
        </button> 
        <button type="button" onClick={() => handleButtonClick(37.5519, 126.9918, "SKO")}>
          Seoul, South Korea
        </button> 
      </div>
    );
  };

  const renderMap = () => { 
    return (
      <MapContainer center={coordinates} zoom={3} style={{height: '100vh'}}>
        <TileLayer
         noWrap={true}
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'/>
        <Marker position={coordinates}>
          <Popup>
            A marker indicating a location near London.
          </Popup>
        </Marker>
        {geoJSONData && <GeoJSON data={geoJSONData} style={geoStyle} />}
      </MapContainer>
    );
  };

  return(
    <div>
      {renderMenu()}
      {renderMap()}
    </div>
  );

};

export default App;
