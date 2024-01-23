import React, { useState, useEffect } from 'react';
import * as utility from 'lodash'; // biblioteca para funciones de utilidad
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH, faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Programa } from '../helpers/programas'
import { SelecteCtegorias, UnidadAcademica } from '../helpers/objects';
import { fetchDataFromAPI } from '../helpers/api';
import { convertDateFormatToAPI } from '../helpers/functions'

const Filtro = ({ updateFilteredData }) => {
    // Estado para controlar si el menú está abierto o cerrado
    const [menuOpen, setMenuOpen] = useState(false);

    // Estados para almacenar selecciones del usuario
    const [selectedYear, setSelectedYear] = useState(''); // Año seleccionado
    const [selectedCategory, setSelectedCategory] = useState(''); // Categoría seleccionada
    const [keyword, setKeyword] = useState(''); // Palabra clave ingresada
    const [selectedNivelFormacion, setSelectedNivelFormacion] = useState(''); // Nivel de formación seleccionado
    const [selectedFechaInicio, setSelectedFechaInicio] = useState(''); // Fecha de inicio seleccionada
    const [selectedFechaFin, setSelectedFechaFin] = useState(''); // Fecha de fin seleccionada
    const [selectedUnidadAcademica, setSelectedUnidadAcademica] = useState(''); // Unidad academica seleccionada
    const [selectedPrograma, setSelectedPrograma] = useState(''); // programa seleccionado

    // Estado para rastrear si se han obtenido datos iniciales de la API
    const [initialDataFetched, setInitialDataFetched] = useState(false);
    const [clearFilters, setClearFilters] = useState(false);

    // Función genérica para manejar cambios en estados
    const handleInputChange = (stateSetter) => (event) => {
        stateSetter(event.target.value);
    };

    // manejadores de eventos
    const handleYearChange = handleInputChange(setSelectedYear);
    const handleCategoryChange = handleInputChange(setSelectedCategory);
    const handleKeywordChange = handleInputChange(setKeyword);
    const handleFechaInicioChange = handleInputChange(setSelectedFechaInicio);
    const handleFechaFinChange = handleInputChange(setSelectedFechaFin);
    const handleNivelFormacionChange = handleInputChange(setSelectedNivelFormacion);
    const handleProgramaChange = handleInputChange(setSelectedPrograma);
    const handleUnidadAcademicaChange = handleInputChange(setSelectedUnidadAcademica);

    // ...

    // Función para limpiar todos los filtros
    const handleClearFilters = () => {
        setSelectedYear('');
        setSelectedCategory('');
        setKeyword('');
        setSelectedNivelFormacion('');
        setSelectedFechaInicio('');
        setSelectedFechaFin('');
        setSelectedUnidadAcademica('');
        setSelectedPrograma('');

        // Restablecer el valor del checkbox 'Semestre I', si existe
        const semestreICheck = document.getElementById('semestreICheck');
        if (semestreICheck) {
            semestreICheck.checked = true;
        }

        // Actualiza la variable de estado para indicar que se deben limpiar los filtros
        setClearFilters(true);
    };

    // Función para realizar la búsqueda y filtrado de datos
    const handleSearch = () => {
        // Llama a la función fetchDataFromAPI para obtener datos de la API
        fetchDataFromAPI(selectedYear)
            .then((data) => {
                console.log('Respuesta exitosa:');
                // Filtrado de datos por categoría
                let filteredData = data.data.Actividades;
                if (selectedCategory) {
                    filteredData = filteredData.filter((item) => item.categoria === selectedCategory);
                }

                // Filtrado de datos por palabra clave
                if (keyword) {
                    const keywordLower = keyword.toLowerCase();
                    filteredData = filteredData.filter((item) =>
                        item.categoria.toLowerCase().includes(keywordLower) ||
                        item.contenido.toLowerCase().includes(keywordLower) ||
                        item.nombre.toLowerCase().includes(keywordLower)
                    );
                }

                // Filtrado de datos por nivel de formación
                if (selectedNivelFormacion) {
                    filteredData = filteredData.filter((item) => item.tipoPrograma === selectedNivelFormacion);
                }

                // Filtrado de datos por fecha de inicio
                if (selectedFechaInicio) {
                    filteredData = filteredData.filter((item) => {
                        const fechaInicioApiFormat = convertDateFormatToAPI(selectedFechaInicio);
                        return item.fechaInicio === fechaInicioApiFormat;
                    });
                }

                // Filtrado de datos por fecha de fin
                if (selectedFechaFin) {
                    filteredData = filteredData.filter((item) => {
                        const fechaFinApiFormat = convertDateFormatToAPI(selectedFechaFin);
                        return item.fechaFin === fechaFinApiFormat;
                    });
                }

                // Filtrado de datos por Unidad de programa
                if (selectedUnidadAcademica) {
                    const programasSeleccionados = selectedUnidadAcademica.split(';').map(programa => utility.deburr(programa.trim().toLowerCase()));
                    filteredData = filteredData.filter((item) => {
                        const programasItem = item.facultad.split(';').map(programa => utility.deburr(programa.trim().toLowerCase()));
                        return programasSeleccionados.some(programa => programasItem.includes(programa));
                    });
                }

                // Filtrado de datos por programa
                if (selectedPrograma) {
                    const programasSeleccionados = selectedPrograma.split(';').map(programa => programa.trim());
                    filteredData = filteredData.filter((item) => {
                        const programasItem = item.programa.split(';').map(programa => programa.trim());
                        return programasSeleccionados.some(programa => programasItem.includes(programa));
                    });
                }

                updateFilteredData(filteredData)
                console.log("Datos filtrados", filteredData);
                // Aquí tienes los datos filtrados por año, categoría y palabra clave (filteredData)
            })
            .catch((error) => {
                console.error('Error al realizar la solicitud:', error);
            });
    };

    // Maneja la apertura y cierre del menú
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Utiliza useEffect para realizar la llamada inicial a la API solo una vez al cargar la página
    useEffect(() => {
        if (!initialDataFetched) {
            handleSearch(); // Realiza la llamada a la API al cargar la página
            setInitialDataFetched(true); // Marca que los datos iniciales se han obtenido
        }
    }, []); // Dependencias vacías para que se ejecute solo una vez


    useEffect(() => {
        // Verifica si se debe limpiar los filtros y llama a handleSearch
        if (clearFilters) {
            handleSearch();
            // Restablece la variable de estado después de llamar a handleSearch
            setClearFilters(false);
        }
    }, [clearFilters]);


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
                        <div className="form-row row" id='filtro'>
                            <div className="col-12 col-sm-12 col-md-5 col-lg-6 d-flex align-items-center">
                                <div className="input-group" id='busqueda'>
                                    <div className="input-group-prepend">
                                        <label htmlFor="validatedInputGroupSelect" className="input-group-text">
                                            <i><FontAwesomeIcon icon={faSearch} /></i>
                                        </label>
                                    </div>
                                    <select
                                        className="form-control categorias-azul"
                                        onChange={handleCategoryChange}
                                        value={selectedCategory}
                                    >
                                        <option disabled value="">
                                            Categoría de búsqueda...
                                        </option>
                                        {SelecteCtegorias.map((categoria) => (
                                            <option
                                                key={categoria.nombre}
                                                className="ct ct-estudiante ct-profesor-funcionario"
                                                style={{
                                                    display: window.location.href.includes("estudiante") ? (categoria.display ? 'block' : 'none') : 'block'
                                                }}
                                                value={categoria.nombre}
                                            >
                                                {categoria.nombre}
                                            </option>
                                        ))}
                                    </select>

                                </div>
                            </div>
                            {/* <div className="col-12 col-sm-12 col-md-4 col-lg-3 d-flex align-items-center">
                                <input
                                    id="date-input-inicio"
                                    type="date"
                                    className="form-control date"
                                    onChange={handleFechaInicioChange}
                                    value={selectedFechaInicio}
                                />
                                <span className="date">/</span>
                                <input
                                    id="date-input-fin"
                                    type="date"
                                    className="form-control date"
                                    onChange={handleFechaFinChange}
                                    value={selectedFechaFin}
                                />
                            </div> */}
                            <div className="col-12 col-sm-12 col-md-3 col-lg-3 d-flex align-items-center">
                                <input
                                    type="text"
                                    id="buscarTexto"
                                    placeholder="Palabra clave..."
                                    required="required"
                                    className="form-control"
                                    onChange={handleKeywordChange}
                                    value={keyword}
                                />
                            </div>

                            <div className="col-12 col-sm-12 col-md-3 col-lg-3 d-flex align-items-center">
                                <select
                                    className="form-control"
                                    onChange={handleNivelFormacionChange}
                                    value={selectedNivelFormacion}
                                >
                                    <option disabled value="" selected>
                                        Nivel de formación...
                                    </option>
                                    <option>Pregrados</option>
                                    <option>Posgrados</option>
                                    <option>Especializaciones</option>
                                </select>

                            </div>
                            <div className="col-12 col-sm-12 col-md-3 col-lg-3 d-flex align-items-center" id='year'>
                                <select className="form-control" onChange={handleYearChange} value={selectedYear}>
                                    <option disabled selected value="">Año</option>
                                    <option>2022</option>
                                    <option>2023</option>
                                    <option>2024</option>
                                </select>
                            </div>
                            <div className="col-12 col-sm-12 col-md-3 col-lg-3 d-flex align-items-center">
                                <select className="form-control" onChange={handleUnidadAcademicaChange} value={selectedUnidadAcademica}>
                                    <option value="" selected disabled>Unidad académica...</option>
                                    {UnidadAcademica.map((facultad, index) => (
                                        <option key={index}>{facultad}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-12 col-sm-12 col-md-3 col-lg-3 d-flex align-items-center">
                                <select className="form-control" onChange={handleProgramaChange} value={selectedPrograma}>
                                    <option disabled selected value="">Programa...</option>
                                    {Programa.map((programa, index) => (
                                        <option key={index}>{programa}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-12 col-sm-12 col-md-3 col-lg-3 d-flex align-items-center gap-2">
                                <input id="buscar" minLength="6" type="button" value="BUSCAR" className="button form-control buscar btn btn-danger btn-sm" onClick={handleSearch} />
                                <input id='limpiar' minLength="6" type="button" value="" className="button form-control item_R limpiar btn btn-danger btn-sm " onClick={handleClearFilters} />
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Filtro;
