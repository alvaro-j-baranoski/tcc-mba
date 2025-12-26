import axios from 'axios';

const client = axios.create({
  baseURL: 'https://localhost:52545',
  timeout: 1000,
  headers: {
    post: {        // can be common or any other method
      Accept: 'text/plain'
    }
  }
});

export default client