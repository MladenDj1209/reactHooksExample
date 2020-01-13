import React from "react";
import ModalComponent from './ModalComponent';
import { Table, Button, Row, Col, Container, Dropdown, DropdownButton } from 'react-bootstrap';

const RemoveItemDialog = (props) => {
  return (
    <ModalComponent
      title={props.title}
      buttonText={props.buttonText}
      buttonVariant='outline-danger'
      mainContent={
        <div>
          <p>{props.mainContentText}</p>
          <Row className="mt-5">
            <Col md={6}><Button variant="danger" className="float-right">Remove</Button></Col>
            <Col md={6}><Button variant="outline-info">Cancel</Button></Col>
          </Row>
        </div>
      }
    />
  )
}

export default RemoveItemDialog;

