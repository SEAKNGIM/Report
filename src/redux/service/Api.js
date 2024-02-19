import axios from "axios";
const Api = axios.create({
    baseURL: "http://34.87.106.20:8081/api/v1",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
})

export default Api;