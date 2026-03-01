export default function RegistroPage() {
    return (
        <main className="p-4">
            <h1 className="text-2xl font-bold">¡Proximamente!</h1>
            <p> Por el momento no está disponible la función de registro</p>
        </main>
    )
}

/* 'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { API } from '@/config';
import { getToken, setToken } from '@/lib/auth';
import StatusBox from '@/components/StatusBox';
import Button from '@/components/UI/Button';
import Input from '@/components/UI/Input';

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
        router.replace('/obras/nuevo');
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
        <main className="p-4">
        <h1>Login</h1>
        <form onSubmit={login}>
            <Input value={user} placeholder="Nombre de usuario" onChange={e => setUser(e.target.value)} />
            <Input value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <Button type='submit' alt="Entrar">{ loading ? 'Entrando...' : 'Entrar' }</Button>
        </form>
        
        <div className='mt-3'>
            <StatusBox loading={loading} error={error} success={success} />
        </div>
        </main>
    );
} */