import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

// Componente para los elementos de radio
const RadioItem = ({ id, label, onPeriodoChange }) => (
    <div className="form-check">
        <input
            id={id}
            type="radio"
            name="exampleRadios"
            value={id}
            className="form-check-input"
            onChange={() => onPeriodoChange(id)}
        />
        <label htmlFor={id} className="form-check-label">
            {label}
            <p id={id} className="valorAno"></p>
        </label>
    </div>
);

const PeriodoAcademico = ({ onOrdenChange, filteredData }) => {
    // eslint-disable-next-line no-unused-vars
    const [periodoSeleccionado, setPeriodoSeleccionado] = useState(null);

    const idToPeriodo = {
        semestreICheck: "Semestre I",
        intersemestralICheck: "Intersemestral",
        semestreIICheck: "Semestre II",
        intersemestralIICheck: "Intersemestral II",
    };

    const handleOrdenChange = (event) => {
        const value = event.target.value;
        if (value === 'Orden ascendente (fecha de inicio)') {
            onOrdenChange(true);
        } else if (value === 'Orden descendente (fecha de inicio)') {
            onOrdenChange(false);
        }
    };

    const handlePeriodoChange = (selectedId) => {
        const selectedPeriodo = idToPeriodo[selectedId];
        setPeriodoSeleccionado(selectedPeriodo);
        console.log(`Filtrando datos para el período: ${selectedPeriodo}`);

        // Filtra tus datos aquí basado en el período seleccionado
        const filteredDataByPeriodo = filteredData.filter((item) => item.periodo === selectedPeriodo);
        console.log(filteredDataByPeriodo);
    };

    return (
        <article className="periodos">
            <h5>Periodo académico</h5>
            <select id="exampleFormControlSelect1" className="form-control" onChange={handleOrdenChange}>
                <option disabled selected value="">
                    Ordenar...
                </option>
                <option>Orden ascendente (fecha de inicio)</option>
                <option>Orden descendente (fecha de inicio)</option>
            </select>
            <div className="contet_phone">
                <RadioItem id="semestreICheck" label="Semestre I" onPeriodoChange={handlePeriodoChange} />
                <RadioItem id="intersemestralICheck" label="Intersemestral" onPeriodoChange={handlePeriodoChange} />
                <RadioItem id="semestreIICheck" label="Semestre II" onPeriodoChange={handlePeriodoChange} />
                <RadioItem id="intersemestralIICheck" label="Intersemestral II" onPeriodoChange={handlePeriodoChange} />
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
