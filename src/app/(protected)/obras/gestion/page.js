import { getAllObras } from '../../../utils/api/getAllObras';
import Link from 'next/link';
import ObraCard from '../../../../components/UI/ObraCard';
import Button from '@/components/UI/Button';

export default async function GestionObrasPage() {

    const obras = await getAllObras();

    return (
        <main className="p-4">
            <div className='grid grid-cols-2 gap-10 md:flex md:justify-between md:items-center mb-4'>
                <div>
                    <h1 className="text-2xl font-bold">Obras</h1>
                    {obras.length === 0 && <p>No hay obras</p>}
                    <p className='mb-2'>Total de obras: {obras.length}</p>
                </div>
                <Link href="/obras/nuevo"><Button className="ml-2">Crear Obra</Button></Link>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {obras.map((obra) => (
                    <ObraCard key={obra.id} obra={obra} />
                ))}
            </ul>
        </main>
    );
}