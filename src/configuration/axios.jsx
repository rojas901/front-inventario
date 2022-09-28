import axios from 'axios'

export const axiosCOnfig = axios.create({
    baseURL: process.env.REACT_BASE_URL || 'http://localhost:4000/api/'
})