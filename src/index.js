import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

const RenderHead = () => {
  return(
    <head>
    <title>Largest Cities - Interactive Map</title>
    <link id="Link1" rel="icon" href="./images/favicon.ico" type="image/png" />
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></meta>
  </head>
  );
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
