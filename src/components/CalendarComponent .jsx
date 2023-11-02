// CalendarComponent.jsx

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import PeriodoAcademico from './PeriodoAcademico';
import Calendario from './Calendario';

const CalendarComponent = ({ filteredData }) => {
    const facultades = [
        'Decanatura Del Medio Universitario',
        'Escuela De Administración',
        // ... (otros elementos de la lista)
    ];

    const programas = [
        'Administración de Empresas',
        'Administración de Negocios Internacionales',
        // ... (otros elementos de la lista)
    ];

    return (
        <div className="contet_gris">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-4 col-lg-4 d-flex justify-content-center">
                        <aside>
                            <PeriodoAcademico />
                        </aside>
                    </div>
                    <div className="col-12 col-sm-12 col-md-8 col-lg-8 d-flex justify-content-center">
                        {/* Pasa los datos filtrados a Calendario */}
                        <Calendario filteredData={filteredData} facultades={facultades} programas={programas} />
                    </div>
                </div>
            </div>
            <div className="d-flex top"><a href="#"><FontAwesomeIcon icon={faArrowUp} /></a></div>
        </div>
    );
};

export default CalendarComponent;
