import { useContext } from 'react';
import { ClientContext } from '../Context/ClientContext';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import { Button } from 'bootstrap';
import Loder from '../components/Loder';


function SingleClient({client}) {
 
    console.log(client.name)

  if (!client) {
    return <Loder/>

  }
  return (
    <>
    <h1>{client.name}</h1>
      {/* <div className='row pt-3 pl-5 pr-4 hdrtop' style={{ background: "#efefef" }}>
        <div className='col-md-3'>
          <h1 className='mb-4'>{client.name}</h1>
        </div>
        <div className='col-md-9 text-right'>
          <Button variant="primary">Home</Button>{' '}
          <Button variant='primary'>Invoice</Button>
        </div>
      </div>

      <div className='row'>
        <div className='col-md-6'>
          <h4>Contact Information</h4>
          <p>{client.name}</p>
          <p>{client.email}</p>
          <p>{client.phone}</p>
          <p>{client.address}</p>
        </div>
        <div className='col-md-6'>
          <h4>Additional Information</h4>
          <p>{client.company}</p>
          <p>{client.notes}</p>
        </div>
      </div> */}

      <Footer />
    </>
  );
}

export default SingleClient;
