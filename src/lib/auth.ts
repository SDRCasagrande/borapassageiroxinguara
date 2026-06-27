import { SignJWT, jwtVerify } from 'jose';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

/**
 * Biblioteca de autenticação JWT para o painel admin.
 * 
 * Credenciais armazenadas no PostgreSQL (tabela AdminUser) com senha bcrypt.
 * Variável de ambiente necessária:
 * - JWT_SECRET: Chave secreta para assinar/verificar tokens JWT
 */

const COOKIE_NAME = 'admin_token';
const TOKEN_EXPIRY = '7d'; // 7 dias

function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.warn('[auth] JWT_SECRET não configurado! Usando fallback inseguro.');
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
 * Valida credenciais contra o banco de dados (AdminUser).
 * Senha verificada com bcrypt.
 */
export async function validateCredentials(email: string, password: string): Promise<boolean> {
  try {
    const user = await prisma.adminUser.findUnique({
      where: { email, ativo: true },
    });

    if (!user) return false;

    return bcrypt.compareSync(password, user.password);
  } catch (error) {
    console.error('[auth] Erro ao validar credenciais:', error);
    return false;
  }
}

/**
 * Cria o admin padrão se nenhum existe no banco.
 * Chamado pelo seed.
 */
export async function seedAdminUser() {
  const count = await prisma.adminUser.count();
  if (count === 0) {
    const hashedPassword = bcrypt.hashSync('bolacha123', 12);
    await prisma.adminUser.create({
      data: {
        email: 'admin@borapassageiroxinguara.com.br',
        password: hashedPassword,
        nome: 'Administrador',
        ativo: true,
      },
    });
    console.log('[auth] Admin padrão criado: admin@borapassageiroxinguara.com.br');
  }
}

export { COOKIE_NAME };
