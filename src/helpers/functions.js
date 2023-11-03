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
export const formatFecha = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString('es-CO', { month: 'long' });
    const year = date.getFullYear();
    return { day, month, year };
}

// formato para asignar a la hora el PM o AM 
export const formatTimeToAMPM = (time) => {
    const hours = parseInt(time.split(':')[0], 10);
    const minutes = time.split(':')[1];
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 || 12; // Convierte 0 a 12 en lugar de 0
    return `${formattedHours}:${minutes} ${ampm}`;
}

export const mesNumerico = (mes) => {
    const meses = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    return meses.indexOf(mes) + 1;
}
