import React from 'react'
import imagenIUD from './imagenIUD.png'

export default function Home() {
  return (
    <div className='d-flex flex-column align-items-center'>
        <h1 className='text-primary fw-bold'>Bienvenido al sistema de inventarios IUD</h1>
        <img src={imagenIUD} alt="logo IU Digital" className='p-3' />
        <p className='text-danger fs-4 text-center'>En este sitio podrás tener acceso a todo lo relacionado con el inventario de la institución, tanto para su gestión como visualización.</p>
    </div>
  )
}

