import { API } from '@/config';

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
      <h1>{obra.titulo}</h1>
      <p> Autor: {obra.autor} </p>
      <p> Descripción: { obra.descripcion}</p>
      <p> Portada: {obra.portada}</p>
    </main>
  );
}