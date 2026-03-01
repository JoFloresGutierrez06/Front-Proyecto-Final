// Página de obras publicadas
// API a utilizar https://api.adviceslip.com/advice

import { getObras } from '../utils/api/getObras';
import Link from 'next/link';
import ObraCard from '@/components/UI/ObraCard';
import FraseAleatoria from '@/components/FraseAleatoria'; // api de frases

export default async function ObrasPage() {

  const obras = await getObras();

  return (
    <main className="p-4">

      <p className='font-bold m-2'>Comentarios recientes de los lectores: </p>
      <FraseAleatoria />
      <FraseAleatoria />

      <h1 className="text-2xl font-bold">Obras</h1>

      {obras.length === 0 && <p>No hay obras</p>}

      <p className='mb-2'>Total de obras: {obras.length}</p>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {obras.map((obra) => (
          <ObraCard key={obra.id} obra={obra} />
        ))}
      </ul>

      {/* <ul className="grid md:grid-cols-3 gap-4">
        {obras.map((obra) => (
          <ObraCard>
            <li key={obra.id} className=" mt-3">
              {obra.portada && <img src={obra.portada} alt={`${obra.titulo} portada`} className="w-16 h-16 object-cover rounded mr-3 inline-block" />}
              {obra.titulo} - 
              <span className="text-sm text-gray-400"> {obra.autor}</span>
              <Link className='block text-amber-500 underline' href={`/obras/${obra.id}`}>Ver detalles</Link>
            </li>
          </ObraCard>
        ))}
      </ul> */}
    </main>
  );
}