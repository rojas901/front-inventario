import React, { useEffect } from 'react'
import { obtenerTiposEquipos } from '../../services/TipoEquipoService'

export default function TipoEquipos() {

    const listaTipoEquipos = async () => {
        const { data } = await obtenerTiposEquipos()
        console.log(data)
    }

    useEffect(() => {
        listaTipoEquipos();
    }, [])

    return (
        <div>TipoEquipos</div>
    )
}