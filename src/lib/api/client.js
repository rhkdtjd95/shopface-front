import axios from 'axios';

const client = axios.create({ baseURL: 'https://iamchan.net' });

export default client;
