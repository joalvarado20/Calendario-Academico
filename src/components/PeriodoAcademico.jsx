import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

// Componente para los elementos de radio
const RadioItem = ({ id, label }) => (
    <div className="form-check">
        <input id={id} type="radio" name="exampleRadios" value={id} className="form-check-input" />
        <label htmlFor={id} className="form-check-label">
            {label}
            <p id={id} className="valorAno"></p>
        </label>
    </div>
);

const PeriodoAcademico = ({ onOrdenChange }) => {
    /* eslint-disable no-unused-vars */
    const [ordenAscendente, setOrdenAscendente] = useState(true);

    const handleOrdenChange = (event) => {
        const value = event.target.value;
        if (value === 'Orden ascendente (fecha de inicio)') {
            // Si se selecciona "Orden ascendente", establece "ordenAscendente" en true.
            setOrdenAscendente(true);
            // Llama a la función "onOrdenChange" pasando true para cambiar el orden.
            onOrdenChange(true);
        } else if (value === 'Orden descendente (fecha de inicio)') {
            // Si se selecciona "Orden descendente", establece "ordenAscendente" en false.
            setOrdenAscendente(false);
            // Llama a la función "onOrdenChange" pasando false para cambiar el orden.
            onOrdenChange(false);
        }
    };


    return (
        <article className="periodos">
            <h5>Periodo académico</h5>
            <select id="exampleFormControlSelect1" className="form-control" onChange={handleOrdenChange}>
                <option disabled selected value="">Ordenar...</option>
                <option>Orden ascendente (fecha de inicio)</option>
                <option>Orden descendente (fecha de inicio)</option>
            </select>
            <div className="contet_phone">
                <RadioItem id="semestreICheck" label="Semestre I" value="semestreICheck" />
                <RadioItem id="intersemestralICheck" label="Intersemestral" value="intersemestralICheck" />
                <RadioItem id="semestreIICheck" label="Semestre II" value="semestreIICheck" />
                <RadioItem id="intersemestralIICheck" label="Intersemestral II" value="intersemestralIICheck" />
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
