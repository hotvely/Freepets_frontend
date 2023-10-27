import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080/api/",
});

export const getMessageList = async (sender, receiver) => {
    let url = `chatting?sender=${sender}&receiver=${receiver}`;
    return await instance.get(url);
};

export const getMessageOne = async (id) => {
    let url = `chatting/${id}`;
    return await instance.get(url);
}

export const addMessage = async (data) => {
    return await instance.post('chatting', data);
};