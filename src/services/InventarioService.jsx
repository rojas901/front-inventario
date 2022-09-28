import { axiosConfig } from "../configuration/axios"

/**
 * Obtiene todos los inventarios
 */
const obtenerInventarios = () => {
    return axiosConfig.get('inventarios', {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

/**
 * Crea inventario
 */
const crearInventario = (data) => {
    return axiosConfig.post('inventarios', data, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

/**
 * Actualiza un inventario por ID
 */
const editarInventarioPorID = (tipoId, data) => {
    return axiosConfig.put('inventarios/'+tipoId, data, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

/**
 * Borra un inventario por ID
 */
 const borrarInventarioPorID = (tipoId) => {
    return axiosConfig.delete('inventarios/'+tipoId, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

/**
 * Consulta un inventario por ID
 */
 const obtenerInventarioPorID = (tipoId) => {
    return axiosConfig.get('inventarios/'+tipoId, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

export {
    obtenerInventarios,
    crearInventario,
    editarInventarioPorID,
    borrarInventarioPorID,
    obtenerInventarioPorID
}