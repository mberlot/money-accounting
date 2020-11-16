import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: Number(60000),
});

api.CancelToken = axios.CancelToken;
api.isCancel = axios.isCancel;

export { api };

