import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:3001/',
  // Adicione outras configurações padrão, se necessário
});

export {api}