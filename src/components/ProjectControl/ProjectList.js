import React, { useState, useEffect } from 'react';
import CommonNavbar from '../../common/components/Navbar';
import endpoints from '../../api/endpoints'
import ModalComponent from '../../common/components/ModalComponent';
import { Table, Button, Row, Container, Dropdown, DropdownButton } from 'react-bootstrap';
import AddNewProjectComponent from './AddNewProjectComponent';
import AddNewClient from './AddNewClient';
import setter from '../../common/components/Setter';

import get from '../../api/getAPICall';

const useProjectFilter = (searchParams) => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  var data = new FormData();
  data.append("searchText", searchParams);

  useEffect(() => {
    async function fetchData() {
      const url = endpoints.GET_PROJECT_BY_NAME_ENDPOINT
      try {
        debugger
        setLoading(true);
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({ name: searchParams }),
          headers: { 'Content-Type': 'application/json' }
        });
        const json = await response.json();
        setResults(json.value);
        setLoading(false)
      }
      catch (error) {
        console.log({ error });
      }
      finally {
        setLoading(false);
      }
    }

    if (searchParams && searchParams !== '') {
      fetchData();
    }
  },
    [searchParams]);
  return [results, loading];
}

const ProjectList = () => {
  const [projectName, setProjectName] = useState('');
  const [searchParams, setSearchParameters] = useState('');
  const [allProjects, loadAllProjects] = useState([]);
  const [showAddNewProject, setShowAddNewProject] = useState(false);
  const [showAddNewClient, setShowAddNewClient] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [metadata, setMetadata] = useState();

  const [filteredProjects, loadingFilteredProjects] = useProjectFilter(searchParams);

  useEffect(() => {
    async function fetchData() {
      const url = endpoints.GET_ALL_PROJECTS_ENDPOINT + `?pageNumber=${pageNumber}&pageSize=${pageSize}`
      try {
        const json = await get(url);
        loadAllProjects(json.items);
        setMetadata(json.metadata);
      }
      catch (error) {
        console.log({ error });
      }
    }
    fetchData();
  }, [pageNumber, pageSize]
  )

  const pageNumbers = [...Array(metadata == undefined ? totalPages : metadata.totalPages).keys()];


  return (
    <div>
      <CommonNavbar
        setSearchParameters={() => setSearchParameters(projectName)}
        value={projectName}
        setValue={setProjectName}
        placeholderText="Enter project name">
      </CommonNavbar>

      <div style={{ padding: 50 }}>
        <DropdownButton id="dropdown-item-button" title="Results per page" style ={{marginBottom: 50}}>
          <Dropdown.Item as="button" value="5" onClick={setter(setPageSize)}>5</Dropdown.Item>
          <Dropdown.Item as="button" value="10" onClick={setter(setPageSize)}>10</Dropdown.Item>
          <Dropdown.Item as="button" value="15" onClick={setter(setPageSize)}>15</Dropdown.Item>
          <Dropdown.Item as="button" value="20" onClick={setter(setPageSize)}>20</Dropdown.Item>
        </DropdownButton>
        {allProjects !== undefined ?

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Start date</th>
                <th>End date</th>
                <th>Status</th>
                <th>Phase</th>
                <th>Details</th>
              </tr>
            </thead>
            {allProjects.map((item, index) => (
              <tbody>
                <tr>
                  <td>{index}</td>
                  <td>{item.name}</td>
                  <td>{item.startDate}</td>
                  <td>{item.endDate}</td>
                  <td>{item.status}</td>
                  <td>{item.phase}</td>
                  <td><ModalComponent
                    title={item.name}
                    mainContent={item.biography}
                  />
                  </td>
                </tr>
              </tbody>
            ))
            }
          </Table>

          : <p>Loading</p>
        }

        {!loadingFilteredProjects ?
          filteredProjects.map((item, index) => (
            <div key={index}>
              <b><p>{item.name}</p></b>
              <ModalComponent
                title={item.name}
                mainContent={item.name}
              />
            </div>
          ))
          :
          <p>Loading</p>
        }
        <Button onClick={() => setShowAddNewProject(true)}>
          New Project
      </Button>
        <Button onClick={() => setShowAddNewClient(true)}>
          New Client
      </Button>
        {showAddNewProject ?
          <AddNewProjectComponent
            show={showAddNewProject}
            parentCallback={() => setShowAddNewProject(false)} /> :
          null}
        {showAddNewClient ?
          <AddNewClient
            show={showAddNewClient}
            parentCallback={() => setShowAddNewClient(false)} /> : null}
      </div>
      <Container>
        <Row className="justify-content-md-center">
          {pageNumbers.map((item) => (
            <button
              className="btn btn-info"
              onClick={() => setPageNumber(item + 1)}
              key={item + 1}
              style={{ margin: 2 }}
            >{pageNumber === item + 1 ? <b>{item + 1}</b> : item + 1}</button>
          )
          )}
        </Row>
      </Container>
    </div>
  )
}

export default ProjectList;