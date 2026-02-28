import { API } from '@/config';

export async function getAllObras() {
    
    const res = await fetch(`${API}/obras/all`);
    console.log("Res =", res);
    if (!res.ok) {
        throw new Error('Error al cargar obras');
    }

    return res.json();
}