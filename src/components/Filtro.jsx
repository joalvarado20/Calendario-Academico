import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH, faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';


const Filtro = () => {
    return (
        <div id="menu-pagina-ur" className="menu_evento">
            <div className="container-fluid">
                <nav className="navbar-expand-md">
                    <div className="des_title"><i> <FontAwesomeIcon icon={faSlidersH} /></i>
                        <p>Para facilitar el acceso a la información hemos dispuesto un filtro en el que se pueden
                            seleccionar una o varias opciones según tus intereses de búsqueda.</p>
                    </div>
                    <button aria-controls="collapsibleNavbar" aria-expanded="false" aria-label="Toggle navigation"
                        data-bs-target="#collapsibleNavbar" data-bs-toggle="collapse" type="button"
                        className="navbar-toggler">
                        <i><FontAwesomeIcon icon={faSlidersH} /></i>
                        <i><FontAwesomeIcon icon={faTimes} /></i>
                    </button>
                    <p>
                        <button aria-controls="collapsibleNavbar" aria-expanded="false" aria-label="Toggle navigation"
                            data-bs-target="#collapsibleNavbar" data-bs-toggle="collapse" type="button"
                            className="navbar-toggler">Selecciona <span>aquí</span> una o varias opciones.
                        </button>
                    </p>
                    <div id="collapsibleNavbar" className="navbar-collapse collapse">
                        <div className="form-row row">
                            <div className="col-12 col-sm-12 col-md-5 col-lg-6 d-flex align-items-center">
                                <div className="input-group">
                                    <div className="input-group-prepend"><label htmlFor="validatedInputGroupSelect"
                                        className="input-group-text"><i><FontAwesomeIcon icon={faSearch} /></i></label></div> <select
                                            className="form-control categorias-azul">
                                        <option disabled="disabled" value="">Categoría de búsqueda...</option>
                                        <option className="ct ct-profesor-funcionario" style={{ display: 'none' }}>Asignación de
                                            Espacios Físicos y Publicación de Salones</option>
                                        <option className="ct ct-estudiante ct-profesor-funcionario" style={{ display: 'block' }}>
                                            Cierre académico</option>
                                        <option className="ct ct-estudiante ct-profesor-funcionario" style={{ display: 'block' }}>
                                            Cierre formativo</option>
                                        <option className="ct ct-estudiante ct-profesor-funcionario" style={{ display: 'block' }}>
                                            Comité de idiomas</option>
                                        <option className="ct ct-profesor-funcionario" style={{ display: 'none' }}>Contratación
                                            profesores/as catedra</option>
                                        <option className="ct ct-profesor-funcionario" style={{ display: 'none' }}>Evaluación
                                            integral de profesores</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-4 col-lg-3 d-flex align-items-center"><input
                                id="date-input-inicio" type="date" className="form-control date" /> <span
                                    className="date">/</span> <input id="date-input-fin" type="date" className="form-control date" />
                            </div>
                            <div className="col-12 col-sm-12 col-md-3 col-lg-3 d-flex align-items-center"><input type="text"
                                id="buscarTexto" placeholder="Palabra clave..." required="required"
                                className="form-control" /></div>
                            <div className="col-12 col-sm-12 col-md-3 col-lg-3 d-flex align-items-center">
                                <select
                                    className="form-control">
                                    <option disabled="disabled" value="">Nivel de formación...</option>
                                    <option>Pregrados</option>
                                    <option>Posgrados</option>
                                </select>
                            </div>
                            <div className="col-12 col-sm-12 col-md-3 col-lg-3 d-flex align-items-center"><select
                                className="form-control">
                                <option disabled="disabled" value="">Unidad académica...</option>
                                <option>Escuela de Administración</option>
                                <option>Escuela de Medicina y Ciencias de la Salud</option>

                            </select></div>
                            <div className="col-12 col-sm-12 col-md-3 col-lg-3 d-flex align-items-center"><select
                                className="form-control">
                                <option disabled="disabled" value="">Programa...</option>
                                <option>Administración de Empresas</option>
                                <option>Administración de Negocios Internacionales</option>
                            </select></div>
                            <div className="col-8 col-sm-8 col-md-2 col-lg-2 d-flex align-items-center"><input id="buscar"
                                minLength="6" type="button" value="BUSCAR" className="button form-control buscar" /></div>
                            <div className="col-4 col-sm-4 col-md-1 col-lg-1 d-flex align-items-center"><input minLength="6"
                                type="button" value="Limpiar" className="button form-control item_R limpiar" /></div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Filtro;
