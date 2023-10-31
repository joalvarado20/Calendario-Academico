export const fetchDataFromAPI = async (selectedYear) => {
    const url = 'https://serveless.proximateapps-services.com.mx/casaur/prod/api/calendar/getspanishevents';
    const token = '03cBcETqak5Vis4ORGf3oanH8Ty9IroT5887dBQL';

    const selectedYearParam = selectedYear || '';

    // Obtener el siguiente año
    const nextYear = parseInt(selectedYearParam, 10) + 1;
    
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': token,
        },
        body: JSON.stringify({
            fechaInicio: `${selectedYearParam}-12-01`,
            fechaFin: `${nextYear}-11-30`,
        }),
    }; 
    try {
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        throw error;
    }
};
