import { API } from '@/config';

export async function togglePublicar(id, estadoActual) {
  const res = await fetch(`${API}/obras/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${document.cookie
        .split("; ")
        .find((c) => c.startsWith("token="))
        ?.split("=")[1]}`
    },
    body: JSON.stringify({ publicado: !estadoActual }),
  });

  if (!res.ok) {
    throw new Error("No se pudo cambiar el estado de publicación");
  }

  return res.json();
}