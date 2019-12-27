import React, { useState, useEffect, useReducer } from 'react';
import HourlyForecastComponent from './HourlyForecast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThermometerHalf, faHistory, faSearch, fas } from '@fortawesome/free-solid-svg-icons'

function useWeather(searchParameters) {
  const [result, setResults] = useState({ main: {} });
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const addToSearchHistory = (newItem) => {
      setSearchHistory(oldArray => [...oldArray, newItem]);
    }

    async function fetchData() {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchParameters}&units=metric&appid=8426def7ae54037a3d1c9d0718b5d5d1`
      try {
        setLoading(true);
        const response = await fetch(url);
        const json = await response.json();
        setResults(json);
        addToSearchHistory(json)
        setLoading(false)
      }
      catch (error) {
        console.log({ error });
      }
      finally {
        setLoading(false);
      }
    }

    if (searchParameters && searchParameters !== '') {
      fetchData();
    }
  }, [searchParameters]);

  console.log(result)
  return [result, loading, searchHistory];
}

function Weather() {
  const [searchParameters, setSearchParameters] = useState('')
  const [city, setCity] = useState('');

  const [result, loading, searchHistory] = useWeather(searchParameters);

  return (
    <div>
      <h2
        className="text-info"
        style={{ margin: 80 }}>
        Weather by city</h2>
      <form onSubmit={e => {
        e.preventDefault();
        setSearchParameters(city);
      }}>
        <input
          style={{ width: 400, margin: "0 auto" }}
          className="form-control"
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button style={{ margin: 25 }} className="btn btn-outline-info" type="submit">
          <FontAwesomeIcon icon={faSearch} />
          <span style={{ marginLeft: 10 }}>Search</span></button>
      </form>
      <br />
      {result.cod === "404" ?
        <p>There is no result for specified city</p>
        :
        <div>
          {loading || result.cod === "404" ?
            <p>loading...</p> :
            <div>
              <FontAwesomeIcon icon={faThermometerHalf} /> <b>{searchParameters}: {(result.main.temp - 0).toFixed(0)} &deg;C</b>
              <p>Pressure: {result.main.pressure} mbar</p>
              <p>Humidity: {result.main.humidity} %</p>
            </div>
          }
        </div>
      }
      <div>
        {searchHistory.length > 0 && result.cod === "404" ?
          <div>
            <h2> <FontAwesomeIcon icon={faHistory} /> Previous search:</h2>
            {searchHistory.map(item => (
              <div>
                <span style={{ color: "gray" }}>{item.name} </span>
              </div>
            ))}
          </div> :
          null}
      </div>
      <hr />
      <HourlyForecastComponent.HourlyForecast city={searchParameters}/>
    </div>
  )
}

export default Weather