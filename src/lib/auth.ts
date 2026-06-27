import { SignJWT, jwtVerify } from 'jose';

/**
 * Biblioteca de autenticação JWT para o painel admin.
 * 
 * Variáveis de ambiente necessárias:
 * - JWT_SECRET: Chave secreta para assinar/verificar tokens JWT (OBRIGATÓRIO em produção)
 * - ADMIN_USER: Email do admin (fallback: admin@borapassageiroxinguara.com.br)
 * - ADMIN_PASSWORD: Senha do admin (fallback: bolacha123)
 */

const COOKIE_NAME = 'admin_token';
const TOKEN_EXPIRY = '7d'; // 7 dias

function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.warn('[auth] JWT_SECRET não configurado! Usando fallback inseguro. Defina JWT_SECRET no ambiente de produção.');
    return new TextEncoder().encode('bora-passageiro-dev-secret-change-in-production');
  }
  return new TextEncoder().encode(secret);
}

/**
 * Gera um token JWT assinado com os dados do admin
 */
export async function generateToken(payload: { email: string; role: string }): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .setIssuer('bora-passageiro')
    .setSubject(payload.email)
    .sign(getJwtSecret());
}

/**
 * Verifica e decodifica um token JWT.
 * Retorna o payload se válido, null se inválido/expirado.
 */
export async function verifyToken(token: string): Promise<{ email: string; role: string } | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret(), {
      issuer: 'bora-passageiro',
    });
    return {
      email: payload.email as string,
      role: payload.role as string,
    };
  } catch {
    return null;
  }
}

/**
 * Valida as credenciais do admin
 */
export function validateCredentials(email: string, password: string): boolean {
  const validUser = process.env.ADMIN_USER || 'admin@borapassageiroxinguara.com.br';
  const validPwd = process.env.ADMIN_PASSWORD || 'bolacha123';
  
  if (!process.env.ADMIN_USER || !process.env.ADMIN_PASSWORD) {
    console.warn('[auth] ADMIN_USER e/ou ADMIN_PASSWORD não configurados. Usando credenciais padrão inseguras.');
  }

  return email === validUser && password === validPwd;
}

export { COOKIE_NAME };
