'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ──────────────────────────────────────────
// CADASTRAR MOTORISTA
// ──────────────────────────────────────────
export async function cadastrarMotorista(formData: FormData) {
  const nome = formData.get('nome') as string;
  const status = formData.get('status') as string || 'ativo';
  const fotoUrl = formData.get('fotoUrl') as string || null;

  if (!nome || nome.trim() === '') throw new Error('Nome é obrigatório');

  await prisma.motorista.create({
    data: {
      nome: nome.trim(),
      fotoUrl: fotoUrl ? fotoUrl.trim() : null,
      status: status === 'alerta' ? 'alerta' : 'ativo',
      ativo: true,
      corridasMes: 0,
      pontos: 0,
    },
  });

  revalidatePath('/admin/motoristas');
  revalidatePath('/ranking');
}

// ──────────────────────────────────────────
// ADICIONAR CORRIDAS DO DIA
// ──────────────────────────────────────────
export async function adicionarCorridas(formData: FormData) {
  const motoristaId = formData.get('motoristaId') as string;
  const quantidade = parseInt(formData.get('quantidade') as string, 10);

  if (!motoristaId || !quantidade || quantidade <= 0) throw new Error('Dados inválidos');

  // Usa transaction para garantir consistência
  await prisma.$transaction([
    prisma.motorista.update({
      where: { id: motoristaId },
      data: { corridasMes: { increment: quantidade } },
    }),
    prisma.corrida.createMany({
      data: Array.from({ length: quantidade }).map(() => ({
        motoristaId,
        data: new Date(),
      })),
    })
  ]);

  revalidatePath('/admin/motoristas');
  revalidatePath('/ranking');
}

// ──────────────────────────────────────────
// ALTERAR ETIQUETA/STATUS
// ──────────────────────────────────────────
export async function alterarStatus(formData: FormData) {
  const motoristaId = formData.get('motoristaId') as string;
  const novoStatus = formData.get('status') as string;

  if (!motoristaId) throw new Error('Motorista não encontrado');

  await prisma.motorista.update({
    where: { id: motoristaId },
    data: {
      status: novoStatus === 'alerta' ? 'alerta' : 'ativo',
    },
  });

  revalidatePath('/admin/motoristas');
  revalidatePath('/ranking');
}

// ──────────────────────────────────────────
// REMOVER MOTORISTA
// ──────────────────────────────────────────
export async function removerMotorista(formData: FormData) {
  const motoristaId = formData.get('motoristaId') as string;
  if (!motoristaId) throw new Error('Motorista não encontrado');

  // Remove corridas associadas primeiro, depois o motorista
  await prisma.corrida.deleteMany({ where: { motoristaId } });
  await prisma.motorista.delete({ where: { id: motoristaId } });

  revalidatePath('/admin/motoristas');
  revalidatePath('/ranking');
}

// ──────────────────────────────────────────
// ZERAR MÊS (Reset Mensal)
// ──────────────────────────────────────────
export async function zerarMes() {
  await prisma.motorista.updateMany({
    data: { corridasMes: 0 },
  });

  revalidatePath('/admin/motoristas');
  revalidatePath('/ranking');
}

// ──────────────────────────────────────────
// ADICIONAR CORRIDAS (Perfil)
// ──────────────────────────────────────────
export async function adicionarCorridasProfile(motoristaId: string, quantidade: number) {
  if (!motoristaId || !quantidade || quantidade <= 0) throw new Error('Dados inválidos');

  await prisma.$transaction([
    prisma.motorista.update({
      where: { id: motoristaId },
      data: { corridasMes: { increment: quantidade } },
    }),
    prisma.corrida.createMany({
      data: Array.from({ length: quantidade }).map(() => ({
        motoristaId,
        data: new Date(),
      })),
    })
  ]);

  revalidatePath(`/admin/motoristas/${motoristaId}`);
  revalidatePath('/admin/motoristas');
  revalidatePath('/ranking');
}

// ──────────────────────────────────────────
// ATUALIZAR MOTORISTA (Edição em Tabela)
// ──────────────────────────────────────────
export async function atualizarMotorista(formData: FormData) {
  const id = formData.get('id') as string;
  const nome = formData.get('nome') as string;
  const status = formData.get('status') as string;
  const fotoUrl = formData.get('fotoUrl') as string;

  if (!id || !nome || nome.trim() === '') throw new Error('Nome é obrigatório');

  await prisma.motorista.update({
    where: { id },
    data: {
      nome: nome.trim(),
      status: status === 'alerta' ? 'alerta' : 'ativo',
      fotoUrl: fotoUrl ? fotoUrl.trim() : null,
    }
  });

  revalidatePath('/admin/motoristas');
  revalidatePath('/ranking');
}
