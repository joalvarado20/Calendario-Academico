import React, { useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH, faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import { SelecteCtegorias } from '../helpers/objects'

const Filtro = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div id="menu-pagina-ur" className="menu_evento">
            <div className="container-fluid">
                <nav className="navbar-expand-md">
                    <div className="des_title">
                        <i>
                            <FontAwesomeIcon icon={menuOpen ? faTimes : faSlidersH} />
                        </i>
                        <p>
                            Para facilitar el acceso a la información hemos dispuesto un filtro en el que se pueden
                            seleccionar una o varias opciones según tus intereses de búsqueda.
                        </p>
                    </div>
                    <button
                        aria-controls="collapsibleNavbar"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        data-bs-target="#collapsibleNavbar"
                        data-bs-toggle="collapse"
                        type="button"
                        className="navbar-toggler"
                        onClick={toggleMenu}
                    >
                        <i>
                            <FontAwesomeIcon icon={menuOpen ? faTimes : faSlidersH} />
                        </i>
                    </button>
                    <p>
                        <button
                            aria-controls="collapsibleNavbar"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                            data-bs-target="#collapsibleNavbar"
                            data-bs-toggle="collapse"
                            type="button"
                            className="navbar-toggler"
                            onClick={toggleMenu}
                        >
                            Selecciona <span>aquí</span> una o varias opciones.
                        </button>
                    </p>
                    <div id="collapsibleNavbar" className="navbar-collapse collapse">
                        <div className="form-row row">
                            <div className="col-12 col-sm-12 col-md-5 col-lg-6 d-flex align-items-center">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <label htmlFor="validatedInputGroupSelect" className="input-group-text">
                                            <i><FontAwesomeIcon icon={faSearch} /></i>
                                        </label>
                                    </div>
                                    <select className="form-control categorias-azul">
                                        <option disabled selected value="">
                                            Categoría de búsqueda...
                                        </option>
                                        {SelecteCtegorias.map((categoria) => (
                                            <option
                                                key={categoria.nombre}
                                                className="ct ct-estudiante ct-profesor-funcionario"
                                                style={{
                                                    display: window.location.href.includes("5174") ? (categoria.display ? 'block' : 'none') : 'block'
                                                }}
                                            >
                                                {categoria.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-4 col-lg-3 d-flex align-items-center">
                                <input id="date-input-inicio" type="date" className="form-control date" />
                                <span className="date">/</span>
                                <input id="date-input-fin" type="date" className="form-control date" />
                            </div>
                            <div className="col-12 col-sm-12 col-md-3 col-lg-3 d-flex align-items-center">
                                <input type="text" id="buscarTexto" placeholder="Palabra clave..." required="required" className="form-control" />
                            </div>
                            <div className="col-12 col-sm-12 col-md-3 col-lg-3 d-flex align-items-center">
                                <select className="form-control">
                                    <option disabled selected value="">Año</option>
                                    <option>2022</option>
                                    <option>2023</option>
                                </select>
                            </div>
                            <div className="col-12 col-sm-12 col-md-3 col-lg-3 d-flex align-items-center">
                                <select className="form-control">
                                    <option disabled value="" selected>Nivel de formación...</option>
                                    <option>Pregrados</option>
                                    <option>Posgrados</option>
                                </select>
                            </div>
                            <div className="col-12 col-sm-12 col-md-3 col-lg-3 d-flex align-items-center">
                                <select className="form-control">
                                    <option value="" selected disabled>Unidad académica...</option>
                                    <option>Escuela de Administración</option>
                                    <option>Escuela de Medicina y Ciencias de la Salud</option>

                                </select>
                            </div>
                            <div className="col-12 col-sm-12 col-md-3 col-lg-3 d-flex align-items-center">
                                <select className="form-control">
                                    <option disabled selected value="">Programa...</option>
                                    <option>Administración de Empresas</option>
                                    <option>Administración de Negocios Internacionales</option>
                                </select>
                            </div>
                            <div className="d-flex justify-content-end gap-2">
                                <input id="buscar" minLength="6" type="button" value="BUSCAR" className="button form-control buscar btn btn-danger btn-sm w-25" />
                                <input minLength="6" type="button" value="Limpiar" className="button form-control item_R limpiar btn btn-danger btn-sm w-25" />
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Filtro;
