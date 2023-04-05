
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function AddInvoice() {
    const {_id}= useParams()
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
 console.log(formData.invoiceNumber)
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleItemChange = (event, index) => {
        const { name, value } = event.target;
        const newItems = [...formData.items];
        newItems[index][name] = value;
        setFormData({ ...formData, items: newItems });
    };

    const handleAddItem = () => {
        setFormData({
            ...formData,
            items: [
                ...formData.items,
                {
                    description: '',
                    quantity: '',
                    amount: ''
                }
            ]
        });
    };

    const [MInvoice, setInvoice] = useState([]);

    useEffect(()=>{
        const fetchData = async() =>{
            const tres = await fetch(`https://invoicemanagementsystemapi-production.up.railway.app/api/v1/invoice/${_id}`)
            const AresJson = await tres.json()
            setInvoice(AresJson.invoice);
            console.log(AresJson.invoice);
        }

        fetchData();
    },[_id])
    console.log(MInvoice.status);


    const handleSubmit = (event) => {
        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        };

        fetch('https://invoicemanagementsystemapi-production.up.railway.app/api/v1/invoice/new', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
    };




    return (
        <>
            <div className='row pt-3 pl-5 pr-4 hdrtop' style={{ background: "#efefef" }}>
                <div className='col-md-3'>
                    <h1 className='mb-4'>Invoice</h1>
                </div>
                <div className='col-md-9 text-right'>
                    <Button variant="primary">Home</Button>{' '}
                    <Link to={`/invoice`}> <Button variant='primary'>Invoice</Button></Link>
                </div>
            </div>
            <div className='container p-5'>
                <form onSubmit={handleSubmit}>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <label>Invoice Number:</label>
                                <input type="text" className='form-control' name="invoiceNumber" value={formData.invoiceNumber} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <label>Client ID:</label>
                                <input type="text" name="clientId" className='form-control' value={formData.clientId} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <label>Date:</label>
                                <input type="date" name="date" className='form-control' value={formData.date} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <label>Status:</label>
                                <select name="status" className='form-control' value={formData.status} onChange={handleInputChange}>
                                    <option value="Paid">Paid</option>
                                    <option value="Unpaid">Panding</option>
                                    <option value="Overdue">Late</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <label>Total Amount:</label>
                                <input type="number" name="totalAmount" className='form-control' value={formData.totalAmount} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <label>Payment Deadline:</label>
                                <input type="date" name="paymentDeadline" className='form-control' value={formData.paymentDeadline} onChange={handleInputChange} />
                            </div>
                        </div>

                        {formData.items.map((item, index) => (
                            <div key={index}>
                                <h5>Item{index + 1}</h5>
                                <div className='row'>
                                    <div className='col-md-4'>
                                        <div className='form-group'>
                                            <label>Description:</label>
                                            <input type="text" name="description" className='form-control' value={item.description} onChange={(event) => handleItemChange(event, index)} />
                                        </div>
                                    </div>
                                    <div className='col-md-4'>
                                        <div className='form-group'>
                                            <label>Quantity:</label>
                                            <input type="number" name="quantity" className='form-control' value={item.quantity} onChange={(event) => handleItemChange(event, index)} />
                                        </div>
                                    </div>
                                    <div className='col-md-4'>
                                        <div className='form-group'>
                                            <label>Amount:</label>
                                            <input type="number" name="amount" className='form-control' value={item.amount} onChange={(event) => handleItemChange(event, index)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button className='btn btn-primary mt-1 mb-2' onClick={handleAddItem}>+</button>
                        
                        <button type="button" class="btn btn-primary">Primary</button>

                    </div>
                </form>
            </div>
        </>
    );
}
export default AddInvoice