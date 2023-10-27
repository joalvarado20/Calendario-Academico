import React from 'react';
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

const PeriodoAcademico = () => (
    <article className="periodos">
        <h5>Periodo académico</h5>
        <select id="exampleFormControlSelect1" className="form-control">
            <option disabled="disabled" value="">Ordenar...</option>
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

export default PeriodoAcademico;