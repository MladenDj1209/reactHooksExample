import React, { useState, useEffect } from 'react';
import { Table, Button, Row, Container, Modal, Form, FormControl, FormLabel, Dropdown, DropdownButton } from 'react-bootstrap';
import endpoints from '../../api/endpoints';
import get from '../../api/getAPICall';

const useProject = (project, sendRequest) => {
  const [loading, setLoading] = useState(false);
  debugger
  const [result, setResult] = useState();
  const [status, setStatus] = useState();

  useEffect(() => {
    async function fetchData() {
      const url = endpoints.ADD_NEW_PROJECT;
      debugger

      const body = JSON.stringify({
        name: project.name,
        clientContractId: project.clientContractId,
        employeeContractIds: project.employeeContractIds.toString().replace("[", "").replace("]", "")
      });

      try {
        setLoading(true);
        debugger
        const response = await fetch(url, {
          method: "POST",
          body: body,
          headers: { 'Content-Type': 'application/json' }
        });
        setResult(response);
        setStatus(response.status);
        setLoading(false)
      }
      catch (error) {
        console.log(error);
      }
      finally {

      }
    }

    if (project && project.name !== "" && sendRequest == true) {
      fetchData();
    }
  }, [sendRequest]);
  return [result, status, loading];
}

const AddNewProjectComponent = ({ parentCallback }) => {

  const [sendRequest, setSendRequest] = useState(false);
  const [show, setShow] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  // const [startDate, setStartDate] = useState();
  const [allEmployeeContracts, setAllEmployeeContracts] = useState([]);
  const [allClientContracts, setAllClientContracts] = useState([]);

  const [project, setProject] = useState(
    {
      name: '',
      clientContractId: '',
      employeeContractIds: [],
    });

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

  const [result, status, loading] = useProject(project, sendRequest);

  const handleInputChange = (event) => {
    event.persist();
    setProject(project => ({
      ...project, [event.target.name]: event.target.value
    })
    );
  }

  const handleInputChangeArray = (event) => {
    event.persist();
    setProject(project => ({
      ...project, employeeContractIds: project.employeeContractIds.includes(event.target.value) ? [...project.employeeContractIds] : [...project.employeeContractIds, event.target.value]
    })
    );
    project.employeeContractIds = [...new Set(project.employeeContractIds)];
  }



  return (
    <>
      <Modal show={show} onHide={handleClose}>

        {currentStep === 1 ?
          <>
            <Modal.Header closeButton>
              <Modal.Title>Add new project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={e => {
                debugger
                e.preventDefault();
                setSendRequest(true);
                setTimeout(() => handleClose(), 2000);
              }}>
                <FormLabel>Project name</FormLabel>
                <FormControl
                  name="name"
                  value={project.name}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Enter project name"
                  className="mr-sm-2" />

                <FormLabel>Select client contract for project</FormLabel>
                {allClientContracts !== undefined ?
                  <Form.Control
                    onChange={handleInputChange}
                    name="clientContractId"
                    value={project.clientContractId}
                    as="select">
                    {allClientContracts.map((item, index) => (
                      <option key={index} value={item.id}>{index} - {item.title} ({item.clientName})</option>
                    ))
                    }
                  </Form.Control>

                  : <p>Loading</p>
                }
                <FormLabel>Select employee contracts for project</FormLabel>
                {allEmployeeContracts !== undefined ?
                  <Form.Control
                    as="select"
                    name="employeeContractIds"
                    value={project.employeeContractIds}
                    onChange={handleInputChangeArray}
                    multiple>
                    {allEmployeeContracts.map((item, index) => (
                      <option key={index} value={item.id}>{index} - {item.employeeName}</option>
                    ))
                    }
                  </Form.Control>
                  : <p>Loading</p>
                }
                <Button variant="btn btn-primary" type="submit">
                  Sumbit
           </Button>

              </Form>
            </Modal.Body>
          </>
          :
          null}
        {!loading && sendRequest ?
          <div className="text-center" >
            {status === 200 ?
              <p className="alert alert-success">Project added successfully!</p> :
              <p className="alert alert-danger">Something went wrong!</p>
            }
          </div>
          : null}
      </Modal>
    </>
  )
}

export default AddNewProjectComponent;