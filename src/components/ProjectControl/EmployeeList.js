import React, { useState, useEffect, useReducer } from 'react';
import CommonNavbar from '../../common/components/Navbar';
import endpoints from '../../api/endpoints'
import ModalComponent from '../../common/components/ModalComponent';
import { Table } from 'react-bootstrap';


const useEmployees = (searchParams) => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  var data = new FormData();
  data.append("searchText", searchParams);

  useEffect(() => {
    async function fetchData() {
      const url = endpoints.SEARCH_EMPLOYEE_ENDPOINT
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

  const [filteredEmployees, loadingFilteredEmployees] = useEmployees(searchParams);


  useEffect(() => {
    async function fetchData() {
      const url = endpoints.GET_ALL_EMPLOYEES_ENDPOINT
      try {
        debugger
        const response = await fetch(url, {
          method: "GET",
          headers: { 'Content-Type': 'application/json' }
        });
        const json = await response.json();
        debugger
        loadAllEmployees(json);
      }
      catch (error) {
        console.log({ error });
      }
      finally {
      }
    }
    fetchData();
  }, []
  )

  return (
    <div>
      <CommonNavbar
        setSearchParameters={() => setSearchParameters(employeeName)}
        value={employeeName}
        setValue={setEmployeeName}
        placeholderText="Enter employee name">
      </CommonNavbar>

      <p>Employee List</p>
      <div style={{ padding: 50 }}>
        {allEmployees != undefined ?
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Address</th>
                <th>Email</th>
                <th>Details</th>
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
    </div>
  )
}

export default EmployeeList;