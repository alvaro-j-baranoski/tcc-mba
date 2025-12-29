import axios from 'axios';

const client = axios.create({
  baseURL: 'https://localhost:51957',
  timeout: 1000,
  headers: {
    "Accept": 'text/plain',
    "Content-Type": 'application/json'
  }
});

export default client