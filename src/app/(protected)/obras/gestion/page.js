"use client"; // para acceder al local storage

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAllObras } from '@/app/utils/api/getAllObras'; //función que usa apiFetch
import Link from 'next/link';
import ObraCard from '@/components/UI/ObraCard';
import Button from '@/components/UI/Button';
import StatusBox from '@/components/StatusBox';
import { jwtDecode } from "jwt-decode";

// Se tendrá que seguir el ejemplo que hizo el profe en clase de que le puso una función asíncrona dentro de una normal para usarla en el cliente

export default function GestionObrasPage() {
    const [obras, setObras] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [token, setToken] = useState(null);
    const [rol, setRol] = useState(null);
    const router = useRouter();


    useEffect(() => {
        // Definir una función asíncrona interna para manejar la petición
        const cargarDatosYVerificarAcceso = async () => {
            try {
                // 1. Verificación de Seguridad Manual (Paso adicional para roles)
 
                const token = localStorage.getItem('token');
                const decoded = jwtDecode(token);
                console.log("Decoded ",decoded);
                console.log("Decoded rol: ",decoded.rol);

                // Filtro extra por si acaso: Si no hay token o el rol no es admin/autor, redirige al login
                if (!token || (decoded.rol !== 'admin' && decoded.rol !== 'autor')) {
                    router.push('/');
                    return;
                }
               
                // 2. Petición de datos
                const data = await getAllObras();
                setObras(data);
            } catch (error) {
                console.error("Error en la página de gestión:", error.message);
                // Si el error es 401 (Unauthorized), apiFetch limpia el token, asi que redirigimos al login
                if (error.status === 401) router.push('/login');
            } finally {
                setCargando(false);
            }
        };

        cargarDatosYVerificarAcceso();
    }, [router]);

    if (cargando) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl font-semibold">Verificando credenciales y cargando obras...</p>
            </div>
        );
    }

    return (
        <main className="p-4">
            <div className="grid grid-cols-2 gap-10 md:flex md:justify-between md:items-center mb-4">
                <div>
                    <h1 className="text-2xl font-bold">Gestión de Obras</h1>
                    <p className="mb-2 text-gray-600">Total de obras: {obras.length}</p>
                </div>
                <Link href="/obras/nuevo">
                    <Button className="ml-2">Crear Obra</Button>
                </Link>
            </div>

            {obras.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-gray-500">No hay obras registradas para gestionar.</p>
                </div>
            ) : (
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {obras.map((obra) => (
                        <ObraCard key={obra.id} obra={obra} />
                    ))}
                </ul>
            )}
        </main>
    );
}
/* import { getAllObras } from '../../../utils/api/getAllObras';
import Link from 'next/link';
import ObraCard from '../../../../components/UI/ObraCard';
import Button from '@/components/UI/Button';

export default async function GestionObrasPage() {

    const obras = await getAllObras();

    return (
        <main className="p-4">
            <div className='grid grid-cols-2 gap-10 md:flex md:justify-between md:items-center mb-4'>
                <div>
                    <h1 className="text-2xl font-bold">Obras</h1>
                    {obras.length === 0 && <p>No hay obras</p>}
                    <p className='mb-2'>Total de obras: {obras.length}</p>
                </div>
                <Link href="/obras/nuevo"><Button className="ml-2">Crear Obra</Button></Link>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {obras.map((obra) => (
                    <ObraCard key={obra.id} obra={obra} />
                ))}
            </ul>
        </main>
    );
} */