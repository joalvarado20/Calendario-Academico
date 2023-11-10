import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import PeriodoAcademico from './PeriodoAcademico';
import Calendario from './Calendario';

const CalendarComponent = ({ filteredData }) => {
    // Define las listas de facultades y programas
    const facultades = [
        'Decanatura Del Medio Universitario',
        'Escuela De Administración',
    ];

    const programas = [
        'Administración de Empresas',
        'Administración de Negocios Internacionales',
    ];

    // Define el estado "ordenAscendente" y la función "handleOrdenChange" para gestionar el cambio de orden.
    const [ordenAscendente, setOrdenAscendente] = useState(true);

    const handleOrdenChange = (orden) => {
        setOrdenAscendente(orden);
    };

    const [filteredDataByPeriodo, setFilteredDataByPeriodo] = useState([]); // Agrega un estado para almacenar los datos filtrados por período.

    return (
        <div className="contet_gris">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-4 col-lg-4 d-flex justify-content-center">
                        <aside>
                            <PeriodoAcademico filteredData={filteredData} onOrdenChange={handleOrdenChange} setFilteredDataByPeriodo={setFilteredDataByPeriodo} />
                        </aside>
                    </div>
                    <div className="col-12 col-sm-12 col-md-8 col-lg-8 d-flex justify-content-center">
                        <Calendario filteredData= {filteredData} filteredDataByPeriodo={filteredDataByPeriodo} facultades={facultades} programas={programas} ordenAscendente={ordenAscendente} />
                    </div>
                </div>
            </div>
            <div className="d-flex top"><a href="#"><FontAwesomeIcon icon={faArrowUp} /></a></div>
        </div>
    );
};

export default CalendarComponent;
