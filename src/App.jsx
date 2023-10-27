import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Filtro from './components/filtro';
import CalendarComponent from './components/CalendarComponent ';

const App = () => {

  return (
    <div id="caja-vue" className="General_calendario calendario_resultados">
      <Filtro/>
      <CalendarComponent />
    </div>
  );
};

export default App;
