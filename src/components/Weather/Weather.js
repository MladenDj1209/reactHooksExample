import React, { useState, useEffect, useReducer } from 'react';
import HourlyForecastComponent from '../Weather/HourlyForecast';
import Header from '../../common/components/Header';
import Loading from '../../common/components/Loader';
import MainResult from '../Weather/MainResult';
import SearchHistory from '../Weather/SearchHistory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThermometerHalf, faHistory, faSearch, fas } from '@fortawesome/free-solid-svg-icons'
import { Container, Row, Col, Button, Nav, Navbar, Form, FormControl } from 'react-bootstrap'
import ThemeColor from '../../common/colors';
import CommonNavbar from '../../common/components/Navbar';

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

  return [result, loading, searchHistory];
}

function Weather() {
  const [searchParameters, setSearchParameters] = useState('')
  const [city, setCity] = useState('');
  const [result, loading, searchHistory] = useWeather(searchParameters);

  return (
    <>
      <CommonNavbar
        setSearchParameters={() => setSearchParameters(city)}
        value={city}
        setValue={setCity}
        placeholderText="Enter city name">
      </CommonNavbar>
      <Container>
        <Header
          title="Weather App"
        />
        {result.cod === "404" ?
          <p>There is no result for specified city</p>
          :
          <div>
            {loading || result.cod === "404" ?
              <Loading /> :
              result.main.temp ?
                <MainResult
                  city={searchParameters}
                  temperature={result.main.temp}
                  pressure={result.main.pressure}
                  humidity={result.main.humidity}
                />
                : null
            }
          </div>
        }
        <div>
          {searchHistory.length > 0 && result.cod !== "404" ?
            <div>
              <div inline style={{ margin: 50 }}>
                <b style={{ color: ThemeColor }}><FontAwesomeIcon icon={faHistory} /> Previous search:</b>
                {searchHistory.map((item, index) => (
                  <SearchHistory
                    key={index}
                    item={item}
                    onItemClick={() => setSearchParameters(item.name)}
                  />
                ))
                }
              </div>
              <HourlyForecastComponent.HourlyForecast city={searchParameters} />
            </div>
            :
            null}
        </div>
        <hr />

      </Container>
    </>
  )
}

export default Weather