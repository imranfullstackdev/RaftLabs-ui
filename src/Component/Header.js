import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";

const Header = () => {
  return (
    <>
    
      <div className="container rounded mt-2">
        <Navbar bg="light border-2 rounded  " expand="lg">
          <Container>
            <Navbar.Brand>
              <img
                src="https://lh5.googleusercontent.com/p/AF1QipOX5qp2YY__jjswFB4weZfzI1shITC-PS89k6mh=w160-h160-k-no"
                height={"69px"}
                alt="Raftlabs"
              />
              <h6>RaftLabs</h6>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <NavLink
                  to="/"
                  style={({ isActive }) => ({
                    textDecoration: isActive ? "none" : "none",
                    color: isActive ? "#fff" : "#545e6f",
                    background: isActive ? "#fc5101" : "#f0f0f0",
                    borderRadius: isActive ? "12px" : "12px",
                    padding: isActive ? "auto" : "auto",
                    height: isActive ? "48px" : "48px",
                    lineHeight: isActive ? "48px" : "48px",
                    textAlign: isActive ? "center" : "center",
                    width: isActive ? "100%" : "100%",
                  })}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/AddBooks"
                  style={({ isActive }) => ({
                    color: isActive ? "#fff" : "#545e6f",
                    background: isActive ? "#fc5101" : "#f0f0f0",
                    borderRadius: isActive ? "12px" : "12px",
                    padding: isActive ? "auto" : "auto",
                    marginLeft: isActive ? "20px" : "20px",
                    marginRight: isActive ? "20px" : "20px",
                    textDecoration: isActive ? "none" : "none",
                    height: isActive ? "48px" : "48px",
                    lineHeight: isActive ? "48px" : "48px",
                    textAlign: isActive ? "center" : "center",
                    width: isActive ? "100%" : "100%",
                  })}
                >
                  AddBooks
                </NavLink>

{/*  */}

<NavLink
                  to="/ViewBooks"
                  style={({ isActive }) => ({
                    color: isActive ? "#fff" : "#545e6f",
                    background: isActive ? "#fc5101" : "#f0f0f0",
                    borderRadius: isActive ? "12px" : "12px",
                    padding: isActive ? "auto" : "auto",
                    marginLeft: isActive ? "20px" : "20px",
                    marginRight: isActive ? "20px" : "20px",
                    textDecoration: isActive ? "none" : "none",
                    height: isActive ? "48px" : "48px",
                    lineHeight: isActive ? "48px" : "48px",
                    textAlign: isActive ? "center" : "center",
                    width: isActive ? "100%" : "100%",
                  })}
                >
                  AllBooks
                </NavLink>
{/*  */}


              
                <NavLink
                  to="/Logout"
                  style={({ isActive }) => ({
                    color: isActive ? "#fff" : "#545e6f",
                    background: isActive ? "#fc5101" : "#f0f0f0",
                    borderRadius: isActive ? "12px" : "20px",
                    padding: isActive ? "auto" : "auto",
                    marginLeft: isActive ? "20px" : "20px",
                    marginRight: isActive ? "20px" : "20px",
                  })}
                >
                  <div style={{ fontSize: "32px", color: "#545e6f" }}>
                    <BiPowerOff />
                  </div>
                </NavLink>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default Header;
