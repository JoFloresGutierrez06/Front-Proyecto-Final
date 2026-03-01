"use client";

import { useEffect, useState } from "react";

export default function FraseAleatoria() {
  const [frase, setFrase] = useState(null);

  useEffect(() => {
    async function fetchFrase() {
      try {
        const res = await fetch("https://api.adviceslip.com/advice");
        const data = await res.json();
        setFrase(data.slip.advice);
      } catch (e) {
        setFrase("No se pudo cargar la frase.");
      }
    }

    fetchFrase();
  }, []);

  return (
    <div className="w-full bg-amber-100 border border-amber-300 text-amber-900 p-4 rounded mb-6 shadow">
      <p className="text-center italic font-medium">
        {frase || "Cargando frase..."}
      </p>
    </div>
  );
}

import { getObras } from '../utils/api/getObras';
import Link from 'next/link';
import ObraCard from '@/components/UI/ObraCard';

export default async function ObrasPage() {

  const obras = await getObras();

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