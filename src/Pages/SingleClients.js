import { useContext, useEffect, useState } from 'react';
import { ClientContext } from '../Context/ClientContext';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import { Button } from 'react-bootstrap';
import Loader from '../components/Loder';


function SingleClient() {
  const { clients } = useContext(ClientContext);
  const { id } = useParams();
  const [client, setClient] = useState(clients[0]);
  // Set an initial value for client to avoid null error when rendering
  console.log(client)
  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await fetch(`https://invoicemanagementsystemapi-production.up.railway.app/api/v1/client/${id}`);
        const data = await response.json();
        setClient(data.client);
      } catch (error) {
        console.log(error);
      }
    };
    fetchClient();
  }, [id]);

  if (!client) {
    return <Loader />;
  }

  return (
<>
<div className='row pt-3 pl-5 pr-4 hdrtop' style={{ background: "#efefef" }}>
        <div className='col-md-3'>
          <h1 className='mb-4'>Client Details</h1>
        </div>
        <div className='col-md-9 text-right'>
          <Button variant='Primary'>Print</Button>
          <Button variant="primary">Home</Button>{' '}
          <Button variant='primary'>Invoice</Button>
        </div>
      </div>

      <div className='box-details'>
       <div className='print-only'>
       <div class="invoice-details">
          <h1>{client.name}</h1>
          <div class="row">
            <div class="col-6">
              <p><strong>Invoice Number:</strong> {}</p>
              <p><strong>Email:</strong> {client.email}</p>
              <p><strong>Phone No:</strong>{client.phone}</p>
            </div>
            <div class="col-6">
              <p><strong>Address:</strong></p>
              <p>{client.address.city}</p>
              <p>{client.address.state}</p>
              <p>{client.address.zip}</p>
              <p>{client.address.country}</p>
            </div>
          </div>
        
        </div>
       </div>
      </div>
 
    <Footer />
  </>
  );
}

export default SingleClient;
