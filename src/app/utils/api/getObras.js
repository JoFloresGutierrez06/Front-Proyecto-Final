import { API } from '@/config';

export async function getObras() {

    console.log("API =", API);
    const res = await fetch(`${API}/obras`);
    if (!res.ok) {
        throw new Error('Error al cargar obras');
    }

    return res.json();
}