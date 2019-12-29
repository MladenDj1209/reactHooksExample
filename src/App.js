import React, { useState, useEffect } from 'react';
import Weather from './components/Weather';
import EmployeeList from './components/EmployeeList';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/Employees">
          <EmployeeList />
        </Route>
        <Route path="/">
          <Weather />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
