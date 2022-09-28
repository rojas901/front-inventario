import { axiosConfig } from "../configuration/axios"

/**
 * Obtiene todos los estadosequipos
 */
const obtenerEstados = () => {
    return axiosConfig.get('estadoequipos', {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

/**
 * Crea estado
 */
const crearEstado = (data) => {
    return axiosConfig.post('estadoequipos', data, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

/**
 * Actualiza un estado por ID
 */
const editarEstadoPorID = (tipoId, data) => {
    return axiosConfig.put('estadoequipos/'+tipoId, data, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

/**
 * Borra un estado por ID
 */
 const borrarEstadoPorID = (tipoId) => {
    return axiosConfig.delete('estadoequipos/'+tipoId, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

/**
 * Consulta un estado por ID
 */
 const obtenerEstadoPorID = (tipoId) => {
    return axiosConfig.get('estadoequipos/'+tipoId, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

export {
    obtenerEstados,
    crearEstado,
    editarEstadoPorID,
    borrarEstadoPorID,
    obtenerEstadoPorID
}