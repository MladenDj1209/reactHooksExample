import React, { useState, useEffect } from 'react';
import CommonNavbar from '../../common/components/Navbar';
import endpoints from '../../api/endpoints';
import get from '../../api/getAPICall';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [metadata, setMetadata] = useState();
  const [loading, setLoading] = useState(true);
  const [searchClient, setSearchClient] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchParams, setSearchParameters] = useState('');

  useEffect(() => {
    debugger
    async function getAllClients() {
      const url = endpoints.GET_ALL_CLIENTS + `?pageNumber=${pageNumber}&pageSize=${pageSize}`;
      try {
        setLoading(true);
        const response = await get(url);
        setClients(response.items)
        setMetadata(response.metadata);
      }
      catch (error) {
        console.log({ error });
      }

      finally {
        setLoading(false);
      }

    }

    getAllClients();

  }, [pageNumber, pageSize])

  return (
    <>
      <CommonNavbar
        setSearchParameters={() => setSearchParameters(searchClient)}
        value={searchClient}
        setValue={setSearchClient}
        placeholderText="Enter client name">
      </CommonNavbar>
      {clients.map((item, index) => (
        <div>{item.name}</div>
      ))}

    </>
  )
}


export default ClientList;