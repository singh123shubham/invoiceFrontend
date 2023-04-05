import React from 'react'
import { useState } from 'react';
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {AiOutlineUserAdd} from 'react-icons/ai'

const AddClient = () => {
    const [formData, setFormData] = useState({
        invoiceNumber: '',
        amount: '',
        clientId: '',
        date: '',
        status: '',
        items: [{
            description: '',
            quantity: '',
            amount: ''
        }],
        totalAmount: '',
        paymentDeadline: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        };

        fetch('https://invoicemanagementsystemapi-production.up.railway.app/api/v1/client/new', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
    };
  return (
    <>
        <div className='row pt-3 pl-5 pr-4 hdrtop' style={{ background: "#efefef" }}>
                <div className='col-md-3'>
                    <h1 className='mb-4'>Client</h1>
                </div>
                <div className='col-md-9 text-right'>
                    <Link to={`/`}><Button variant="primary">Home</Button>{' '}</Link>
                    <Link to={`/invoice`}> <Button variant='primary'>Invoice</Button></Link>
                </div>
            </div>

            <div className='container p-5'>
                <form onSubmit={handleSubmit}>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <label>Name:</label>
                                <input type="text" className='form-control' name="invoiceNumber" value={formData.invoiceNumber} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <label>Email:</label>
                                <input type="text" name="clientId" className='form-control' value={formData.clientId} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <label>Phone</label>
                                <input type="number" name="date" className='form-control' value={formData.date} onChange={handleInputChange} />
                            </div>
                        </div>
                       
                        
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <label>Street:</label>
                                <input type="number" name="totalAmount" className='form-control' value={formData.totalAmount} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <label>City:</label>
                                <input type="text" name="paymentDeadline" className='form-control' value={formData.paymentDeadline} onChange={handleInputChange} />
                            </div>
                        </div>

                        <div className='col-md-6'>
                            <div className='form-group'>
                                <label>Country:</label>
                                <input type="text" name="paymentDeadline" className='form-control' value={formData.paymentDeadline} onChange={handleInputChange} />
                            </div>
                        </div>

                        <div className='col-md-6'>
                            <div className='form-group'>
                                <label>Zip Code:</label>
                                <input type="number" name="paymentDeadline" className='form-control' value={formData.paymentDeadline} onChange={handleInputChange} />
                            </div>
                        </div>

                       
                        

                    </div>
                    <Button>
                        <AiOutlineUserAdd
                          style={{
                            top: '10px',
                            right: '0px',
                            marginLeft: "1px",
                        }}
                        size="27px"
                        color="white"
                        />
                    </Button>

                </form>
            </div>
    </>
  )
}

export default AddClient