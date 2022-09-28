import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Estados from '../components/estados/Estados'
import Marcas from '../components/marcas/Marcas'
import TiposEquipos from '../components/tiposequipos/TiposEquipos'
import Usuarios from '../components/usuarios/Usuarios'
import Inventarios from '../components/inventarios/Inventarios'
import Navbar from '../components/ui/Navbar'
import NotFound from '../components/ui/NotFound'

export default function AppRouter() {
    return (
        <div>
            <Navbar title={'UID'} />
            <main className='container'>
                <Routes>
                    <Route path='/' element={<TiposEquipos />} />
                    <Route path='/estados' element={<Estados />} />
                    <Route path='/marcas' element={<Marcas />} />
                    <Route path='/usuarios' element={<Usuarios />} />
                    <Route path='/inventarios' element={<Inventarios />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </main>
        </div>
    )
}
