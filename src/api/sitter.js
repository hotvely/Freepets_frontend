import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080/api/",
})

export const getBoardsBasic = async (page) => {
    let url = `sitter?page=${page}`;
    return await instance.get(url);
}

export const getBoardView = async (id) => {
    let url = `sitter/${id}`;
    return await instance.get(url);
}

export const addBoard = async (data) => {
    return await instance.post("sitter", data);
}