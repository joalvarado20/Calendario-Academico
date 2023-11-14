import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

const RadioItem = ({ id, label, onPeriodoChange, setFilteredDataByPeriodo,checked}) => (
    <div className="form-check">
        <input
            id={id}
            type="radio"
            name="exampleRadios"
            value={id}
            className="form-check-input"
            checked={checked} 
            onChange={() => {
                onPeriodoChange(id, setFilteredDataByPeriodo);
            }}
        />
        <label htmlFor={id} className="form-check-label">
            {label}
            <p id={id} className="valorAno"></p>
        </label>
    </div>
);

const PeriodoAcademico = ({ onOrdenChange, filteredData, setFilteredDataByPeriodo }) => {
    const [periodoSeleccionado, setPeriodoSeleccionado] = useState('semestreICheck'); 

    useEffect(() => {
        // Filtrar los datos inicialmente
        const filteredDataByPeriodo = filteredData.filter((item) => item.periodo === 'Semestre I');
        setFilteredDataByPeriodo(filteredDataByPeriodo);
    }, [filteredData, setFilteredDataByPeriodo]);

    const idToPeriodo = {
        semestreICheck: 'Semestre I',
        intersemestralICheck: 'Intersemestral',
        semestreIICheck: 'Semestre II',
        intersemestralIICheck: 'Intersemestral II',
    };

    const handleOrdenChange = (event) => {
        const value = event.target.value;
        if (value === 'Orden ascendente (fecha de inicio)') {
            onOrdenChange(true);
        } else if (value === 'Orden descendente (fecha de inicio)') {
            onOrdenChange(false);
        }
    };

    const handlePeriodoChange = (selectedId, setFilteredDataByPeriodo) => {
        const selectedPeriodo = idToPeriodo[selectedId];
        setPeriodoSeleccionado(selectedId);
        const filteredDataByPeriodo = filteredData.filter((item) => item.periodo === selectedPeriodo);
        setFilteredDataByPeriodo(filteredDataByPeriodo);
    };

    return (
        <article className="periodos">
            <h5>Periodo académico</h5>
            <select id="exampleFormControlSelect1" className="form-control" onChange={handleOrdenChange}>
                <option disabled value="">
                    Ordenar...
                </option>
                <option>Orden ascendente (fecha de inicio)</option>
                <option>Orden descendente (fecha de inicio)</option>
            </select>
            <div className="contet_phone">
                <RadioItem
                    id="semestreICheck"
                    label="Semestre I"
                    onPeriodoChange={handlePeriodoChange}
                    setFilteredDataByPeriodo={setFilteredDataByPeriodo}
                    checked={periodoSeleccionado === 'semestreICheck'}
                />
                <RadioItem
                    id="intersemestralICheck"
                    label="Intersemestral"
                    onPeriodoChange={handlePeriodoChange}
                    setFilteredDataByPeriodo={setFilteredDataByPeriodo}
                />
                <RadioItem
                    id="semestreIICheck"
                    label="Semestre II"
                    onPeriodoChange={handlePeriodoChange}
                    setFilteredDataByPeriodo={setFilteredDataByPeriodo}
                />
                <RadioItem
                    id="intersemestralIICheck"
                    label="Intersemestral II"
                    onPeriodoChange={handlePeriodoChange}
                    setFilteredDataByPeriodo={setFilteredDataByPeriodo}
                />
            </div>
            <hr />
            <div className="descarga">
                <a download="Descargar calendario" href="#" className="btn-download d-none">
                    Descargar calendario <FontAwesomeIcon icon={faCalendar} />
                </a>
            </div>
        </article>
    );
};

export default PeriodoAcademico;
