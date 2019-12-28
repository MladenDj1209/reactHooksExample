import React, { useState, useEffect, useReducer } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHistory } from '@fortawesome/free-solid-svg-icons'
import ThemeColor from '../common/colors';


const SearchHistory = (props) => {
  return (
    <span
      onClick={() => props.onItemClick(props.item.name)}
      style={{ color: "gray" }}>
      {props.item.name}, </span>
  )
}


export default SearchHistory