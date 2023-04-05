import React, { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import {TiDeleteOutline } from 'react-icons/ti'
import {IoMdAddCircleOutline} from 'react-icons/io'
import { Link } from 'react-router-dom';
import { ClientContext, InvoiceContext } from '../Context/ClientContext';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditInvoice = ({ _id }) => {

  // const { invoices } = useContext(ClientContext);
  const { id } = useParams();
  const [invoice, setInvoice] = useState([]);
  
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
  

  const handleInputChange = (e) => {
    setInvoice({
      ...invoice, 
      [e.target.name]: e.target.value
    });
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
    const updatedItems = [...formData.items];
    updatedItems.splice(index, 1);
    setFormData({
      ...formData,
      items: updatedItems
    });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `https://invoicemanagementsystemapi-production.up.railway.app/api/v1/invoice/${_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(invoice),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update invoice");
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <div className='row pt-3 pl-5 pr-4 hdrtop' style={{ background: "#efefef" }}>
        <div className='col-md-3'>
          <h1 className='mb-4'>Invoice</h1>
        </div>
        <div className='col-md-9 text-right'>
          <Button variant="primary">Home</Button>
          <Link to={`/invoice`}> <Button variant='primary'>Invoice</Button></Link>
        </div>
      </div>

      <div class="container p-5">
        <h2>Update invoice</h2>
        <form onSubmit={handleSubmit}>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="nameInput">InvoiceNumber:</label>
                <input
                  type="text"
                  class="form-control"
                  id="nameInput"
                  name="name"
                  placeholder="Enter your name"
                  value={invoice.invoiceNumber}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="nameInput">Client name:</label>
                <input
                  type="text"
                  class="form-control"
                  id="nameInput"
                  name="name"
                  placeholder="Enter your name"
                  value={invoice.clientId ? invoice.clientId.name:''}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="nameInput">Street:</label>
                <input
                  type="text"
                  class="form-control"
                  id="nameInput"
                  name="name"
                  placeholder="Enter your name"
                  value={invoice.clientId && invoice.clientId.address ? invoice.clientId.address.street : ''}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="nameInput">City:</label>
                <input
                  type="text"
                  class="form-control"
                  id="nameInput"
                  name="name"
                  placeholder="Enter your name"
                  value={invoice.clientId && invoice.clientId.address ? invoice.clientId.address.city : ''}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="nameInput">State:</label>
                <input
                  type="text"
                  class="form-control"
                  id="nameInput"
                  name="name"
                  placeholder="Enter your name"
                  value={invoice.clientId && invoice.clientId.address ? invoice.clientId.address.state : ''}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="nameInput">Country:</label>
                <input
                  type="text"
                  class="form-control"
                  id="nameInput"
                  name="name"
                  placeholder="Enter your name"
                  value={invoice.clientId && invoice.clientId.address ? invoice.clientId.address.country : ''}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="nameInput">Zip Code:</label>
                <input
                  type="text"
                  class="form-control"
                  id="nameInput"
                  name="name"
                  placeholder="Enter your name"
                  value={invoice.clientId && invoice.clientId.address ? invoice.clientId.address.zip : ''}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {invoice && invoice.items && invoice.items.map((item, index) => (
              <div key={index}>
                <h5>Item{index + 1}</h5>
                <div className='row'>
                  <div className='col-md-3'>
                    <div className='form-group'>
                      <label>Description:</label>
                      <input type="text" name="description" className='form-control'
                      value={item.description}
                      // onChange={(event) => handleItemChange(event, index)} 
                      />
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='form-group'>
                      <label>Quantity:</label>
                      <input type="number" name="quantity" className='form-control'
                        value={item.quantity} 
                       //onChange={(event) => handleItemChange(event, index)} 
                      />
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='form-group'>
                      <label>Amount:</label>
                      <input type="number" name="amount" className='form-control'
                      value={item.amount}
                      // onChange={(event) => handleItemChange(event, index)} 
                      />
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='form-group'>
                      <TiDeleteOutline
                         style={{
                          top: '10px',
                          right: '0px',
                          marginLeft: "1px",
                      }}
                      size="27px"
                      color="red"
                      onClick={handleDeleteItem}/>
                    </div>
                  </div>
                </div>
                
              </div>
              
            ))}
            <div className='row'>
              <div className='col-md-12 '>
                <IoMdAddCircleOutline
                   style={{
                    top: '10px',
                    float:"right"
                    
                }}
                size="27px"
                color="green" 
                  onClick={handleAddItem}
                />
                
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="nameInput">TotalAmount:</label>
                <input
                  type="text"
                  class="form-control"
                  id="nameInput"
                  name="name"
                  placeholder="Enter your name"
                  value={invoice.totalAmount}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className='col-md-6'>
              <div className='form-group'>
                <label>Status:</label>
                <select name="status" className='form-control' value={invoice.status} onChange={handleInputChange}>
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Panding</option>
                  <option value="Overdue">Late</option>
                </select>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for="nameInput">PaymentDeadLine:</label>
                <input
                  type="text"
                  class="form-control"
                  id="nameInput"
                  name="name"
                  placeholder="Enter your name"
                  value={invoice.paymentDeadline}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-primary float-md-right">Update..</button>
        </form>
      </div>
    </>
  );
};

export default EditInvoice;


// import { useContext, useEffect, useState } from 'react';
// import { ClientContext } from '../Context/ClientContext';
// import { useParams } from 'react-router-dom';
// import Footer from '../components/Footer';
// import { Button } from 'react-bootstrap';
// import Loader from '../components/Loder';

// function EditInvoice() {
//   const { invoices } = useContext(ClientContext);
//   const { id } = useParams();
//   const [invoice, setInvoice] = useState(invoices);
  



//   // console.log(invoice.invoiceNumber)
//   useEffect(() => {
//     const fetchInvoice = async () => {
//       try {
//         const response = await fetch(`https://invoicemanagementsystemapi-production.up.railway.app/api/v1/invoice/${id}`);
//         const data = await response.json();

//         setInvoice(data.invoice);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchInvoice();
//   }, [id]);

//   if (!invoice) {
//     return <Loader />;
//   }

//   // Format the date using Intl.DateTimeFormat()
//   const dateFormat = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' });
//   const invoiceDate = dateFormat.format(new Date(invoice.date));
//   const paymentDeadline = dateFormat.format(new Date(invoice.paymentDeadline));

  
// const InputChangeHandler = (e)=>{
//     setInvoice({
//       ...invoice,
//       [e.target.name] : e.target.value
//     })
// }



//   return (
//     <>
//     <input onChange={InputChangeHandler} value={invoice.status} type='text' name='status'/>

//     <input onChange={InputChangeHandler} value={invoice.invoiceNumber} type='text' name='invoiceNumber'/>
//       {invoice.invoiceNumber}
//       <Footer />
//     </>
//   );
// }

// export default EditInvoice;


// how can displaay api value in input form and onchange value should be edit?