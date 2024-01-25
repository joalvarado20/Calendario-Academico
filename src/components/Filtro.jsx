import React, { useState, useEffect } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH, faTimes } from '@fortawesome/free-solid-svg-icons';
import { SelecteCtegorias } from '../helpers/objects';
import { fetchDataFromAPI } from '../helpers/api';

const Filtro = ({ updateFilteredData }) => {
// Estado para controlar si el menú está abierto o cerrado
    const [menuOpen, setMenuOpen] = useState(false);
    
    // Estados para almacenar selecciones del usuario
    const [selectedYear, setSelectedYear] = useState(''); // Año seleccionado
    const [selectedCategory, setSelectedCategory] = useState(''); // Categoría seleccionada
    const [keyword, setKeyword] = useState(''); // Palabra clave ingresada

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

// Función para limpiar todos los filtros
    const handleClearFilters = () => {
        setSelectedYear('');
        setSelectedCategory('');
        setKeyword('');

        // Actualiza la variable de estado para indicar que se deben limpiar los filtros
        setClearFilters(true);
    };

// Función para realizar la búsqueda y filtrado de datos
    const handleSearch = () => {
// Llama a la función fetchDataFromAPI para obtener datos de la API
        fetchDataFromAPI(selectedYear)
            .then((data) => {
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

                updateFilteredData(filteredData);
                console.log("Datos filtrados", filteredData);
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
    }, []);

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
                    <div id="collapsibleNavbar" className="navbar-collapse collapse d-flex">
                        <div className="form-row row justify-content-start" id='filtro'>
                            <div className="col-12 col-md-3 col-lg-2 d-flex align-items-center" id='year'>
                                <select className="form-control categorias-azul" onChange={handleYearChange} value={selectedYear}>
                                    <option disabled selected value="">Año</option>
                                    <option>2022</option>
                                    <option>2023</option>
                                    <option>2024</option>
                                </select>
                            </div>
                            <div className="col-12 col-md-5 col-lg-4 d-flex align-items-center">
                                <div className="input-group" id='busqueda'>
                                    <div className="input-group-prepend">
                                        <select
                                            className="form-control"
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
                            </div>
                            <div className="col-12 col-md-3 col-lg-2 d-flex align-items-center">
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
                            <div className="col-12 col-md-3 col-lg-2 d-flex align-items-center gap-2">
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