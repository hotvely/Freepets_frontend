import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080/api/",
});

export const getTotalSearch = async (search) => {
    let url = `totalSearch?search=${search}`;
    return instance.get(url);
}