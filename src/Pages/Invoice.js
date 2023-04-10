import React, { useContext, useEffect, useState } from 'react'
import { ClientContext, InvoiceContext } from '../Context/ClientContext'
import Table from 'react-bootstrap/Table';
import { AiTwotoneEdit, AiOutlineEye, AiTwotoneDelete } from 'react-icons/ai'
import Button from 'react-bootstrap/Button';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import Footer from '../components/Footer';


const Invoice = () => {
    const { id } = useParams();

    const [searchTerm, setSearchTerm] = useState("");




    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const invoices = useContext(InvoiceContext);

    const filteredInvoices = invoices.filter((invoice) => {
        const clientName = invoice.clientId.name.toLowerCase();
        const clientEmail = invoice.clientId.email.toLowerCase();
        const searchTermLower = searchTerm.toLowerCase();
        return (
            clientName.includes(searchTermLower) ||
            clientEmail.includes(searchTermLower) ||
            invoice.invoiceNumber.includes(searchTermLower)
        );
    });
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
                toast.success('Invoice deleted successfully',{
                    position: toast.POSITION.TOP_CENTER
                });
            }
            else {
                toast.error('Can not delete pending and late invoice ',{
                    position: toast.POSITION.TOP_CENTER
                });
            }
            
        } catch (error) {
            console.error(error);
            toast.error('Error deleting invoice',{
                position: toast.POSITION.TOP_CENTER
            });
        }
    };


    useEffect(() => {
    }, [handleDeleteInvoice]);

    const [pageNumber, setPageNumber] = useState(0);
    const invoicesPerPage = 10;
    const pagesVisited = pageNumber * invoicesPerPage;

    const pageCount = Math.ceil(filteredInvoices.length / invoicesPerPage);
    const displayedInvoices = filteredInvoices.slice(pagesVisited, pagesVisited + invoicesPerPage);

    const handlePageChange = ({ selected }) => {
        setPageNumber(selected);
    };

    // Format the date using Intl.DateTimeFormat()
    //   const dateFormat = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' });
    //   const invoiceDate = dateFormat.format(new Date(invoices.date));
    //   const paymentDeadline = dateFormat.format(new Date(invoices.paymentDeadline));


    return (
        <>

            <div className='row'>
                <div className='row pt-3 pl-5 pr-4 hdrtop' style={{ background: "#efefef" }}>
                    <div className='col-md-3'>
                        <h1 className='mb-4'>Invoice</h1>
                    </div>
                    <div className='col-md-9 text-right'>
                        <Link to={`/`}><Button variant="primary">Home</Button>{' '}</Link>
                        <Link to={`/client`}><Button variant='primary'>Client</Button></Link>
                    </div>
                </div>

                <nav className="navbar">
                    <div className="logo">
                        <a href="/">M.I.S</a>
                    </div>
                    <div className="search-bar">
                        <input type="text" placeholder="Search" value={searchTerm} onChange={handleSearch} />
                        <button type="submit">Search</button>
                    </div>
                    <div className="add-client">
                        <Link to={`/invoice/new`}><button>Add Invoice</button></Link>
                    </div>
                </nav>

                <div className='col-md-12'>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Invoice ID</th>
                                <th>Client</th>
                                <th>Created Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                displayedInvoices.map((invoice) => (
                                    <tr key={invoice._id}>
                                        <td>{invoice.invoiceNumber}</td>
                                        <td>
                                            <div className=''>
                                                <h6>{invoice.clientId.name}</h6>
                                            </div>
                                            <div className=''>
                                                <Link to={`/invoice/${invoice._id}`}>
                                                    <span>{invoice._id}</span>
                                                </Link>
                                            </div>
                                        </td>
                                        <td>{invoice.date}</td>
                                        <td style={{ color: invoice.status === "pending" ? "red" : "green" }}>{invoice.status}</td>
                                        <td>
                                            <Link to={`/invoice/editinvoice/${invoice._id}`} ><span >
                                                <AiTwotoneEdit
                                                className="icon"
                                                style={{
                                                    top: '2px',
                                                    right: '2px',
                                                    marginLeft: '15px'
                                                }}
                                                size="27px"
                                                color="blue"
                                            // onClick={handleExit}
                                            /></span></Link>
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
                                            <span>
                                                <AiTwotoneDelete
                                                    className="icon"
                                                    style={{
                                                        top: '2px',
                                                        right: '2px',
                                                        marginLeft: "15px",
                                                        color: "red",

                                                    }}
                                                    size="27px"
                                                    color="blue"

                                                    onClick={() => handleDeleteInvoice(invoice._id)}
                                                /></span>

                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </div>
            </div>

            <ReactPaginate
                previousLabel={"Previous"}
                pageCount={pageCount}
                onPageChange={handlePageChange}
                containerClassName={'pagination'}
                activeClassName={'active'}
            />

        </>
    )
}

export default Invoice