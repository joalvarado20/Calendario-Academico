import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faLocationDot, faClock, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { formatFecha, formatTimeToAMPM, mesNumerico } from '../helpers/functions';
import ReactPaginate from 'react-paginate';

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
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5; // items por pagina

    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = dataToShow.slice(indexOfFirstItem, indexOfLastItem);

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
    ];

    return (
        <section id="resultadosActividades">
            <article className="titulo_evento">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12"><h2>Periodo académico <strong>2024</strong></h2></div>
                    </div>
                </div>
            </article>
            <div>
                {showNoDataMessage && <p>No hay datos disponibles.</p>}
                {!showNoDataMessage && currentItems
                    .sort((a, b) => {
                        const fechaInicioA = new Date(a.fechaInicio);
                        const fechaInicioB = new Date(b.fechaInicio);
                        const today = new Date(); // Obtener la fecha actual
                        const diffA = Math.abs(fechaInicioA - today); // Diferencia de fechas con el evento A
                        const diffB = Math.abs(fechaInicioB - today); // Diferencia de fechas con el evento B
                        return ordenAscendente ? diffA - diffB : diffB - diffA;
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
                            <article
                                className={`evento ${window.location.href.includes('estudiante') ? (hideItem ? 'd-none' : 'd-block') : 'd-block'}`}
                                key={index}
                                id={window.location.href.includes('estudiante') && !hideItem ? 'eventos' : undefined}>
                                <div className="container-fluid">
                                    <div className='row'>
                                        <div className="col-12 col-sm-3 col-lg-2 d-flex justify-content-center justify-content-sm-start">
                                            <div className={`evento_icon ${eventoClase}`}>
                                                <FontAwesomeIcon icon={faCalendar} />
                                                <p>{eventoClase}</p>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-9 col-lg-10">
                                            <div className="card-content d-flex justify-content-center justify-content-sm-end">
                                                <div className={`card_filter ${item.periodo === "Semestre I" ? "item_1resemestre" : "item_2dosemestre"}`}>
                                                    {item.periodo}
                                                </div>
                                                <div className="card_filter item_pregrado">{item.tipoPrograma}</div>
                                                <div className="card_filter item_busqueda">{item.categoria}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-lg-4 col-xxl-3">
                                            <div className="fecha">
                                                <h2>{fechaInicioFormateada.day + 1}</h2>
                                                <hr className={`${eventoClase}`} />
                                                <h3>{fechaInicioFormateada.month}</h3>
                                                <p><small>al {fechaFinFormateada.day + 1} de {fechaFinFormateada.month}</small></p>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-8 col-xxl-9">
                                            <hr />
                                            <h4>{item.categoria}</h4>
                                            <p>{item.nombre}</p>
                                            <div className="items_lugar">
                                                <div className='d-grid'>
                                                    <i><FontAwesomeIcon className='icons' icon={faLocationDot} /></i>
                                                    <p>
                                                        <strong>Ciudad:</strong>{item.ciudad}
                                                    </p>
                                                </div>
                                                <div className='d-grid'>
                                                    <i><FontAwesomeIcon className='icons' icon={faCalendar} /></i>
                                                    <p>                                               
                                                        <strong>Desde el día:</strong>
                                                        {fechaInicioFormateada.day + 1} de  {fechaInicioFormateada.month} del, {fechaInicioFormateada.year}
                                                        <strong> hasta el día:</strong>
                                                        {fechaFinFormateada.day + 1} de {fechaFinFormateada.month} del {fechaFinFormateada.year}
                                                    </p>
                                                </div>
                                                <div className='d-grid'>
                                                    <i><FontAwesomeIcon className='icons' icon={faClock} /></i>
                                                    <p>
                                                        <strong>Hora:</strong>{horaInicioAMPM} - {horaFinAMPM}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="items_content">
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
                                                        <button data-bs-dismiss="modal" type="button" className="close"><FontAwesomeIcon icon={faXmark} /></button>
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
                                                        <button data-bs-dismiss="modal" type="button" className="close"><FontAwesomeIcon icon={faXmark} /></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <p>Listado de programas que participan en este evento:</p>
                                                        <ListItems items={item.programa.split(';').map(programa => programa.trim())} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
            </div>
            {dataToShow.length > itemsPerPage && !showNoDataMessage && (
                <ReactPaginate
                    pageCount={Math.ceil(dataToShow.length / itemsPerPage)}
                    pageRangeDisplayed={1}
                    marginPagesDisplayed={2}
                    onPageChange={({ selected }) => setCurrentPage(selected)}
                    containerClassName={'pagination'}
                    activeClassName={'pagination-active'}
                    previousLabel={'« Ant'}
                    nextLabel={'Sig »'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageClassName={'pagination-item'}
                    pageLinkClassName={'pagination-link'}
                    previousClassName={'pagination-previous'}
                    nextClassName={'pagination-next'}
                    disabledClassName={'pagination-disabled'}
                />
            )}
        </section>
    );
};

export default Calendario;