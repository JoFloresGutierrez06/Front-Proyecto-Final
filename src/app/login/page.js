'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { API } from '@/config';
import { getToken, setToken } from '@/lib/auth';
import { jwtDecode } from 'jwt-decode'; // Importamos para extraer el rol
import Cookies from 'js-cookie'; // Importamos para que el Middleware pueda leerlo
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
        const token = getToken();
        if (token) {
            router.replace('/obras/gestion');
        }
    }, [router]);

    const login = async (ev) => {
        ev.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const res = await fetch(`${API}/users/login`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ user, password })
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                setError(data.error || 'Credenciales incorrectas');
                setLoading(false);
                return;
            }

            // 1. Guardar en LocalStorage (para tus componentes actuales)
            setToken(data.token);
            localStorage.setItem('user', data.token); // Guardamos el JWT como string

            // 2. Decodificar para obtener el rol
            const decoded = jwtDecode(data.token);
            const userRole = decoded.rol || decoded.role; // Soporta ambos nombres

            // 3. GUARDAR EN COOKIES (Para que el Middleware funcione en producción)
            // Seteamos una expiración de 7 días o la que prefieras
            Cookies.set('token', data.token, { expires: 7 });
            Cookies.set('role', userRole, { expires: 7 });

            setSuccess('Login Correcto');
            
            // Redirigimos a la página principal o gestión según desees
            router.replace('/obras'); 
            
        } catch (err) {
            setError('Error de red / API no disponible');
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="p-4 flex flex-col items-center">
            <ClassicCard title="Iniciar sesión" className="w-full max-w-md text-center">
                <p className='italic text-amber-600 mb-2'>¡Estás a un solo paso de las mejores historias!</p>

                <form onSubmit={login}>
                    <label className='block text-left mb-1 mt-1 font-medium' htmlFor='user'>Usuario</label>
                    <Input className='mb-2' id='user' value={user} placeholder="Nombre de usuario" onChange={e => setUser(e.target.value)} />
                    
                    <label className='block text-left mb-1 mt-1 font-medium' htmlFor='password'>Contraseña</label>
                    <Input className='mb-2' id='password' type="password" value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} />
                    
                    <Button type='submit'>{ loading ? 'Entrando...' : 'Entrar' }</Button>
                </form>
            </ClassicCard>
        
            <div className='mt-3'>
                <StatusBox loading={loading} error={error} success={success} />
            </div>
        </main>
    );
}

/* 'use client';
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
            router.replace('/obras'); // cuando el loin es correcto redirige a obras
            
        } catch (err) {
            setError('Error de red / API no disponible');
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="p-4 flex flex-col items-center">
            <ClassicCard title="Iniciar sesion" className="w-full max-w-md text-center">
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
*/ 