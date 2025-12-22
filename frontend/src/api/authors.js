import { instance } from "../utils/axios";

export const getAuthors = () => {
    let url = '/authors/'
    return instance.get(url)
}

export const createAuthors = (body) => {
    let url = '/authors/'
    return instance.post(url, body)
}

export const getAuthorDetails = (id) => {
    // console.log("here")
    const url = `author/${id}/`;
    return instance.get(url);
};

export const deleteAuthorDetails = (id) => {
    // console.log("here")
    const url = `author/${id}/`;
    return instance.delete(url);
};


export const updateAuthorDetails = (id, data) => {
    // console.log("data ===>> ", data)
    const url = `author/${id}/`;
    return instance.put(url, data);
};