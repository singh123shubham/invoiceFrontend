import React, { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { TiDeleteOutline } from 'react-icons/ti'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { Link } from 'react-router-dom';
import { ClientContext, InvoiceContext } from '../Context/ClientContext';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
    invoiceNumber: "-",
    clientId: {
      address: {
        street: "",
        city: "",
        state: " ",
        zip: "",
        country: ""
      },
      name: "",
      email: "",
      phone: "",

    },
    // date: "2023-03-15T00:00:00.000Z",
    items: [
      {
        description: "",
        quantity: '',
        amount: '',
      }
    ],
    status: "",
    paymentDeadline: '',
    totalAmount: '',

  });


  const handleInputChange = (e) => {
    setInvoice({
      ...invoice,
      [e.target.name]: e.target.value
    });
  };

  const handleClientInputChange = (event) => {
    const { name, value } = event.target;
    setInvoice({
      ...invoice,
      clientId: {
        ...invoice.clientId,
        [name]: value
      }
    });
  };

  const handleClientAddressChange = (event) => {
    const { name, value } = event.target;
    setInvoice({
      ...invoice,
      clientId: {
        ...invoice.clientId,
        address: {
          ...invoice.clientId.address,
          [name]: value
        }
      }
    });
  };

  const handleItemInputChange = (event, index) => {
    const { name, value } = event.target;
    const items = [...invoice.items];
    items[index] = {
      ...items[index],
      [name]: value
    };
    setInvoice({
      ...invoice,
      items
    });
  };

  const handleAddItem = () => {
    setInvoice(prevInvoice => ({
      ...prevInvoice,
      items: [
        ...prevInvoice.items,
        {
          description: '',
          quantity: '',
          amount: ''
        }
      ]
    }));
    toast.success('Item added successfully!', {
      position: toast.POSITION.TOP_CENTER
    });

  };

  const handleDeleteItem = (index) => {
    const newItems = [...invoice.items];
    newItems.splice(index, 1);
    setInvoice({
      ...invoice,
      items: newItems
    });
    toast('Item delete successfully!', {
      position: toast.POSITION.TOP_CENTER
    });

  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormData(invoice);
    try {
      const response = await fetch(
        `https://invoicemanagementsystemapi-production.up.railway.app/api/v1/invoice/${id}`,
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
      toast.success("Invoice updated successfully!",{
        position: toast.POSITION.TOP_CENTER
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to update invoice",{
        position: toast.POSITION.TOP_CENTER
      });
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
        {/* <h2>Update invoice</h2> */}
        <form onSubmit={handleSubmit}>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="nameInput">InvoiceNumber:</label>
                <input
                  type="text"
                  class="form-control"
                  id="nameInput"
                  name="invoiceNumber"
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
                  value={invoice.clientId ? invoice.clientId.name : ''}
                  onChange={handleClientInputChange}
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
                  name="street"
                  placeholder="Enter your name"
                  value={invoice.clientId && invoice.clientId.address ? invoice.clientId.address.street : ''}
                  onChange={handleClientAddressChange}
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
                  name="city"
                  placeholder="Enter your name"
                  value={invoice.clientId && invoice.clientId.address ? invoice.clientId.address.city : ''}
                  onChange={handleClientAddressChange}
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
                  name="state"
                  placeholder="Enter your name"
                  value={invoice.clientId && invoice.clientId.address ? invoice.clientId.address.state : ''}
                  onChange={handleClientAddressChange}
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
                  name="country"
                  placeholder="Enter your name"
                  value={invoice.clientId && invoice.clientId.address ? invoice.clientId.address.country : ''}
                  onChange={handleClientAddressChange}
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
                  name="zip"
                  placeholder="Enter your name"
                  value={invoice.clientId && invoice.clientId.address ? invoice.clientId.address.zip : ''}
                  onChange={handleClientAddressChange}
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
                        onChange={(event) => handleItemInputChange(event, index)}
                      />
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='form-group'>
                      <label>Quantity:</label>
                      <input type="number" name="quantity" className='form-control'
                        value={item.quantity}
                        onChange={(event) => handleItemInputChange(event, index)}
                      />
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='form-group'>
                      <label>Amount:</label>
                      <input type="number" name="amount" className='form-control'
                        value={item.amount}
                        onChange={(event) => handleItemInputChange(event, index)}
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
                        onClick={(index) => handleDeleteItem(index)} />
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
                    float: "right"

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
                  name="totalAmount"
                  placeholder="Enter your name"
                  value={invoice.totalAmount}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className='col-md-6'>
              <div className='form-group'>
                <label>Status:</label>
                <input type='tex' name="status" className='form-control' value={invoice.status} onChange={handleInputChange}

                />
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for="nameInput">PaymentDeadLine:</label>
                <input
                  type="text"
                  class="form-control"
                  id="nameInput"
                  name="paymentDeadline"
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
