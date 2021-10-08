import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3333/'
})

export const viacep = axios.create({
  baseURL: 'https://viacep.com.br/ws/'
})
