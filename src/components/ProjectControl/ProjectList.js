import React, { useState, useEffect } from 'react';
import CommonNavbar from '../../common/components/Navbar';
import endpoints from '../../api/endpoints'
import ModalComponent from '../../common/components/ModalComponent';

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

  const [filteredProjects, loadingFilteredProjects] = useProjectFilter(searchParams);

  useEffect(() => {
    async function fetchData() {
      const url = endpoints.GET_ALL_PROJECTS_ENDPOINT
      try {
        debugger
        const response = await fetch(url, {
          method: "GET",
          headers: { 'Content-Type': 'application/json' }
        });
        const json = await response.json();
        debugger
        loadAllProjects(json.value);
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
        setSearchParameters={() => setSearchParameters(projectName)}
        value={projectName}
        setValue={setProjectName}
        placeholderText="Enter project name">
      </CommonNavbar>

      <p>Project List</p>
      <div>
        {allProjects != undefined ?
          allProjects.map((item, index) => (
            <div>
              <p key={index}>{item.name}</p>
            </div>
          ))
          : <p>Loading</p>
        }
      </div>
      {!loadingFilteredProjects ?
        filteredProjects.map((item, index) => (
          <div key={index}>
            <b><p>{item.name}</p></b>
            <ModalComponent
              title = {item.name}
              mainContent = {item.name}
            />
          </div>
        ))
        :
        <p>Loading</p>
      }
    </div>
  )
}

export default ProjectList;