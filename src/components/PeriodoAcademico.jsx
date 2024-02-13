import React, { useState, useEffect } from 'react';
import * as utility from 'lodash'; // biblioteca para funciones de utilidad
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { SelecteCtegorias, UnidadAcademica } from '../helpers/objects';
import { Programa } from '../helpers/programas'

const PeriodoAcademico = ({ filteredData, setFilteredDataByPeriodo }) => {
    const [periodoSeleccionado, setPeriodoSeleccionado] = useState('Semestre I');
    const [selectedUnidadAcademica, setSelectedUnidadAcademica] = useState(''); // Unidad academica seleccionada
    const [selectedPrograma, setSelectedPrograma] = useState(''); // programa seleccionado
    const [selectedNivelFormacion, setSelectedNivelFormacion] = useState(''); // Nivel de formación seleccionado
    const [tipoActividad, setTipoActividad] = useState('Abiertas');


    // Función genérica para manejar cambios en estados
    const handleInputChange = (stateSetter) => (event) => {
        stateSetter(event.target.value);
    };

    const handleProgramaChange = handleInputChange(setSelectedPrograma);
    const handleUnidadAcademicaChange = handleInputChange(setSelectedUnidadAcademica);
    const handleNivelFormacionChange = handleInputChange(setSelectedNivelFormacion);

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
    // Filtrado de datos por nivel de formación
    if (selectedNivelFormacion) {
        filteredData = filteredData.filter((item) => item.tipoPrograma === selectedNivelFormacion);
    }

    useEffect(() => {
        // Filtrar los datos inicialmente
        let filteredDataByPeriodo = filteredData.filter((item) => item.periodo === periodoSeleccionado);
    
        if (tipoActividad === 'Abiertas') {
            filteredDataByPeriodo = filteredDataByPeriodo.filter((item) => {
                const fechaFinDate = new Date(item.fechaFin);
                const fechaActual = new Date();
                return fechaActual <= fechaFinDate; // Filtrar eventos que aún no han finalizado
            });
        } else if (tipoActividad === 'Finalizadas') {
            filteredDataByPeriodo = filteredDataByPeriodo.filter((item) => {
                const fechaFinDate = new Date(item.fechaFin);
                const fechaActual = new Date();
                return fechaActual > fechaFinDate; // Filtrar eventos que ya han finalizado
            });
        }
    
        setFilteredDataByPeriodo(filteredDataByPeriodo);
    }, [filteredData, setFilteredDataByPeriodo, periodoSeleccionado, tipoActividad]);
    

    return (
        <article className="periodos" id="periodos">
            <h3><i><FontAwesomeIcon icon={faFilter} /></i> Filtrar resultados por:</h3>
            <div className='mb-1'>
                <h4>Actividades</h4>
                <ul>
                    <li><a href="#" onClick={() => setTipoActividad('Abiertas')}>Actividades Abiertas</a></li>
                    <li><a href="#" onClick={() => setTipoActividad('Finalizadas')}>Actividades Finalizadas</a></li>
                </ul>
            </div>
            <div className='mb-1'>
                <h4>Nivel de Formacion</h4>
                <ul>
                    <li><a href="#" onClick={() => setSelectedNivelFormacion('Pregrados')}>Pregrados</a></li>
                    <li><a href="#" onClick={() => setSelectedNivelFormacion('Posgrados')}>Posgrados</a></li>
                    <li><a href="#" onClick={() => setSelectedNivelFormacion('Especializaciones')}>Especializaciones</a></li>
                </ul>
            </div>

            <div style={{ display: 'none', alignItems: 'center' }}>
                <h4>Nivel de Formacion</h4>
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

            <div>
                <div className='input-group'>
                    <h4>Unidad Academica</h4>
                    <select className="form-control" onChange={handleUnidadAcademicaChange} value={selectedUnidadAcademica}>
                        <option value="" selected disabled>Unidad académica...</option>
                        {UnidadAcademica.map((facultad, index) => (
                            <option key={index}>{facultad}</option>
                        ))}
                    </select>
                </div>
                <div className='input-group'>
                    <h4>Programa</h4>
                    <select className="form-control" onChange={handleProgramaChange} value={selectedPrograma}>
                        <option disabled selected value="">Programa...</option>
                        {Programa.map((programa, index) => (
                            <option key={index}>{programa}</option>
                        ))}
                    </select>
                </div>
                <div className='input-group'>
                    <h4>Semestre</h4>
                    <select className="form-control" onChange={(e) => setPeriodoSeleccionado(e.target.value)}>
                        <option value="Semestre I">Semestre I</option>
                        <option value="Intersemestral">Intersemestral</option>
                        <option value="Semestre II">Semestre II</option>
                        <option value="Intersemestral II">Intersemestral II</option>
                    </select>
                </div>
            </div>
        </article>
    );
};

export default PeriodoAcademico;


