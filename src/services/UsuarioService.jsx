import { axiosConfig } from "../configuration/axios"

/**
 * Obtiene todos los usuarios
 */
const obtenerUsuarios = () => {
    return axiosConfig.get('usuarios', {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

/**
 * Crea usuario
 */
const crearUsuario = (data) => {
    return axiosConfig.post('usuarios', data, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

/**
 * Actualiza un usuario por ID
 */
const editarUsuarioPorID = (tipoId, data) => {
    return axiosConfig.put('usuarios/'+tipoId, data, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

/**
 * Borra un usuario por ID
 */
 const borrarUsuarioPorID = (tipoId) => {
    return axiosConfig.delete('usuarios/'+tipoId, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

/**
 * Consulta un usuario por ID
 */
 const obtenerUsuarioPorID = (tipoId) => {
    return axiosConfig.get('usuarios/'+tipoId, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

export {
    obtenerUsuarios,
    crearUsuario,
    editarUsuarioPorID,
    borrarUsuarioPorID,
    obtenerUsuarioPorID
}