import { API } from "@/config";
import ObraDetalle from "./ObraDetalle";

async function getObraPorID(id) {
  const res = await fetch(`${API}/obras/${id}`, { cache: "no-store" });

  if (!res.ok) return null;
  return res.json();
}

export default async function ObraPage({ params }) {
  // const obra = await getObraPorID(params.id);
  const { id } = await params;
  const obra = await getObraPorID(id);
  // console.log("Obra:", obra);

  return (
    <main className="p-4 flex justify-center">
      <ObraDetalle obra={obra} />
    </main>
  );
}

/* import { API } from '@/config';
import Link from 'next/link';

async function getObraPorID(id) {
  const res = await fetch(`${API}/obras/${id}`);
  
  if (!res.ok) {
    throw new Error('Error al obtener obra');
  }
  return res.json();
}

async function handleDelete() {
  if (!confirm("¿Seguro que deseas eliminar esta obra?")) return;

  const res = await fetch(`http://localhost:3001/obras/${obra.id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.ok) {
    router.replace("/obras/gestion");
  } else {
    alert("Error al eliminar");
  }
}

export default async function ObraPage({ params }) {
  const { id } = await params;
  const obra = await getObraPorID(id);
  
  // console.log("API:", API);
  console.log("Obra:", obra);

  // Formatear fecha
  const fecha = new Date(obra.created_at).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <main className="p-4 flex justify-center">
      {token && (role === "autor" || role === "admin") && (
        <div className="flex gap-2 mt-4">
          <Link
            href={`/obras/editar/${obra.id}`}
            className="px-3 py-2 bg-blue-600 text-white rounded-md"
          >
            Editar
          </Link>

          <button
            onClick={handleDelete}
            className="px-3 py-2 bg-red-600 text-white rounded-md"
          >
            Eliminar
          </button>
        </div>
      )}
      <div className="w-full max-w-2xl bg-white shadow rounded p-6">

        <Link href="/obras" className="text-amber-600 underline hover:text-amber-700 block mb-4">
          ← Volver
        </Link>

        {obra.portada && (
          <img
            src={obra.portada}
            alt={obra.titulo}
            className="w-full h-64 object-cover rounded mb-4"
          />
        )}

        <h1 className="text-3xl font-bold mb-2">{obra.titulo}</h1>

        <p className="text-gray-600 mb-1">
          <strong>Autor:</strong> {obra.autor}
        </p>

        <p className="text-gray-600 mb-4">
          <strong>Fecha de creación:</strong> {fecha}
        </p>

        <p className="text-gray-800 leading-relaxed">
          {obra.descripcion}
        </p>

      </div>
    </main>
  );
}

/* import { API } from '@/config';
import Card from '@/components/UI/Card';
import Link from 'next/link';

async function getObraPorID(id) {

  const res = await fetch(`${API}/obras/${id}`);

  if (!res.ok) {
    throw new Error('Error al obtener obra');
  }
  return res.json();
}

export default async function ProductoPage({ params }) {
  const parametros = await params;
  const id = parametros.id;

  const obra = await getObraPorID(id);

  console.log(obra)

  return (
    <main>
      <Link href="/obras" className='text-amber-600 mb-3'> Volver</Link>
      <Card title={obra.titulo}>
        <p> <strong>Autor:</strong> {obra.autor} </p>
        <p> { obra.descripcion}</p>
        <p> <strong>Fecha de creación:</strong> { obra.created_at}</p>
        <p> Portada: {obra.portada}</p>
      </Card>
    </main>
  );
} */