import Link from 'next/link';
import Card from '@/components/UI/Card';
import Button from '@/components/UI/Button';

export default function HomePage() {

  return (
    <div className='grid gap-6'>
      <div>
        <h1 className='text-3xl font-bold mb-4'>Bienvenido a Attor</h1>
        <p className='text-lg text-slate-700'>Tu espacio para crear, publicar y leer obras editoriales en diversos formatos.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card title="Explorar Obras">
          <p>Descubre y disfruta nuevas obras editoriales.</p>
          <Link href="/obras"><Button>Ver obras</Button></Link>
        </Card>

        <Card title="Autores y Creadores">
          <p>Crea y publica tus propias obras editoriales.</p>
          <Link href="/login"><Button variant="secondary">Login</Button></Link>
          <Link href="/obras/nuevo"><Button className="ml-2">Crear Obra</Button></Link>
        </Card>
      </div>
    </div>
  );
}