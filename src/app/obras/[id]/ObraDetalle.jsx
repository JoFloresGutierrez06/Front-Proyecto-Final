"use client";

import Link from "next/link";
import { API } from "@/config";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import StatusBox from "@/components/StatusBox";

export default function ObraDetalle({ obra }) {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const t = getToken();
    if (t) {
      setToken(t);
      try {
        const decoded = jwtDecode(t);
        setRole(decoded.role || decoded.rol);
      } catch {}
    }
  }, []);

  async function handleDelete() {
    if (!confirm("¿Seguro que deseas eliminar esta obra?")) return;

    const res = await fetch(`${API}/obras/${obra.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) router.replace("/obras/gestion");
    else {
      alert("Error al eliminar");
      
    }
  }

  if (!obra) return <p>Obra no encontrada</p>;

  const fecha = new Date(obra.created_at).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="w-full max-w-2xl bg-white shadow rounded p-6">
      <Link href="/obras" className="text-amber-600 underline mb-4 block">
        ← Volver
      </Link>

      {token && (role === "autor" || role === "admin") && (
        <div className="flex gap-2 mb-4">
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

      {obra.portada && (
        <img
          src={obra.portada}
          alt={obra.titulo}
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}

      <h1 className="text-3xl font-bold mb-2">{obra.titulo}</h1>
      <p className="text-gray-600 mb-1"><strong>Autor:</strong> {obra.autor}</p>
      <p className="text-gray-600 mb-4"><strong>Fecha:</strong> {fecha}</p>
      <p className="text-gray-800">{obra.descripcion}</p>
    </div>
  );
}