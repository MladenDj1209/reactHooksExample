import React, { useState, useEffect } from 'react';
import style from '../common/styles'

const TemperatureCard = (props) => {
  return (
    <div style={props.weather === "Clear" ? style.BackgroundStyleSunny : style.BackgroundStyleCloudy}>
      <h6>{props.date}</h6>
      <p><b>{props.temperature.toFixed(0)} &deg;C</b></p>
      <p>Pressure: {props.pressure} mbar</p>
      <p>Humidity {props.humidity} %</p>
    </div>
  )
}

export default TemperatureCard