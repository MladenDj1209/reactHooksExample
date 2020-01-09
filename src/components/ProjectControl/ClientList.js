import React, { useState, useEffect } from 'react';
import CommonNavbar from '../../common/components/Navbar';

const ClientList = () => {
  const [client, setClient] = useState('');
  const [searchParams, setSearchParameters] = useState('');

  return (
    <>
      <CommonNavbar
        setSearchParameters={() => setSearchParameters(client)}
        value={client}
        setValue={setClient}
        placeholderText="Enter client name">
      </CommonNavbar>
      <div>Test</div>
    </>
  )
}


export default ClientList;