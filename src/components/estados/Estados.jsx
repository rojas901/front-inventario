import React, { useEffect, useState } from 'react'
import { 
    obtenerEstados,
    borrarEstadoPorID,
    crearEstado,
    editarEstadoPorID
} from '../../services/EstadoService'
import Modal from '../ui/Modal'
import { FaPencilAlt, FaRegTrashAlt, FaFileMedical  } from "react-icons/fa"

export default function Estados() {

    const [estados, setEstados] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [estado, setEstado] = useState({
        nombre: '',
        estado: true
    })

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

    const guardarEstado = async () => {
        setLoading(true)
        try {
            const res = await crearEstado(estado)
            console.log(res)
            setLoading(true)
            setEstado({ nombre: '' })
            listarEstados()
        } catch (e) {
            console.log(e)
            setLoading(false)
        }
    }

    const handleChange = e => {
        setEstado({
            ...estado,
            [e.target.name]: e.target.value
        })
    }

    const borrarEstado = async (e) => {
        setLoading(true)
        try {
            setError(false)
            const id = e.target.id
            console.log(id)
            const res = await borrarEstadoPorID(id)
            console.log(res)
            listarEstados();
            setLoading(false)
        } catch (e) {
            console.log(e)
            setError(true)
            setLoading(false)
        }
    }

    const editarEstado = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            setError(false)
            const resp = await editarEstadoPorID(estado._id, estado);
            console.log(resp)
            resetEstado()
            listarEstados()
        } catch (e) {
            setLoading(false)
            console.log(e)
            setError(true)
        }
    }

    const setEstadoPorId = (e) => {
        console.log(e.target.id)
        const estadosFilter = estados.filter(t => t._id === e.target.id);
        const stado = estadosFilter[0];
        console.log(stado)
        setEstado(stado)
    }

    const resetEstado = () => {
        setEstado({
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
                            <h5 className="modal-title" id="exampleModal2Label">Editar Estado</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={resetEstado}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={editarEstado}>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Nombre:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="recipient-name"
                                        onChange={handleChange}
                                        value={estado.nombre}
                                        name="nombre"
                                    />
                                    <select
                                        className="form-select"
                                        aria-label="Default select example"
                                        name="estado"
                                        value={estado.estado}
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
                                    onClick={resetEstado}
                                >
                                    Cerrar
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={estado.nombre.length <= 0}
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
            <h1 className='fw-bold text-center fs-4'>Estados</h1>
            <Modal 
                titulo={'Nuevo Estado'}
                guardar={guardarEstado}
                element={estado}
                change={handleChange} 
            />
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
                                    <td>{estado.fechaCreacion.slice(0,9)}</td>
                                    <td>{estado.fechaActualizacion.slice(0,9)}</td>
                                    <td>
                                        <button 
                                        id={estado._id} 
                                        type="button" className="btn btn-info btn-sm mx-2" title='Editar'
                                        data-bs-toggle="modal" 
                                        data-bs-target="#exampleModal2"
                                        onClick={setEstadoPorId}
                                        ><FaPencilAlt/></button>
                                        <button
                                        id={estado._id} 
                                        type="button" className="btn btn-danger btn-sm" 
                                        title='Eliminar'
                                        onClick={borrarEstado}
                                        ><FaRegTrashAlt/></button>
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