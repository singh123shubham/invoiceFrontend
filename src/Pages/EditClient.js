import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditClient = () => {
    const { id } = useParams();

    const [client, setClient] = useState({
        name: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: ''
    });
    console.log(client)

    useEffect(() => {
        const fetchClient = async () => {
            try {
                const response = await fetch(`https://invoicemanagementsystemapi-production.up.railway.app/api/v1/client/${id}`);
                const data = await response.json();

                setClient(data.client);
            } catch (error) {
                console.log(error);
            }
        };
        fetchClient();
    }, [id]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setClient({ ...client, [name]: value });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setFormData(client)
        try {
          const response = await fetch(`https://invoicemanagementsystemapi-production.up.railway.app/api/v1/client/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(client)
          });
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.message);
          }
          toast.success('Client updated successfully',{
            position: toast.POSITION.TOP_CENTER
          });
        } catch (error) {
          console.log(error);
          toast.error(`Failed to update client: ${error.message}`,{
            position: toast.POSITION.TOP_CENTER
          });
        }
      };
      

    return (
        <>

            <div className='row pt-3 pl-5 pr-4 hdrtop' style={{ background: "#efefef" }}>
                <div className='col-md-3'>
                    <h1 className='mb-4'>Invoice</h1>
                </div>
                <div className='col-md-9 text-right'>
                    <Button variant="primary">Home</Button>
                    <Link to={`/invoice`}> <Button variant='primary'>Invoice</Button></Link>
                </div>
            </div>
            <div className='container p-5'>
                <form onSubmit={handleSubmit}>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <label>
                                    Name:
                                </label>
                                <input type="text" className='form-control' name="name" value={client.name} onChange={handleInputChange} />

                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <label>
                                    Email:
                                </label>
                                <input type="email" className='form-control' name="email" value={client.email} onChange={handleInputChange} />

                            </div>
                        </div>

                        <div className='col-md-6'>
                            <div className='form-group'>
                                <label>
                                    Phone:
                                </label>
                                <input type="text" className='form-control' name="phone" value={client.phone} onChange={handleInputChange} />

                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <label>
                                    Street:
                                </label>
                                <input type="text" className='form-control' name="street" value={client.address && client.address.street} onChange={handleInputChange} />

                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <label>
                                    City:
                                </label>
                                <input type="text" className='form-control' name="city" value={client.address && client.address.city} onChange={handleInputChange} />

                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <label>
                                    State:
                                </label>
                                <input type="text" className='form-control' name="state" value={client.address && client.address.state} onChange={handleInputChange} />

                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <label>
                                    Zip:
                                </label>
                                <input type="text" className='form-control' name="zip" value={client.address && client.address.zip} onChange={handleInputChange} />

                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <label>
                                    Country:
                                </label>
                                <input type="text" className='form-control' name="country" value={client.address && client.address.country} onChange={handleInputChange} />

                            </div>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary float-md-right">Update..</button>

                </form>
            </div>
        </>
    )
}

export default EditClient;
