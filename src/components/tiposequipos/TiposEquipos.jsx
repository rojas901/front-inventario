import React, { useEffect, useState } from 'react'
import { obtenerTiposEquipos } from '../../services/TipoEquipoService'
import Modal from '../ui/Modal'
import { FaPencilAlt, FaRegTrashAlt, FaFileMedical  } from "react-icons/fa"

export default function TipoEquipos() {

    const [tipoEquipos, setTipoEquipos] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const listarTipoEquipos = async () => {
        setLoading(true)
        try {
            setError(false)
            const { data } = await obtenerTiposEquipos()
            setTipoEquipos(data)
            setLoading(false)
        } catch (e) {
            console.log(e)
            setError(true)
            setLoading(false)
        }
    }

    useEffect(() => {
        listarTipoEquipos();
    }, [])

    return (
        <div className='d-flex flex-column align-items-center'>
            <h1 className='fw-bold text-center fs-4'>Tipo de equipos</h1>
            <Modal titulo={'Tipo de Equipo'} />
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
                        <th scope="col">Estado</th>
                        <th scope="col">Fecha Creación</th>
                        <th scope="col">Fecha Actualización</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tipoEquipos.map((tipoEquipo, index) => {
                            return (
                                <tr key={tipoEquipo._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{tipoEquipo.nombre}</td>
                                    <td>{tipoEquipo.estado ? 'Activo' : 'Inactivo'}</td>
                                    <td>{tipoEquipo.fechaCreacion.length <= 24 ? tipoEquipo.fechaCreacion.slice(0,9):tipoEquipo.fechaCreacion.slice(0,10)}</td>
                                    <td>{tipoEquipo.fechaActualizacion.length <= 24 ? tipoEquipo.fechaActualizacion.slice(0,9):tipoEquipo.fechaActualizacion.slice(0,10)}</td>
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