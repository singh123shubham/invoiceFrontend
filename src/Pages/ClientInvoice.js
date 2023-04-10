import React, { useContext, useEffect, useState } from 'react'
import { ClientContext } from '../Context/ClientContext'
import Table from 'react-bootstrap/Table';
import { Link, useParams } from 'react-router-dom'
import Loder from '../components/Loder'
import { Button } from 'react-bootstrap';
import { AiOutlineEye, AiTwotoneDelete, AiTwotoneEdit } from 'react-icons/ai';
import { toast } from 'react-toastify';

const ClientInvoice = () => {
    const { id } = useParams()

    const [clientInvoices, setClientInvoices] = useState([])
    const [clientName, setClientName] = useState('');
    
    const [no ,setNo] = useState('')

    const handleDeleteInvoice = async (id) => {
        try {
            if (!id) {
                throw new Error('Invalid invoice ID');
            }
    
            const requestOptions = {
                method: 'DELETE',
            };
    
            const response = await fetch(
                `https://invoicemanagementsystemapi-production.up.railway.app/api/v1/invoice/${id}`,
                requestOptions
            );
            const data = await response.json();
            console.log(data)
            if(data.success === true){
                // toast.error("panding")
                toast.success('Invoice deleted successfully');
            }
            else {
                toast.error('sorry ');
            }
            
        } catch (error) {
            console.error(error);
            toast.error('Error deleting invoice');
        }
    };

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await fetch(`https://invoicemanagementsystemapi-production.up.railway.app/api/v1/invoice/allinvoice/${id}`);
                const data = await response.json();

                setClientInvoices(data.invoices);
                setClientName(data.invoices[0]?.clientId.name);
                setNo(data.invoices.allInvoice)

            } catch (error) {
                console.log(error);
            }
        };
        fetchInvoices();
    }, [id]);

    if (!clientInvoices) {
        return <Loder />;
    }

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

            <nav className="navbar">
                <div className="logo">
                    <a href="/">M.I.S</a>
                </div>
                <div className="search-bar">
                    <input type="text" placeholder="Search" />
                    <button type="submit">Search</button>
                </div>
                <div className="add-client">
                    <Link to={`/invoice/new`}><button>Add Invoice</button></Link>
                </div>
            </nav>

            <div className='conatiner p-5'>
                <h1>{clientName} </h1>
                <div className='col-md-12'>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Invoice Number</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Total Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientInvoices.map((invoice) => (
                                <tr key={invoice._id}>
                                    <td>{invoice.invoiceNumber}</td>
                                    <td>{invoice.date}</td>
                                    <td style={{ color: invoice.status === "pending" ? "red" : "green" }}>{invoice.status}</td>

                                    <td>{invoice.totalAmount}</td>
                                    <td>

                                    <Link to={`/invoice/editinvoice/${invoice._id}`}>
                                            <span>
                                                <AiTwotoneEdit
                                                    className="icon"
                                                    style={{
                                                        top: '2px',
                                                        right: '2px',
                                                        marginLeft: "15px"
                                                    }}
                                                    size="27px"
                                                    color="blue"

                                                // onClick={handleExit}                                                         
                                                /></span>
                                        </Link>

                                        <Link to={`/invoice/${invoice._id}`}>
                                            <span>
                                                <AiOutlineEye
                                                    className="icon"
                                                    style={{
                                                        top: '2px',
                                                        right: '2px',
                                                        marginLeft: "15px"
                                                    }}
                                                    size="27px"
                                                    color="blue"

                                                // onClick={handleExit}                                                         
                                                /></span>
                                        </Link>

                                        <Link >
                                            <span>
                                                <AiTwotoneDelete
                                                    className="icon"
                                                    style={{
                                                        top: '2px',
                                                        right: '2px',
                                                        marginLeft: "15px"
                                                    }}
                                                    size="27px"
                                                    color="red"

                                                 onClick={() => handleDeleteInvoice(invoice._id)}                                                         
                                                /></span>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    )
}

export default ClientInvoice;
