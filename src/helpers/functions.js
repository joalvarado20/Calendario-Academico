// Función para convertir el formato de fecha al formato de la API
export const convertDateFormatToAPI = (date) => {
    // Divide la fecha en DD, MM y YYYY
    const parts = date.split('/');
    if (parts.length === 3) {
        // Reorganiza las partes en el formato YYYY-MM-DD
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return date; // Retorna la fecha sin cambios si no se pudo convertir
};
// funcion que formatea la fecha para poder pintarla en la vista
export function formatFecha(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString('es-CO', { month: 'long' });
    return { day, month };
}