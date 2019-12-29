import React, { useState, useEffect, useReducer } from 'react';
import CommonNavbar from '../common/components/Navbar'
import { Container, Row, Col, Button, Nav, Navbar, Form, FormControl } from 'react-bootstrap'
import setter from '../common/components/Setter'

const useEmployees = (searchParams) => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  var data = new FormData();
  data.append("searchText", searchParams);

  useEffect(() => {
    async function fetchData() {
      const url = 'https://localhost:44373/api/employee/SearchEmployees'
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
  const [searchParams, setSearchParams] = useState('');
  const [allEmployees, loadAllEmployees] = useState([]);

  const [filteredEmployees, loadingFilteredEmployees] = useEmployees(searchParams);


  useEffect(() => {
    async function fetchData() {
      const url = 'https://localhost:44373/api/employee/Employees'
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
      <CommonNavbar />
      <Form inline onSubmit={e => {
        e.preventDefault();
        setSearchParams(employeeName);
      }}>
        <FormControl
          value={employeeName}
          onChange={setter(setEmployeeName)}
          type="text"
          placeholder="Enter employee name"
          className="mr-sm-2" />
        <Button
          variant="outline-info"
          type="submit"
        >Search</Button>
      </Form>
      <p>Employee List</p>
      <div>
        {allEmployees != undefined ?
          allEmployees.map((item, index) => (
            <div>
              <p key={index}>{item.name}</p>
            </div>
          ))
          : <p>Loading</p>
        }
      </div>
      {!loadingFilteredEmployees ?
        filteredEmployees.map((item, index) => (
          <div key={index}>
            <b><p>{item.name}</p></b>
            <p>{item.address}</p>
          </div>
        ))
        :
        <p>Loading</p>
      }
    </div>
  )
}

export default EmployeeList;