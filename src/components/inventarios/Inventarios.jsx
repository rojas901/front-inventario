import React, { useEffect } from 'react'
import { obtenerInventarios } from '../../services/InventarioService'

export default function Inventarios() {

    const listaInventarios = async () => {
        const { data } = await obtenerInventarios()
        console.log(data)
    }

    useEffect(() => {
        listaInventarios();
    }, [])

    return (
        <div>Inventarios</div>
    )
}
