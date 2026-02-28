'use client';
import { clearToken, getToken } from '@/lib/auth';
import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

function NavLink({ href, children}) {
    const pathname = usePathname();
    const isActive = pathname === href;
    return (
        <Link 
            href={href}
            className={`px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-slate-200 text-slate-900' : 'text-slate-800 hover:bg-slate-100 hover:text-slate-900 font-bold'}`}
            >
            {children}
        </Link>
    );
}

export default function Navbar() {
  const router = useRouter();
  const token = getToken();
  
  const handleLogout = () => {
    clearToken();
    router.replace('/login');
    router.refresh();
  };

  return (
    <header className='bg-amber-700 border-b'>
      <div className='container mx-auto flex items-center justify-between py-4 px-4'>
        <Link href="/" className='text-xl font-bold bg-slate-900 p-1.5 rounded-xl text-white'>ATTOR</Link>
        <nav className='flex items-center gap-2'>
          <NavLink href="/">Inicio</NavLink>
          <NavLink href="/obras">Obras</NavLink>
          <NavLink href="/contacto">Contacto</NavLink>

          {token ? (
            <>
              <NavLink href="/obras/nuevo">Crear Obra</NavLink>
              <button onClick={handleLogout} className="px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-100 hover:text-red-900">
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