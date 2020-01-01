import React, { useState, useEffect } from 'react';
import { Button, Modal, Container, Text, Form, FormControl, FormLabel } from 'react-bootstrap';
import endpoints from '../../api/endpoints';
import setter from '../../common/components/Setter'

const useClient = (client, sendRequest) => {
  const [loading, setLoading] = useState(false);
  debugger
  const [result, setResult] = useState();

  useEffect(() => {
    async function fetchData() {
      debugger
      const url = endpoints.ADD_NEW_CLIENT;
      const body = JSON.stringify({
        name: client.name,
        email: client.email,
        address: client.address,
        phone: client.phone,
        city: client.city,
        country: client.country,
        iban: client.iban
      });

      try {
        setLoading(true);
        debugger
        const response = await fetch(url, {
          method: "POST",
          body: body,
          headers: { 'Content-Type': 'application/json' }
        });
        setResult(response);
        setLoading(false)
      }
      catch (error) {
        console.log(error);
      }
    }

    if (client && client.name !== "" && sendRequest == true) {
      fetchData();
    }
  }, [sendRequest]);
  return [result, loading];
}

const AddNewClient = ({ parentCallback }) => {
  const [show, setShow] = useState(true);
  const [sendRequest, setSendRequest] = useState(false);
  const [client, setClient] = useState(
    {
      name: '',
      address: '',
      phone: '',
      email: '',
      city: '',
      country: '',
      iban: ''

    });

  const [result, loading] = useClient(client, sendRequest)

  const handleClose = () => { setShow(false); parentCallback(false) };
  const handleShow = () => setShow(true);

  const handleInputChange = (event) => {
    event.persist();
    setClient(client => ({
      ...client, [event.target.name]: event.target.value
    })
    );
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={e => {
            debugger
            e.preventDefault();
            setSendRequest(true);
          }}>
            <FormLabel>Name</FormLabel>
            <FormControl
              value={client.name}
              onChange={handleInputChange}
              name="name"
              type="text"
              placeholder="Enter client name"
              className="mr-sm-2" />

            <FormLabel>Mail</FormLabel>
            <FormControl
              value={client.email}
              onChange={handleInputChange}
              name="email"
              type="text"
              placeholder="Enter client email"
              className="mr-sm-2" />

            <FormLabel>Address</FormLabel>
            <FormControl
              value={client.address}
              onChange={handleInputChange
              }
              name="address"
              type="text"
              placeholder="Enter client address"
              className="mr-sm-2" />

            <FormLabel>City</FormLabel>
            <FormControl
              value={client.city}
              onChange={handleInputChange
              }
              name="city"
              type="text"
              placeholder="Enter client city"
              className="mr-sm-2" />

            <FormLabel>Phone</FormLabel>
            <FormControl
              value={client.phone}
              onChange={handleInputChange
              }
              name="phone"
              type="text"
              placeholder="Enter client phone"
              className="mr-sm-2" />

            <FormLabel>Country</FormLabel>
            <FormControl
              value={client.country}
              onChange={handleInputChange
              }
              name="country"
              type="text"
              placeholder="Enter client country"
              className="mr-sm-2" />

            <FormLabel>IBAN</FormLabel>
            <FormControl
              value={client.iban}
              onChange={handleInputChange
              }
              name="iban"
              type="text"
              placeholder="Enter client IBAN"
              className="mr-sm-2" />

            <Modal.Footer>
              <Button type="submit" variant="btn btn-primary">
                Sumbit
           </Button>

            </Modal.Footer>
          </Form>

        </Modal.Body>

      </Modal>
    </>
  )
}

export default AddNewClient;