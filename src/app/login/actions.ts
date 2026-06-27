'use server';

import { cookies } from 'next/headers';
import { generateToken, validateCredentials, COOKIE_NAME } from '@/lib/auth';

/**
 * Server action de login — valida credenciais e gera JWT
 */
export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Delay para evitar brute force
  await new Promise(resolve => setTimeout(resolve, 800));

  if (validateCredentials(email, password)) {
    const token = await generateToken({ email, role: 'admin' });
    
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    });

    return { success: true };
  }

  return { success: false, error: 'Credenciais inválidas. Tente novamente.' };
}
