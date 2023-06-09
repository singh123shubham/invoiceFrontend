import Button from 'react-bootstrap/Button';
import React, { useContext } from 'react'
import './Dashboard.css'
import { ClientContext, InvoiceContext } from '../Context/ClientContext';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import { HiUserGroup } from 'react-icons/hi'
// import Footer from '../components/Footer';
import Loder from '../components/Loder';
import { Link } from 'react-router-dom';
import Chart from './Chart';


const Dashboard = () => {

    const { clients } = useContext(ClientContext);
    const invoices = useContext(InvoiceContext)
    if (!clients && !invoices) {
        return <Loder />
    }
    const totalInvoice = invoices.length
    const totalClient = clients.length
    const totalPending = invoices.filter((invoice) => invoice.status === 'pending').length;
    const totalPaid = invoices.filter((invoice) => invoice.status === 'paid').length;
    const totalLate = invoices.filter((invoice) => invoice.status === 'late').length;



    console.log(invoices)
    return (
        <>
            <div className='row pt-3 pl-5 pr-4 hdrtop' style={{ background: "#efefef" }}>
                <div className='col-md-3'>
                    <h1 className='mb-4'>Dashboard</h1>
                </div>
                <div className='col-md-9 text-right'>
                    <Link to={`/client`}> <Button variant="primary">Client</Button>{' '}</Link>
                    <Link to={`/invoice/`}><Button variant='primary'>Invoice</Button></Link>
                </div>
            </div>

            <div className='row pl-5 pr-4 mt-3 g-4'>
                <div className='col-md-4  box'>
                    <div className='card text-center'>
                        <div className="client-icons">
                            <HiUserGroup />
                        </div>
                        <div className="client-info">
                            <h2>Total Clients</h2>
                            <p className="client-count">{totalClient}</p>
                            <p className="client-other-info">Other Information Here</p>
                        </div>
                    </div>
                </div>


                <div className='col-md-4'>
                    <div className='card text-center'>
                        <div className="client-icons">
                            <FaFileInvoiceDollar />
                        </div>
                        <div className="client-info">
                            <h2>Total Invoice</h2>
                            <p className="client-count">{totalInvoice}</p>
                            <p className="client-other-info">Other Information Here</p>
                        </div>
                    </div>
                </div>

                <div className='col-md-4'>
                    <div className='card text-center'>
                        <div className="client-icons">
                            <FaFileInvoiceDollar />
                        </div>
                        <div className="client-info">
                            <h2>Total panding</h2>
                            <p className="client-count">{totalPending}</p>
                            <p className="client-other-info">Other Information Here</p>
                        </div>
                    </div>
                </div>

                <div className='col-md-4'>
                    <div className='card text-center'>
                        <div className="client-icons">
                            <FaFileInvoiceDollar />
                        </div>
                        <div className="client-info">
                            <h2>Total Paid</h2>
                            <p className="client-count">{totalPaid}</p>
                            <p className="client-other-info">Other Information Here</p>
                        </div>
                    </div>
                </div>

                <div className='col-md-4'>
                    <div className='card text-center'>
                        <div className="client-icons">
                            <FaFileInvoiceDollar />
                        </div>
                        <div className="client-info">
                            <h2>Total Late</h2>
                            <p className="client-count">{totalLate}</p>
                            <p className="client-other-info">Other Information Here</p>
                        </div>
                    </div>
                </div>

            </div>

            <Chart/>





        </>
    )
}

export default Dashboard