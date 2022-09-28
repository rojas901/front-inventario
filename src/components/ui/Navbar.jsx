import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar({title}) {
    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <Link
                    to='/'
                    className='nav-brand'
                    tabIndex={0}
                    aria-label='Ir a inicio'
                >
                {title}
                </Link>                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <NavLink
                        to='/usuarios'
                        tabIndex={1}
                        className='nav-item'
                        >                 
                        Usuarios
                        </NavLink>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Marcas</a>
                        </li>                
                        <li className="nav-item">
                            <a className="nav-link disabled">Disabled</a>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}
