import React, { useEffect, useState } from 'react'
import { obtenerUsuarios } from '../../services/UsuarioService'
import { obtenerMarcas } from '../../services/MarcaService'
import { obtenerEstados } from '../../services/EstadoService'
import { obtenerTiposEquipos } from '../../services/TipoEquipoService'

export default function Modal({
  titulo,
  guardar,
  element,
  change
}) {

  const [usuarios, setUsuarios] = useState([])
  const [marcas, setMarcas] = useState([])
  const [estados, setEstados] = useState([])
  const [tipos, setTipos] = useState([])

  const listarTipos = async () => {
    try {
      const { data } = await obtenerTiposEquipos()
      setTipos(data)
    } catch (e) {
      console.log(e)
      return (<h1>Error al conectar a la base de datos</h1>)
    }
  }

  const listarUsuarios = async () => {
    try {
      const { data } = await obtenerUsuarios()
      setUsuarios(data)
    } catch (e) {
      console.log(e)
      return (<h1>Error al conectar a la base de datos</h1>)
    }
  }

  const listarEstados = async () => {
    try {
      const { data } = await obtenerEstados()
      setEstados(data)
    } catch (e) {
      console.log(e)
      return (<h1>Error al conectar a la base de datos</h1>)
    }
  }

  const listarMarcas = async () => {
    try {
      const { data } = await obtenerMarcas()
      setMarcas(data)
    } catch (e) {
      console.log(e)
      return (<h1>Error al conectar a la base de datos</h1>)
    }
  }

  useEffect(() => {
    listarTipos();
    listarUsuarios();
    listarEstados();
    listarMarcas();
  }, [])

  const guadarElement = (e) => {
    e.preventDefault();
    guardar()
  }

  const handleChange = e => {
    change(e)
  }

  return (
    <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">{titulo}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={guadarElement}>
              <div className="mb-3">
                {titulo === 'Nuevo usuario' ?
                  (<>
                    <label htmlFor="recipient-name" className="col-form-label">Nombre:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="recipient-name"
                      onChange={handleChange}
                      value={element.nombre}
                      name="nombre"
                    />
                    <label htmlFor="recipient-email" className="col-form-label">Email:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="recipient-email"
                      onChange={handleChange}
                      value={element.email}
                      name="email"
                    />
                  </>)
                  : titulo === 'Nuevo inventario' ?
                    (<>
                      <label htmlFor="recipient-name" className="col-form-label">Serial:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="recipient-name"
                        onChange={handleChange}
                        value={element.serial}
                        name="serial"
                      />
                      <label htmlFor="recipient-modelo" className="col-form-label">Modelo:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="recipient-modelo"
                        onChange={handleChange}
                        value={element.modelo}
                        name="modelo"
                      />
                      <label htmlFor="recipient-descripcion" className="col-form-label">Descripcion:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="recipient-descripcion"
                        onChange={handleChange}
                        value={element.descripcion}
                        name="descripcion"
                      />
                      <label htmlFor="recipient-color" className="col-form-label">Color:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="recipient-color"
                        onChange={handleChange}
                        value={element.color}
                        name="color"
                      />
                      <label htmlFor="recipient-fechaCompra" className="col-form-label">Fecha de compra:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="recipient-fechaCompra"
                        onChange={handleChange}
                        value={element.fechaCompra}
                        name="fechaCompra"
                      />
                      <label htmlFor="recipient-precio" className="col-form-label">Precio:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="recipient-precio"
                        onChange={handleChange}
                        value={element.precio}
                        name="precio"
                      />
                      <label htmlFor="recipient-usuario" className="col-form-label">Usuario:</label>
                      <select
                        id="recipient-usuario"
                        className="form-select"
                        aria-label="Default select example"
                        name="usuario"
                        onChange={handleChange}
                      >
                        {usuarios.map(usuario => {
                          return (
                            <option key={usuario._id} value={usuario._id}>{usuario.nombre}</option>
                          )
                        })}
                      </select>
                      <label htmlFor="recipient-marca" className="col-form-label">Usuario:</label>
                      <select
                        id="recipient-marca"
                        className="form-select"
                        aria-label="Default select example"
                        name="marca"
                        onChange={handleChange}
                      >
                        {marcas.map(marca => {
                          return (
                            <option key={marca._id} value={marca._id}>{marca.nombre}</option>
                          )
                        })}
                      </select>
                      <label htmlFor="recipient-tipo" className="col-form-label">Usuario:</label>
                      <select
                        id="recipient-tipo"
                        className="form-select"
                        aria-label="Default select example"
                        name="tipo"
                        onChange={handleChange}
                      >
                        {tipos.map(tipo => {
                          return (
                            <option key={tipo._id} value={tipo._id}>{tipo.nombre}</option>
                          )
                        })}
                      </select>
                      <label htmlFor="recipient-estado" className="col-form-label">Usuario:</label>
                      <select
                        id="recipient-estado"
                        className="form-select"
                        aria-label="Default select example"
                        name="estado"
                        onChange={handleChange}
                      >
                        {estados.map(estado => {
                          return (
                            <option key={estado._id} value={estado._id}>{estado.nombre}</option>
                          )
                        })}
                      </select>
                    </>) :
                    (<>
                      <label htmlFor="recipient-name" className="col-form-label">Nombre:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="recipient-name"
                        onChange={handleChange}
                        value={element.nombre}
                        name="nombre"
                      />
                    </>
                    )
                }
              </div>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button
                type="submit"
                className="btn btn-primary"
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
  )
}