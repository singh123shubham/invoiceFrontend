import React, { useState } from 'react';
import {
    FaFileInvoiceDollar,
    FaBars,
    FaUserAlt,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { BiLogInCircle } from "react-icons/bi"
import { NavLink } from 'react-router-dom';


const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const menuItem = [
        {
            path: "/",
            name: "Dashboard",
            icon: <MdDashboard />
        },
        {
            path: "/invoice",
            name: "Invoice",
            icon: <FaFileInvoiceDollar />
        },
        {
            path: "/client",
            name: "Client",
            icon: <FaUserAlt />
        },
        {
            path: "/login",
            name: "Login",
            icon: <BiLogInCircle />
        },

    ]
    return (
        <>
            <div className='container-fluid p-0'>
                <div style={{ width: isOpen ? "260px" : "80px" }} className="sidebar">
                    <div style={{position: "fixed"}}>
                    <div className="top_section">
                        <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">I.M.S</h1>
                        <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
                            <FaBars onClick={toggle} />
                        </div>
                    </div>
                    {
                        menuItem.map((item, index) => (
                            <NavLink to={item.path} key={index} className="link" activeclassName="active">
                                <div className="icon">{item.icon}</div>
                                <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                            </NavLink>
                        ))
                    }
                    </div>

                </div>

                <main>{children}</main>
            </div>
        </>

    );
};

export default Sidebar;