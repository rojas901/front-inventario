import React, { useEffect } from 'react'
import { obtenerUsuarios } from '../../services/UsuarioService'

export default function Usuarios() {

    const listaUsuarios = async () => {
        const { data } = await obtenerUsuarios()
        console.log(data)
    }

    useEffect(() => {
        listaUsuarios();
    }, [])

    return (
        <div>Usuarios</div>
    )
}
