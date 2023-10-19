import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080/api/info/"
})

export const addHospitalBoard = async (page) => {
    let url = `hr?page=${page}`;
    return await instance.get(url);
}