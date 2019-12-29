import React from 'react';
import { Container, Row, Col, Button, Nav, Navbar, Form, FormControl } from 'react-bootstrap';

const CommonNavbar = (props) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">WeatherApp</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/">Weather</Nav.Link>
        <Nav.Link href="/employees">Employees</Nav.Link>
      </Nav>
      {props.children}
      {/* <Form inline onSubmit={e => {
        e.preventDefault();
        setSearchParameters(city);
      }}>
        <FormControl
          value={city}
          onChange={setter(setCity)}
          type="text"
          placeholder="Enter city name"
          className="mr-sm-2" />
        <Button
          variant="outline-info"
          type="submit"
        >Search</Button>
      </Form> */}
    </Navbar>
  )
}

export default CommonNavbar;
