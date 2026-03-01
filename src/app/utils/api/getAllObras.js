import { apiFetch } from '@/lib/api';

export async function getAllObras() {
  return await apiFetch('/obras/all');
}

// Se descartó la opción de usar fetch directo porque no cumprueba el token/permiso
/* import { API } from '@/config';

export async function getAllObras() {
    
    const res = await fetch(`${API}/obras/all`);
    console.log("Res =", res);
    if (!res.ok) {
        throw new Error('Error al cargar obras');
    }
    return res.json();
} */