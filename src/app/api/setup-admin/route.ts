import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    const email1 = 'admin@borapassageiro.com.br';
    const email2 = 'admin@borapassageiroxinguara.com'; // O da print
    const password = await bcrypt.hash('bolacha123', 10);

    const createIfNotExists = async (email: string) => {
      const existing = await prisma.adminUser.findUnique({ where: { email } });
      if (!existing) {
        await prisma.adminUser.create({
          data: { email, password, nome: 'Administrador' }
        });
      }
    };

    await createIfNotExists(email1);
    await createIfNotExists(email2);

    return NextResponse.json({ message: 'Usuário criado com sucesso! Agora você já pode fazer login.' });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return NextResponse.json({ error: 'Erro ao criar usuário admin' }, { status: 500 });
  }
}
