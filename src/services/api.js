
const BASE_URL = 'http://127.0.0.1:5000/api';

export const apiFetch = async (endpoint, options = {}) => {
    const url = `${BASE_URL}${endpoint}`;
    
    // Cuando manejamos tokens de sesión en el futuro, se inyectan aquí automáticamente
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    const response = await fetch(url, { ...options, headers });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Ocurrió un error en el servidor');
    }

    return data;
};