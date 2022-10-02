import React, { useEffect, useState } from 'react'
import { obtenerUsuarios } from '../../services/UsuarioService'
import Modal from '../ui/Modal'
import { FaPencilAlt, FaRegTrashAlt, FaFileMedical  } from "react-icons/fa"

export default function Usuarios() {

    const [usuarios, setUsuarios] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const listarUsuarios = async () => {
        setLoading(true)
        try {
            setError(false)
            const { data } = await obtenerUsuarios()
            setUsuarios(data)
            setLoading(false)
        } catch (e) {
            console.log(e)
            setError(true)
            setLoading(false)
        }
    }

    useEffect(() => {
        listarUsuarios();
    }, [])

    return (
        <div className='d-flex flex-column align-items-center'>
            <h1 className='fw-bold text-center fs-4'>Usuarios</h1>
            <Modal titulo={'usuario'} />
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                title='Crear'
            >
                <FaFileMedical/>
            </button>
            {
                loading &&
                (<div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>)
            }
            {
                error && (
                    <div className="alert alert-danger" role="alert">
                        Error al cargar datos
                    </div>)
            }
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Email</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Fecha Creación</th>
                        <th scope="col">Fecha Actualización</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usuarios.map((usuario, index) => {
                            return (
                                <tr key={usuario._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{usuario.nombre}</td>
                                    <td>{usuario.email}</td>
                                    <td>{usuario.estado ? 'Activo' : 'Inactivo'}</td>
                                    <td>{usuario.fechaCreacion.length <= 25 ? usuario.fechaCreacion.slice(0,9):usuario.fechaCreacion.slice(0,10)}</td>
                                    <td>{usuario.fechaActualizacion.length <= 25 ? usuario.fechaActualizacion.slice(0,9):usuario.fechaActualizacion.slice(0,10)}</td>
                                    <td>
                                        <button type="button" className="btn btn-info btn-sm mx-2" title='Editar'><FaPencilAlt/></button>
                                        <button type="button" className="btn btn-danger btn-sm" title='Eliminar'><FaRegTrashAlt/></button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
