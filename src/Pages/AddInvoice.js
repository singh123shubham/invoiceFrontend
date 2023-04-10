
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { TiDeleteOutline } from 'react-icons/ti';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function AddInvoice({ id }) {
    const { _id } = useParams()
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

    const handleDeleteItem = (index) => {
        const newItems = [...formData.items];
        newItems.splice(index, 1);
        setInvoice({
            ...formData,
            items: newItems
        });
        toast('Item delete successfully!', {
            position: toast.POSITION.TOP_CENTER
        });

    };

    const [invoice, setInvoice] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`https://invoicemanagementsystemapi-production.up.railway.app/api/v1/invoice/${_id}`)
            const resJson = await res.json()
            setInvoice(resJson.invoice)
        }
        fetchData()
    }, [_id])

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check if any field is blank
        const isFormIncomplete = Object.values(formData).some(value => value === '');

        if (isFormIncomplete) {
            toast.error('Please fill in all fields',{
                position: toast.POSITION.TOP_CENTER
            });
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        };

        try {
            const response = await fetch('https://invoicemanagementsystemapi-production.up.railway.app/api/v1/invoice/new', requestOptions);
            const data = await response.json();
            console.log(data);
            toast.success('Invoice created successfully',{
                position: toast.POSITION.TOP_CENTER
            });
        } catch (error) {
            console.error(error);
            toast.error('Error creating invoice',{
                position: toast.POSITION.TOP_CENTER
            });
        }
    };








    return (
        <>
            <div className='row pt-3 pl-5 pr-4 hdrtop' style={{ background: "#efefef" }}>
                <div className='col-md-3'>
                    <h1 className='mb-4'> Add Invoice</h1>
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
                                    <div className='col-md-3'>
                                        <div className='form-group'>
                                            <label>Description:</label>
                                            <input type="text" name="description" className='form-control' value={item.description} onChange={(event) => handleItemChange(event, index)} />
                                        </div>
                                    </div>
                                    <div className='col-md-3'>
                                        <div className='form-group'>
                                            <label>Quantity:</label>
                                            <input type="number" name="quantity" className='form-control' value={item.quantity} onChange={(event) => handleItemChange(event, index)} />
                                        </div>
                                    </div>
                                    <div className='col-md-3'>
                                        <div className='form-group'>
                                            <label>Amount:</label>
                                            <input type="number" name="amount" className='form-control' value={item.amount} onChange={(event) => handleItemChange(event, index)} />
                                        </div>
                                    </div>
                                    <div className='col-md-3'>
                                        <IoMdAddCircleOutline
                                            style={{
                                                top: '10px',
                                                float: "right"

                                            }}
                                            size="27px"
                                            color="green"
                                            onClick={handleAddItem}

                                        />
                                        <TiDeleteOutline
                                            style={{
                                                top: '10px',
                                                right: '0px',
                                                marginLeft: "1px",
                                            }}
                                            size="27px"
                                            color="red"
                                            onClick={(index) => handleDeleteItem(index)}
                                        />
                                    </div>

                                </div>
                            </div>
                        ))}



                    </div>
                    <button type="submit" class="btn btn-primary float-md-right">AddInvoice</button>

                </form>
            </div>
        </>
    );
}
export default AddInvoice