import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image'
import logo from '../logo-sioux.png';

function Header() {
  return (
    <div>
      <Nav
        activeKey="/home"
      >
        <Image src={logo} rounded />

        <Nav.Item>
          <Nav.Link as={Link} to="/appointments">Appointments</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/managers">Managers</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/">Log Out</Nav.Link>
        </Nav.Item>
      </Nav>
      <div className="subBanner">
      </div>
    </div>
  );
}

export default Header;