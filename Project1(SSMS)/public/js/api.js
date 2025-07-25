const API_BASE = 'http://localhost:3001/api';

export async function fetchStations() {
    const response = await fetch(`${API_BASE}/stations`);
    return response.json();
}

export async function createStation(stationData) {
    const response = await fetch(`${API_BASE}/stations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stationData)
    });
    return response.json();
}

export async function fetchUsers() {
    const response = await fetch(`${API_BASE}/users`);
    return response.json();
}

// Add similar functions for regions, districts, groups