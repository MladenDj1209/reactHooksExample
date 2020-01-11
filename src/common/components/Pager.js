import React from 'react';
import { Row, Container } from 'react-bootstrap';


const Pager = (props) => {

  const setPageNumberAndReturnValueToParent = (item) => {
    props.parentCallback(item + 1);
  }
  return (
    < Container style={{ marginBottom: 30 }}>
      <Row className="justify-content-md-center">
        {props.pageNumbers.map((item, index) => (
          <button
            className="btn btn-info"
            onClick={() => setPageNumberAndReturnValueToParent(item)}
            key={index + 1}
            style={{ margin: 2 }}
          >{props.ageNumber === item + 1 ? <b>{item + 1}</b> : item + 1}</button>
        )
        )}
      </Row>
    </Container >
  )
}

export default Pager;