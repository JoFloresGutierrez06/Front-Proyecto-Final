// Card naranja

export default function Card({ title, children, className = '' }) {
    return (
        <section className={`bg-white border border-slate-200 rounded-2xl shadow-sm ${className}`}>
            {title ? (
                <div className="px-5 py-4 border-b bg-amber-600 text-white rounded-t-2xl">
                <h2 className="font-semibold">{title}</h2>
                </div>)
                : null}
            
            <div className="px-5 py-4">
                {children}
            </div>
        </section>
    )
}