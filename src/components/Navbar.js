'use client';
import { clearToken, getToken } from '@/lib/auth';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

function NavLink({ href, children}) {
    const pathname = usePathname();
    const isActive = pathname === href;
    return (
        <Link 
            href={href}
            className={`px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-slate-200 text-slate-900 font-bold' : 'text-slate-200 hover:bg-slate-800 hover:text-white'}`}
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
        <Link href="/" className='text-xl font-bold bg-slate-900 pt-1.5 pb-1.5 pr-2 pl-2 rounded-xl text-white '>ATTOR</Link>
        <nav className='flex items-center gap-1'>
          <NavLink href="/">Inicio</NavLink>
          <NavLink href="/obras">Obras</NavLink>
          <NavLink href="/contacto">Contacto</NavLink>

          {token ? (
            <>
              <NavLink href="/obras/nuevo">Crear Obra</NavLink>
              <button onClick={handleLogout} className="px-3 py-2 rounded-md text-sm font-bold bg-slate-800 text-white hover:bg-red-900 hover:text-white">
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