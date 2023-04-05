import React, { useContext, useState } from 'react'
import { InvoiceContext } from '../Context/ClientContext'
import Table from 'react-bootstrap/Table';
import { AiTwotoneEdit, AiOutlineEye } from 'react-icons/ai'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const Invoice = () => {

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

    console.log(invoices._id)

    
    return (
        <>

            <div className='row'>
                <div className='row pt-3 pl-5 pr-4 hdrtop' style={{ background: "#efefef" }}>
                    <div className='col-md-3'>
                        <h1 className='mb-4'>Invoice</h1>
                    </div>
                    <div className='col-md-9 text-right'>
                        <Button variant="primary">Home</Button>{' '}
                        <Button variant='primary'>Invoice</Button>
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
                        <Button>Add Invoice</Button>
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
                                filteredInvoices.map((invoice) => (
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
                                        <td>{invoice.status}</td>
                                        <td>
                                            <Link to ={`/invoice/editinvoice/${invoice._id}`} data-toggle="modal" data-target="#exampleModal"><span ><AiTwotoneEdit
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
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </div>
            </div>


            {/* <!-- Modal --> */}
            <div class="modal modal-xl fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form class="row g-3 needs-validation" novalidate>
                                <div class="col-md-6">
                                    <label for="validationCustom01" class="form-label">First name</label>
                                    <input type="text" class="form-control" id="validationCustom01" value="Mark" required />
                                    <div class="valid-feedback">
                                        Looks good!
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label for="validationCustom02" class="form-label">Last name</label>
                                    <input type="text" class="form-control" id="validationCustom02" value="Otto" required />
                                    <div class="valid-feedback">
                                        Looks good!
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label for="validationCustomUsername" class="form-label">Username</label>
                                    <div class="input-group has-validation">
                                        <span class="input-group-text" id="inputGroupPrepend">@</span>
                                        <input type="text" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required />
                                        <div class="invalid-feedback">
                                            Please choose a username.
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label for="validationCustom03" class="form-label">City</label>
                                    <input type="text" class="form-control" id="validationCustom03" required />
                                    <div class="invalid-feedback">
                                        Please provide a valid city.
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label for="validationCustom04" class="form-label">State</label>
                                    <select class="form-select" id="validationCustom04" required>
                                        <option selected disabled value="">Choose...</option>
                                        <option>...</option>
                                    </select>
                                    <div class="invalid-feedback">
                                        Please select a valid state.
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <label for="validationCustom05" class="form-label">Zip</label>
                                    <input type="text" class="form-control" id="validationCustom05" required />
                                    <div class="invalid-feedback">
                                        Please provide a valid zip.
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                                        <label class="form-check-label" for="invalidCheck">
                                            Agree to terms and conditions
                                        </label>
                                        <div class="invalid-feedback">
                                            You must agree before submitting.
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <button class="btn btn-primary w-100" type="submit">Submit form</button>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Invoice