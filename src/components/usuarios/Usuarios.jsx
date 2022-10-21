import React, { useEffect, useState } from 'react'
import { 
    obtenerUsuarios,
    borrarUsuarioPorID,
    crearUsuario,
    editarUsuarioPorID 
} from '../../services/UsuarioService'
import Modal from '../ui/Modal'
import { FaPencilAlt, FaRegTrashAlt, FaFileMedical  } from "react-icons/fa"

export default function Usuarios() {

    const [usuarios, setUsuarios] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [usuario, setUsuario] = useState({
        nombre: '',
        email: '',
        estado: true
    })

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

    const guardarUsuario = async () => {
        setLoading(true)
        try {
            const res = await crearUsuario(usuario)
            console.log(res)
            setLoading(true)
            setUsuario({ nombre: '', email: '' })
            listarUsuarios()
        } catch (e) {
            console.log(e)
            setLoading(false)
        }
    }

    const handleChange = e => {
        console.log(e)
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value,
            [e.target.email]: e.target.value
        })
    }

    const borrarUsuario = async (e) => {
        setLoading(true)
        try {
            setError(false)
            const id = e.target.id
            console.log(id)
            const res = await borrarUsuarioPorID(id)
            console.log(res)
            listarUsuarios();
            setLoading(false)
        } catch (e) {
            console.log(e)
            setError(true)
            setLoading(false)
        }
    }

    const editarUsuario = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            setError(false)
            const resp = await editarUsuarioPorID(usuario._id, usuario);
            console.log(resp)
            resetUsuario()
            listarUsuarios()
        } catch (e) {
            setLoading(false)
            console.log(e)
            setError(true)
        }
    }

    const setUsuarioPorId = async (e) => {
        console.log(e.target.id)
        const usuariosFilter = usuarios.filter(t => t._id === e.target.id);
        const user = await usuariosFilter[0];
        console.log(user)
        setUsuario(user)
    }

    const resetUsuario = () => {
        setUsuario({
            nombre: '',
            email: '',
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
                            <h5 className="modal-title" id="exampleModal2Label">Editar Usuario</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={resetUsuario}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={editarUsuario}>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Nombre:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="recipient-name"
                                        onChange={handleChange}
                                        value={usuario?.nombre}
                                        name="nombre"
                                    />
                                    <label htmlFor="recipient-email" className="col-form-label">Email:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="recipient-email"
                                        onChange={handleChange}
                                        value={usuario?.email}
                                        name="email"
                                    />
                                    <select
                                        className="form-select"
                                        aria-label="Default select example"
                                        name="estado"
                                        value={usuario?.estado}
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
                                    onClick={resetUsuario}
                                >
                                    Cerrar
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={usuario?.nombre.length <= 0}
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
            <h1 className='fw-bold text-center fs-4'>Usuarios</h1>
            <Modal 
                titulo={'Nuevo usuario'}
                guardar={guardarUsuario}
                element={usuario}
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
                                    <td>{usuario.fechaCreacion.slice(0,9)}</td>
                                    <td>{usuario.fechaActualizacion.slice(0,9)}</td>
                                    <td>
                                        <button 
                                        id={usuario._id}
                                        type="button" className="btn btn-info btn-sm mx-2" title='Editar'
                                        data-bs-toggle="modal" 
                                        data-bs-target="#exampleModal2"
                                        onClick={setUsuarioPorId}
                                        ><FaPencilAlt/></button>
                                        <button 
                                        id={usuario._id}
                                        type="button" className="btn btn-danger btn-sm" 
                                        title='Eliminar'
                                        onClick={borrarUsuario}
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
