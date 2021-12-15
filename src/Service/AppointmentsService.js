import axios from 'axios'
const API_URL = "http://localhost:3000/";

class AppointmentsService {

    getAllAppointments(){
        return axios.get(API_URL+ "appointments");
    }

    addNewAppointemnt(data){
        return axios.post(API_URL+ "appointments/save", data);
    }

}
export default new AppointmentsService();