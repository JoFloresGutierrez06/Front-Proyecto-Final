"use client";

import { API } from "@/config";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getToken } from "@/lib/auth";
import Link from "next/link";
import ClassicCard from "@/components/UI/ClassicCard";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";

export default function EditarObraPage() {
  const { id } = useParams();
  const router = useRouter();
  const token = getToken();

  const [form, setForm] = useState({
    titulo: "",
    autor: "",
    descripcion: "",
    portada: "",
  });

  useEffect(() => {
    async function fetchObra() {
      const res = await fetch(`${API}/obras/${id}`);
      const data = await res.json();
      setForm({
        titulo: data.titulo,
        autor: data.autor,
        descripcion: data.descripcion,
        portada: data.portada || "",
      });
    }
    fetchObra();
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch(`${API}/obras/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.replace(`/obras/${id}`);
    } else {
      alert("Error al actualizar");
    }
  }

  return (
    <div className="container mx-auto p-4">
        <ClassicCard title="Editar Obra">
        
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <Input
                name="titulo"
                value={form.titulo}
                onChange={handleChange}
                className="border p-2"
                placeholder="Título"
                />

                <Input
                name="autor"
                value={form.autor}
                onChange={handleChange}
                className="border p-2"
                placeholder="Autor"
                />

                <Input
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                className="border p-2"
                placeholder="Descripción"
                />

                <Input
                name="portada"
                value={form.portada}
                onChange={handleChange}
                className="border p-2"
                placeholder="URL de portada"
                />

                <Button type="submit">
                Guardar
                </Button>
            </form>
        </ClassicCard>
    </div>
  );
}
