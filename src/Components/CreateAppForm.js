import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppointmentsService from '../Service/AppointmentsService';
import ManagersService from '../Service/ManagersService';
import VisitorService from '../Service/VisitorService';
import moment from "moment";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
moment.locale("nl-NL");

class CreateAppForm extends Component {
    emptyItem = {
        manager_id: '',
        visitor_id: '',
        starts_at: '',
        user_id: 1,
        ends_at: '',
    };
    constructor(props) {
        super(props);
        this.state = {
            man: [],
            vis: [],
            item: this.emptyItem
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount() {

        VisitorService.getAllVisitors().then((response) => {
            this.setState({ vis: response.data })
        });

        ManagersService.getAllManagers().then((response) => {
            this.setState({ man: response.data })
        });
    }

    convertDate = (date) => {
        return moment.utc(date).add(1, "hours").format("YYYY-M-DThh:mm")
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = { ...this.state.item };
        item[name] = value;
        this.setState({ item });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const { item } = this.state;
        item.visitor_id = document.getElementById("visitor_id").value;
        item.manager_id = document.getElementById("manager_id").value;
        item.starts_at = document.getElementById("starts_at").value;
        item.ends_at = document.getElementById("ends_at").value;

        AppointmentsService.addNewAppointemnt(item);
    }

    render() {
        const { man } = this.state;
        const { vis } = this.state;
        const title = <h2>Create appointment</h2>;
        const { startDate, endDate } = this.props;

        console.log(vis);
        return (
            <div className="content">
                <Container>
                    {title}
                    <Form onSubmit={this.handleSubmit}>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="manager">Manager</Label>
                                        <Input type="select" name="manager_id" id="manager_id" onChange={this.handleChange} autoComplete="manager_id" >
                                            {
                                                man.map(manager => (
                                                    <option key={manager.id} value={manager.id}>{manager.first_name} {manager.last_name}</option>
                                                ))}
                                        </Input>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="vname">Visitor Id</Label>
                                        <Input type="select" name="vname" id="visitor_id" onChange={this.handleChange} autoComplete="visitor_id">
                                            {
                                                vis.map(visitor => (
                                                    <option key={visitor.id} value={visitor.id}>{visitor.first_name} {visitor.last_name}</option>
                                                ))}
                                        </Input>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="email">Visitor Email</Label>
                                        <Input type="email" name="email" id="email" onChange={this.handleChange} autoComplete="email">
                                            {
                                                vis.map(visitor => (
                                                    <option key={visitor.id} value={visitor.email}>{visitor.email}</option>
                                                ))}
                                        </Input>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="phone">Visitor Phone Number</Label>
                                        <Input type="text" name="phone" id="phone" onChange={this.handleChange} autoComplete="phone">
                                            {
                                                vis.map(visitor => (
                                                    <option key={visitor.id} value={visitor.phone}>{visitor.phone}</option>
                                                ))}
                                        </Input>
                                    </FormGroup>
                                </Col>

                                <Col>
                                    <FormGroup>
                                        <Label for="start">Start</Label>
                                        <Input type="datetime-local" name="starts_at" id="starts_at" value={this.convertDate(startDate) || ''}
                                            onChange={this.handleChange} autoComplete="starts_at" />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="end">End</Label>
                                        <Input type="datetime-local" name="ends_at" id="ends_at" value={this.convertDate(endDate) || ''}
                                            onChange={this.handleChange} autoComplete="ends_at" />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="license_plate">License</Label>
                                        <Input type="text" name="license_plate" id="license_plate"
                                            onChange={this.handleChange} autoComplete="license_plate" />
                                    </FormGroup>
                                </Col>
                            </Row>
                        <FormGroup>
                            <Button color="primary" type="submit">Save</Button>{' '}
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        )
    }
}
export default withRouter(CreateAppForm);