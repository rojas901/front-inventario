import React, { useEffect, useState } from 'react'
import { 
    obtenerMarcas,
    borrarMarcaPorID,
    crearMarca,
    editarMarcaPorID 
} from '../../services/MarcaService'
import Modal from '../ui/Modal'
import { FaPencilAlt, FaRegTrashAlt, FaFileMedical  } from "react-icons/fa"

export default function Marcas() {

    const [marcas, setMarcas] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [marca, setMarca] = useState({
        nombre: '',
        estado: true
    })

    const listarMarcas = async () => {
        setLoading(true)
        try {
            setError(false)
            const { data } = await obtenerMarcas()
            setMarcas(data)
            setLoading(false)
        } catch (e) {
            console.log(e)
            setError(true)
            setLoading(false)
        }
    }

    useEffect(() => {
        listarMarcas();
    }, [])

    const guardarMarca = async () => {
        setLoading(true)
        try {
            const res = await crearMarca(marca)
            console.log(res)
            setLoading(true)
            setMarca({ nombre: '' })
            listarMarcas()
        } catch (e) {
            console.log(e)
            setLoading(false)
        }
    }

    const handleChange = e => {
        setMarca({
            ...marca,
            [e.target.name]: e.target.value
        })
    }

    const borrarMarca = async (e) => {
        setLoading(true)
        try {
            setError(false)
            const id = e.target.id
            console.log(id)
            const res = await borrarMarcaPorID(id)
            console.log(res)
            listarMarcas();
            setLoading(false)
        } catch (e) {
            console.log(e)
            setError(true)
            setLoading(false)
        }
    }

    const editarMarca = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            setError(false)
            const resp = await editarMarcaPorID(marca._id, marca);
            console.log(resp)
            resetMarca()
            listarMarcas()
        } catch (e) {
            setLoading(false)
            console.log(e)
            setError(true)
        }
    }

    const setMarcaPorId = async (e) => {
        console.log(e.target.id)
        const marcasFilter = marcas.filter(t => t._id === e.target.id);
        const mark = await marcasFilter[0];
        console.log(mark)
        setMarca(mark)
    }

    const resetMarca = () => {
        setMarca({
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
                            <h5 className="modal-title" id="exampleModal2Label">Editar Marca</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={resetMarca}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={editarMarca}>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Nombre:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="recipient-name"
                                        onChange={handleChange}
                                        value={marca?.nombre}
                                        name="nombre"
                                    />
                                    <select
                                        className="form-select"
                                        aria-label="Default select example"
                                        name="estado"
                                        value={marca?.estado}
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
                                    onClick={resetMarca}
                                >
                                    Cerrar
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={marca?.nombre.length <= 0}
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
            <h1 className='fw-bold text-center fs-4'>Marcas</h1>
            <Modal
                titulo={'Nueva Marca'}
                guardar={guardarMarca}
                element={marca}
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
                        marcas.map((marca, index) => {
                            return (
                                <tr key={marca._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{marca.nombre}</td>
                                    <td>{marca.estado ? 'Activo' : 'Inactivo'}</td>
                                    <td>{marca.fechaCreacion.slice(0,9)}</td>
                                    <td>{marca.fechaActualizacion.slice(0,9)}</td>
                                    <td>
                                        <button
                                        id={marca._id} 
                                        type="button" className="btn btn-info btn-sm mx-2" title='Editar'
                                        data-bs-toggle="modal" 
                                        data-bs-target="#exampleModal2"
                                        onClick={setMarcaPorId}
                                        ><FaPencilAlt/></button>
                                        <button
                                        id={marca._id} 
                                        type="button" className="btn btn-danger btn-sm" 
                                        title='Eliminar'
                                        onClick={borrarMarca}
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
