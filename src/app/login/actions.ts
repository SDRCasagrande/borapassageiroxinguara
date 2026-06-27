'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const validUser = process.env.ADMIN_USER || 'admin@borapassageiroxinguara.com.br';
  const validPwd = process.env.ADMIN_PASSWORD || 'bolacha123';

  // Adiciona um pequeno delay para evitar brute force e dar feedback visual da animação
  await new Promise(resolve => setTimeout(resolve, 800));

  if (email === validUser && password === validPwd) {
    const cookieStore = await cookies();
    // Em produção, isso deveria ser um JWT ou token seguro. Para um admin simples com senha de ambiente, basta um valor de autenticação.
    cookieStore.set('admin_token', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 semana
    });

    return { success: true };
  }

  return { success: false, error: 'Credenciais inválidas. Tente novamente.' };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_token');
  redirect('/login');
}
