import React from 'react';

const SearchHistory = (props) => {
  return (
    <span
      onClick={() => props.onItemClick(props.item.name)}
      style={{ color: "gray" }}>
      {props.item.name}, </span>
  )
}

export default SearchHistory