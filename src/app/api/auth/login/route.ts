import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { generateToken, validateCredentials, COOKIE_NAME } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Delay para evitar brute force
    await new Promise(resolve => setTimeout(resolve, 800));

    const isValid = await validateCredentials(email, password);

    if (isValid) {
      const token = await generateToken({ email, role: 'admin' });
      
      const cookieStore = await cookies();
      cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 dias
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, error: 'Credenciais inválidas. Tente novamente.' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erro interno ao processar login.' },
      { status: 500 }
    );
  }
}
