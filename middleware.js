import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const role =
    req.cookies.get("role")?.value ||
    req.cookies.get("rol")?.value ||
    null;

  const url = req.nextUrl.pathname;

  // Si ya está logueado, no permitir volver a /login
  if (url === "/login" && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const rutasProtegidas = [
    "/obras/gestion",
    "/obras/nuevo",
    "/obras/editar",
  ];

  const esProtegida = rutasProtegidas.some(r => url.startsWith(r));

  if (esProtegida) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (role !== "autor" && role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}