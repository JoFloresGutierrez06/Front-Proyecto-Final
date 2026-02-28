import { getObras } from '../utils/api/getObras';
import Link from 'next/link';

export default async function ObrasPage() {

  const obras = await getObras();

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">Obras</h1>

      {obras.length === 0 && <p>No hay obras</p>}

      Total de obras: {obras.length}

      <ul className="list-disc">
        {obras.map((obra) => (
          <li key={obra.id} className=" mt-3">
            {obra.titulo} - 
            <span className="text-sm text-gray-400"> ${obra.autor}</span>
            <Link href={`/obras/${obra.id}`}>Ver detalles</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}