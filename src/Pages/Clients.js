import { useContext, useEffect, useState } from 'react';
import { ClientContext, InvoiceContext } from '../Context/ClientContext';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Link, useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Loder from '../components/Loder';
import { AiOutlineEye, AiTwotoneDelete, AiTwotoneEdit } from 'react-icons/ai';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';

function Client() {
  const { id } = useParams();

  const { clients } = useContext(ClientContext);
    const  invoices  = useContext(InvoiceContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [pageNumber, setPageNumber] = useState(0)


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };



  // Filter clients based on search term
  const filteredClients = clients.filter((client) => {
    const clientName = client.name.toLowerCase();
    const clientEmail = client.email.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();
    return (
      clientName.includes(searchTermLower) ||
      clientEmail.includes(searchTermLower)
    );
  });

  const clientPerPage = 10;
  const pagesVisited = pageNumber * clientPerPage

  const pageCount = Math.ceil(filteredClients.length / clientPerPage)
  const displayedClients = filteredClients.slice(pagesVisited, pagesVisited + clientPerPage);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  
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
          <input type="text" placeholder="Search" value={searchTerm} onChange={handleSearch} />
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
          {displayedClients.map((client) => (
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
                  <Link to={`/client/editclient/${client._id}`}>
                  <span>
                    <AiTwotoneEdit
                      className="icon"
                      style={{
                        top: '2px',
                        right: '2px', 
                        marginLeft: "15px",
                        color: "blue",

                      }}
                      size="27px"
                      color="blue"
                    //onClick={() => handleDeleteClient(client._id)}

                    // onClick={handleExit}                                                         
                    /></span>
                  </Link>

                  <Link to={`/client/clientinvoice/${client._id}`}>
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
                  </Link>
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
      <ReactPaginate
        previousLabel={"Previous"}
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />

    </>
  );
}

export default Client;
