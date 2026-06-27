import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const COOKIE_NAME = 'admin_token';

function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return new TextEncoder().encode('bora-passageiro-dev-secret-change-in-production');
  }
  return new TextEncoder().encode(secret);
}

/**
 * Verifica o JWT no middleware (Edge Runtime).
 * Retorna true se o token é válido e não expirou.
 */
async function isAuthenticated(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;

  try {
    await jwtVerify(token, getJwtSecret(), { issuer: 'bora-passageiro' });
    return true;
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get('host') || '';

  let isRewrite = false;
  let isAdminRoute = url.pathname.startsWith('/admin');
  let isApiProtected = false;

  // 1. Subdomínio RANKING (Gamificação)
  if (hostname.startsWith('ranking.')) {
    if (!url.pathname.startsWith('/ranking')) {
      url.pathname = `/ranking${url.pathname === '/' ? '' : url.pathname}`;
    }
    isRewrite = true;
  } 
  // 2. Subdomínio MOTORISTA
  else if (hostname.startsWith('motorista.')) {
    if (!url.pathname.startsWith('/motorista')) {
      url.pathname = `/motorista${url.pathname === '/' ? '' : url.pathname}`;
    }
    isRewrite = true;
  } 
  // 3. Subdomínio PASSAGEIRO
  else if (hostname.startsWith('passageiro.')) {
    if (!url.pathname.startsWith('/passageiro')) {
      url.pathname = `/passageiro${url.pathname === '/' ? '' : url.pathname}`;
    }
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

  // Proteger APIs administrativas (motorista-lead admin actions, etc.)
  if (url.pathname.startsWith('/api/admin')) {
    isApiProtected = true;
  }

  // PROTEÇÃO DO PAINEL ADMIN — Valida JWT
  if (isAdminRoute || isApiProtected) {
    const authenticated = await isAuthenticated(req);
    
    if (!authenticated) {
      if (isApiProtected) {
        // Retorna 401 para APIs protegidas
        return NextResponse.json(
          { error: 'Não autorizado. Faça login primeiro.' }, 
          { status: 401 }
        );
      }
      // Redireciona para login
      const loginUrl = new URL('/login', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return isRewrite ? NextResponse.rewrite(url) : NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api/logout|api/motorista-lead|_next/static|_next/image|favicon.ico|assets).*)',
  ],
};
