// ClientContext.js
import { createContext, useState, useEffect } from 'react';

export const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const totalClient = clients.length
  // console.log(totalClient)
  // console.log(clients)

  useEffect(() => {
    const fetchClients = async () => {
        try {
            const response = await fetch("https://invoicemanagementsystemapi-production.up.railway.app/api/v1/client")
            const data = await response.json()
            setClients(data.clients)
        } catch (error) {
            console.log(error)
        }
    }
    fetchClients()

}, [])

  return (
    <ClientContext.Provider value={{clients,setClients}}>
      {children}
    </ClientContext.Provider>
  );
}


// InvoiceContext.js
//import { createContext, useState, useEffect } from 'react';

export const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState([]);
  console.log(invoices)
  useEffect(() => {
    fetch('https://invoicemanagementsystemapi-production.up.railway.app/api/v1/invoice')
      .then(response => response.json())
      .then(data => setInvoices(data.invoices));
  }, []);

  return (
    <InvoiceContext.Provider value={invoices}>
      {children}
    </InvoiceContext.Provider>
  );
}
