import React from 'react'
import notFound from './notFound.jpg'

export default function NotFound() {
  return (
    <div>
        <h2 className='text-center'>Página no encontrada</h2>
        <img
            className='figure img img-fluid d-block'
            alt='No encontrado'
            src={notFound}
        />
    </div>
  )
}
