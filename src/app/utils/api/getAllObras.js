// Tercera versión con apiFetch para revisar token y permisos, pero con paginación.
import { apiFetch } from '@/lib/api';

export async function getAllObras(page) {
  const res = await apiFetch(`/obras/all?page=${page}&limit=6`);
  return res;
}

// Segunda versión con apiFetch para revisar token y permisos.
/* import { apiFetch } from '@/lib/api';

export async function getAllObras() {
  return await apiFetch('/obras/all');
}
 */
// Primera versión sin revisar token. Se descartó la opción de usar fetch directo porque no cumprueba el token/permiso
/* import { API } from '@/config';

export async function getAllObras() {
    
    const res = await fetch(`${API}/obras/all`);
    console.log("Res =", res);
    if (!res.ok) {
        throw new Error('Error al cargar obras');
    }
    return res.json();
} */