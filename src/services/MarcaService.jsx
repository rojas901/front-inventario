import { axiosConfig } from "../configuration/axios"

/**
 * Obtiene todas las marcas
 */
const obtenerMarcas = () => {
    return axiosConfig.get('marcas', {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

/**
 * Crea marca
 */
const crearMarca = (data) => {
    return axiosConfig.post('marcas', data, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

/**
 * Actualiza un marca por ID
 */
const editarMarcaPorID = (tipoId, data) => {
    return axiosConfig.put('marcas/'+tipoId, data, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

/**
 * Borra un marca por ID
 */
 const borrarMarcaPorID = (tipoId) => {
    return axiosConfig.delete('marcas/'+tipoId, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

/**
 * Consulta un marca por ID
 */
 const obtenerMarcaPorID = (tipoId) => {
    return axiosConfig.get('marcas/'+tipoId, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

export {
    obtenerMarcas,
    crearMarca,
    editarMarcaPorID,
    borrarMarcaPorID,
    obtenerMarcaPorID
}