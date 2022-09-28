import React, { useEffect } from 'react'
import { obtenerMarcas } from '../../services/MarcaService'

export default function Marcas() {

    const listaMarcas = async () => {
        const { data } = await obtenerMarcas()
        console.log(data)
    }

    useEffect(() => {
        listaMarcas();
    }, [])

    return (
        <div>Marcas</div>
    )
}
