import React, { useEffect, useState } from "react";
import { Weather, weatherData } from "../../data/weatherData";
import WeatherCard from "../WeatherCard";
import "./index.css";

const WeatherList: React.FC = () => {
  const [cityToBeSearched, setCityToBeSearched] = useState<string>("");
  const [ciudadesFiltradas, setCiudadesFiltradas] = useState<Weather[]>([]);
  const [ciudadesFavoritas, setCiudadesFavoritas] = useState<Weather[]>([]);
  const [unit, setUnit] = useState<"C" | "F">("C");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCityToBeSearched(event.target.value);

    const ciudadesFiltradas = weatherData.filter((weather: Weather) => {
      return weather.city
        .toLowerCase()
        .startsWith(event.target.value.toLowerCase());
    });

    setCiudadesFiltradas(ciudadesFiltradas);
  };

  const handleClearSearch = () => {
    console.log("Clear search");
    setCityToBeSearched("");
  };

  const handleUnitChange = () => {
    console.log("Change unit");
    setUnit(unit === "C" ? "F" : "C");
  };

  const handleAddFavorite = (cityId: number) => {
    console.log("Add to favorite", { cityId });

    setCiudadesFavoritas([
      ...ciudadesFavoritas,
      weatherData.find((weather: Weather) => weather.id === cityId)!,
    ]);
  };

  const handleRemoveFavorite = (cityId: number) => {
    console.log("Remove from favorite", { cityId });

    setCiudadesFavoritas(
      ciudadesFavoritas.filter((weather: Weather) => weather.id !== cityId)
    );
  };

  return (
    <div
      className="layout-column align-items-center justify-content-start weather-list"
      data-testid="weather-list"
    >
      <h3>Dashboard</h3>
      <p className="city-details">
        Search for Current Temperature in cities like: New York, London, Paris
        etc.
      </p>
      <div className="card w-300 pt-20 pb-5 mt-5">
        <section className="layout-row align-items-center justify-content-center mt-20 mr-20 ml-20">
          <input
            type="text"
            placeholder="Search city"
            onChange={handleSearch}
            data-testid="search-input"
            value={cityToBeSearched}
          />
          <button onClick={handleClearSearch} data-testid="clear-search-button">
            Clear search
          </button>
        </section>
        <table className="table search-results">
          <thead>
            <tr>
              <th>City</th>
              <th>Temperature</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {ciudadesFiltradas.map((weather: Weather) => {
              return (
                <WeatherCard
                  key={weather.id}
                  weather={weather}
                  unit={unit}
                  onAddFavorite={handleAddFavorite}
                  onRemoveFavorite={handleRemoveFavorite}
                  isFavorite={ciudadesFavoritas.some(
                    (ciudadFavorita) => ciudadFavorita.id === weather.id
                  )}
                />
              );
            })}
          </tbody>
        </table>
        <section className="layout-row align-items-center justify-content-center mt-20 mr-20 ml-20">
          <button
            onClick={handleUnitChange}
            data-testid="unit-change-button"
            className="outlined"
          >
            Switch to {unit === "C" ? "Fahrenheit" : "Celsius"}
          </button>
        </section>
      </div>
      <h3>Favourite Cities</h3>
      <div className="card w-300 pt-20 pb-5">
        <table className="table favorites">
          <thead>
            <tr>
              <th>City</th>
              <th>Temperature</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {ciudadesFavoritas.map((weather: Weather) => {
              return (
                <WeatherCard
                  key={weather.id}
                  weather={weather}
                  unit={unit}
                  onAddFavorite={handleAddFavorite}
                  onRemoveFavorite={handleRemoveFavorite}
                  isFavorite={true}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeatherList;
