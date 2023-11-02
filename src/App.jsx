// App.jsx

import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import CalendarComponent from './components/CalendarComponent ';
import Filtro from './components/Filtro';

const App = () => {
  // Declara un estado para los datos filtrados
  const [filteredData, setFilteredData] = useState([]);

  // Función para actualizar los datos filtrados
  const updateFilteredData = (data) => {
    setFilteredData(data);
  };

  return (
    <div id="" className="General_calendario calendario_resultados">
      <Filtro updateFilteredData={updateFilteredData} />
      <CalendarComponent filteredData={filteredData} />
    </div>
  );
};

export default App;
