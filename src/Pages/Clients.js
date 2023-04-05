import { useContext, useEffect } from 'react';
import { ClientContext } from '../Context/ClientContext';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Loder from '../components/Loder';
import { AiTwotoneDelete } from 'react-icons/ai';

function Client() {
  const { clients, setClients } = useContext(ClientContext);

  
  if (!clients) {
    return <Loder />
  }

  return (
    <>
      <div className='row pt-3 pl-5 pr-4 hdrtop' style={{ background: "#efefef" }}>
        <div className='col-md-3'>
          <h1 className='mb-4'>Clients</h1>
        </div>
        <div className='col-md-9 text-right'>
          <Link to={`/`}><Button variant="primary">Home</Button>{' '}</Link>
          <Link to={`/invoice`}><Button variant="primary">Invoice</Button>{' '}</Link>
        </div>
      </div>

      <nav className="navbar">
        <div className="logo">
          <a href="/">M.I.S</a>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <button type="submit">Search</button>
        </div>
        <div className="add-client">
          <Link to={`/client/new`}><Button>Add Client</Button></Link>
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
                <td>
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
                      //onClick={() => handleDeleteClient(client._id)}

                    // onClick={handleExit}                                                         
                    /></span>

                </td>
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
