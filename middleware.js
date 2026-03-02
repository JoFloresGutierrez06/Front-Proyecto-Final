import { NextResponse } from "next/server";

export function middleware(request) {
  console.log("¡EL MIDDLEWARE ESTÁ VIVO! Visitando:", request.nextUrl.pathname);
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
/* import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const role =
    req.cookies.get("role")?.value ||
    req.cookies.get("rol")?.value ||
    null;

    console.log("Middleware ejecutado. Token:", token, "Role:", role);
  const url = req.nextUrl.pathname;

  // Si ya está logueado, no permitir volver a /login
  if (url === "/login" && token) {
    console.log("Redirigiendo desde middleware porque ya hay token");
    return NextResponse.redirect(new URL("/", req.url));
  }

  const rutasProtegidas = [
    "/obras/gestion",
    "/obras/nuevo",
    "/obras/editar",
  ];

  // Comprobamos si la ruta actual empieza con alguna de las protegidas
  const esProtegida = rutasProtegidas.some(r => url.startsWith(r));

  if (esProtegida) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (role !== "autor" && role !== "admin") {
      console.log("Redirigiendo desde middleware por rol insuficiente. Role actual:", role);
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

// Configuración del Matcher: Define en qué rutas se debe ejecutar este middleware
export const config = {
  matcher: [
    '/obras/:path*', 
    '/login'
  ],
}; */