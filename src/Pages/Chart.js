import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useContext } from 'react';
import { ClientContext, InvoiceContext } from '../Context/ClientContext';
import ChartJS from "chart.js/auto";
import { CategoryScale } from "chart.js";
ChartJS.register(CategoryScale);

function Chart() {
    const { clients } = useContext(ClientContext);
    const invoices = useContext(InvoiceContext);
    console.log(invoices)

    // Data for client chart
    const clientData = {
        labels: ['Active', 'Inactive'],
        datasets: [
            {
                label: 'Clients',
                data: [
                    clients ? clients.filter((client) => client).length : 0,
                    clients ? clients.filter((client) => !client).length : 0,
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    // Data for invoice chart
    const invoiceData = {
        labels: ['Paid', 'Unpaid','late','TotalInvoice'],
        datasets: [
            {
                label: 'Invoices',
                data: [
                    invoices ? invoices.filter((invoice) => invoice.status === 'paid').length : 0,
                    invoices ? invoices.filter((invoice) => invoice.status === 'pending').length : 0,
                    invoices ? invoices.filter((invoice) => invoice.status === 'late').length : 0,
                    invoices ? invoices.filter((invoice) => invoice).length : 0,

                ],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className='container p-5'>
            <div className='row'>
                <div className='col-md-12'>
                    <h1>Client Chart</h1>
                    <Bar data={clientData} />
                </div>

                <div className='col-md-12'>
                    <h1>Invoice Chart</h1>
                    <Bar data={invoiceData} />
                </div>
            </div>
        </div>
    );
}

export default Chart;
