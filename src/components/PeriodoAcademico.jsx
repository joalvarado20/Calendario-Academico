import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

const RadioItem = ({ id, label, onPeriodoChange, setFilteredDataByPeriodo }) => (
    <div className="form-check">
        <input
            id={id}
            type="radio"
            name="exampleRadios"
            value={id}
            className="form-check-input"
            onChange={() => {
                onPeriodoChange(id, setFilteredDataByPeriodo); // Pasa la función setFilteredDataByPeriodo al componente RadioItem
            }}
        />
        <label htmlFor={id} className="form-check-label">
            {label}
            <p id={id} className="valorAno"></p>
        </label>
    </div>
);

const PeriodoAcademico = ({ onOrdenChange, filteredData, setFilteredDataByPeriodo }) => {
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

    const handlePeriodoChange = (selectedId, setFilteredDataByPeriodo) => {
        const selectedPeriodo = idToPeriodo[selectedId];
        setPeriodoSeleccionado(selectedPeriodo);
        console.log(`Filtrando datos para el período: ${selectedPeriodo}`);

        // Filtra tus datos aquí basado en el período seleccionado
        const filteredDataByPeriodo = filteredData.filter((item) => item.periodo === selectedPeriodo);
        console.log(filteredDataByPeriodo);
        setFilteredDataByPeriodo(filteredDataByPeriodo); // Actualiza los datos filtrados por período en el estado de CalendarComponent.

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
                <RadioItem id="semestreICheck" label="Semestre I" onPeriodoChange={handlePeriodoChange} setFilteredDataByPeriodo={setFilteredDataByPeriodo} />
                <RadioItem id="intersemestralICheck" label="Intersemestral" onPeriodoChange={handlePeriodoChange} setFilteredDataByPeriodo={setFilteredDataByPeriodo} />
                <RadioItem id="semestreIICheck" label="Semestre II" onPeriodoChange={handlePeriodoChange} setFilteredDataByPeriodo={setFilteredDataByPeriodo} />
                <RadioItem id="intersemestralIICheck" label="Intersemestral II" onPeriodoChange={handlePeriodoChange} setFilteredDataByPeriodo={setFilteredDataByPeriodo} />
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
