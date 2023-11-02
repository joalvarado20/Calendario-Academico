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