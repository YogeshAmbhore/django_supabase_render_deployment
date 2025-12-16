import { instance } from "../utils/axios";

export const getAuthors = () => {
    let url = '/authors/'
    return instance.get(url)
}

export const createAuthors = (body) => {
    let url = '/authors/'
    return instance.post(url, body)
}