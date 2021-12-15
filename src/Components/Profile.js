import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Header from './Header';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        return (
            <div>
                <Header />
                <div className="content">
                </div>
            </div>

        );
    }
}
export default Profile;