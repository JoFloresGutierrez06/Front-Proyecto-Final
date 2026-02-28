import { getAllObras } from '../../../utils/api/getAllObras';
import Link from 'next/link';
import ObraCard from '../../../../components/UI/ObraCard';

export default async function GestionObrasPage() {

    const obras = await getAllObras();

    return (
        <main className="p-4">

            <h1 className="text-2xl font-bold">Obras</h1>

            {obras.length === 0 && <p>No hay obras</p>}

            <p className='mb-2'>Total de obras: {obras.length}</p>

            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {obras.map((obra) => (
                    <ObraCard key={obra.id} obra={obra} />
                ))}
            </ul>
        </main>
    );
}