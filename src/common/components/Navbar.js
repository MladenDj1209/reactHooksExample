import React from 'react';
import { Container, Row, Col, Button, Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import setter from '../components/Setter';

const CommonNavbar = (props) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">WeatherApp</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/">Weather</Nav.Link>
        <Nav.Link href="/employees">Employees</Nav.Link>
        <Nav.Link href="/projects">Projects</Nav.Link>
      </Nav>
      {props.children}
      <Form inline onSubmit={e => {
        e.preventDefault();
        props.setSearchParameters(props.value);
      }}>
        <FormControl
          value={props.value}
          onChange={setter(props.setValue)}
          type="text"
          placeholder={props.placeholderText}
          className="mr-sm-2" />
        <Button
          variant="outline-info"
          type="submit"
        >Search</Button>
      </Form>
    </Navbar>
  )
}

export default CommonNavbar;
