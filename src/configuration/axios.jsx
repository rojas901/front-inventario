import axios from 'axios'

export const axiosConfig = axios.create({
    baseURL: process.env.REACT_BASE_URL || 'https://back-inventario.herokuapp.com/api/'
})