import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

import { LocationMaker } from "./LocationMaker";

//set the default position of the map
const position = [52.639138, -1.137683];

export default function LondonMap() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        "https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2020-12"
      )
        .then((response) => response.json())
        .then((data) => setData(data.slice(0, 10)));
    };
    fetchData();
  }, []);

  return (
    <MapContainer
      // has to set the height, width for the map container
      className="mapContainer"
      center={position}
      zoom={14}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMaker />
      {/* // loop through the dataset to generate the markers */}
      {data.map((crime) => (
        <Marker
          key={crime.id}
          position={[crime.location.latitude, crime.location.longitude]}
        ></Marker>
      ))}
    </MapContainer>
  );
}
