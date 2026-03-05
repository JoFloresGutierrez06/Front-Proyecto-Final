'use client';
import { clearToken, getToken } from '@/lib/auth';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

function NavLink({ href, children}) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link 
            href={href}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${isActive ? 
                'bg-slate-200 text-slate-900 font-bold' 
              : 'text-slate-200 hover:bg-slate-800 hover:text-white'}`}
            >
            {children}
        </Link>
    );
}

export default function Navbar() {
  const router = useRouter();
  // const token = getToken();

  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const storedToken = getToken();

    if (storedToken) {
      setToken(storedToken);

      try {
        const decoded = jwtDecode(storedToken);
        // console.log(decoded);
        setRole(decoded.role || decoded.rol); // asegurar que el back mande rol en el token
      } catch (err) {
        console.error("Token inválido");
      }
    }
    router.refresh();
    setMounted(true);
  }, [pathname]);
  
  const handleLogout = () => {
    clearToken();
    setToken(null);
    setRole(null);
    router.replace("/");
    router.refresh();
  };

  // evita salto visual
  if (!mounted) return null;

  return (
    <header className='bg-amber-700 border-b'>
      <div className='container mx-auto flex items-center justify-between py-4 px-4'>
        <Link href="/" className='text-xl font-bold bg-slate-900 pt-1.5 pb-1.5 pr-2 pl-2 rounded-xl text-white '>ATTOR</Link>
        <nav className='flex items-center gap-1'>
          <NavLink href="/">Inicio</NavLink>
          <NavLink href="/obras">Obras</NavLink>

          {token && (role === "admin" || role === "autor")  && (
            <NavLink href="/obras/gestion">Gestionar Obras</NavLink>
          )}

          <NavLink href="/contacto">Contacto</NavLink>   

          {token ? (
            <>
              <button onClick={handleLogout} className="px-3 py-2 rounded-md text-sm font-bold bg-slate-800 text-white hover:bg-red-900 hover:text-white transition-all">
                Logout
              </button>
            </>
          ) : (
            <NavLink href="/login">Login</NavLink>
          )}

        </nav>
      </div>
    </header>
  );
}