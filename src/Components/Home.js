import React, { Component } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppointmentsService from '../Service/AppointmentsService';
import moment from "moment";
import Header from './Header';

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            appointments: []
        }
    }
    componentDidMount() {
        AppointmentsService.getAllAppointments().then((response) => {
            this.setState({ appointments: response.data })

        });
    }
    convertDate = (date) => {
        return moment.utc(date).format("YYYY-M-D h:mm")
    }
    render() {
        return (
            <div>
                <Header />
                <div className="header">
                    <h1 className="text-center"> Appointments List</h1>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <td> Appointments Id</td>
                                <td> Appointments Date</td>
                                <td> Appointments Visitor Id</td>
                                <td> Appointments Manager Id</td>

                            </tr>

                        </thead>
                        <tbody>
                            {
                                this.state.appointments.map(
                                    app =>
                                        <tr key={app.id}>
                                            {console.log(app)}
                                            <td> {app.id}</td>
                                            <td> {this.convertDate(app.starts_at)}</td>
                                            <td> {app.visitor_id}</td>
                                            <td> {app.manager_id}</td>
                                        </tr>
                                )
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
/*


*/