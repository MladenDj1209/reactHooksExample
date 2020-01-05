import React, { useState, useEffect } from 'react';
import { Table, Button, Row, Container, Modal, Form, FormControl, FormLabel, Dropdown, DropdownButton } from 'react-bootstrap';
import endpoints from '../../api/endpoints';
import get from '../../api/getAPICall';

const AddNewProjectComponent = ({ parentCallback }) => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [allEmployeeContracts, setAllEmployeeContracts] = useState([]);

  const [allClientContracts, setAllClientContracts] = useState([]);

  const [client, setClient] = useState();
  const [project, setProject] = useState();

  const tableHeaders = ['#', 'Title', 'Start date', 'EndDate', 'Add'];


  useEffect(() => {
    async function fetchData() {
      const clientContractsUrl = endpoints.GET_ALL_CLIENT_CONTRACTS;
      const employeeContractsUrl = endpoints.GET_ALL_EMPLOYEE_CONTRACTS;

      try {
        const clientContractsResponse = await get(clientContractsUrl);
        const employeeContractsResponse = await get(employeeContractsUrl);

        setAllClientContracts(clientContractsResponse);
        setAllEmployeeContracts(employeeContractsResponse);
      }
      catch (error) {
        console.log({ error });
      }
    }
    fetchData();
  }, []);

  const handleClose = () => { setShow(false); parentCallback(false) };
  const handleShow = () => setShow(true);
  return (
    <>
      <Modal show={show} onHide={handleClose}>

        {currentStep === 1 ?
          <>
            <Modal.Header closeButton>
              <Modal.Title>Add new project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form >
                <FormLabel>Project name</FormLabel>
                <FormControl
                  value={project}
                  type="text"
                  placeholder="Enter project name"
                  className="mr-sm-2" />
                <FormLabel>Start date</FormLabel>
                <FormLabel>End date</FormLabel>
                <FormControl
                  value={endDate}
                  type="text"
                  placeholder="Enter end date (Optional)"
                  className="mr-sm-2" />
                <FormLabel>Select client contract for project</FormLabel>
                {allClientContracts !== undefined ?
                  <Form.Control as="select">
                    {allClientContracts.map((item, index) => (
                      <option key={index}>
                        {index} - {item.title} ({item.clientName})
                          </option>
                    ))
                    }
                  </Form.Control>

                  : <p>Loading</p>
                }
                <FormLabel>Select employee contracts for project</FormLabel>
                {allEmployeeContracts !== undefined ?

                  <Form.Control as="select" multiple>
                    {allEmployeeContracts.map((item, index) => (
                      <option key={index}>
                        {index} - {item.employeeName}
                      </option>
                    ))
                    }
                  </Form.Control>
                  : <p>Loading</p>
                }
              </Form>
            </Modal.Body>
          </>
          :
          null}

        <Modal.Footer>

          <Button variant="btn btn-primary" onClick={handleClose}>
            Sumbit
           </Button>

        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddNewProjectComponent;