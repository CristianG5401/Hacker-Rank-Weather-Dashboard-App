import React from 'react';
import { Weather } from '../../data/weatherData';
import { on } from 'events';

interface WeatherCardProps {
  weather: Weather;
  unit: 'C' | 'F';
  onAddFavorite: (cityId: number) => void;
  onRemoveFavorite: (cityId: number) => void;
  isFavorite: boolean;
}

function switchTemperatureUnit(temperature: number, unit: 'C' | 'F'): number {
  return unit === 'C' ? temperature : (temperature * 9 / 5) + 32;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  weather,
  unit,
  onAddFavorite,
  onRemoveFavorite,
  isFavorite,
}) => {
  const handleFavoriteClick = () => {
    isFavorite
      ? onRemoveFavorite(weather.id)
      : onAddFavorite(weather.id);
  };
  const temperature = switchTemperatureUnit(weather.temperature, unit).toFixed(1);

  return (
    <tr className="weather-card" data-testid={`weather-card-${weather.id}`}>
      <td>{weather.city}</td>
      <td>{`${temperature}°${unit}`}</td> 
      <td>{weather.description}</td>
      <td>
        <button onClick={handleFavoriteClick} data-testid={`weather-card-action-${weather.id}`}>
          {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        </button>
      </td>
    </tr>
  );
};

export default WeatherCard;

