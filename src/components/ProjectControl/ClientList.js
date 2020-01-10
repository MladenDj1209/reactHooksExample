import React, { useState, useEffect } from 'react';
import CommonNavbar from '../../common/components/Navbar';
import endpoints from '../../api/endpoints';
import get from '../../api/getAPICall';
import ModalComponent from '../../common/components/ModalComponent';
import PageSizeSetter from '../../common/components/PageSizeSetter';
import { Table, Button, Row, Container, Dropdown, DropdownButton } from 'react-bootstrap';
import Pager from '../../common/components/Pager';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [metadata, setMetadata] = useState();
  const [loading, setLoading] = useState(true);
  const [searchClient, setSearchClient] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchParams, setSearchParameters] = useState('');
  const [totalPages, setTotalPages] = useState(1);

  const tableHeaders = ['#', 'Name', 'Email', 'Phone', 'Address', 'City', 'Country', 'Details'];
  const pageNumbers = [...Array(metadata === undefined ? totalPages : metadata.totalPages).keys()];

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

  const callbackFunction = (childData) => {
    setPageSize(childData);
  }

  const setPageNumberCallback = (childData) => {
    setPageNumber(childData);
  }

  return (
    <>
      <CommonNavbar
        setSearchParameters={() => setSearchParameters(searchClient)}
        value={searchClient}
        setValue={setSearchClient}
        placeholderText="Enter client name">
      </CommonNavbar>

      <div style={{ padding: 50 }}>
        <PageSizeSetter parentCallback={callbackFunction} />
        {clients !== undefined ?
          <Table striped bordered hover>
            <thead>
              <tr>
                {tableHeaders.map((item, index) => (
                  <th key={index}>{item}</th>
                ))
                }
              </tr>
            </thead>
            {clients.map((item, index) => (
              <tbody>
                <tr>
                  <td>{index}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone || 'Not specified'}</td>
                  <td>{item.address}</td>
                  <td>{item.city}</td>
                  <td>{item.country}</td>
                  <td><ModalComponent
                    title={item.name}
                    mainContent={item.phone}
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
      <Pager
        pageNumbers={pageNumbers}
        parentCallback={setPageNumberCallback}
        pageNumber = {pageNumber}
      />
    </>
  )
}


export default ClientList;