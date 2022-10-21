import React, { useEffect, useState } from 'react'
import {
    obtenerInventarios,
    borrarInventarioPorID,
    crearInventario,
    editarInventarioPorID
} from '../../services/InventarioService'
import Modal from '../ui/Modal'
import { FaPencilAlt, FaRegTrashAlt, FaFileMedical } from "react-icons/fa"
import cm from './computador.jpg'
import sm from './phone.jpg'


export default function TipoEquipos() {

    const [inventarios, setInventarios] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [inventario, setInventario] = useState({
        serial: "",
        modelo: "",
        descripcion: "",
        color: "",
        fechaCompra: "",
        precio: "",
        usuario: "632752cd07d4812362cf0882",
        marca: "6343239b36f52a1eed781bb0",
        tipo: "6326810d6b4eacd72fdd0eea",
        estado: "632747047e3d5a154068cf03"
    })

    const listarInventarios = async () => {
        setLoading(true)
        try {
            setError(false)
            const { data } = await obtenerInventarios()
            setInventarios(data)
            setLoading(false)
        } catch (e) {
            console.log(e)
            setError(true)
            setLoading(false)
        }
    }

    useEffect(() => {
        listarInventarios();
    }, [])

    const guardarInventario = async () => {
        setLoading(true)
        try {
            const res = await crearInventario(inventario)
            console.log(res)
            setLoading(true)
            setInventario({
                serial: "",
                modelo: "",
                descripcion: "",
                color: "",
                fechaCompra: "",
                precio: "",
                usuario: "",
                marca: "",
                tipo: "",
                estado: ""
            })
            listarInventarios()
        } catch (e) {
            console.log(e)
            setLoading(false)
        }
    }

    const handleChange = e => {
        setInventario({
            ...inventario,
            [e.target.name]: e.target.value,
            [e.target.modelo]: e.target.value,
            [e.target.descripcion]: e.target.value,
            [e.target.color]: e.target.value,
            [e.target.fechaCompra]: e.target.value,
            [e.target.precio]: e.target.value,
            [e.target.usuario]: e.target.value,
            [e.target.marca]: e.target.value,
            [e.target.tipo]: e.target.value,
            [e.target.estado]: e.target.value
        })
    }

    const borrarInventario = async (e) => {
        setLoading(true)
        try {
            setError(false)
            const id = e.target.id
            console.log(id)
            const res = await borrarInventarioPorID(id)
            console.log(res)
            listarInventarios();
            setLoading(false)
        } catch (e) {
            console.log(e)
            setError(true)
            setLoading(false)
        }
    }

    const editarInventario = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            setError(false)
            const resp = await editarInventarioPorID(inventario._id, inventario);
            console.log(resp)
            resetInventario()
            listarInventarios()
        } catch (e) {
            setLoading(false)
            console.log(e)
            setError(true)
        }
    }

    const setInventarioPorId = async (e) => {
        console.log(e.target.id)
        const inventariosFilter = inventarios.filter(t => t._id === e.target.id);
        const inv = await inventariosFilter[0];
        console.log(inv)
        setInventario(inv)
    }

    const resetInventario = () => {
        setInventario({
            serial: "",
            modelo: "",
            descripcion: "",
            fotoEquipo: "",
            color: "",
            fechaCompra: "",
            precio: "",
            usuario: "632752cd07d4812362cf0882",
            marca: "6343239b36f52a1eed781bb0",
            tipo: "6326810d6b4eacd72fdd0eea",
            estado: "632747047e3d5a154068cf03"
        })
    }

    return (
        <div className='d-flex flex-column align-items-center'>
            {/* inicia modal edit */}
            <div className="modal fade" id="exampleModal2" tabIndex={-1} aria-labelledby="exampleModal2Label" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModal2Label">Editar inventario</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={resetInventario}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={editarInventario}>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Serial:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="recipient-name"
                                        onChange={handleChange}
                                        value={inventario?.serial}
                                        name="serial"
                                    />
                                    <label htmlFor="recipient-modelo" className="col-form-label">Modelo:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="recipient-modelo"
                                        onChange={handleChange}
                                        value={inventario?.modelo}
                                        name="modelo"
                                    />
                                    <label htmlFor="recipient-descripcion" className="col-form-label">Descripcion:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="recipient-descripcion"
                                        onChange={handleChange}
                                        value={inventario?.descripcion}
                                        name="descripcion"
                                    />
                                    <label htmlFor="recipient-color" className="col-form-label">Color:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="recipient-color"
                                        onChange={handleChange}
                                        value={inventario?.color}
                                        name="color"
                                    />
                                    <label htmlFor="recipient-fechaCompra" className="col-form-label">Fecha de compra:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="recipient-fechaCompra"
                                        onChange={handleChange}
                                        value={inventario?.fechaCompra.slice(0,9)}
                                        name="fechaCompra"
                                    />
                                    <label htmlFor="recipient-precio" className="col-form-label">Precio:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="recipient-precio"
                                        onChange={handleChange}
                                        value={inventario?.precio}
                                        name="precio"
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                    onClick={resetInventario}
                                >
                                    Cerrar
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={inventario.serial.length <= 0}
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
            <h1 className='fw-bold text-center fs-4'>Inventario</h1>
            <Modal
                titulo={'Nuevo inventario'}
                guardar={guardarInventario}
                element={inventario}
                change={handleChange}
            />
            <button
                type="button"
                className="btn btn-primary mb-2"
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
            <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
                {inventarios.map(inventario => {
                    return (
                        <div key={inventario._id} className="col">
                            <div className="card">
                                <img
                                    src={inventario.tipo._id === "6326810d6b4eacd72fdd0eea" ? sm : cm}
                                    className="card-img-top"
                                    alt="Hollywood Sign on The Hill"
                                />
                                <div className="card-body">
                                    <ul className="list-unstyled">
                                        <li><strong>Serial:</strong> {inventario.serial}</li>
                                        <li><strong>Modelo:</strong> {inventario.modelo}</li>
                                        <li><strong>Descripcion:</strong> {inventario.descripcion}</li>
                                        <li><strong>Color:</strong> {inventario.color}</li>
                                        <li><strong>Fecha de compra:</strong> {inventario.fechaCompra.slice(0,9)}</li>
                                        <li><strong>Precio:</strong> {inventario.precio}</li>
                                        <li><strong>Usuario:</strong> {inventario.usuario.nombre}</li>
                                        <li><strong>Marca:</strong> {inventario.marca.nombre}</li>
                                        <li><strong>Tipo:</strong> {inventario.tipo.nombre}</li>
                                        <li><strong>Estado:</strong> {inventario.estado.nombre}</li>
                                    </ul>
                                    <div className='d-flex justify-content-center'>
                                        <button
                                            id={inventario._id}
                                            type="button" className="btn btn-info btn-sm mx-2" title='Editar'
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal2"
                                            onClick={setInventarioPorId}
                                        ><FaPencilAlt /></button>
                                        <button
                                            id={inventario._id}
                                            type="button" className="btn btn-danger btn-sm"
                                            title='Eliminar'
                                            onClick={borrarInventario}
                                        ><FaRegTrashAlt /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
