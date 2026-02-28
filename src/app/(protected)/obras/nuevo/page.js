'use client';

import { useState } from 'react';
import { apiFetch } from '@/lib/api';
import StatusBox from '@/components/StatusBox';
import { useRouter } from 'next/navigation';
import { clearToken } from '@/lib/auth';
import Button from '@/components/UI/Button';
import Input from '@/components/UI/Input';

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
        if (!titulo.trim()) return 'Nombre requerido';
        if (!autor.trim()) return 'Autor requerido';
        if (!descripcion.trim()) return 'Descripción requerida';
        if (!portada.trim()) return 'Portada requerida';
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

            await apiFetch('/obras', {
                method: 'POST',
                body: JSON.stringify({ titulo: titulo.trim(), autor: autor.trim(), descripcion: descripcion.trim(), portada: portada.trim() })
            });

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
            <h1>Nueva Obra</h1>

            <form onSubmit={crear}>
                <div>
                    <Input
                        placeholder='Titulo'
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                </div>
                <div>
                    <Input
                        placeholder='Autor'
                        value={autor}
                        onChange={(e) => setAutor(e.target.value)}
                    />
                </div>
                <div>
                    <Input
                        placeholder='Descripción'
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                </div>
                <div>
                    <Input
                        placeholder='Portada'
                        value={portada}
                        onChange={(e) => setPortada(e.target.value)}
                    />
                </div>
                <Button type="submit" disabled={loading}>{loading ? 'Creando...' : 'Crear'}</Button>
            </form>
            <StatusBox loading={loading} error={error} success={success} />
        </main>
    );
}