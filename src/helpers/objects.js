import { fetchDataFromAPI } from '../helpers/api';

export let SelecteCtegorias = []

fetchDataFromAPI()
    .then((data) => {
        let categoria = data.data.Actividades;
        let categorias = categoria.map(item => ({
            "nombre": item.categoria,
            "display": getDisplayValue(item.categoria)
        }));

        // Utilizar un Set para almacenar temporalmente nombres de categorías únicas
        const categoriasUnicas = new Set();
        categorias.forEach(cat => {
            categoriasUnicas.add(cat.nombre);
        });

        // Convertir el Set nuevamente a un array de categorías únicas
        const categoriasUnicasArray = Array.from(categoriasUnicas).map(nombre => ({
            "nombre": nombre,
            "display": getDisplayValue(nombre)
        }));

        // Actualizar el valor de SelecteCtegorias con las categorías únicas obtenidas
        SelecteCtegorias = categoriasUnicasArray;
    });

// Función para obtener el valor de 'display' basado en el nombre de la categoría
function getDisplayValue(nombreCategoria) {
    // Lista de nombres de categorías con sus valores de 'display'
    const displayValues = {
        "Asignación de Espacios Físicos  y Publicación de Salones": false,
        "Cierre académico": true,
        "Cierre formativo": true,
        "Comité de idiomas": true,
        "Contratación profesores/as catedra": false,
        "Evaluación integral de profesores": false,
        "English area": true,
        "Homologaciones, reconocimientos y validaciones": true,
        "Incentivos y reconocimientos profesores": false,
        "Inicio y finalización de clases": true,
        "Modificaciones curriculares": false,
        "Otras actividades de la vida universitaria": true,
        "Pago de matrículas": true,
        "Plan de trabajo del profesor/a": false,
        "Proceso de inducción": true,
        "Proceso de Planeación y Oferta Académica": false,
        "Publicación de grupos cancelados": true,
        "Recesos y vacaciones": true,
        "Retiro de asignaturas": true,
        "Reporte de calificaciones": true,
        "Reserva de cupo, re activaciones de cupo y reintegros": true,
        "Registro de asignaturas": true,
    };

    // Devolver el valor de 'display' según el nombre de la categoría
    return displayValues[nombreCategoria] || false; // Si no se encuentra, se establece como false
}

export const UnidadAcademica = [
    "Escuela de Administración",
    "Escuela de Medicina y Ciencias de la Salud",
    "Escuela de Ciencias Humanas",
    "Facultad de Economía",
    "Facultad de Jurisprudencia",
    "Facultad de Estudios Internacionales, Políticos y Urbanos",
    "Facultad de Ciencias Naturales",
    "Facultad de Creación",
    "Escuela de Ingeniería, Ciencia y Tecnología",
]