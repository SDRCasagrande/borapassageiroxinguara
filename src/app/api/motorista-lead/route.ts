import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, telefone, cidade, veiculo } = body;

    if (!nome || !telefone) {
      return NextResponse.json(
        { error: 'Nome e telefone são obrigatórios' },
        { status: 400 }
      );
    }

    const lead = await prisma.motoristaLead.create({
      data: {
        nome,
        telefone,
        cidade: cidade || null,
        veiculo: veiculo || null,
        status: 'PENDENTE',
      },
    });

    return NextResponse.json({ success: true, id: lead.id });
  } catch (error) {
    console.error('Erro ao criar lead de motorista:', error);
    return NextResponse.json(
      { error: 'Erro interno ao salvar cadastro' },
      { status: 500 }
    );
  }
}
