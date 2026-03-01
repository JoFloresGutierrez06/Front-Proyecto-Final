"use client";

import { useEffect, useState } from "react";

export default function FraseAleatoria() {
    const [frase, setFrase] = useState(null);

    useEffect(() => {
        async function fetchFrase() {
        try {
            const res = await fetch("https://api.adviceslip.com/advice", {
            cache: "no-store"
            });
            const data = await res.json();
            setFrase(data.slip.advice);
        } catch (e) {
            setFrase("No se pudo cargar la frase.");
        }
        }

        fetchFrase();
    }, []);

    return (
        <div className="w-full bg-orange-100 border border-orange-300 text-orange-900 p-4 rounded mb-6 shadow">
        <p className="text-center italic font-medium">
            {frase || "Cargando frase..."}
            - lector anónimo
        </p>
        </div>
    );
}