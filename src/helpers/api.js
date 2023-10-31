export const fetchDataFromAPI = async (selectedYear) => {
    const url = 'https://serveless.proximateapps-services.com.mx/casaur/prod/api/calendar/getspanishevents';
    const token = '03cBcETqak5Vis4ORGf3oanH8Ty9IroT5887dBQL';

    const selectedYearParam = selectedYear || '';
    
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': token,
        },
        body: JSON.stringify({
            fechaInicio: `${selectedYearParam}-01-01`,
            fechaFin: `${selectedYearParam}-12-31`,
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
