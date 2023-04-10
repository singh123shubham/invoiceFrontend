import { useContext, useEffect, useState } from 'react';
import { ClientContext } from '../Context/ClientContext';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import { Button } from 'react-bootstrap';
import Loader from '../components/Loder';

function SingleInvoice() {
  const { invoices } = useContext(ClientContext);
  const { clients } = useContext(ClientContext);

  const { id } = useParams();
  const [invoice, setInvoice] = useState(invoices);
  // const clientid = invoice.clientId._id
  // console.log(clientid)


  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await fetch(`https://invoicemanagementsystemapi-production.up.railway.app/api/v1/invoice/${id}`);
        const data = await response.json();

        setInvoice(data.invoice);
      } catch (error) {
        console.log(error);
      }
    };
    fetchInvoice();
  }, [id]);

  if (!invoice) {
    return <Loader />;
  }

  // Format the date using Intl.DateTimeFormat()
  const dateFormat = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' });
  const invoiceDate = dateFormat.format(new Date(invoice.date));
  const paymentDeadline = dateFormat.format(new Date(invoice.paymentDeadline));

  const handlePrintInvoice = () => {
    window.print();
  };
  return (
    <>
      <div className='row pt-3 pl-5 pr-4 hdrtop' style={{ background: "#efefef" }}>
        <div className='col-md-3'>
          <h1 className='mb-4'>Invoice Details</h1>
        </div>
        <div className='col-md-9 text-right'>
          <Button variant='Primary' onClick={handlePrintInvoice}>Print</Button>
          <Button variant="primary">Home</Button>{' '}
          <Button variant='primary'>Invoice</Button>
        </div>
      </div>
      <div className='box-details'>
       <div className='print-only'>
       <div class="invoice-details">
          <h1>Invoice Details</h1>
          <div class="row">
            <div class="col-6">
              <p><strong>Invoice Number:</strong> {invoice.invoiceNumber}</p>
              <p><strong>Invoice Date:</strong> {invoiceDate}</p>
              <p><strong>Due Date:</strong>{paymentDeadline}</p>
            </div>
            <div class="col-6">
              <p><strong>Billed To:</strong></p>
              <p>{invoice.clientId.name}</p>
              <p>{invoice.clientId.address.street}</p>
              <p>{invoice.clientId.address.state},{invoice.clientId.address.country}</p>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {
                invoice.items && invoice.items.map((item) => (
                  <>
                    <tr key={item._id}>
                      <td>{item.description}</td>
                      <td>{item.quantity}</td>
                      <td>{item.amount}</td>
                      <td>{item.amount}</td>

                    </tr>
                  </>
                ))
              }
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3">Subtotal:</td>
                <td>{invoice.totalAmount}</td>
              </tr>
              <tr>
                <td colspan="3">Tax:</td>
                <td>$5.00</td>
              </tr>
              <tr>
                <td colspan="3">Total:</td>
                <td>$55.00</td>
              </tr>
            </tfoot>
          </table>
        </div>
       </div>
      </div>
      <Footer />
    </>
  );
}

export default SingleInvoice;
