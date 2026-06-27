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
    url.pathname = `/admin${url.pathname === '/' ? '' : url.pathname}`;
    isRewrite = true;
    isAdminRoute = true;
  }

  // PROTEÇÃO DO PAINEL ADMIN
  if (isAdminRoute) {
    const basicAuth = req.headers.get('authorization');
    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');
      
      const validUser = process.env.ADMIN_USER || 'admin@borapassageiroxinguara.com.br';
      const validPwd = process.env.ADMIN_PASSWORD || 'bolacha123';

      if (user === validUser && pwd === validPwd) {
        return isRewrite ? NextResponse.rewrite(url) : NextResponse.next();
      }
    }

    return new NextResponse('Acesso Negado. Credenciais inválidas.', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Painel Admin Bora"' },
    });
  }

  return isRewrite ? NextResponse.rewrite(url) : NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|assets).*)',
  ],
};
