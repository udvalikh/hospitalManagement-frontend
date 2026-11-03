import axios from "axios";

export const listDoctors = () => {
    return axios.get("/doctors");

}