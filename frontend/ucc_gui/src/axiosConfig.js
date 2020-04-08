import axios from 'axios';
const instance = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT
});
instance.defaults.xsrfHeaderName = "X-CSRFToken";
instance.defaults.withCredentials = true;
export default instance;