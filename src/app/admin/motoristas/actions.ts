'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { uploadToR2, deleteFromR2, isR2Configured } from "@/lib/r2";

// ──────────────────────────────────────────
// PROCESSAR FOTO — R2 (preferencial) ou base64 (fallback)
// ──────────────────────────────────────────
async function processarFoto(file: File | null): Promise<string | null> {
  if (!file || file.size === 0) return null;

  // Limite de 5MB
  if (file.size > 5 * 1024 * 1024) {
    throw new Error('Foto muito grande. Máximo 5MB.');
  }

  if (isR2Configured()) {
    try {
      return await uploadToR2(file, {
        folder: 'motoristas',
        filename: file.name,
        contentType: file.type,
      });
    } catch (error) {
      console.error("Erro no upload R2, fazendo fallback para base64:", error);
      // Fallback manual se falhar
    }
  }

  // Fallback: base64 comprimido (se R2 não configurado)
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64 = buffer.toString('base64');
  return `data:${file.type};base64,${base64}`;
}

// ──────────────────────────────────────────
// CADASTRAR MOTORISTA
// ──────────────────────────────────────────
export async function cadastrarMotorista(formData: FormData) {
  const nome = formData.get('nome') as string;
  
  if (!nome || nome.trim() === '') throw new Error('Nome é obrigatório');

  const novoMotorista = await prisma.motorista.create({
    data: {
      nome: nome.trim(),
      status: 'ativo',
      ativo: true,
      corridasMes: 0,
      pontos: 0,
    },
  });

  revalidatePath('/admin/motoristas');
  revalidatePath('/ranking');
  
  redirect(`/admin/motoristas/${novoMotorista.id}`);
}

// ──────────────────────────────────────────
// ADICIONAR CORRIDAS DO DIA
// ──────────────────────────────────────────
export async function adicionarCorridas(formData: FormData) {
  const motoristaId = formData.get('motoristaId') as string;
  const quantidade = parseInt(formData.get('quantidade') as string, 10);
  const idExterna = formData.get('idExterna') as string || null;
  const horaCorrida = formData.get('horaCorrida') as string || null;

  if (!motoristaId || !quantidade || quantidade <= 0) throw new Error('Dados inválidos');

  const horaDate = horaCorrida ? new Date(horaCorrida) : null;

  // Usa transaction para garantir consistência
  await prisma.$transaction([
    prisma.motorista.update({
      where: { id: motoristaId },
      data: { corridasMes: { increment: quantidade } },
    }),
    prisma.corrida.createMany({
      data: Array.from({ length: quantidade }).map((_, idx) => ({
        motoristaId,
        data: new Date(),
        idExterna: idExterna ? (quantidade > 1 ? `${idExterna}-${idx + 1}` : idExterna) : null,
        horaCorrida: horaDate,
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

  // Busca foto pra deletar do R2
  const motorista = await prisma.motorista.findUnique({ where: { id: motoristaId } });
  if (motorista?.fotoUrl && isR2Configured() && motorista.fotoUrl.startsWith('http')) {
    try { await deleteFromR2(motorista.fotoUrl); } catch {}
  }

  // Remove corridas associadas primeiro, depois o motorista
  await prisma.corrida.deleteMany({ where: { motoristaId } });
  await prisma.motorista.delete({ where: { id: motoristaId } });

  revalidatePath('/admin/motoristas');
  revalidatePath('/ranking');
}

// ──────────────────────────────────────────
// ZERAR MÊS (Reset Mensal com Histórico)
// ──────────────────────────────────────────
export async function zerarMes(nomeMes: string) {
  if (!nomeMes || nomeMes.trim() === '') throw new Error('Nome do mês é obrigatório');

  // Busca todos os motoristas no momento atual, ordenados por corridas
  const motoristasSnapshot = await prisma.motorista.findMany({
    orderBy: { corridasMes: "desc" },
    select: {
      id: true,
      nome: true,
      fotoUrl: true,
      status: true,
      corridasMes: true,
    }
  });

  // Salva o snapshot na tabela de Fechamento
  await prisma.fechamentoMes.create({
    data: {
      nome: nomeMes.trim(),
      dados: JSON.parse(JSON.stringify(motoristasSnapshot)), // Força serialização limpa
    }
  });

  // Zera as corridas
  await prisma.motorista.updateMany({
    data: { corridasMes: 0 },
  });

  revalidatePath('/admin/motoristas');
  revalidatePath('/admin/relatorios');
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
  const telefone = formData.get('telefone') as string | null;
  const cnh = formData.get('cnh') as string | null;
  const veiculo = formData.get('veiculo') as string | null;
  const cidade = formData.get('cidade') as string | null;
  
  const fotoFile = formData.get('foto') as File | null;

  if (!id || !nome || nome.trim() === '') throw new Error('Nome é obrigatório');

  const novaFotoUrl = await processarFoto(fotoFile);

  // Se tem nova foto e a antiga era do R2, deleta a antiga
  if (novaFotoUrl && isR2Configured()) {
    const motoristaAtual = await prisma.motorista.findUnique({ where: { id } });
    if (motoristaAtual?.fotoUrl && motoristaAtual.fotoUrl.startsWith('http')) {
      try { await deleteFromR2(motoristaAtual.fotoUrl); } catch {}
    }
  }

  await prisma.motorista.update({
    where: { id },
    data: {
      nome: nome.trim(),
      status: status === 'alerta' ? 'alerta' : 'ativo',
      ...(telefone && { telefone: telefone.trim() }),
      ...(cnh && { cnh: cnh.trim() }),
      ...(veiculo && { veiculo: veiculo.trim() }),
      ...(cidade && { cidade: cidade.trim() }),
      ...(novaFotoUrl && { fotoUrl: novaFotoUrl }),
    }
  });

  revalidatePath('/admin/motoristas');
  revalidatePath('/ranking');
  revalidatePath(`/admin/motoristas/${id}`);
}
