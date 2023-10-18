import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/icecreamlogo.png";

function Navigation()
{
    return (
        <header>
            <Link to="/" className="logo">
                <img src={logo} alt="IceCreamFactory" />
            </Link>

            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/employees">Employees</NavLink>
                <NavLink to="/createEmployee">Add New</NavLink>

            </nav>
        </header>
    );
}

export default Navigation;