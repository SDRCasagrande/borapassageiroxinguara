import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get('host') || '';

  let isRewrite = false;
  let isAdminRoute = url.pathname.startsWith('/admin');

  // 1. Subdomínio RANKING (Gamificação)
  if (hostname.startsWith('ranking.')) {
    url.pathname = `/ranking${url.pathname === '/' ? '' : url.pathname}`;
    isRewrite = true;
  } 
  // 2. Subdomínio MOTORISTA
  else if (hostname.startsWith('motorista.')) {
    url.pathname = `/motorista${url.pathname === '/' ? '' : url.pathname}`;
    isRewrite = true;
  } 
  // 3. Subdomínio PASSAGEIRO
  else if (hostname.startsWith('passageiro.')) {
    url.pathname = `/passageiro${url.pathname === '/' ? '' : url.pathname}`;
    isRewrite = true;
  }
  // 4. Subdomínio ADMIN
  else if (hostname.startsWith('admin.')) {
    // Se a rota for /login, não aplicamos a reescrita para /admin/login nem tratamos como rota protegida
    if (url.pathname !== '/login') {
      if (!url.pathname.startsWith('/admin')) {
        url.pathname = `/admin${url.pathname === '/' ? '' : url.pathname}`;
      }
      isAdminRoute = true;
    }
    isRewrite = true;
  }

  // PROTEÇÃO DO PAINEL ADMIN
  if (isAdminRoute) {
    const adminToken = req.cookies.get('admin_token')?.value;
    
    // Se não tem o cookie ou não é válido, redireciona para o login
    if (adminToken !== 'authenticated') {
      // Se já estamos no admin. dominio, manda pra /login nele mesmo,
      // Se for /admin normal, manda pra /login normal.
      const loginUrl = new URL('/login', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return isRewrite ? NextResponse.rewrite(url) : NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|assets).*)',
  ],
};
