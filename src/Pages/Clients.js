import { useContext } from 'react';
import { ClientContext } from '../Context/ClientContext';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Loder from '../components/Loder';

function Client() {

    
  const clients = useContext(ClientContext);

  console.log(clients)
  if (!clients) {
    return <Loder/>
  }

  return (
    <>
      <div className='row pt-3 pl-5 pr-4 hdrtop' style={{ background: "#efefef" }}>
        <div className='col-md-3'>
          <h1 className='mb-4'>Clients</h1>
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
                        <input type="text" placeholder="Search"  />
                        <button type="submit">Search</button>
                    </div>
                    <div className="add-client">
                        <button>Add Client</button>
                    </div>
                </nav>

      {/* table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Clients</th>
            <th>Invoice</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client._id}>
              <>
                <td >
                  <div className='col-md-6'>
                    <Link to={`/client/${client._id}`}>
                      <h6>{client.name}</h6>
                    </Link>
                  </div>
                  <div className='col-md-6'>
                    <Link to={`/client/${client._id}`}>
                      <span>{client.email}</span>
                    </Link>
                  </div>
                </td>
                <td>{client.email}</td>
                <td>{ }</td>
                <td>{ }</td>
              </>

            </tr>
          ))}

        </tbody>
      </Table>
      <Footer />

    </>
  );
}

export default Client;
