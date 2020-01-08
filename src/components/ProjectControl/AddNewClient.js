import React, { useState, useEffect } from 'react';
import { Button, Modal, Container, Text, Form, FormControl, FormLabel } from 'react-bootstrap';
import endpoints from '../../api/endpoints';
import setter from '../../common/components/Setter'
import ThemeColor from '../../common/colors';
import useForm from '../../common/components/useForm';
import validateAddNewClient from './Validations/AddNewClientValidation';

const useClient = (client, sendRequest) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();
  const [status, setStatus] = useState();

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
        setStatus(response.status);
        setLoading(false)
      }
      catch (error) {
        console.log(error);
      }
      finally {
      }
    }

    if (client && client.name !== "" && sendRequest == true) {
      fetchData();
    }
  }, [sendRequest]);
  return [result, status, loading];
}

const AddNewClient = ({ parentCallback }) => {
  const [show, setShow] = useState(true);
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(sendRequestAndCloseModal, validateAddNewClient);

  const [sendRequest, setSendRequest] = useState(false);

  const [result, status, loading] = useClient(values, sendRequest);

  const handleClose = () => { setShow(false); parentCallback(false) };
  const handleShow = () => setShow(true);

  function sendRequestAndCloseModal() {
    setSendRequest(true);
    setTimeout(() => handleClose(), 2000);
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={handleSubmit} >
            <FormLabel>Name</FormLabel>
            <FormControl
              required
              value={values.name || ''}
              onChange={handleChange}
              name="name"
              type="text"
              placeholder="Enter client name"
              className={`mr-sm-2 ${errors.name && 'alert-danger'}`} />
            {errors.name && (
              <p className="text-danger">{errors.name}</p>
            )}

            <FormLabel>Mail</FormLabel>
            <FormControl
              required
              value={values.email || ''}
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="Enter client email"
              className="mr-sm-2" />
            {errors.email && (
              <p className="text-danger">{errors.email}</p>
            )}

            <FormLabel>Address</FormLabel>
            <FormControl
              value={values.address || ''}
              onChange={handleChange}
              name="address"
              type="text"
              placeholder="Enter client address"
              className="mr-sm-2" />
            {errors.address && (
              <p className="text-danger">{errors.address}</p>
            )}

            <FormLabel>City</FormLabel>
            <FormControl
              value={values.city || ''}
              onChange={handleChange}
              name="city"
              type="text"
              placeholder="Enter client city"
              className="mr-sm-2" />
            {errors.city && (
              <p className="text-danger">{errors.city}</p>
            )}

            <FormLabel>Phone</FormLabel>
            <FormControl
              value={values.phone || ''}
              onChange={handleChange}
              name="phone"
              type="text"
              placeholder="Enter client phone"
              className="mr-sm-2" />
            {errors.phone && (
              <p className="text-danger">{errors.phone}</p>
            )}

            <FormLabel>Country</FormLabel>
            <FormControl
              value={values.country || ''}
              onChange={handleChange}
              name="country"
              type="text"
              placeholder="Enter client country"
              className="mr-sm-2" />
            {errors.country && (
              <p className="text-danger">{errors.country}</p>
            )}

            <FormLabel>IBAN</FormLabel>
            <FormControl
              value={values.iban || ''}
              onChange={handleChange}
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
        {!loading && sendRequest ?
          <div className="text-center" >
            {status === 200 ?
              <p className="alert alert-success">Client added successfully!</p> :
              <p className="alert alert-danger">Something went wrong!</p>
            }
          </div>
          : null}
      </Modal>
    </>
  )
}

export default AddNewClient;