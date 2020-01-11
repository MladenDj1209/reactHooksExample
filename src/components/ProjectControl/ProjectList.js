import React, { useState, useEffect } from 'react';
import CommonNavbar from '../../common/components/Navbar';
import endpoints from '../../api/endpoints'
import ModalComponent from '../../common/components/ModalComponent';
import { Table, Button, Row, Container, Dropdown, DropdownButton } from 'react-bootstrap';
import AddNewProjectComponent from './AddNewProjectComponent';


import get from '../../api/getAPICall';
import PageSizeSetter from '../../common/components/PageSizeSetter';
import Pager from '../../common/components/Pager';

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
  const [showAddNewProject, setShowAddNewProject] = useState(false); const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [metadata, setMetadata] = useState();
  const [filteredProjects, loadingFilteredProjects] = useProjectFilter(searchParams);

  const tableHeaders = ['#', 'Name', 'Start date', 'End date', 'Status', 'Phase', 'Details'];
  const pageNumbers = [...Array(metadata == undefined ? totalPages : metadata.totalPages).keys()];

  const callbackFunction = (childData) => {
    setPageSize(childData);
  }

  const setPageNumberCallback = (childData) => {
    setPageNumber(childData);
  }

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

  return (
    <div>
      <CommonNavbar
        setSearchParameters={() => setSearchParameters(projectName)}
        value={projectName}
        setValue={setProjectName}
        placeholderText="Enter project name">
      </CommonNavbar>

      <div style={{ padding: 50 }}>
        <PageSizeSetter parentCallback={callbackFunction} />

        {allProjects !== undefined ?
          <Table striped bordered hover>
            <thead>
              <tr>
                {tableHeaders.map((item, index) => (
                  <th key={index}>{item}</th>
                ))
                }
              </tr>
            </thead>
            {allProjects.map((item, index) => (
              <tbody>
                <tr>
                  <td>{index}</td>
                  <td>{item.name}</td>
                  <td>{item.startDate}</td>
                  <td>{item.endDate || 'Not specified'}</td>
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
        <Button className="btn btn-info" onClick={() => setShowAddNewProject(true)}>
          New Project
      </Button>
        {showAddNewProject ?
          <AddNewProjectComponent
            show={showAddNewProject}
            parentCallback={() => setShowAddNewProject(false)} /> :
          null}

      </div>
      <Pager
        pageNumbers={pageNumbers}
        parentCallback={setPageNumberCallback}
        pageNumber={pageNumber}
      />
    </div>
  )
}

export default ProjectList;