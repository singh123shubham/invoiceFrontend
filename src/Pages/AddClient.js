
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { ClientContext } from '../Context/ClientContext';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AddClient = () => {


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: {
            street: '',
            city: '',
            state: '',
            zip: '',
            country: ''
        }
    });


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAddressChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            address: {
                ...formData.address,
                [name]: value
            }
        });
    };

    const { clients } = useContext(ClientContext);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.name || !formData.email || !formData.phone || !formData.address.street || !formData.address.city || !formData.address.state || !formData.address.zip || !formData.address.country) {
            toast.error('Please fill all the fields',{
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
            const response = await fetch('https://invoicemanagementsystemapi-production.up.railway.app/api/v1/client/new', requestOptions);
            const data = await response.json();

            const clientExists = clients.some((client) => client.email === formData.email);
            if (clientExists) {
                toast.error('Client with the same email already exists',{
                    position: toast.POSITION.TOP_CENTER
                });
            } else {
                toast.success('Client added successfully',{
                    position: toast.POSITION.TOP_CENTER
                });
            }
        } catch (error) {
            console.error(error);
            if (error.message.includes('Client validation failed')) {
                const errorMessage = error.message.split(': ')[1];
                toast.error(errorMessage); (error.message.includes('duplicate key error'))
                toast.error('Client with the same email already exists',{
                    position: toast.POSITION.TOP_CENTER
                });
            } else {
                toast.error(error.message,{
                    position: toast.POSITION.TOP_CENTER
                });
            }
        }
    };



    return (
        <>
            <div className='row pt-3 pl-5 pr-4 hdrtop' style={{ background: "#efefef" }}>
                <div className='col-md-3'>
                    <h1 className='mb-4'>Add Client</h1>
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
                                <label>
                                    Name:
                                </label>
                                <input type="text" className='form-control' name="name" value={formData.name} onChange={handleInputChange} />

                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <label>
                                    Email:
                                </label>
                                <input type="email" className='form-control' name="email" value={formData.email} onChange={handleInputChange} />

                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <label>
                                    Phone:
                                </label>
                                <input type="tel" className='form-control' name="phone" value={formData.phone} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <label>
                                    Street:
                                </label>
                                <input type="text" className='form-control' name="street" value={formData.address.street} onChange={handleAddressChange} />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <label>
                                    City:
                                </label>
                                <input type="text" className='form-control' name="city" value={formData.address.city} onChange={handleAddressChange} />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <label>
                                    State:
                                </label>
                                <input type="text" className='form-control' name="state" value={formData.address.state} onChange={handleAddressChange} />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <label>
                                    Zip:
                                </label>
                                <input type="text" className='form-control' name="zip" value={formData.address.zip} onChange={handleAddressChange} />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <label>
                                    Country:
                                </label>
                                <input type="text" className='form-control' name="country" value={formData.address.country} onChange={handleAddressChange} />

                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary float-md-right">Add Client</button>
                </form>
            </div>
        </>
    );
};

export default AddClient;

