import React, { useState, useEffect, useReducer } from 'react';
import HourlyForecastComponent from './HourlyForecast';
import Header from './Header';
import Loading from '../common/components/Loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThermometerHalf, faHistory, faSearch, fas } from '@fortawesome/free-solid-svg-icons'
import { Container, Row, Col, Button, Nav, Navbar, Form, FormControl } from 'react-bootstrap'


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
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">WeatherApp</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        <Form inline onSubmit={e => {
          e.preventDefault();
          setSearchParameters(city);
        }}>
          <FormControl
            value={city}
            onChange={e => setCity(e.target.value)}
            type="text"
            placeholder="Enter city name"
            className="mr-sm-2" />
          <Button
            variant="outline-info"
            type="submit"
          >Search</Button>
        </Form>
      </Navbar>
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
                <div>
                  <FontAwesomeIcon icon={faThermometerHalf} /> <b>{searchParameters}: {(result.main.temp - 0).toFixed(0)} &deg;C</b>
                  <p>Pressure: {result.main.pressure} mbar</p>
                  <p>Humidity: {result.main.humidity} %</p>
                </div>
                : null
            }
          </div>
        }
        <div>
          {searchHistory.length > 0 && result.cod !== "404" ?
            <div>
              <h2> <FontAwesomeIcon icon={faHistory} /> Previous search:</h2>
              {searchHistory.map(item => (
                <div>
                  <span style={{ color: "gray" }}>{item.name} </span>
                </div>
              ))}
              <HourlyForecastComponent.HourlyForecast city={searchParameters} />
            </div> :
            null}
        </div>
        <hr />

      </Container>
    </div>
  )
}

export default Weather