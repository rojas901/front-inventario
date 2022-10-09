import React, { useEffect, useState } from 'react'
import {
    obtenerTiposEquipos,
    borrarTipoEquipoPorID,
    crearTipoEquipo,
    editarTipoEquipoPorID
} from '../../services/TipoEquipoService'
import Modal from '../ui/Modal'
import { FaPencilAlt, FaRegTrashAlt, FaFileMedical } from "react-icons/fa"

export default function TipoEquipos() {

    const [tipoEquipos, setTipoEquipos] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [tipoEquipo, setTipoEquipo] = useState({
        nombre: '',
        estado: true
    })

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

    const guardarTipoEquipo = async () => {
        setLoading(true)
        try {
            const res = await crearTipoEquipo(tipoEquipo)
            console.log(res)
            setLoading(true)
            setTipoEquipo({ nombre: '' })
            listarTipoEquipos()
        } catch (e) {
            console.log(e)
            setLoading(false)
        }
    }

    const handleChange = e => {
        setTipoEquipo({
            ...tipoEquipo,
            [e.target.name]: e.target.value
        })
    }

    const borrarTipoEquipo = async (e) => {
        setLoading(true)
        try {
            setError(false)
            const id = e.target.id
            console.log(id)
            const res = await borrarTipoEquipoPorID(id)
            console.log(res)
            listarTipoEquipos();
            setLoading(false)
        } catch (e) {
            console.log(e)
            setError(true)
            setLoading(false)
        }
    }

    const editarTipoEquipo = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            setError(false)
            const resp = await editarTipoEquipoPorID(tipoEquipo._id, tipoEquipo);
            console.log(resp)
            resetTipoEquipo()
            listarTipoEquipos()
        } catch (e) {
            setLoading(false)
            console.log(e)
            setError(true)
        }
    }

    const setTipoPorId = (e) => {
        console.log(e.target.id)
        const tiposFilter = tipoEquipos.filter(t => t._id === e.target.id);
        const tipo = tiposFilter[0];
        console.log(tipo)
        setTipoEquipo(tipo)
    }

    const resetTipoEquipo = () => {
        setTipoEquipo({
            nombre: '',
            estado: true
        })
    }

    return (
        <div className='d-flex flex-column align-items-center'>
            {/* inicia modal edit */}
            <div className="modal fade" id="exampleModal2" tabIndex={-1} aria-labelledby="exampleModal2Label" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModal2Label">Editar Tipo Equipo</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={resetTipoEquipo}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={editarTipoEquipo}>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Nombre:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="recipient-name"
                                        onChange={handleChange}
                                        value={tipoEquipo.nombre}
                                        name="nombre"
                                    />
                                    <select
                                        className="form-select"
                                        aria-label="Default select example"
                                        name="estado"
                                        value={tipoEquipo.estado}
                                        onChange={handleChange}
                                    >
                                        <option value={false}>Inactivo</option>
                                        <option value={true}>Activo</option>
                                    </select>
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                    onClick={resetTipoEquipo}
                                >
                                    Cerrar
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={tipoEquipo.nombre.length <= 0}
                                    data-bs-dismiss="modal"
                                >
                                    Enviar
                                </button>
                            </form>
                        </div>
                        <div className="modal-footer">
                        </div>
                    </div>
                </div>
            </div>
            {/* fin modal edit */}
            <h1 className='fw-bold text-center fs-4'>Tipo de equipos</h1>
            <Modal
                titulo={'Nuevo Tipo de Equipo'}
                guardar={guardarTipoEquipo}
                element={tipoEquipo}
                change={handleChange}
            />
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                title='Crear'
            >
                <FaFileMedical />
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
                                    <td>{tipoEquipo.fechaCreacion.slice(0, 9)}</td>
                                    <td>{tipoEquipo.fechaActualizacion.slice(0, 9)}</td>
                                    <td>
                                        <button
                                        id={tipoEquipo._id} 
                                        type="button" 
                                        className="btn btn-info btn-sm mx-2" title='Editar'
                                        data-bs-toggle="modal" 
                                        data-bs-target="#exampleModal2"
                                        onClick={setTipoPorId}
                                        ><FaPencilAlt /></button>
                                        <button
                                        id={tipoEquipo._id}  
                                        type="button" 
                                        className="btn btn-danger btn-sm" 
                                        title='Eliminar'
                                        onClick={borrarTipoEquipo}
                                        ><FaRegTrashAlt /></button>
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