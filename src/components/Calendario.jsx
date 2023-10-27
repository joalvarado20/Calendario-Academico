import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faMap, faClock, faPlus } from '@fortawesome/free-solid-svg-icons';

// Componente para la lista de elementos

const ListItems = ({ items }) => (
    <ul>
        {items.map((item, index) => (
            <li key={index}>{item}</li>
        ))}
    </ul>
);

const Calendario = ({ facultades, programas }) => (
    <section id="resultadosActividades">
        <div>
            <article className="evento eventos0">
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <div className="card_filter item_2dosemestre">Semestre II</div>
                        <div className="card_filter item_pregrado">Pregrados</div>
                        <div className="card_filter item_busqueda">Cierre académico</div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-4 d-flex align-items-start flex-column">
                        <div className="evento_icon abierto">
                            <FontAwesomeIcon icon={faCalendar} />
                            <small>abierto</small>
                        </div>
                        <div className="fecha">
                            <h2> 06</h2>
                            <hr />
                            <h3>De diciembre</h3>
                            <small>al 06 de diciembre</small>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-8 flex-column">
                        <hr />
                        <h6>Cierre académico para todos los programas</h6>
                        <p>Cierre académico para todos los programas</p>
                        <div className="items_lugar">
                            <p>
                                <FontAwesomeIcon className='icons' icon={faMap} />
                                <strong>Ciudad:</strong>Bogotá
                            </p>
                            <p>
                                <FontAwesomeIcon className='icons' icon={faCalendar} />
                                <strong>Desde el día:</strong>06 de diciembre del 2023, <strong>hasta el día:</strong>06 de diciembre del 2023.
                            </p>
                            <p>
                                <FontAwesomeIcon className='icons' icon={faClock} />
                                <strong>Hora:</strong>07:00 AM - 23:00 PM
                            </p>
                        </div>
                        <div className="items_contet d-flex">
                            <div data-bs-toggle="tooltip" data-placement="bottom" title="Unidad académica." className="Facultad">
                                <a data-bs-target="#modalFacultadPregrados0" data-bs-toggle="modal" href="#">
                                    Unidad académica <FontAwesomeIcon className='icons' icon={faPlus} />
                                </a>
                            </div>
                            <div data-bs-toggle="tooltip" data-placement="bottom" title="Programas." className="Programa">
                                <a data-bs-target="#modalProgramasPregrados0" data-bs-toggle="modal" href="#">
                                    Programa <FontAwesomeIcon className='icons' icon={faPlus} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
            <div aria-labelledby="ModalFacultad" id="modalFacultadPregrados0" tabIndex="-1" aria-hidden="true" className="modal" style={{ display: 'none' }}>
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4>Listado de Unidades académicas</h4>
                            <button data-bs-dismiss="modal" type="button" className="close">x</button>
                        </div>
                        <div className="modal-body">
                            <p>Listado de facultades que participan en este evento:</p>
                            <ListItems items={facultades} />
                        </div>
                    </div>
                </div>
            </div>
            <div aria-labelledby="ModalProgramas" id="modalProgramasPregrados0" tabIndex="-1" aria-hidden="true" className="modal" style={{ display: 'none' }}>
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4>Listado de Programas</h4>
                            <button data-bs-dismiss="modal" type="button" className="close">x</button>
                        </div>
                        <div className="modal-body">
                            <p>Listado de programas que participan en este evento:</p>
                            <ListItems items={programas} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default Calendario;