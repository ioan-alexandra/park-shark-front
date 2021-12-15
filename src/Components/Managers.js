import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import ManagersService from '../Service/ManagersService';
import Header from './Header';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class Managers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            managers: []
        }
    }
    componentDidMount() {
        this.setState({});
        ManagersService.getAllManagers().then((response) => {
            this.setState({ managers: response.data })
            console.log(response.data);
        });

    }

    render() {
        return (
            <div>
                <Header />
                <div className="containerAccordion">
                    <Container>
                        <Row>
                            <Col>
                                <Accordion>
                                    {this.state.managers.map(manager => {
                                        if (manager.prefix != 'null')
                                            return <Accordion.Item eventKey={manager.id}>
                                                <Accordion.Header>{manager.first_name} {manager.prefix} {manager.last_name}</Accordion.Header>
                                                <Accordion.Body>
                                                    {manager.email}
                                                </Accordion.Body>
                                            </Accordion.Item>

                                        return <Accordion.Item eventKey={manager.id}>
                                            <Accordion.Header>{manager.first_name} {manager.last_name}</Accordion.Header>
                                            <Accordion.Body>
                                                {manager.email}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    })}
                                </Accordion>
                            </Col>
                            <Col>
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Upload CSV file of managers</Form.Label>
                                    <Form.Control type="file" accept='.csv' id='csvFile'
                                       
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </Container>

                </div>
            </div>
        );
    }
}
export default Managers;