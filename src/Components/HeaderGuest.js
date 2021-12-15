import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image'
import logo from '../logo-sioux.png';

function HeaderGuest() {
  return (
    <div>
      <Nav
        activeKey="/home"
      >
        <Image src={logo} rounded />
        <Nav.Item>
          <Nav.Link as={Link} to="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
        </Nav.Item>
      </Nav>
      <div className="subBanner">
      </div>
    </div>
  );
}

export default HeaderGuest;