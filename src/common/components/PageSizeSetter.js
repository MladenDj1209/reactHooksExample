import React, { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import setter from './Setter';

const PageSizeSetter = ({ parentCallback }) => {

  const values = [5, 10, 15, 20];
  const setPageSizeAndReturnToParrent = (e) => {
    e.preventDefault();
    parentCallback(e.target.value);
  }

  return (
    <DropdownButton
      id="dropdown-item-button"
      title="Results per page"
      variant="info"
      style={{ marginBottom: 50 }}>
      {values.map((item, index) => (
        <Dropdown.Item
          as="button"
          key={index}
          value={item}
          onClick={setPageSizeAndReturnToParrent}>{item}</Dropdown.Item>
      ))}
    </DropdownButton>
  )
}

export default PageSizeSetter;