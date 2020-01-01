import React, { useState } from 'react';
import { Button, Modal, Form, FormControl, FormLabel } from 'react-bootstrap';


const AddNewProjectComponent = ({ parentCallback }) => {
  const [show, setShow] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);

  const [client, setClient] = useState();
  const [project, setProject] = useState();

  const handleClose = () => { setShow(false); parentCallback(false) };
  const handleShow = () => setShow(true);
  return (
    <>
      <Modal show={show} onHide={handleClose}>

        {currentStep === 1 ?
          <>
            <Modal.Header closeButton>
              <Modal.Title>Add new client</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form inline >
                <FormLabel>Client name</FormLabel>
                <FormControl
                  value={client}
                  type="text"
                  placeholder="Enter client name"
                  className="mr-sm-2" />
              </Form>
            </Modal.Body>
          </>
          :
          null}

        {currentStep === 2 ?
          <>
            <Modal.Header closeButton>
              <Modal.Title>Add new client contract</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form inline >
                <FormLabel>Client contract</FormLabel>
                <FormControl
                  value=""
                  type="text"
                  placeholder="Enter project name"
                  className="mr-sm-2" />
                <Button
                  variant="outline-info"
                  type="submit"
                >Add</Button>
              </Form>
            </Modal.Body>
          </>
          :
          null}

        {currentStep === 3 ?
          <>
            <Modal.Header closeButton>
              <Modal.Title>Add employees to project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form inline >
                <FormLabel>Employees</FormLabel>
                <FormControl
                  value=""
                  type="text"
                  placeholder="Enter project name"
                  className="mr-sm-2" />
                <Button
                  variant="outline-info"
                  type="submit"
                >Add</Button>
              </Form>
            </Modal.Body>
          </>
          :
          null}


        {currentStep === 4 ?
          <>
            <Modal.Header closeButton>
              <Modal.Title>Project overview</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            </Modal.Body>
          </>
          :
          null}

        <Modal.Footer>
          {currentStep !== 1 ?
            <Button variant="btn btn-outline-primary" onClick={() => setCurrentStep(currentStep - 1)}>
              Previous
           </Button>
            : null}
          {currentStep === 4 ?
            <Button variant="btn btn-primary" onClick={handleClose}>
              Sumbit
           </Button>
            :
            <Button variant="btn btn-primary" onClick={() => setCurrentStep(currentStep + 1)}>
              Next
           </Button>
          }
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddNewProjectComponent;