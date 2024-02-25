import React, { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "10px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    width: "200px",
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search Country..."
        value={searchTerm}
        onChange={handleSearch}
        style={{ width: "100%", padding: "10px" }}
      />
      <div style={containerStyle}>
        {filteredCountries.map((item) => (
          <div key={item.cca3} style={cardStyle} className="countryCard">
            <img
              src={item.flags.png}
              alt={`Flag of ${item.name.common}`}
              style={{ width: "100px", height: "100px" }}
              width="100"
              height="100"
            />
            <h2>{item.name.common}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
