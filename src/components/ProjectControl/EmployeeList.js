import React, { useState, useEffect, useReducer } from 'react';
import CommonNavbar from '../../common/components/Navbar';
import endpoints from '../../api/endpoints'
import get from '../../api/getAPICall';
import ModalComponent from '../../common/components/ModalComponent';
import PageSizeSetter from '../../common/components/PageSizeSetter';
import { Table, Container, Row } from 'react-bootstrap';
import Pager from '../../common/components/Pager';


const useEmployees = (searchParams) => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  var data = new FormData();
  data.append("searchText", searchParams);

  useEffect(() => {
    async function fetchData() {
      const url = endpoints.SEARCH_EMPLOYEE_ENDPOINT;
      try {
        debugger
        setLoading(true);
        const response = await fetch(url, {
          method: "post",
          body: JSON.stringify({ searchText: searchParams }),
          headers: { 'Content-Type': 'application/json' }
        });
        const json = await response.json();
        setResults(json);
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

const EmployeeList = () => {
  const [employeeName, setEmployeeName] = useState('');
  const [searchParams, setSearchParameters] = useState('');
  const [allEmployees, loadAllEmployees] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [metadata, setMetadata] = useState();

  const tableHeaders = ['#', 'Name', 'Address', 'Email', 'Details'];
  const pageNumbers = [...Array(metadata == undefined ? 1 : metadata.totalPages).keys()];

  const callback = (childData) => {
    setPageSize(childData);
  }

  const [filteredEmployees, loadingFilteredEmployees] = useEmployees(searchParams);

  useEffect(() => {
    async function fetchData() {
      const url = endpoints.GET_ALL_EMPLOYEES_ENDPOINT + `?pageNumber=${pageNumber}&pageSize=${pageSize}`
      try {
        const json = await get(url);
        setMetadata(json.metadata);
        loadAllEmployees(json.items);
      }
      catch (error) {
        console.log({ error });
      }
      finally {
      }
    }
    fetchData();
  }, [pageSize, pageNumber]
  )

  const setPageNumberCallback = (childData) => {
    setPageNumber(childData);
  }

  return (
    <div>
      <CommonNavbar
        setSearchParameters={() => setSearchParameters(employeeName)}
        value={employeeName}
        setValue={setEmployeeName}
        placeholderText="Enter employee name">
      </CommonNavbar>

      <div style={{ padding: 50 }}>
        <PageSizeSetter parentCallback={callback} />
        {allEmployees != undefined ?
          <Table striped bordered hover>
            <thead>
              <tr>
                {tableHeaders.map((item, index) => (
                  <th key={index}>{item}</th>
                ))
                }
              </tr>
            </thead>
            {allEmployees.map((item, index) => (
              <tbody>
                <tr>
                  <td>{index}</td>
                  <td>{item.name}</td>
                  <td>{item.address}</td>
                  <td>{item.email}</td>
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
      </div>
      {!loadingFilteredEmployees ?
        filteredEmployees.map((item, index) => (
          <div key={index}>
            <b><p>{item.name}</p></b>
            <ModalComponent
              title="Employee details"
              mainContent={item.name}
            />
          </div>
        ))
        :
        <p>Loading</p>
      }
      <Pager
        pageNumbers={pageNumbers}
        parentCallback={setPageNumberCallback}
        pageNumber={pageNumber}
      />
    </div>
  )
}

export default EmployeeList;