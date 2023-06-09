import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {CategoryScale} from 'chart.js'; 
import Chart from 'chart.js/auto';
import L from 'leaflet';
import ReactCountryFlag from "react-country-flag"
Chart.register(CategoryScale);

const Dashboard = () => {
  const [worldData, setWorldData] = useState(null);
  const [countryData, setCountryData] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [mapCenter, setMapCenter] = useState([0, 0]);

  useEffect(() => {
    const fetchWorldData = async () => {
      const response = await fetch('https://disease.sh/v3/covid-19/all');
      const data = await response.json();
      setWorldData(data);
    };

    const fetchCountryData = async () => {
      const response = await fetch('https://disease.sh/v3/covid-19/countries');
      const data = await response.json();
      setCountryData(data);
    };

    const fetchGraphData = async () => {
      const response = await fetch(
        'https://disease.sh/v3/covid-19/historical/all?lastdays=all'
      );
      const data = await response.json();
      setGraphData(data);
    };

    fetchWorldData();
    fetchCountryData();
    fetchGraphData();
    
  }, []);





  useEffect(() => {
    
    if (countryData) {
      const firstCountry = countryData[0];
      setMapCenter([firstCountry.countryInfo.lat, firstCountry.countryInfo.long]);
      console.log(firstCountry.countryInfo.flag)
      
    }
  }, [countryData]);

  if (!worldData || !countryData || !graphData) {
    return <div>Loading...</div>;
  }

  // Process graph data
  const dates = Object.keys(graphData.cases);
  const casesData = Object.values(graphData.cases);
  const recoveredData = Object.values(graphData.recovered);
  const deathsData = Object.values(graphData.deaths);

  const lineGraphData = {
    labels: dates,
    datasets: [
      {
        label: 'Cases',
        data: casesData,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
      },
      {
        label: 'Recovered',
        data: recoveredData,
        fill: false,
        borderColor: 'rgb(54, 162, 235)',
      },
      {
        label: 'Deaths',
        data: deathsData,
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
      },
    ],
  };

  

    const customIcon = (src) =>
      new L.Icon({
        iconUrl: src,
        iconSize: [24, 18],
        popupAnchor: [0, -10],
      })
    

  


  return (
    <div className='w-[1000px]'>

  
    <div className="flex  justify-between h-[350px]  p-4">
    
    {/* // For World Wide cases */}
        <div className=" ms-5 items-center justify-between bg-white p-4 rounded shadow-md mb-">
        <h2 className="text-xl font-bold mb-2">Worldwide Cases</h2>
          <div>
            <p>Total Cases: {worldData.cases}</p>
            <p>Total Recovered: {worldData.recovered}</p>
            <p>Total Deaths: {worldData.deaths}</p>
          </div>
          <div>
            <p>Active Cases: {worldData.active}</p>
            <p>Critical Cases: {worldData.critical}</p>
            <p>Recovered Today: {worldData.todayRecovered}</p>
          </div>
        </div>
        




{/* For Graphical Representation */}

        <div className="bg-white p-4 rounded shadow-md mb-4 w-[500px]">
        <h2 className="text-xl font-bold mb-2">Cases Fluctuation</h2>
          <Line data={lineGraphData} />
        </div>

    </div>
{/* For leaflet map for cases of each country */}

        <div className="bg-white p-4 rounded shadow-md ms-5">
        <h2 className="text-xl font-bold mb-2">Country-Specific Cases</h2>
        <MapContainer center={mapCenter} zoom={2} style={{ height: '400px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {countryData.map((country) => (
        <div className='w-[300px]'>

        <Marker
          key={country.country}
          position={[country.countryInfo.lat, country.countryInfo.long]}
          icon={customIcon(country.countryInfo.flag)}
        >
          
          <Popup>
            <div>
              <h3>{country.country}</h3>
            <img
              src={country.countryInfo.flag}
               width="16"
               height="12"
              alt="Sklj"/>
              <p>Active cases: {country.active}</p>
              <p>Recovered cases: {country.recovered}</p>
              <p>Deaths: {country.deaths}</p>
            </div>
          </Popup>
        </Marker>
        </div>
      ))}
    </MapContainer>
        </div>
      
    </div>
  );
};

export default Dashboard;
