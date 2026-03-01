// Tarjeta de obra
import Link from "next/link";

export default function ObraCard({ obra }) {
  return (
    <li className="flex gap-4 items-start bg-white shadow rounded p-3">
      
      {obra.portada && (
        <img
          src={obra.portada}
          alt={obra.titulo}
          className="w-24 h-24 object-cover rounded"
        />
      )}

      <div className="flex-1">
        <h3 className="font-semibold text-lg">{obra.titulo}</h3>
        <p className="text-sm text-gray-500 mb-2">{obra.autor}</p>
        {obra.publicado && <p className="text-xs text-green-400 font-medium">{obra.publicado ? "Publicado" : "No publicado"}</p>}

        <Link
          className="text-amber-600 underline hover:text-amber-700"
          href={`/obras/${obra.id}`}
        > 
          Ver detalles
        </Link>
      </div>
    </li>
  );
}

/* export default function ObraCard({ title, children, className = '' }) {
  return (
    <section className={`bg-white border border-slate-200 rounded-2xl shadow-sm ${className}`}>
      {title ? (
        <div className="px-5 py-4 border-b">
          <h2 className="font-semibold">{title}</h2>
        </div>)
        : null}
      
      <div className="px-5 py-4">
        {children}
      </div>
    </section>
  )
} */
