import React from 'react';
import AppointmentsService from '../Service/AppointmentsService';
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "react-modal";
import { AppointmentsEdit } from '../components';
import { Button } from 'reactstrap';
import CreateAppForm from './CreateAppForm';
import moment from "moment";
import Header from './Header';

moment.locale("nl-NL");
const localizer = momentLocalizer(moment);


export default class Appointments extends React.Component {
    emptyItem = {

    };
    constructor(props) {
        super(props)
        this.state = {
            appointments: [],
            data: [],
            showModal: false,
            showModelCreate: false,
            appId: '',
            start: '',
            end: '',
            manager_id: '',
            visitor_id: ''
        }
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleOpenModalCreate = this.handleOpenModalCreate.bind(this);
        this.handleCloseModalCreate = this.handleCloseModalCreate.bind(this);

    }

    convertDate = (date) => {
        return moment.utc(date).toDate()
    }

    componentDidMount() {
        AppointmentsService.getAllAppointments().then((response) => {
            this.setState({ appointments: response.data })
            let events = response.data;
            const d = [];
            for (let i = 0; i < events.length; i++) {
                const item = {}
                item["id"] = response.data[i].id
                item["start"] = this.convertDate(response.data[i].starts_at);
                item["end"] = this.convertDate(response.data[i].ends_at);
                item["visitor_id"] = response.data[i].visitor_id;
                item["manager_id"] = response.data[i].manager_id;
                d.push(item);
            }
            this.setState({ data: d })
        });
    }

    handleOpenModal(event) {
        console.log(event.id);
        this.setState({ showModal: true, appId: event.id });
    }


    handleCloseModal() {
        this.setState({ showModal: false });
        this.setState({});
        this.componentDidMount();
    }

    handleOpenModalCreate(event) {
        // console.log(event)
        this.setState({ showModalCreate: true, start: event.start, end: event.end });
    }


    handleCloseModalCreate() {
        this.setState({ showModalCreate: false });
        this.setState({});
        this.componentDidMount();
    }


    render() {
        const { data } = this.state;
        return (

            <div>
                <Header />
                <Modal
                    isOpen={this.state.showModal}
                    onRequestClose={this.closeModal}
                    contentLabel="Appointment"
                    appElement={document.getElementById('root') || undefined}
                >
                    <AppointmentsEdit showModal={this.state.showModal} appId={this.state.appId} appointments={this.state.appointments} />
                    <Button color="secondary" onClick={this.handleCloseModal}>close</Button>
                </Modal>

                <Modal
                    isOpen={this.state.showModalCreate}
                    onRequestClose={this.closeModalCreate}
                    contentLabel="Appointment Create"
                    appElement={document.getElementById('root') || undefined}
                >
                    <CreateAppForm showModalCreate={this.state.showModalCreate} startDate={this.state.start} endDate={this.state.end} />
                    <Button color="secondary" onClick={this.handleCloseModalCreate}>close</Button>
                </Modal>

                <Calendar
                    min={new Date(2020, 10, 0, 8, 0, 0)}
                    max={new Date(2022, 10, 0, 18, 0, 0)}
                    step={30}
                    popup
                    localizer={localizer}
                    events={data}
                    startAccessor="start"
                    endAccessor="end"
                    selectable={true}
                    defaultView='week'
                    onSelectEvent={this.handleOpenModal}
                    onSelectSlot={this.handleOpenModalCreate}
                    views={['week', 'day', 'agenda']}
                />

            </div>

        )
    }
}
