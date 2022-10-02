import React, { useEffect, useState } from 'react'
import { obtenerEstados } from '../../services/EstadoService'
import Modal from '../ui/Modal'
import { FaPencilAlt, FaRegTrashAlt, FaFileMedical  } from "react-icons/fa"

export default function Estados() {

    const [estados, setEstados] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const listarEstados = async () => {
        setLoading(true)
        try {
            setError(false)
            const { data } = await obtenerEstados()
            setEstados(data)
            setLoading(false)
        } catch (e) {
            console.log(e)
            setError(true)
            setLoading(false)
        }
    }

    useEffect(() => {
        listarEstados();
    }, [])

    return (
        <div className='d-flex flex-column align-items-center'>
            <h1 className='fw-bold text-center fs-4'>Estados</h1>
            <Modal titulo={'estado'} />
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
                        estados.map((estado, index) => {
                            return (
                                <tr key={estado._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{estado.nombre}</td>
                                    <td>{estado.estado ? 'Activo' : 'Inactivo'}</td>
                                    <td>{estado.fechaCreacion.length <= 25 ? estado.fechaCreacion.slice(0,9):estado.fechaCreacion.slice(0,10)}</td>
                                    <td>{estado.fechaActualizacion.length <= 25 ? estado.fechaActualizacion.slice(0,9):estado.fechaActualizacion.slice(0,10)}</td>
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