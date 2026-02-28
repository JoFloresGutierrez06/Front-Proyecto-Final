import Link from 'next/link';
import Card from '@/components/UI/Card';
import Button from '@/components/UI/Button';

export default function HomePage() {

  return (
    <div className='grid gap-6'>
      <div>
        <h1 className='text-3xl font-bold mb-4'>¡Descubre y publica obras nuevas!</h1>
        <p className='text-lg text-slate-700'>Tu espacio para crear, publicar y leer obras editoriales en diversos formatos.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card title="Comenzar a leer">
          <p className='mb-2'>Descubre y disfruta nuevas obras editoriales.</p>
          <Link href="/obras"><Button>Ver obras</Button></Link>
        </Card>

        <Card title="Comenzar a crear">
          <p className='mb-2'>Crea y publica tus propias obras editoriales.</p>
          <Link href="/login"><Button variant="secondary">Login</Button></Link>
          <Link href="/obras/nuevo"><Button className="ml-2">Crear Obra</Button></Link>
        </Card>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg text-center">
        <div className="flex justify-center items-center gap-2">
          <h2 className="text-gray-800">¿Eres nuevo?</h2>
          <Link href="/registro" className="text-amber-600 underline hover:text-amber-700">
            Crear cuenta
          </Link>
        </div>

        <p className="text-slate-600 mt-2">
          Regístrate para comenzar a crear y publicar tus propias obras editoriales.
        </p>
      </div>
    </div>
  );
}