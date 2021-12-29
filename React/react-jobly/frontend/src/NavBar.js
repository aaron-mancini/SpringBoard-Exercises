import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";

const NavBar = ({ currUser, logout, loggedIn }) => {
    if(loggedIn) {
        return (
            <div>
                <Navbar expand="md">
                    <NavLink to="/" className="navbar-brand">Jobly</NavLink>
    
                    <Nav className="ml-auto" navbar>                  
                        <NavItem>
                            <NavLink to="/companies">Companies</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/jobs">Jobs</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/profile">Profile</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/" onClick={logout}>Log out {currUser.username}</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        );
    }
    return (
        <div>
            <Navbar expand="md">
                <NavLink to="/" className="navbar-brand">Jobly</NavLink>

                <Nav className="ml-auto" navbar>                  

                    <NavItem>
                        <NavLink to="/login">Log In</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/signup">Sign up</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    );
}

export default NavBar;