import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from "moment";
import AppointmentsService from '../Service/AppointmentsService';
moment.locale("nl-NL");


class AppointmentsEdit extends Component {
    appointment = {
        id: '',
        manager_id: '',
        visitor_id: '',
        starts_at: '',
        ends_at: '',
        updated_at: '',
        start: '',
        end: ''
    };

    manager = {
        id: '',
        first_name: '',
        last_name: '',
        email: ''
    }

    visitor = {
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        license_plate: '',
        updated_at: ''
    }

    constructor(props) {
        super(props);
        this.state = {
            item: this.appointment,
            man: this.manager,
            vis: this.visitor
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async componentDidMount() {
        const { appId } = this.props;

        if (appId !== 'new') {
            const app = await (await fetch(`/appointments/${appId}`)).json();
            this.setState({ item: app });

            const mngr = await (await fetch(`/managers/${this.state.item.manager_id}`)).json();
            this.setState({ man: mngr });

            const vstrs = await (await fetch(`/visitors/${this.state.item.visitor_id}`)).json();
            this.setState({ vis: vstrs });
        }

    }
    async remove(id) {

        const test = window.confirm("Are you sure you want to delete this appointment?");
        if (test) {
            fetch(`/appointments/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                AppointmentsService.getAllAppointments().then((response) => {
                    this.setState({ appointments: response.data })
                });
                this.setState({ showModal: false })

            })
        }
    }
    async handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = { ...this.state.item };
        item[name] = value;
        this.setState({ item });
    }
    convertDate = (date) => {
        return moment.utc(date).add(1, "hours").format("YYYY-M-DThh:mm")
    }

    async handleSubmit(event) {
        event.preventDefault();
        const { item } = this.state;
        await fetch('/appointments/update/' + item.id, {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.setState({ showModal: false })

        this.props.history.push('/');
    }
    render() {
        const { item } = this.state;
        const { man } = this.state;
        const { vis } = this.state;
        const title = <h2>Edit appointment</h2>;

        return (
            <div className="content">
                <Container>
                    {title}
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="manager">Manager</Label>
                            <Input type="text" name="manager_id" id="manager_id" value={man.first_name + " " + man.last_name}
                                placeholder={man.id || ''} onChange={this.handleChange} autoComplete="manager_id" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="vname">Visitor</Label>
                            <Input type="text" name="vname" id="vname" placeholder={vis.id || ''}
                                value={vis.first_name + " " + vis.last_name} onChange={this.handleChange} autoComplete="visitor_id" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="vname">Visitor Email</Label>
                            <Input type="email" name="vemail" id="vemail"
                                value={vis.email || ''} onChange={this.handleChange} autoComplete="email" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="start">Start</Label>
                            <Input type="datetime-local" name="starts_at" id="starts_at" value={this.convertDate(item.starts_at) || ''}
                                onChange={this.handleChange} autoComplete="starts_at" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="end">End</Label>
                            <Input type="datetime-local" name="ends_at" id="ends_at" value={this.convertDate(item.ends_at) || ''}
                                onChange={this.handleChange} autoComplete="ends_at" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="license_plate">License</Label>
                            <Input type="text" name="license_plate" id="license_plate" value={vis.license_plate || ''}
                                onChange={this.handleChange} autoComplete="license_plate" />
                        </FormGroup>
                        <FormGroup>
                            <Button color="primary" type="submit">Update</Button>{' '}
                            <Button color="secondary" onClick={() => this.remove(item.id)}>Delete</Button>
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        )
    }
}
export default withRouter(AppointmentsEdit);