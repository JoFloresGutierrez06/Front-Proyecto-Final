'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { API } from '@/config';
import { getToken, setToken } from '@/lib/auth';
import StatusBox from '@/components/StatusBox';
import Button from '@/components/UI/Button';
import Input from '@/components/UI/Input';
import ClassicCard from '@/components/UI/ClassicCard';

export default function LoginPage() {
    const router = useRouter();

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        // Si ya hay token, redirige a obras
        const token = getToken();
        if (token) {
        router.replace('/obras/gestion');
        }
        return;
    }, [router]);

    const login = async (ev) => {
        ev.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const res = await fetch(`${API}/users/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                user,
                password
            })
            });

            const data = await res.json().catch(()=>({}));

            if (!res.ok) {
                setError(data.error || 'Credenciales incorrectas');
                return;
            }
            setToken(data.token);
            setSuccess('Login Correcto');
            router.replace('/obras');
            
        } catch (err) {
            setError('Error de red / API no disponible');
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="p-4 flex flex-col items-center">
            <ClassicCard title="Iniciar sesion" className="w-full max-w-md text-center">
                {/* <h1>Login</h1> */}
                <p className='italic text-amber-600 mb-2'>¡Estás a un solo paso de las mejores historias!</p>

                <form onSubmit={login}>
                    <label className='block text-left mb-1 mt-1 font-medium' htmlFor='user'>Usuario</label>
                    <Input className='mb-2' id='user' value={user} placeholder="Nombre de usuario" onChange={e => setUser(e.target.value)} />
                    <label className='block text-left mb-1 mt-1 font-medium' htmlFor='password'>Contraseña</label>
                    <Input className='mb-2' id='password' value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} />
                    <Button type='submit' alt="Entrar">{ loading ? 'Entrando...' : 'Entrar' }</Button>
                </form>
            </ClassicCard>
        
        <div className='mt-3'>
            <StatusBox loading={loading} error={error} success={success} />
        </div>
        </main>
    );
}