import React, { useState, useEffect } from 'react';
import Weather from './components/Weather'
import './App.css';

const page = 1;
const PageContext = React.createContext(page);

function App() {
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')

  return (
    <div className="App">
      <PageContext.Provider value={page}>
        <Weather />
      </PageContext.Provider>

    </div>
  );
}

export default App;
