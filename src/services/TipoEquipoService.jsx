//Obtiene todos los tipos de equipos
import {axiosCOnfig} from '../configuration/axios'

const obtenerTiposEquipos = () => {
    return axiosCOnfig.get('tipoequipos',{
    headers: {
        'content-type': 'application/json'
    }}
    )
    
}

export {
    obtenerTiposEquipos
}
