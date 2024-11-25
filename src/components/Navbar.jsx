import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between">
      <Link to="/analytics">Analytics</Link>
      <Link to="/data-entry">Data Entry</Link>
    </nav>
  );
};

export default Navbar;
