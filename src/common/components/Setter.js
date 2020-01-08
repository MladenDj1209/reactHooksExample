import React from 'react'

const setter = set => e => {
  const { target } = e;
  const { value } = target;
  set(value);
  console.log(value)
};

export default setter;