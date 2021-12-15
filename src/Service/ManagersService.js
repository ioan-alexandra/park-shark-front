import axios from 'axios'
const API_URL = "http://localhost:3000/";

class ManagersService {

    getAllManagers(){
        return axios.get(API_URL+ "managers");
    }

}
export default new ManagersService();