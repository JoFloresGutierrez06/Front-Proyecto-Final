'use client';

import { useState } from 'react';
import { apiFetch } from '@/lib/api';
import StatusBox from '@/components/StatusBox';
import { useRouter } from 'next/navigation';
import { clearToken } from '@/lib/auth';
import Button from '@/components/UI/Button';
import Input from '@/components/UI/Input';
import ClassicCard from '@/components/UI/ClassicCard';
import Link from 'next/link';

export default function NuevaObraPage() {
    const router = useRouter();

    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [portada, setPortada] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    function validar() {
        if (!titulo.trim()) return 'Titulo requerido';
        if (!autor.trim()) return 'Autor requerido';
        if (!descripcion.trim()) return 'Descripción requerida';
        // if (!portada.trim()) return 'Portada requerida';
        return '';
    }

    const crear = async (ev) => {
        ev.preventDefault();
        setError('');
        setSuccess('');

        const v = validar();
        if (v) {
            setError(v);
            return;
        }

        setLoading(true);
        try {

            const data = {
                titulo: titulo.trim(),
                autor: autor.trim(),
                descripcion: descripcion.trim(),
            };

            if (portada.trim()) {
                data.portada = portada.trim();
            }

            await apiFetch('/obras', {
                method: 'POST',
                body: JSON.stringify(data)
            });
           /*  await apiFetch('/obras', {
                method: 'POST',
                body: JSON.stringify({ titulo: titulo.trim(), autor: autor.trim(), descripcion: descripcion.trim(), portada: portada.trim() })
            }); */

            setSuccess('Obra creada correctamente');
            setTitulo('');
            setAutor('');
            setDescripcion('');
            setPortada('');
        } catch (error) {
            if (error.status === 403) {
                setError('No autorizado, necesitas rol de autor o admin');
                return;
            }
            if (error.status === 401) {
                clearToken();
                router.replace('/login');
                return;
            }
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className='flex flex-col'>
            {/* <h1>Nueva Obra</h1> */}
            <ClassicCard title="Crear nueva obra" className="w-full max-w-md text-center">

                <form onSubmit={crear}>
                    <div>
                        <label className='block text-left mb-1 mt-1 font-medium' htmlFor='titulo'>Título</label>
                        <Input
                            placeholder='Título'
                            id='titulo'
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className='block text-left mb-1 mt-1 font-medium' htmlFor='autor'>Autor</label>
                        <Input
                            placeholder='Autor'
                            id='autor'
                            value={autor}
                            onChange={(e) => setAutor(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className='block text-left mb-1 mt-1 font-medium' htmlFor='descripcion'>Descripción</label>
                        <Input
                            placeholder='Descripción'
                            id='descripcion'
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className='block text-left mb-1 mt-1 font-medium' htmlFor='portada'>Portada (opcional)</label>
                        <Input
                            placeholder='Portada'
                            id='portada'
                            value={portada}
                            onChange={(e) => setPortada(e.target.value)}
                        />
                    </div>
                    <Link href="/obras/gestion" className='block text-amber-500 underline mt-2'>Regresar</Link>
                    <Button className='mt-3' type="submit" disabled={loading}>{loading ? 'Creando...' : 'Crear'}</Button>
                </form>
            </ClassicCard>

            <div className='mt-3'>
                <StatusBox loading={loading} error={error} success={success} />
            </div>
        </main>
    );
}