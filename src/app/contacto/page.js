import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";

export default function ContactoPage() {
    return (
        <main>
            <form className="bg-white border border-slate-200 rounded-2xl shadow-sm max-w-2xl mx-auto p-4 bg-gray-50 rounded-lg mt-6">
                <h1 className="text-2xl font-bold p-4">Contacto</h1>
                <p className="mb-4 text-amber-700">¿Tienes alguna sugerencia o comentario? <i>¡Te escuchamos!</i></p>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="nombreContacto">Nombre:</label>
                        <Input id="nombreContacto" type="text" placeholder="Tu nombre" />
                    </div>
                    <div>
                        <label htmlFor="correoContacto">Correo:</label>
                        <Input id="correoContacto" type="email" placeholder="tu@correo.com" />
                    </div>
                    <div>
                        <label htmlFor="mensaje">Comentario:</label>
                        <textarea className="bg-white w-full px-3 py-2 rounded-lg border border-slate-200 bg-white' focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent" rows="5" id="textArea" placeholder="Tus sugerencias aquí..."></textarea>
                    </div>
                    <div className="m-4 text-center">
                        <Button type="button">Enviar</Button>
                    </div>
                    <p className="italic text-sm text-amber-700 text-center">
                        Nota: Por el momento este formulario no es funcional.
                    </p>
                </div>
            </form>
        </main>
    );
}
