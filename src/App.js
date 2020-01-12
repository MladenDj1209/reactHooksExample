import React, { useState, useEffect } from 'react';
import Weather from './components/Weather/Weather';
import EmployeeList from './components/ProjectControl/EmployeeList';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import ProjectList from './components/ProjectControl/ProjectList';
import ClientList from './components/ProjectControl/ClientList';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/employees">
          <EmployeeList />
        </Route>
        <Route path="/clients">
          <ClientList />
        </Route>
        <Route path="/projects">
          <ProjectList />
        </Route>
        <Route path="/">
          <Weather />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
