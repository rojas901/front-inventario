import React, { useEffect } from 'react'
import { obtenerEstados } from '../../services/EstadoService'

export default function Estados() {

    const listaEstados = async () => {
        const { data } = await obtenerEstados()
        console.log(data)
    }

    useEffect(() => {
        listaEstados();
    }, [])

    return (
        <div>Estados</div>
    )
}
