export default function validateAddNewClient(values) {
  debugger
  let errors = {};

  if(!values.name) {
    errors.name = 'Name is required';
  }
  else if(values.name.length < 2) {
    errors.name = 'Name must contain at least two letters';
  }
  else if(values.name.length > 25) {
    errors.name = 'Name cannot contain more than 25 letters';
  }
  else if(!/^[A-Za-z]+$/.test(values.name)) {
    errors.name = 'Name cannot contain numbers or special characters'
  }

  if (!values.email) {
    errors.email = 'Email address is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }

  if(!values.address) {
    errors.address = 'Address is required';
  }
  else if(values.address.length < 2) {
    errors.address = 'Address must contain at least two letters';
  }
  else if(values.address.length > 25) {
    errors.address = 'Address cannot contain more than 25 letters';
  }

  if(!values.city) {
    errors.city = 'City is required';
  }
  else if(values.city.length < 2) {
    errors.city = 'City must contain at least two letters';
  }
  else if(values.city.length > 25) {
    errors.city = 'City cannot contain more than 25 letters';
  }

  if(!values.phone) {
    errors.phone = 'Phone is required';
  }
  else if(values.phone.length < 2) {
    errors.phone = 'Phone must contain at least two letters';
  }
  else if(values.phone.length > 25) {
    errors.phone = 'Phone cannot contain more than 25 letters';
  }

  if(!values.country) {
    errors.country = 'Country is required';
  }
  else if(values.country.length < 2) {
    errors.country = 'Country must contain at least two letters';
  }
  else if(values.country.length > 25) {
    errors.country = 'Country cannot contain more than 25 letters';
  }


  

  return errors;
}

