import React from 'react'
import {
    Link
  } from "react-router-dom";

const Nav = () => {
    return (
            <nav className="nav nav-pills flex-column flex-sm-row">
                <Link className="flex-sm-fill text-sm-center nav-link" to="/">Inicio</Link>
                <Link className="flex-sm-fill text-sm-center nav-link" to="/agregar">Agregar Usuario</Link>
                <Link className="flex-sm-fill text-sm-center nav-link" to="/ver">Ver Usuarios</Link>
                <Link className="flex-sm-fill text-sm-center nav-link" to="/contacto">Contacto</Link>
            </nav>
    )
}

export default Nav
