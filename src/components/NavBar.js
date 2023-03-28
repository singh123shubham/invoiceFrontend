import { useState } from "react";
import React from "react";

function Navbar() {
    const [searchTerm, setSearchTerm] = useState("");

const handleSearch = (event) => {
setSearchTerm(event.target.value);
}
  return (
    <nav className="navbar">
      <div className="logo">
        <a href="/">M.I.S</a>
      </div>
      <div className="search-bar">
      <input type="text" placeholder="Search" value={searchTerm} onChange={handleSearch} />
        <button type="submit">Search</button>
      </div>
      <div className="add-client">
        <button>Add Client</button>
      </div>
    </nav>
  );
}

export default Navbar;
