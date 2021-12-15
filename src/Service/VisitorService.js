import axios from 'axios'
const API_URL = "http://localhost:3000/";

class VisitorService {

    getAllVisitors(){
        return axios.get(API_URL+ "visitors");
    }

}
export default new VisitorService();