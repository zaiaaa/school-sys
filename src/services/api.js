import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:3001/',
  // Adicione outras configurações padrão, se necessário
  headers : {
    Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`
  }
});

export {api}