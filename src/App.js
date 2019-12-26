import React, { useState, useEffect } from 'react';
import Weather from './components/Weather'
import './App.css';

// function useGiphy(query) {
//   const [result, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     async function fetchData() {
//       const url = `https://api.giphy.com/v1/gifs/search?api_key=ByY4cx2dqsnGR2IY14giiXG4C8uQ6dOU&q=${query}&limit=25&offset=0&rating=G&lang=en`
//       try {
//         setLoading(true);
//         const response = await fetch(url);
//         const json = await response.json();
//         setResults(json.data.map(item => {
//           return item.images.preview.mp4;
//           setLoading(false)
//         }))
//       }
//       finally {
//         setLoading(false);
//       }
//     }

//     if (query !== "") {
//       fetchData();
//     }
//   }, [query]);
//   return [result, loading];
// }
const page = 1;
const PageContext = React.createContext(page);

function App() {
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')

  // const [result, loading] = useGiphy(query);

  return (
    <div className="App">
      {/* <div style={{ margin: "0 auto"}}>
        <form onSubmit={
          e => {
            e.preventDefault();
            setQuery(search)
          }
        }>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search for gifs..."
          />
          <button type="submit">Submit</button>
        </form>

        <br />
        <br />
        {loading ? <p>Loading...</p> :
          result.map(item => (
            <video autoPlay loop key={item} src={item} />
          ))} */}
      <PageContext.Provider value={page}>
        <Weather />
      </PageContext.Provider>

    </div>
  );
}

export default App;
