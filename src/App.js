import React from 'react'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Sidebar from './components/Sidebar'
import Dashboard from './Pages/Dashboard'
import Invoice from './Pages/Invoice'
import Clients from './Pages/Clients';
import Login from './Pages/Login';
import Sidebar from './components/Sidebar';
import SingleClient from './Pages/SingleClients';

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Sidebar>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route  path="/invoice" element={<Invoice/>}/>
        <Route path='/client' element={<Clients/>}/>
        <Route exact path="/client/:id" element={<SingleClient/>} />
        <Route path='/login' element={<Login/>}/>
      </Routes>
      </Sidebar>
    </BrowserRouter>
    </>
    )
}

export default App