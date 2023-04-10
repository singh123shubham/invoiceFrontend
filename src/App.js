import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Invoice from './Pages/Invoice';
import Clients from './Pages/Clients';
import Login from './Pages/Login';
import Sidebar from './components/Sidebar';
import SingleClient from './Pages/SingleClients';
import SingleInvoice from './Pages/SingleInvoice';
import EditInvoice from './Pages/EditInvoice';
import AddInvoice from './Pages/AddInvoice';
import Loder from './components/Loder';
import Footer from './components/Footer';
import AddClient from './Pages/AddClient';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClientInvoice from './Pages/ClientInvoice';
import EditClient from './Pages/EditClient';

const App = () => {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay of 2 seconds to simulate component loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <div><Loder /></div>
      ) : (
        <BrowserRouter>
          <Sidebar>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/invoice" element={<Invoice />} />
              <Route exact path="/invoice/:id" element={<SingleInvoice />} />
              <Route
                exact
                path="/invoice/editinvoice/:id"
                element={<EditInvoice />}
              />
               <Route
                exact
                path="/client/editclient/:id"
                element={<EditClient/>}
              />
              <Route exact path="/invoice/new/" element={<AddInvoice />} />
              <Route path="/client" element={<Clients />} />
              <Route exact path="/client/new/" element={<AddClient />} />
              <Route exact path="/client/:id" element={<SingleClient />} />
              <Route exact path="/client/clientinvoice/:id" element={<ClientInvoice/>} />

              <Route path="/login" element={<Login />} />
            </Routes>
          </Sidebar>
          <ToastContainer />
          {/* <Footer /> */}
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
