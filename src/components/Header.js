import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap'
import weatherChangeGif from '../common/images/weatherChange.gif'

const Header = (props) => {
  return (
    <Container>
      <Row>
        <Col md={2}>
          <div style={{ width: 200, height: "auto" }}>
            <img style={{ maxWidth: "100%" }} src={weatherChangeGif} />
          </div>
        </Col>
        <Col md={10} style={{ marginTop: 50 }}>
          <h4 className="text-info float-left" >{props.title}</h4>
        </Col>
      </Row>
    </Container>

  )
}

export default Header