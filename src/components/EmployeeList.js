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
          headers: {'Content-Type': 'application/json'}
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
  const [employees, loading] = useEmployees(searchParams);

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
        {!loading && employees != undefined ?
          employees.map(item => (
            <div>
              <p>{item.name}</p>
            </div>
          ))
          : null
        }
      </div>
    </div>
  )
}

export default EmployeeList;