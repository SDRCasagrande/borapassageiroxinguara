import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get('host') || '';

  // 1. Subdomínio RANKING (Gamificação)
  if (hostname.startsWith('ranking.')) {
    url.pathname = `/ranking${url.pathname === '/' ? '' : url.pathname}`;
    return NextResponse.rewrite(url);
  } 
  // 2. Subdomínio MOTORISTA
  else if (hostname.startsWith('motorista.')) {
    url.pathname = `/motorista${url.pathname === '/' ? '' : url.pathname}`;
    return NextResponse.rewrite(url);
  } 
  // 3. Subdomínio PASSAGEIRO
  else if (hostname.startsWith('passageiro.')) {
    url.pathname = `/passageiro${url.pathname === '/' ? '' : url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|assets).*)',
  ],
};
