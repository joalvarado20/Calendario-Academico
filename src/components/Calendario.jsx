import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faMap, faClock, faPlus } from '@fortawesome/free-solid-svg-icons';
import { formatFecha, formatTimeToAMPM, mesNumerico } from '../helpers/functions';

// Componente para mostrar una lista de elementos
const ListItems = ({ items }) => (
    <ul>
        {items.map((item, index) => (
            <li key={index}>{item}</li>
        ))}
    </ul>
);

const Calendario = ({ filteredData, ordenAscendente, filteredDataByPeriodo }) => {
    const [dataToShow, setDataToShow] = useState(filteredData);
    const [showNoDataMessage, setShowNoDataMessage] = useState(false);

    useEffect(() => {
        if (filteredDataByPeriodo.length > 0) {
            setDataToShow(filteredDataByPeriodo);
        } else {
            setDataToShow(filteredData);
        }
    }, [filteredDataByPeriodo, filteredData]);


    useEffect(() => {
        // Mostrar el mensaje de "No hay datos" si no hay datos para mostrar
        setShowNoDataMessage(filteredDataByPeriodo.length === 0);
    }, [dataToShow]);

    let lista = [
        "Contratación profesores/as catedra",
        "Evaluación integral de profesores",
        "Asignación de Espacios Físicos  y Publicación de Salones",
        "Incentivos y reconocimientos profesores",
        "Modificaciones curriculares",
        "Plan de trabajo del profesor/a",
        "Proceso de Planeación y Oferta Académica"
    ]
    
    return (
        <section id="resultadosActividades">
            <div>
                {showNoDataMessage && <p>No hay datos disponibles.</p>}
                {!showNoDataMessage && dataToShow
                    .sort((a, b) => {
                        const fechaInicioA = new Date(a.fechaInicio);
                        const fechaInicioB = new Date(b.fechaInicio);
                        return ordenAscendente ? fechaInicioA - fechaInicioB : fechaInicioB - fechaInicioA;
                    })
                    .map((item, index) => {
                        // Formateo de fechas y hora
                        const fechaInicioFormateada = formatFecha(item.fechaInicio);
                        const fechaFinFormateada = formatFecha(item.fechaFin);
                        const horaInicioAMPM = formatTimeToAMPM(item.horaInicio);
                        const horaFinAMPM = formatTimeToAMPM(item.horaFin);

                        // Constantes para evaluar si el evento está cerrado
                        const fechaFinDate = new Date(fechaFinFormateada.year, mesNumerico(fechaFinFormateada.month) - 1, fechaFinFormateada.day);
                        const fechaActual = new Date();
                        const eventoCerrado = fechaActual > fechaFinDate;
                        const eventoClase = eventoCerrado ? "cerrado" : "abierto";

                        const hideItem = lista.includes(item.categoria);

                        return (
                            <article className={`evento eventos0 ${window.location.href.includes('estudiante') ? (hideItem ? 'd-none' : 'd-block') : 'd-block'
                                }`}
                                key={index}>
                                <div className="row">
                                    <div className="col-12 d-flex justify-content-end">
                                        <div className={`card_filter ${item.periodo === "Semestre I" ? "item_1resemestre" : "item_2dosemestre"}`}>
                                            {item.periodo}
                                        </div>
                                        <div className="card_filter item_pregrado">{item.tipoPrograma}</div>
                                        <div className="card_filter item_busqueda">{item.categoria}</div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-4 d-flex align-items-start flex-column">
                                        <div className={`evento_icon ${eventoClase}`}>
                                            <FontAwesomeIcon icon={faCalendar} />
                                            <small>{eventoClase}</small>
                                        </div>
                                        <div className="fecha">
                                            <h2>{fechaInicioFormateada.day + 1}</h2>
                                            <hr />
                                            <h3>{fechaInicioFormateada.month}</h3>
                                            <small>al {fechaFinFormateada.day + 1} de {fechaFinFormateada.month}</small>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-8 flex-column">
                                        <hr />
                                        <h6>{item.categoria}</h6>
                                        <p>{item.nombre}</p>
                                        <div className="items_lugar">
                                            <p>
                                                <FontAwesomeIcon className='icons' icon={faMap} />
                                                <strong>Ciudad:</strong>{item.ciudad}
                                            </p>
                                            <p>
                                                <FontAwesomeIcon className='icons' icon={faCalendar} />
                                                <strong>Desde el día:</strong>
                                                {fechaInicioFormateada.day + 1} de  {fechaInicioFormateada.month} del, {fechaInicioFormateada.year}
                                                <strong> hasta el día:</strong>
                                                {fechaFinFormateada.day + 1} de {fechaFinFormateada.month} del {fechaFinFormateada.year}
                                            </p>
                                            <p>
                                                <FontAwesomeIcon className='icons' icon={faClock} />
                                                <strong>Hora:</strong>{horaInicioAMPM} - {horaFinAMPM}
                                            </p>
                                        </div>
                                        <div className="items_contet d-flex">
                                            <div data-bs-toggle="tooltip" data-placement="bottom" title="Unidad académica." className="Facultad">
                                                <a data-bs-target={`#modalFacultadPregrados${index}`} data-bs-toggle="modal" href="#">
                                                    Unidad académica <FontAwesomeIcon className='icons' icon={faPlus} />
                                                </a>
                                            </div>
                                            <div data-bs-toggle="tooltip" data-placement="bottom" title="Programas." className="Programa">
                                                <a data-bs-target={`#modalProgramasPregrados${index}`} data-bs-toggle="modal" href="#">
                                                    Programa <FontAwesomeIcon className='icons' icon={faPlus} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div aria-labelledby={`ModalFacultad${index}`} id={`modalFacultadPregrados${index}`} tabIndex="-1" aria-hidden="true" className="modal" style={{ display: 'none' }}>
                                        <div className="modal-dialog modal-xl">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h4>Listado de Unidades académicas</h4>
                                                    <button data-bs-dismiss="modal" type="button" className="close">x</button>
                                                </div>
                                                <div className="modal-body">
                                                    <p>Listado de facultades que participan en este evento:</p>
                                                    <ListItems items={item.facultad.split(';').map(facultad => facultad.trim())} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div aria-labelledby={`ModalProgramas${index}`} id={`modalProgramasPregrados${index}`} tabIndex="-1" aria-hidden="true" className="modal" style={{ display: 'none' }}>
                                        <div className="modal-dialog modal-xl">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h4>Listado de Programas</h4>
                                                    <button data-bs-dismiss="modal" type="button" className="close">x</button>
                                                </div>
                                                <div className="modal-body">
                                                    <p>Listado de programas que participan en este evento:</p>
                                                    <ListItems items={item.programa.split(';').map(programa => programa.trim())} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
            </div>
        </section>
    );
}

export default Calendario;
