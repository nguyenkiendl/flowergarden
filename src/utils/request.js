import axios from 'axios';

const request = axios.create({
    baseURL: process.env.REACT_APP_BASEURL,
});

export const get = async (path, params = {}) => {
    const response = await request.get(path, params);
    return response.data;
};

export const post = async (path, options = {}) => {
    const response = await request.post(path, options);
    return response.data;
};

export default request;
